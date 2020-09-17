import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { usePreloadedQuery, graphql } from "react-relay/hooks";
import { RepositoryQuery } from "./__generated__/RepositoryQuery.graphql";

export default function Repository(props: {
  queries: { repositoryQuery: PreloadedQuery<RepositoryQuery> };
}) {
  const data = usePreloadedQuery(
    graphql`
      query RepositoryQuery($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          name
        }
      }
    `,
    props.queries.repositoryQuery
  );

  return <h1>{data.repository?.name}</h1>;
}
