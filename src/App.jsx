import { useState, useEffect, useMemo } from "react";
import "./App.css";
import songs from "./data/songs.json";
import DataTable from "./components/Table";
import TableToolbar from "./components/TableToolBar";
import { PageLoader } from "./components/PageLoader";
import { ErrorState } from "./components/ErrorState";
function App() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      setError("Failed to load songs data.");
      setLoading(false);
    }
  }, []);

  const data = useMemo(() => songs, []);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spotify Songs Table</h1>
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <DataTable
        data={data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}

export default App;
