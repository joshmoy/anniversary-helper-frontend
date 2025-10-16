"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import FileUploadZone from "@/components/dashboard/FileUploadZone";
import FileFormatInstructions from "@/components/dashboard/FileFormatInstructions";
import TemplateCard from "@/components/dashboard/TemplateCard";
import RecentImportItem from "@/components/dashboard/RecentImportItem";
import { apiClient } from "@/lib/api/api";
import type { CSVUploadResponse } from "@/types";
import toast from "react-hot-toast";

export default function ImportDataPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    filename: string;
    fileSize: number;
    totalRecords: number;
    processedRecords: number;
    isUploading: boolean;
  } | null>(null);

  // Mock recent imports data
  const recentImports = [
    {
      id: 1,
      filename: "team_members.csv",
      contactsImported: 23,
      importDate: "2025-10-05",
      status: "success" as const,
    },
    {
      id: 2,
      filename: "employees_q4.xlsx",
      contactsImported: 156,
      importDate: "2025-09-28",
      status: "success" as const,
    },
  ];

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setUploading(true);

    // Show upload progress
    setUploadProgress({
      filename: file.name,
      fileSize: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
      totalRecords: 60,
      processedRecords: 0,
      isUploading: true,
    });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (!prev) return null;
        const newProcessed = Math.min(prev.processedRecords + 5, prev.totalRecords);
        return { ...prev, processedRecords: newProcessed };
      });
    }, 300);

    try {
      const result: CSVUploadResponse = await apiClient.uploadCSV(file);

      clearInterval(progressInterval);
      setUploadProgress(null);

      if (result.status === "processing" || result.status === "completed" || result.status === "success") {
        toast.success(result.message || "File uploaded successfully!");
        setSelectedFile(null);
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(null);
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = (type: "employee" | "team" | "personal") => {
    let sampleData = "";
    let filename = "";

    switch (type) {
      case "employee":
        sampleData = `name,email,phone,birthday,work_anniversary
John Smith,john.smith@company.com,+1234567890,1985-03-15,2015-06-10
Mary Johnson,mary.johnson@company.com,+1234567891,1990-07-22,2018-03-20`;
        filename = "employee_roster_template.csv";
        break;
      case "team":
        sampleData = `name,email,role,birthday
David Wilson,david.wilson@company.com,Developer,1988-12-05
Sarah Brown,sarah.brown@company.com,Designer,1992-04-18`;
        filename = "team_member_template.csv";
        break;
      case "personal":
        sampleData = `name,relationship,event_type,date,email,phone
Michael Chen,Friend,Birthday,1987-09-30,michael@email.com,+1234567892
Lisa Anderson,Family,Anniversary,2010-06-15,lisa@email.com,+1234567893`;
        filename = "personal_contacts_template.csv";
        break;
    }

    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template downloaded!");
  };

  return (
    <div className="flex flex-col gap-8 bg-bg-light p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tight text-text-primary">Import Data</h1>
        <p className="text-base font-normal tracking-tight text-text-secondary">
          Bulk import contacts from CSV or Excel files
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Upload File Card */}
          <Card className="rounded-[14px] border border-card-border">
            <CardHeader className="gap-2">
              <CardTitle className="text-base font-medium leading-4 tracking-tight text-gray-900">
                Upload File
              </CardTitle>
              <CardDescription className="text-base font-normal tracking-tight text-label-text">
                Drag and drop or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                uploadProgress={uploadProgress || undefined}
              />
            </CardContent>
          </Card>

          {/* File Format Instructions Card */}
          <Card className="rounded-[14px] border border-card-border">
            <CardHeader>
              <CardTitle className="text-base font-normal leading-4 tracking-tight text-gray-900">
                File Format Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileFormatInstructions />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Download Templates Card */}
          <Card className="rounded-[14px] border border-card-border">
            <CardHeader className="gap-2">
              <CardTitle className="text-base font-medium leading-4 tracking-tight text-gray-900">
                Download Templates
              </CardTitle>
              <CardDescription className="text-base font-normal tracking-tight text-label-text">
                Use these templates for easy importing
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <TemplateCard
                title="Employee Roster Template"
                description="For HR teams and organizations"
                fields="Name, Email, Phone, Birthday, Work Anniversary"
                onDownload={() => downloadTemplate("employee")}
              />
              <TemplateCard
                title="Team Member Template"
                description="For teams and departments"
                fields="Name, Email, Role, Birthday"
                onDownload={() => downloadTemplate("team")}
              />
              <TemplateCard
                title="Personal Contacts Template"
                description="For individual use"
                fields="Name, Relationship, Event Type, Date, Email, Phone"
                onDownload={() => downloadTemplate("personal")}
              />
            </CardContent>
          </Card>

          {/* Recent Imports Card */}
          <Card className="rounded-[14px] border border-card-border">
            <CardHeader>
              <CardTitle className="text-base font-normal leading-4 tracking-tight text-gray-900">
                Recent Imports
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {recentImports.map((importItem) => (
                <RecentImportItem
                  key={importItem.id}
                  filename={importItem.filename}
                  contactsImported={importItem.contactsImported}
                  importDate={importItem.importDate}
                  status={importItem.status}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}