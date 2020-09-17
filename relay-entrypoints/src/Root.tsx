/** @format */

import { ReactNode, Suspense } from "react";

function Fallback() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <p>Loading...</p>
    </div>
  );
}

export default function Root(props: { props: { children: ReactNode } }) {
  console.log(props);

  return (
    <Suspense fallback={<Fallback />}>{props.props.children ?? null}</Suspense>
  );
}
