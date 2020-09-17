/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8aa70460f97b04dea4549c71282be858 */

import { ConcreteRequest } from "relay-runtime";
export type RepositoryQueryVariables = {
    owner: string;
    name: string;
};
export type RepositoryQueryResponse = {
    readonly repository: {
        readonly name: string;
    } | null;
};
export type RepositoryQuery = {
    readonly response: RepositoryQueryResponse;
    readonly variables: RepositoryQueryVariables;
};



/*
query RepositoryQuery(
  $owner: String!
  $name: String!
) {
  repository(owner: $owner, name: $name) {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8aa70460f97b04dea4549c71282be858",
    "metadata": {},
    "name": "RepositoryQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'c99a79be71d1a0e4116c58e74ac25a52';
export default node;
