/** @format */
import type { EntryPoint } from "react-relay/lib/relay-experimental/EntryPointTypes";

export function createEntryPoint<P>(
  config: EntryPoint<P, {}>
): EntryPoint<P, {}> {
  return {
    root: config.root,
    getPreloadProps: config.getPreloadProps,
  };
}
