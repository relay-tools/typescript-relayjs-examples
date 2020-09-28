/** @format */

import { createEntryPoint } from "./EntryPointConfig";

export default createEntryPoint({
  root: () => import("./Home"),
  getPreloadProps() {
    return {};
  },
});
