"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import { cn } from "./utils";

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: "text-sm",
        style: {
          background: "#ffffff",
          color: "#0a0a0a",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#00a63e",
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #00a63e",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #dc2626",
          },
        },
        loading: {
          iconTheme: {
            primary: "#7f22fe",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

// Import toast functions directly
import { toast as hotToast } from "react-hot-toast";

// Custom toast functions with consistent styling
export const toast = {
  success: (message: string) => {
    return hotToast.success(message, {
      duration: 3000,
    });
  },
  error: (message: string) => {
    return hotToast.error(message, {
      duration: 5000,
    });
  },
  loading: (message: string) => {
    return hotToast.loading(message);
  },
  dismiss: (toastId?: string) => {
    return hotToast.dismiss(toastId);
  },
};
