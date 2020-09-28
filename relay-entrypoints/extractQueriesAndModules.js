const server = require("./out/server/server");

const { queries, modules } = server.getQueriesAndModulesForUrl(
  "/facebook/relay"
);
console.log(queries, modules);
