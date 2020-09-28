/** @format */

import { createEntryPoint } from "./EntryPointConfig";

export default createEntryPoint({
  root: () => import("./Root"),
  getPreloadProps() {
    return {};
  },
});
