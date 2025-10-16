interface TabNavigationProps {
  activeTab: "all" | "birthday" | "anniversary";
  onTabChange: (tab: "all" | "birthday" | "anniversary") => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="inline-flex bg-[#ececf0] rounded-[14px] p-1">
      <button
        onClick={() => onTabChange("all")}
        className={`px-4 py-2 text-sm font-medium tracking-tight rounded-[14px] transition-colors ${
          activeTab === "all"
            ? "bg-white text-[#0a0a0a] shadow-sm"
            : "text-[#0a0a0a] hover:text-[#101828]"
        }`}
      >
        All Celebrations
      </button>
      <button
        onClick={() => onTabChange("birthday")}
        className={`px-4 py-2 text-sm font-medium tracking-tight rounded-[14px] transition-colors ${
          activeTab === "birthday"
            ? "bg-white text-[#0a0a0a] shadow-sm"
            : "text-[#0a0a0a] hover:text-[#101828]"
        }`}
      >
        Birthdays
      </button>
      <button
        onClick={() => onTabChange("anniversary")}
        className={`px-4 py-2 text-sm font-medium tracking-tight rounded-[14px] transition-colors ${
          activeTab === "anniversary"
            ? "bg-white text-[#0a0a0a] shadow-sm"
            : "text-[#0a0a0a] hover:text-[#101828]"
        }`}
      >
        Anniversaries
      </button>
    </div>
  );
}