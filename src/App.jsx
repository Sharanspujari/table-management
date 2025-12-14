import { useState,useMemo } from "react";
import "./App.css";
import songs from "./data/songs.json";
import DataTable from "./components/Table";
function App() {
  const [globalFilter,setGlobalFilter] = useState("")
  const data = useMemo(() => songs, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spotify Songs Table</h1>
      <DataTable
        data={data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}

export default App;
