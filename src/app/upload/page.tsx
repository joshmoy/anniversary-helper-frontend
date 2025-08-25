"use client";

import { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to determine if upload was successful
  const isUploadSuccessful = (result: CSVUploadResponse) => {
    // Handle new backend response format
    if (result.status) {
      return (
        result.status === "processing" ||
        result.status === "completed" ||
        result.status === "success"
      );
    }
    // Handle legacy format
    return (
      result.success === true ||
      result.success === "true" ||
      (result.records_processed && result.records_processed > 0 && !result.error)
    );
  };

  // Helper function to reset the form
  const resetForm = () => {
    setFile(null);
    setUploadResult(null);
    setDragActive(false);
    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        setUploadResult(null); // Clear previous results when new file is selected
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
        setUploadResult(null); // Clear previous results when new file is selected
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

      // Handle different possible success formats from backend
      if (isUploadSuccessful(result)) {
        // New format shows different success message
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success(`Successfully processed ${result.records_processed || 0} records!`);
        }
        // Clear the form after successful upload
        setFile(null);
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CSV Upload</h1>
        <p className="text-gray-600">Upload church member data in bulk using CSV files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <InformationCircleIcon className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-blue-800">CSV Format Requirements</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-1 pl-5">
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
          <div className="mb-6">
            <button onClick={downloadSampleCSV} className="btn-secondary flex items-center gap-2">
              <DocumentArrowUpIcon className="h-4 w-4" />
              Download Sample CSV
            </button>
          </div>

          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg py-12 px-6 text-center transition-all mb-6 relative ${
              dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <CloudArrowUpIcon
              className={`h-12 w-12 mx-auto mb-4 ${dragActive ? "text-blue-600" : "text-gray-400"}`}
            />

            {file ? (
              <div>
                <p className="text-base font-medium text-gray-900 mb-2">{file.name}</p>
                <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div>
                <p className="text-base font-medium text-gray-900 mb-2">
                  Drop your CSV file here, or click to browse
                </p>
                <p className="text-sm text-gray-600">Supports CSV files up to 10MB</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Upload Button */}
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-base font-medium text-white border-none flex-1 transition-colors ${
                file && !uploading
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <DocumentArrowUpIcon className="h-5 w-5" />
              {uploading ? "Uploading..." : "Upload CSV"}
            </button>

            {(file || uploadResult) && (
              <button onClick={resetForm} className="btn-secondary px-4 py-3">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Results</h3>

          {uploadResult ? (
            <div className="card">
              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                {isUploadSuccessful(uploadResult) ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                )}
                <span
                  className={`text-base font-semibold ${
                    isUploadSuccessful(uploadResult) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isUploadSuccessful(uploadResult) ? "Upload Successful" : "Upload Failed"}
                </span>
              </div>

              {/* Upload Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Filename:</span>
                  <span className="text-sm text-gray-900">{uploadResult.filename}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      uploadResult.status === "processing"
                        ? "text-blue-600"
                        : uploadResult.status === "completed"
                        ? "text-green-600"
                        : "text-gray-900"
                    }`}
                  >
                    {uploadResult.status}
                  </span>
                </div>
                {uploadResult.url && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">File URL:</span>
                    <a
                      href={uploadResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
                    >
                      View File
                    </a>
                  </div>
                )}
              </div>

              {/* Legacy Stats (if available) */}
              {uploadResult.records_processed && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {uploadResult.records_processed}
                    </div>
                    <div className="text-xs text-gray-600">Records Processed</div>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {uploadResult.records_added || 0}
                    </div>
                    <div className="text-xs text-green-600">Records Added</div>
                  </div>

                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {uploadResult.records_updated || 0}
                    </div>
                    <div className="text-xs text-yellow-600">Records Updated</div>
                  </div>

                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {Math.max(
                        0,
                        (uploadResult.records_processed || 0) -
                          (uploadResult.records_added || 0) -
                          (uploadResult.records_updated || 0)
                      )}
                    </div>
                    <div className="text-xs text-red-600">Errors</div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {uploadResult.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {uploadResult.error}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg py-12 px-6 text-center">
              <DocumentArrowUpIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-base text-gray-600">Upload results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
