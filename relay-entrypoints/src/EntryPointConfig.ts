/** @format */

import { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";
export function createEntryPoint<Params = {}>(
  entryPoint: EntryPoint<Params, {}>
): EntryPoint<Params, {}> {
  return entryPoint;
}
