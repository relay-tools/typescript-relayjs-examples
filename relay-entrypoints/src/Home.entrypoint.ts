/** @format */

import { createEntryPoint } from "./EntryPointConfig";
import JSResource from "./JSResource";

export default createEntryPoint({
  root: JSResource("Home", () =>
    import("./Home").then((module) => module.default)
  ),
  getPreloadProps() {
    return {};
  },
});
