/** @format */

import type { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";

export function createRoute<Params = {}>(routeConfig: {
  parent?: Route;
  path?: string;
  exact?: boolean;
  entryPoint: EntryPoint<Params, {}>;
}): Route<Params> {
  return routeConfig;
}

type Route<Params = {}> = Readonly<{
  parent?: Route;
  path?: string;
  exact?: boolean;
  entryPoint: EntryPoint<Params, {}>;
}>;
