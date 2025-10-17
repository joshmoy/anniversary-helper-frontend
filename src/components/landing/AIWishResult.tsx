"use client";

import { useState } from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import CheckSuccessIcon from "@/components/icons/CheckSuccessIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import RefreshIcon from "@/components/icons/RefreshIcon";
import ChevronRightSmallIcon from "@/components/icons/ChevronRightSmallIcon";

interface AIWishResultProps {
  personName: string;
  generatedWish: string;
  requestId: string;
  remainingRequests: number;
  windowResetTime?: string;
  onStartOver: () => void;
  onRegenerate: (additionalContext?: string) => void;
  isRegenerating?: boolean;
  isAuthenticated?: boolean;
}

export const AIWishResult: FC<AIWishResultProps> = ({
  personName,
  generatedWish,
  requestId,
  remainingRequests,
  windowResetTime,
  onStartOver,
  onRegenerate,
  isRegenerating = false,
  isAuthenticated = false,
}) => {
  const [adjustmentText, setAdjustmentText] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedWish);
      toast.success("Wish copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleRegenerate = () => {
    onRegenerate();
  };

  const handleApplyAdjustment = () => {
    onRegenerate(adjustmentText);
    setAdjustmentText("");
  };

  const formatRemainingRequests = () => {
    if (isAuthenticated || remainingRequests >= 999) {
      return "Unlimited";
    }
    return `${remainingRequests} remaining`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Success Icon */}
      <div className="flex items-start gap-2">
        <div className="mt-1 flex-shrink-0">
          <CheckSuccessIcon width={15} height={11} color="#00a63e" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-large text-text-primary">Your Personalized Wish</h3>
          <p className="text-small text-text-secondary">
            Generated for {personName} • {formatRemainingRequests()}
          </p>
        </div>
      </div>

      {/* Wish Message */}
      <div className="bg-bg-light rounded-lg p-6">
        <p className="text-body text-text-tertiary leading-relaxed whitespace-pre-line">
          {generatedWish}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={handleCopy}
          className="bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg h-9 px-4 gap-2"
        >
          <CopyIcon width={16} height={16} color="#ffffff" />
          <span className="text-small font-medium">Copy Wish</span>
        </Button>

        <Button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          variant="outline"
          className="border border-table-border rounded-lg h-9 px-4 gap-2 hover:bg-bg-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshIcon width={16} height={16} color="#0a0a0a" />
          <span className="text-small font-medium text-table-header-text">
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </span>
        </Button>

        <button
          onClick={onStartOver}
          className="text-small font-medium text-table-header-text hover:text-text-primary transition-colors"
        >
          Start Over
        </button>
      </div>

      {/* Adjustment Section */}
      <div className="border-t border-border pt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-small font-medium text-table-header-text">Want to make changes?</h4>
          <p className="text-small text-text-secondary">Tell us what you'd like to adjust</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Textarea
            placeholder="e.g., Make it shorter, add a quote, mention their leadership skills..."
            value={adjustmentText}
            onChange={(e) => setAdjustmentText(e.target.value)}
            className="flex-1 bg-input-background border-0 text-small text-label-text placeholder:text-label-text min-h-[44px] resize-none"
          />
          <Button
            onClick={handleApplyAdjustment}
            disabled={!adjustmentText.trim() || isRegenerating}
            className="bg-brand-purple/50 hover:bg-brand-purple/60 text-white rounded-lg h-9 px-4 gap-2 sm:self-start disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-small font-medium">
              {isRegenerating ? "Applying..." : "Apply"}
            </span>
            <ChevronRightSmallIcon width={5} height={9} color="#ffffff" />
          </Button>
        </div>
      </div>
    </div>
  );
};
