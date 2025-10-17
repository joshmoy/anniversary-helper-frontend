"use client";

import { useState } from "react";
import type { FC } from "react";
import SparkleAIIcon from "@/components/icons/SparkleAIIcon";
import { AIWishForm } from "./AIWishForm";
import { AIWishResult } from "./AIWishResult";
import { apiClient } from "@/lib/api/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/toast";
import type { AnniversaryWishRequest, AnniversaryWishResponse, AIWishError } from "@/types";

export const AIWishGenerator: FC = () => {
  const { isAuthenticated } = useAuth();
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [wishData, setWishData] = useState<AnniversaryWishRequest>({
    name: "",
    relationship: "",
    anniversary_type: "birthday",
    tone: "professional",
    context: "",
  });
  const [wishResponse, setWishResponse] = useState<AnniversaryWishResponse | null>(null);

  const handleGenerateWish = async (data: AnniversaryWishRequest) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Generating your personalized wish...");

    try {
      const response = await apiClient.generateAnniversaryWish(data, isAuthenticated);
      setWishData(data);
      setWishResponse(response);
      setShowResult(true);
      toast.dismiss(loadingToast);
      toast.success("Wish generated successfully!");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      console.error("Error generating wish:", err);
      if (err.response?.status === 429) {
        const retryAfterHeader = err.response.headers["retry-after"];
        const retryAfterSeconds = retryAfterHeader ? parseInt(retryAfterHeader) : 3600;
        if (isAuthenticated) {
          toast.error("Unexpected rate limit for authenticated user. Please try again later.");
        } else {
          toast.error(
            `Rate limit exceeded. You can try again in ${formatRetryTime(
              retryAfterSeconds
            )}. Sign up for unlimited requests!`
          );
        }
      } else if (err.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to generate wish. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateWish = async (additionalContext?: string) => {
    if (!wishResponse) return;

    setIsRegenerating(true);
    const loadingToast = toast.loading("Regenerating your wish...");

    try {
      const response = await apiClient.regenerateAnniversaryWish(
        {
          request_id: wishResponse.request_id,
          additional_context: additionalContext,
        },
        isAuthenticated
      );
      setWishResponse(response);
      toast.dismiss(loadingToast);
      toast.success("Wish regenerated successfully!");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      console.error("Error regenerating wish:", err);
      if (err.response?.status === 429) {
        const retryAfterHeader = err.response.headers["retry-after"];
        const retryAfterSeconds = retryAfterHeader ? parseInt(retryAfterHeader) : 3600;
        if (isAuthenticated) {
          toast.error("Unexpected rate limit for authenticated user. Please try again later.");
        } else {
          toast.error(
            `Rate limit exceeded. You can try again in ${formatRetryTime(
              retryAfterSeconds
            )}. Sign up for unlimited requests!`
          );
        }
      } else if (err.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to regenerate wish. Please try again.");
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleStartOver = () => {
    setShowResult(false);
    setWishData({
      name: "",
      relationship: "",
      anniversary_type: "birthday",
      tone: "professional",
      context: "",
    });
    setWishResponse(null);
  };

  const formatRetryTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      const minutes = Math.ceil(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      const hours = Math.ceil(seconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
  };

  return (
    <section className="w-full py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-[764px] mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-brand-purple-light rounded-lg px-3 py-1.5">
            <SparkleAIIcon width={12} height={12} color="#7008e7" />
            <span className="text-badge text-brand-purple-dark">Powered by AI</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="heading-section text-text-primary mb-4">
            Create Perfect Wishes in Seconds
          </h2>
          <p className="text-large text-text-secondary max-w-[612px]">
            Let AI help you craft personalized, heartfelt anniversary wishes for any occasion. No
            more writer's block!
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-[1112px] mx-auto bg-white rounded-2xl border border-card-border p-8 md:p-12 shadow-sm">
          {!showResult ? (
            <AIWishForm
              onGenerate={handleGenerateWish}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
            />
          ) : wishResponse ? (
            <AIWishResult
              personName={wishData.name}
              generatedWish={wishResponse.generated_wish}
              requestId={wishResponse.request_id}
              remainingRequests={wishResponse.remaining_requests}
              windowResetTime={wishResponse.window_reset_time}
              onStartOver={handleStartOver}
              onRegenerate={handleRegenerateWish}
              isRegenerating={isRegenerating}
              isAuthenticated={isAuthenticated}
            />
          ) : null}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-small text-text-secondary">
            {isAuthenticated
              ? "Create unlimited personalized wishes with your account!"
              : "Try it now - no sign up required! Create unlimited wishes once you join."}
          </p>
        </div>
      </div>
    </section>
  );
};
