import CheckCircleGreenIcon from "@/components/icons/CheckCircleGreenIcon";

const instructions = [
  "CSV or Excel format (.csv, .xlsx)",
  "First row should contain column headers",
  "Date format: YYYY-MM-DD or MM/DD/YYYY",
  "Maximum file size: 10 MB",
  "Duplicate entries will be flagged for review",
];

export default function FileFormatInstructions() {
  return (
    <div className="flex flex-col gap-3">
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center gap-3">
          <CheckCircleGreenIcon width={20} height={20} className="shrink-0" />
          <span className="text-base font-normal tracking-tight text-text-primary">
            {instruction}
          </span>
        </div>
      ))}
    </div>
  );
}