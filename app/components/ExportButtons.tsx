"use client";

import React, { useState } from "react";

const ExportButtons: React.FC = () => {
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const createAndDownloadExport = async (format: "csv" | "xlsx") => {
    const setLoading = format === "csv" ? setLoadingCSV : setLoadingExcel;
    setLoading(true);

    try {
      // Step 1: Create export
      const createRes = await fetch("http://localhost:3000/api/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format }),
      });

      if (!createRes.ok) throw new Error("Failed to create export");
      const { exportId } = await createRes.json();

      // Step 2: Poll status
      let status = "PENDING";
      while (status === "PENDING") {
        const statusRes = await fetch(
          `http://localhost:3000/api/exports/${exportId}`
        );
        if (!statusRes.ok) throw new Error("Failed to check export status");

        const data = await statusRes.json();
        status = data.status;

        if (status === "FAILED") throw new Error("Export failed on server");

        if (status === "PENDING") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // Step 3: Download file
      const downloadRes = await fetch(
        `http://localhost:3000/api/exports/${exportId}/download`
      );
      if (!downloadRes.ok) throw new Error("Download failed");

      const blob = await downloadRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export.${format === "csv" ? "csv" : "xlsx"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => createAndDownloadExport("csv")}
        disabled={loadingCSV}
      >
        {loadingCSV ? "Processing..." : "Export CSV"}
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => createAndDownloadExport("xlsx")}
        disabled={loadingExcel}
      >
        {loadingExcel ? "Processing..." : "Export Excel"}
      </button>
    </div>
  );
};

export default ExportButtons;
