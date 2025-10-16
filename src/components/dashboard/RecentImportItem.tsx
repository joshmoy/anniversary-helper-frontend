import CheckCircleGreenIcon from "@/components/icons/CheckCircleGreenIcon";

interface RecentImportItemProps {
  filename: string;
  contactsImported: number;
  importDate: string;
  status: "success" | "error" | "processing";
}

export default function RecentImportItem({
  filename,
  contactsImported,
  importDate,
  status,
}: RecentImportItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="flex flex-col gap-1 rounded-[10px] border border-success-border bg-success-bg px-3 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-normal tracking-tight text-text-primary">{filename}</span>
        {status === "success" && <CheckCircleGreenIcon width={16} height={16} />}
      </div>
      <span className="text-xs font-normal text-text-secondary">
        {contactsImported} contacts imported • {formatDate(importDate)}
      </span>
    </div>
  );
}