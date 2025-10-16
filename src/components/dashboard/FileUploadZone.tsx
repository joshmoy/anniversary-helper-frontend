"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadCloudIcon from "@/components/icons/UploadCloudIcon";
import FileDocumentIcon from "@/components/icons/FileDocumentIcon";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  uploadProgress?: {
    filename: string;
    fileSize: number;
    totalRecords: number;
    processedRecords: number;
    isUploading: boolean;
  };
}

export default function FileUploadZone({ onFileSelect, selectedFile, uploadProgress }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (
        droppedFile.type === "text/csv" ||
        droppedFile.name.endsWith(".csv") ||
        droppedFile.name.endsWith(".xlsx")
      ) {
        onFileSelect(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed px-6 py-12 transition-all cursor-pointer ${
          dragActive
            ? "border-upload-zone-active-border bg-upload-zone-active-bg"
            : "border-upload-zone-border bg-white"
        }`}
        onClick={handleClick}
      >
        <UploadCloudIcon width={48} height={48} className="text-gray-400" />
        <p className="text-base font-normal tracking-tight text-text-primary">
          Drop your CSV or Excel file here
        </p>
        <p className="text-sm font-normal tracking-tight text-text-secondary">
          or click to browse
        </p>
        <Button
          variant="default"
          size="sm"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Choose File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="flex flex-col gap-2 rounded-[10px] border border-progress-border bg-progress-bg px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileDocumentIcon width={20} height={20} className="text-blue-600" />
              <span className="text-sm font-normal tracking-tight text-text-primary">
                {uploadProgress.filename}
              </span>
            </div>
            <span className="text-sm font-normal tracking-tight text-text-secondary">
              {uploadProgress.fileSize} MB
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-progress-bar transition-all duration-300"
              style={{
                width: `${(uploadProgress.processedRecords / uploadProgress.totalRecords) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm font-normal tracking-tight text-text-secondary">
            Importing... {uploadProgress.processedRecords} of {uploadProgress.totalRecords} records
          </span>
        </div>
      )}
    </div>
  );
}