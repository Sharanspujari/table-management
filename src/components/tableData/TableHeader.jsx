import { flexRender } from "@tanstack/react-table";
import { COL_WIDTH } from "./columns";

const TableHeader = ({ table }) => (
  <div className="sticky top-0 z-20 bg-gray-200 border-b">
    <div className="flex">
      {table.getHeaderGroups()[0].headers.map((header) => {
        const sorted = header.column.getIsSorted();
        return (
          <div
            key={header.id}
            style={{ width: COL_WIDTH }}
            onClick={header.column.getToggleSortingHandler()}
            className="p-2 font-semibold truncate cursor-pointer"
          >
            {flexRender(
              header.column.columnDef.header,
              header.getContext()
            )}
            {sorted === "asc" && " ⬆"}
            {sorted === "desc" && " ⬇"}
          </div>
        );
      })}
    </div>
  </div>
);

export default TableHeader;
