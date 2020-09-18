import { Environment, Network, Store, RecordSource } from "relay-runtime";

const network = Network.create((request, variables, cacheConfig) => {
  return fetch("/api/graphql", {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: request.id ?? request.text,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((payload) =>
      Array.isArray(payload.errors) ? Promise.reject(payload) : payload
    );
});

const RelayEnvironment = new Environment({
  network,
  store: new Store(new RecordSource(), { gcReleaseBufferSize: 10 }),
});

export { RelayEnvironment };
