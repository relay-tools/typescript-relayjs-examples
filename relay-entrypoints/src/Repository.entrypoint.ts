import { createEntryPoint } from "./EntryPointConfig";
import RepositoryQuery from "./__generated__/RepositoryQuery.graphql";

export default createEntryPoint<{ owner: string; name: string }>({
  root: () => import("./Repository"),
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
