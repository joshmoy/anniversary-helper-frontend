"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import HeartIcon from "@/components/icons/HeartIcon";

interface RegisterForm {
  fullName: string;
  email: string;
  accountType: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      const success = await registerUser(
        data.fullName,
        data.email,
        data.password,
        data.accountType
      );

      if (success) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Registration Card */}
        <div className="bg-white rounded-[14px] border border-border shadow-sm">
          {/* Card Header */}
          <div className="flex flex-col items-center gap-3 px-6 pt-6 pb-6">
            <div className="bg-[#7c3aed] p-3 rounded-xl border-[2.67px] border-white shadow-md">
              <HeartIcon width={29} height={25} color="#ffffff" />
            </div>
            <h2 className="text-base font-normal text-foreground tracking-[-0.31px] leading-4">
              Get Started
            </h2>
            <p className="text-base font-normal text-muted-foreground tracking-[-0.31px] text-center">
              Create your Anniversary Helper account
            </p>
          </div>

          {/* Card Content */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-foreground tracking-[-0.15px] leading-[14px]"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                  })}
                  placeholder="John Doe"
                  className="w-full h-9 px-3 py-2 text-sm font-normal text-muted-foreground tracking-[-0.15px] bg-input-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground tracking-[-0.15px] leading-[14px]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className="w-full h-9 px-3 py-2 text-sm font-normal text-muted-foreground tracking-[-0.15px] bg-input-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Account Type Field */}
              <div className="space-y-2">
                <label
                  htmlFor="accountType"
                  className="block text-sm font-medium text-foreground tracking-[-0.15px] leading-[14px]"
                >
                  Account Type
                </label>
                <div className="relative">
                  <select
                    id="accountType"
                    {...register("accountType", {
                      required: "Please select a account type",
                    })}
                    className="w-full h-9 px-3 py-2 text-sm font-normal text-foreground tracking-[-0.15px] bg-input-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-ring/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select account type</option>
                    <option value="organization">Organization/Company</option>
                    <option value="personal">Personal Use</option>
                    <option value="family">Family & Friends</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L4.5 4L8 1"
                        stroke="#717182"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {errors.accountType && (
                  <p className="text-xs text-destructive mt-1">{errors.accountType.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground tracking-[-0.15px] leading-[14px]"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain uppercase, lowercase, and number",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full h-9 px-3 py-2 text-sm font-normal text-muted-foreground tracking-[-0.15px] bg-input-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 px-4 py-2 text-sm font-medium text-white tracking-[-0.15px] bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-base font-normal text-muted-foreground tracking-[-0.31px]">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="w-full h-9 px-4 py-2 text-sm font-medium text-foreground tracking-[-0.15px] bg-white hover:bg-gray-50 rounded-lg border border-border transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
