/** @format */

import { createEntryPoint } from "./EntryPointConfig";
import JSResource from "./JSResource";

export default createEntryPoint({
  root: () => import("./Home").then((module) => module.default),
  getPreloadProps() {
    return {};
  },
});
