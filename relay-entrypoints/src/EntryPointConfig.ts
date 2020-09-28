/** @format */
import type { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";

export function createEntryPoint<P>(
  config: EntryPoint<P, {}>
): EntryPoint<P, {}> {
  return {
    name: config.root.getModuleId(),
    root: config.root,
    getPreloadProps: config.getPreloadProps,
  };
}
