import { createRoute } from "./RouteConfig";
import RootRoute from "./Root.route";
import RepositoryEntrypoint from "./Repository.entrypoint";

export default createRoute({
  parent: RootRoute,
  path: "/:owner/:name",
  exact: true,
  entryPoint: RepositoryEntrypoint,
});
