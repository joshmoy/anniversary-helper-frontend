// Mock data for the import page

// Data passed as props to the root component
export const mockRootProps = {
  // Recent imports data
  recentImports: [
    {
      id: 1,
      filename: "team_members.csv",
      contactsImported: 23,
      importDate: "2025-10-05",
      status: "success" as const
    },
    {
      id: 2,
      filename: "employees_q4.xlsx",
      contactsImported: 156,
      importDate: "2025-09-28",
      status: "success" as const
    }
  ],
  // Current upload progress (if any)
  currentUpload: {
    filename: "employee_list.csv",
    fileSize: 2.3,
    totalRecords: 60,
    processedRecords: 45,
    isUploading: true
  }
};

// Props types (data passed to components)
export interface RecentImport {
  id: number;
  filename: string;
  contactsImported: number;
  importDate: string;
  status: "success" | "error" | "processing";
}

export interface CurrentUpload {
  filename: string;
  fileSize: number;
  totalRecords: number;
  processedRecords: number;
  isUploading: boolean;
}

export interface ImportPageProps {
  recentImports: RecentImport[];
  currentUpload?: CurrentUpload;
}