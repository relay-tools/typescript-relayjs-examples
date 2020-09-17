/** @format */

import { unstable_createRoot } from "react-dom";
import { nullThrows } from "./nullThrows";
import Router from "./Router";

const node = document.getElementById("app");
nullThrows(node, "no app node found");
const root = unstable_createRoot(node);

root.render(<Router />);
