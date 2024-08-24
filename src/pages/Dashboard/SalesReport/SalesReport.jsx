import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For automatic table creation in PDF


const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("pdf");

  const fetchReport = async () => {
    const { data } = await axios.get("/sales-report", {
      params: { startDate, endDate }
    });
    return data;
  };

  const { data: reportData, isLoading } = useQuery({
    queryKey: ["salesReport", startDate, endDate],
    queryFn: fetchReport,
    enabled: !!startDate && !!endDate, 
  });

  const handleDownload = () => {
    if (format === "pdf") {
      const doc = new jsPDF();
      doc.autoTable({
        head: [["Medicine Name", "Seller Email", "Buyer Email", "Total Price"]],
        body: reportData.map(item => [
          item.medicineName,
          item.sellerEmail,
          item.buyerEmail,
          item.totalPrice
        ]),
      });
      doc.save("sales-report.pdf");
    } else if (format === "csv") {
      // The CSVLink component will handle CSV download
    } else if (format === "xlsx") {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(reportData);
      XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      const buf = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;
      const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "sales-report.xlsx");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
          <option value="xlsx">XLSX</option>
        </select>
      </div>
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Download Report
      </button>
      {format === "csv" && reportData && (
        <CSVLink
          data={reportData}
          filename="sales-report.csv"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
        >
          Download CSV
        </CSVLink>
      )}
    </div>
  );
};

export default SalesReport;
