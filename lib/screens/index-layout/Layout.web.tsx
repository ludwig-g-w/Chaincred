import { Suspense } from "react";

export default function Index() {
  return (
    <Suspense fallback={null}>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Nothing is implemented on web</h1>
      </div>
    </Suspense>
  );
}
