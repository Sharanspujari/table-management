import { exportToCSV } from "../hooks/useCSVExport";

export default function ExportCSV({ rows }) {
  return (
    <button
      onClick={() => exportToCSV(rows)}
      className="mb-3 px-4 py-2 bg-blue-500 text-white cursor-pointer"
    >
      Export CSV
    </button>
  );
}
