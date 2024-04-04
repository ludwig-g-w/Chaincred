import MyErrorBoundary from "./ErrorBoudary";

export default function WebNotImplemented() {
  return (
    <MyErrorBoundary>
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
    </MyErrorBoundary>
  );
}
