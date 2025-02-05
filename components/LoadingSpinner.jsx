// components/Spinner.js
export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span className="loading loading-ring loading-lg m-4" />
    </div>
  );
}
