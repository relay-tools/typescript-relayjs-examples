/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 4a45f359f7fe4a783fae695058a98919 */

import { ConcreteRequest } from "relay-runtime";
export type RepositoryQueryVariables = {
    owner: string;
    name: string;
};
export type RepositoryQueryResponse = {
    readonly repository: {
        readonly nameWithOwner: string;
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
    nameWithOwner
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
  "name": "nameWithOwner",
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
    "id": "4a45f359f7fe4a783fae695058a98919",
    "metadata": {},
    "name": "RepositoryQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'eec3c75ce7b55fdc389904b17ee1ba63';
export default node;
