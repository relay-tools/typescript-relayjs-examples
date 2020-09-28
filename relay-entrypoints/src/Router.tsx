/** @format */
import { Suspense } from "react";
import { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { createBrowserHistory, Location } from "history";
import { matchRoutes, MatchedRoute } from "react-router-config";

import {
  // @ts-expect-error
  loadEntryPoint,
  EntryPointContainer,
  RelayEnvironmentProvider,
} from "react-relay/hooks";

import ErrorBoundary from "./ErrorBoundary";
import { RelayEnvironment } from "./RelayEnvironment";
const context = require.context(".", true, /\.route\.ts$/);

const routes = context.keys().map((moduleId) => {
  const module = context(moduleId);
  return module.default;
});

const environmentProvider = {
  getEnvironment() {
    return RelayEnvironment;
  },
};

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

console.log(routeConfig);

function createRouter() {
  const history = createBrowserHistory();
  const initialMatches = matchRoute(routeConfig, history.location);
  const initialEntries = prepareMatches(initialMatches);
  let currentEntry = {
    location: history.location,
    entries: initialEntries,
  };
  console.log(currentEntry);

  return {
    currentEntry,
  };
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes: Route[], location: Location) {
  const pathname = location.pathname;
  const matchedRoutes = matchRoutes(routes, pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error("No route for " + pathname);
  }
  return matchedRoutes;
}

function prepareMatches(matches: MatchedRoute<{}>[]) {
  return matches.map(({ match, route }) => {
    const entryPoint = loadEntryPoint(
      environmentProvider,
      route.entryPoint,
      match.params
    );
    return { entryPoint, match };
  });
}

const router = createRouter();

function Router() {
  const { currentEntry } = router;

  const reversedEntries = currentEntry.entries.slice().reverse();
  const firstEntry = reversedEntries[0];

  let routeComponent = (
    <EntryPointContainer
      entryPointReference={firstEntry.entryPoint}
      props={{}}
    />
  );

  for (let ii = 1; ii < reversedEntries.length; ii++) {
    const nextItem = reversedEntries[ii];
    routeComponent = (
      <EntryPointContainer
        entryPointReference={nextItem.entryPoint}
        props={{ children: routeComponent }}
      />
    );
  }

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary renderError={() => "Error"}>
        <Suspense fallback="Don't show this">{routeComponent}</Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

export default Router;
