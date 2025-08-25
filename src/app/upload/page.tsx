"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api";
import { CSVUploadResponse } from "@/types";
import {
  DocumentArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<CSVUploadResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
        setUploadResult(null);
      } else {
        toast.error("Please select a CSV file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
        setUploadResult(null);
      } else {
        toast.error("Please select a CSV file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);
    try {
      const result = await apiClient.uploadCSV(file);
      setUploadResult(result);

      if (result.success) {
        toast.success(`Successfully processed ${result.records_processed} records!`);
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = `name,type,date,year,spouse,phone_number
John Smith,birthday,03-15,1985,,+1234567890
Mary Johnson,birthday,07-22,1990,,+1234567891
David and Sarah Wilson,anniversary,06-10,2015,Sarah Wilson,+1234567892
Michael Brown,birthday,12-05,1978,,+1234567893`;

    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_church_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Sample CSV downloaded!");
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          CSV Upload
        </h1>
        <p style={{ color: "#6b7280" }}>Upload church member data in bulk using CSV files</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Upload Section */}
        <div>
          {/* Instructions */}
          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <InformationCircleIcon style={{ height: "20px", width: "20px", color: "#2563eb" }} />
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e40af", margin: 0 }}>
                CSV Format Requirements
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#1e40af", fontSize: "14px" }}>
              <li>
                <strong>Required columns:</strong> name, type, date
              </li>
              <li>
                <strong>Optional columns:</strong> year, spouse, phone_number
              </li>
              <li>
                <strong>Type values:</strong> "birthday" or "anniversary"
              </li>
              <li>
                <strong>Date format:</strong> MM-DD (e.g., "03-15" for March 15)
              </li>
              <li>
                <strong>Year:</strong> Birth year or marriage year
              </li>
            </ul>
          </div>

          {/* Sample Download */}
          <div style={{ marginBottom: "24px" }}>
            <button
              onClick={downloadSampleCSV}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <DocumentArrowUpIcon style={{ height: "16px", width: "16px" }} />
              Download Sample CSV
            </button>
          </div>

          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragActive ? "#2563eb" : "#d1d5db"}`,
              borderRadius: "8px",
              padding: "48px 24px",
              textAlign: "center",
              backgroundColor: dragActive ? "#eff6ff" : "#fafafa",
              transition: "all 0.2s",
              marginBottom: "24px",
            }}
          >
            <CloudArrowUpIcon
              style={{
                height: "48px",
                width: "48px",
                color: dragActive ? "#2563eb" : "#9ca3af",
                margin: "0 auto 16px",
              }}
            />

            {file ? (
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#111827",
                    margin: "0 0 8px 0",
                  }}
                >
                  {file.name}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#111827",
                    margin: "0 0 8px 0",
                  }}
                >
                  Drop your CSV file here, or click to browse
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                  Supports CSV files up to 10MB
                </p>
              </div>
            )}

            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Upload Button */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: file && !uploading ? "#2563eb" : "#9ca3af",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                cursor: file && !uploading ? "pointer" : "not-allowed",
                flex: 1,
              }}
            >
              <DocumentArrowUpIcon style={{ height: "20px", width: "20px" }} />
              {uploading ? "Uploading..." : "Upload CSV"}
            </button>

            {file && (
              <button
                onClick={() => {
                  setFile(null);
                  setUploadResult(null);
                }}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h3
            style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}
          >
            Upload Results
          </h3>

          {uploadResult ? (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
              }}
            >
              {/* Status */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}
              >
                {uploadResult.success ? (
                  <CheckCircleIcon style={{ height: "24px", width: "24px", color: "#10b981" }} />
                ) : (
                  <ExclamationTriangleIcon
                    style={{ height: "24px", width: "24px", color: "#ef4444" }}
                  />
                )}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: uploadResult.success ? "#10b981" : "#ef4444",
                  }}
                >
                  {uploadResult.success ? "Upload Successful" : "Upload Failed"}
                </span>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
                    {uploadResult.records_processed}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Records Processed</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    backgroundColor: "#f0fdf4",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#16a34a" }}>
                    {uploadResult.records_added}
                  </div>
                  <div style={{ fontSize: "12px", color: "#16a34a" }}>Records Added</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    backgroundColor: "#fef3c7",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#d97706" }}>
                    {uploadResult.records_updated}
                  </div>
                  <div style={{ fontSize: "12px", color: "#d97706" }}>Records Updated</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    backgroundColor: "#fef2f2",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>
                    {uploadResult.records_processed -
                      uploadResult.records_added -
                      uploadResult.records_updated}
                  </div>
                  <div style={{ fontSize: "12px", color: "#dc2626" }}>Errors</div>
                </div>
              </div>

              {/* Error Message */}
              {uploadResult.error && (
                <div
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    padding: "12px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#dc2626", margin: 0 }}>
                    <strong>Error:</strong> {uploadResult.error}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "48px 24px",
                textAlign: "center",
              }}
            >
              <DocumentArrowUpIcon
                style={{ height: "48px", width: "48px", color: "#d1d5db", margin: "0 auto 16px" }}
              />
              <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
                Upload results will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
