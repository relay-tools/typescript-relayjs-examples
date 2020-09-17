import { createEntryPoint } from "./EntryPointConfig";
import JSResource from "./JSResource";
import RepositoryQuery from "./__generated__/RepositoryQuery.graphql";
export default createEntryPoint<{ owner: string; name: string }>({
  root: JSResource("Repository", () =>
    import("./Repository").then((module) => module.default)
  ),
  getPreloadProps(params) {
    return {
      queries: {
        repositoryQuery: {
          parameters: RepositoryQuery,
          variables: {
            owner: params.owner,
            name: params.name,
          },
        },
      },
    };
  },
});
