/** @format */

import { createEntryPoint } from "./EntryPointConfig";
import Resource from "./JSResource";
export default createEntryPoint({
  root: Resource("Root", () =>
    import("./Root").then((module) => module.default)
  ),
  getPreloadProps() {
    return {};
  },
});
