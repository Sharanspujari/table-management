import { flexRender } from "@tanstack/react-table";
import { COL_WIDTH, TABLE_WIDTH } from "./columns";

const ROW_HEIGHT = 44;

const VirtualizedBody = ({ rows, virtualizer }) => {
  return (
    <div
      style={{
        height: virtualizer.getTotalSize(),
        position: "relative",
        width: TABLE_WIDTH,
      }}
    >
      {virtualizer.getVirtualItems().map((vRow) => {
        const row = rows[vRow.index];

        // 🔑 CRITICAL FIX — prevent undefined row render
        if (!row) return null;

        return (
          <div
            key={row.id}
            style={{
              position: "absolute",
              top: 0,
              transform: `translateY(${vRow.start}px)`,
              height: ROW_HEIGHT,
              width: TABLE_WIDTH,
            }}
            className="flex border-b bg-white"
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                style={{ width: COL_WIDTH }}
                className="p-2 truncate"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default VirtualizedBody;
