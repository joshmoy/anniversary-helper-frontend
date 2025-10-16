interface CelebrationItemProps {
  emoji: string;
  name: string;
  type: string;
}

export default function CelebrationItem({ emoji, name, type }: CelebrationItemProps) {
  return (
    <div className="bg-gradient-to-r from-celebration-gradient-start to-celebration-gradient-end border border-celebration-border rounded-[10px] p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="text-[30px] leading-9">{emoji}</span>
        <div className="flex flex-col">
          <p className="text-body text-text-primary">{name}</p>
          <p className="text-small text-text-secondary capitalize">{type}</p>
        </div>
      </div>
      <span className="bg-brand-purple text-badge text-white px-3 py-1 rounded-md">
        Today
      </span>
    </div>
  );
}