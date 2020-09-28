/** @format */

import { createEntryPoint } from "./EntryPointConfig";

export default createEntryPoint({
  root: () => import("./Root").then((module) => module.default),
  getPreloadProps() {
    return {};
  },
});
