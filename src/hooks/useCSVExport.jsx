export function exportToCSV(rows) {
  const headers = Object.keys(rows[0].original).join(",");
  const body = rows
    .map((r) =>
      Object.values(r.original)
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([headers + "\n" + body], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "spotify-data.csv";
  a.click();
}
