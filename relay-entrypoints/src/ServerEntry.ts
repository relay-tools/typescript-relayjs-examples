import { matchRoutes, MatchedRoute } from "react-router-config";
import { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { Location, parsePath } from "history";
const context = require.context(".", true, /\.route\.ts$/);

const routes = context.keys().map((moduleId) => {
  const module = context(moduleId);
  return module.default;
});

type Route = {
  path?: string;
  exact?: boolean;
  entryPoint: EntryPoint<{}, {}>;
  routes: Route[];
};

const routeConfig: Route[] = [];

for (const route of routes) {
  if (route.parent) {
    let foundParent = false;
    for (const possibleParent of routes) {
      if (possibleParent === route.parent) {
        possibleParent.routes = possibleParent.routes || [];
        possibleParent.routes.push(route);
        foundParent = true;
        break;
      }
    }
    if (!foundParent) {
      throw new Error("Unknown route parent");
    }
  } else {
    routeConfig.push(route);
  }
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes: Route[], pathname: string) {
  const matchedRoutes = matchRoutes(routes, pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error("No route for " + pathname);
  }
  return matchedRoutes;
}

export function getQueriesAndModulesForUrl(url: string) {
  const partialPath = parsePath(url);

  const matches = matchRoute(routeConfig, partialPath.pathname!);

  const modules = [];
  const queries = [];

  const entryPoints = [];
  while (matches.length !== 0) {
    const matched = matches.pop();
    const route = matched?.route;
    const match = matched?.match;
    entryPoints.push(route?.entryPoint);
    while (entryPoints.length !== 0) {
      const entryPoint = entryPoints.pop();
      modules.push(entryPoint.root.getModuleId());
      const props = entryPoint.getPreloadProps(match?.params);
      if (props.queries) {
        for (const queryname of Object.keys(props.queries)) {
          if (props.queries.hasOwnProperty(queryname)) {
            const query = props.queries[queryname];
            queries.push(query);
          }
        }
      }

      if (props.entryPoints) {
        for (const subEntryPointName of Object.keys(props.entryPoints)) {
          if (props.entryPoints.hasOwnProperty(subEntryPointName)) {
            const subEntryPoint = props.entryPoints[subEntryPointName];
            entryPoints.push(subEntryPoint);
          }
        }
      }
    }
  }

  return { modules, queries };
}
