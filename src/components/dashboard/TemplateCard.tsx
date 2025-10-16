import { Button } from "@/components/ui/button";
import DownloadIcon from "@/components/icons/DownloadIcon";

interface TemplateCardProps {
  title: string;
  description: string;
  fields: string;
  onDownload: () => void;
}

export default function TemplateCard({ title, description, fields, onDownload }: TemplateCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-template-card-border bg-template-card-bg p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-normal tracking-tight text-text-primary">{title}</h3>
        <p className="text-sm font-normal tracking-tight text-text-secondary">{description}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xs font-medium text-gray-500">Includes:</span>
          <span className="text-xs font-normal leading-4 text-gray-500">{fields}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="default"
        className="w-full justify-center gap-2 rounded-lg border border-gray-200"
        onClick={onDownload}
      >
        <DownloadIcon width={16} height={16} className="text-gray-900" />
        <span className="text-sm font-medium tracking-tight text-gray-900">Download Template</span>
      </Button>
    </div>
  );
}