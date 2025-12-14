import React from "react";

const Pagination = ({ table, pagination, setPagination }) => {
  const totalPages = table.getPageCount();
  const currentPage = pagination.pageIndex;

  const getPages = () => {
    const pages = [];
    const delta = 1;

    pages.push(0); // first page

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages - 2, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (totalPages > 1) {
      pages.push(totalPages - 1); // last page
    }

    return [...new Set(pages)];
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
      <span className="text-sm text-gray-600">
        Page {currentPage + 1} of {totalPages}
      </span>

      <select
        className="border p-2 rounded"
        value={pagination.pageSize}
        onChange={(e) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: Number(e.target.value),
            pageIndex: 0,
          }))
        }
      >
        {[25, 50, 100].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>

        {pages.map((page, idx) => {
          const prev = pages[idx - 1];
          const showEllipsis = prev !== undefined && page - prev > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && <span className="px-2">…</span>}

              <button
                onClick={() => table.setPageIndex(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {page + 1}
              </button>
            </React.Fragment>
          );
        })}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
