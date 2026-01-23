"use client";

import { useMemo, useState } from "react";
import { useWarehouseConfig } from "@/hooks/use-warehouse-config";
import { useUITranslations } from "@/hooks/use-warehouse-config";
import { trackButtonClick } from "@/utils/button-tracking";

export default function LeadForm() {
  const warehouseConfig = useWarehouseConfig();
  const t = useUITranslations();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const apiHost = useMemo(() => {
    const host = process.env.NEXT_PUBLIC_API_HOST || process.env.NEXT_PUBLIC_BASE_URL || "";
    return host.endsWith("/") ? host.slice(0, -1) : host;
  }, []);

  const clientId = useMemo(() => {
    return process.env.NEXT_PUBLIC_CLIENT_ID;
  }, []);

  const apiKey = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_API_KEY}`;
  }, []);

  const toNumberIfPossible = (value?: string) => {
    if (!value) return undefined;
    const cleaned = value.replace(/,/g, "").trim();
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : cleaned;
  };

  const getBrowser = (): string => {
    if (typeof window === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    return "Unknown";
  };

  const getDeviceType = (): string => {
    if (typeof window === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    const width = window.innerWidth;

    if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
    if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
        ua,
      )
    )
      return "Mobile";
    if (width < 768) return "Mobile";
    if (width < 1024) return "Tablet";
    return "Desktop";
  };

  const getClientIP = async (): Promise<string> => {
    // Try multiple IP services as fallbacks
    const ipServices = [
      "https://api.ipify.org?format=json",
      "https://api64.ipify.org?format=json",
      "https://ipapi.co/json/",
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          const ip = data.ip || data.query;

          // Validate IP address format (IPv4 or IPv6)
          // IPv4: xxx.xxx.xxx.xxx or IPv6: xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx (with various valid formats)
          const ipv4Regex =
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          const ipv6Regex =
            /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
          if (ip && (ipv4Regex.test(ip) || ipv6Regex.test(ip))) {
            return ip;
          }
        }
      } catch (error) {
        // Continue to next service
        continue;
      }
    }

    // If all services fail, return a placeholder IPv4 address
    // This ensures the API validation passes
    console.warn(
      "Failed to fetch client IP from all services, using placeholder",
    );
    return "0.0.0.0";
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    warehouseConfig.leadForm.fields.forEach(
      (field: (typeof warehouseConfig.leadForm.fields)[0]) => {
        if (field.required && !formData[field.name]?.trim()) {
          newErrors[field.name] = `${field.label} ${t("form.required")}`;
        }
        if (
          field.type === "email" &&
          formData[field.name] &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])
        ) {
          newErrors[field.name] = t("form.invalidEmail");
        }
        if (
          field.type === "tel" &&
          formData[field.name] &&
          !/^[\d\s\-\+\(\)]+$/.test(formData[field.name])
        ) {
          newErrors[field.name] = t("form.invalidPhone");
        }
      },
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);

    try {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      const browser = getBrowser();
      const device_type = getDeviceType();
      const ip_address = await getClientIP();

      if (!apiHost) {
        throw new Error("API host is not configured.");
      }

      const payload = {
        client_id: clientId,
        project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
        form_data: {
          full_name: formData.fullName?.trim() || "",
          company_name: formData.companyName?.trim() || "",
          email: formData.email?.trim() || "",
          phone: formData.phone?.trim() || "",
          warehouse_size_sqft: toNumberIfPossible(formData.warehouseSize),
          preferred_location: formData.preferredLocation?.trim() || "",
          monthly_budget: toNumberIfPossible(formData.budget),
          lease_duration: formData.leaseDuration?.trim() || "",
          timeline_to_move_in: formData.timeline?.trim() || "",
          additional_information: formData.additionalNotes?.trim() || "",
          timezone,
          ip_address,
          browser,
          device_type,
        },
      };

      const response = await fetch(`${apiHost}/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result?.status === false) {
        throw new Error(result?.message || "Failed to submit the form.");
      }

      // Reset form
      setFormData({});
      setIsSubmitted(true);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "There was an error submitting the form. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: (typeof warehouseConfig.leadForm.fields)[0]) => {
    const hasError = !!errors[field.name];
    const value = formData[field.name] || "";

    if (field.type === "textarea") {
      return (
        <div key={field.name} className="w-full">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium mb-1.5 text-[var(--gray-dark)] font-['Assistant',sans-serif]"
          >
            {field.label}
            {field.required && <span className="ml-1 text-[#173C65]">*</span>}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 font-['Assistant',sans-serif] text-[0.95rem] text-black bg-white ${
              hasError
                ? "border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            suppressHydrationWarning
          />
          {hasError && (
            <p className="mt-1 text-sm text-[#173C65] font-['Assistant',sans-serif]">
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.name} className="w-full">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium mb-1.5 text-[var(--gray-dark)] font-['Assistant',sans-serif]"
          >
            {field.label}
            {field.required && <span className="ml-1 text-[#173C65]">*</span>}
          </label>
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 bg-white font-['Assistant',sans-serif] text-[0.95rem] text-black ${
              hasError
                ? "border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
            suppressHydrationWarning
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {hasError && (
            <p className="mt-1 text-sm text-[#173C65] font-['Assistant',sans-serif]">
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className="w-full">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium mb-2 text-[var(--gray-dark)] font-['Assistant',sans-serif]"
        >
          {field.label}
          {field.required && <span className="text-blue-500 ml-1">*</span>}
        </label>
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className={`w-full px-4 md:py-3 py-1 rounded-lg border transition-all duration-200 font-['Assistant',sans-serif] text-[0.95rem] text-black bg-white ${
            hasError
              ? "border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          suppressHydrationWarning
        />
        {hasError && (
          <p className="mt-1 text-sm text-blue-500 font-['Assistant',sans-serif]">
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white scroll-mt-20"
    >
      <div className="container max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-3 md:mb-12">
          <h2 className="text-xl   lg:text-2xl xl:text-3xl  mb-4 text-[#173C65] fw-bold font-libre">
            {warehouseConfig.leadForm.title}
          </h2>
          <p className="md:text-xl text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-['Assistant',sans-serif]">
            {warehouseConfig.leadForm.subtitle}
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="fixed bottom-13 right-4 z-50 max-w-md rounded-lg border border-green-200 bg-white p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-green-100 p-1">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">
                  Thank you for your inquiry!
                </h4>
                <p className="mt-1 text-sm text-neutral-600">
                  Our team will contact you within 24 hours to discuss your
                  warehouse needs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 rounded-lg border-2 border-red-500 bg-red-50 font-['Assistant',sans-serif]">
            <p className="text-red-700 font-medium text-center">
              {submitError}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-7"
          suppressHydrationWarning
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {warehouseConfig.leadForm.fields.map(
              (field: (typeof warehouseConfig.leadForm.fields)[0]) => {
                // Full-width fields (textarea and some others)
                if (
                  field.type === "textarea" ||
                  field.name === "additionalNotes"
                ) {
                  return (
                    <div key={field.name} className="md:col-span-2">
                      {renderField(field)}
                    </div>
                  );
                }
                // Two-column layout for other fields
                return renderField(field);
              },
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => trackButtonClick("lead-form-submit")}
              className="px-5 py-2.5 cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 w-full sm:w-auto min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed  border-2 bg-[#173C65] text-white  font-['Assistant',sans-serif] hover:-translate-y-1"
              suppressHydrationWarning
            >
              {isSubmitting
                ? t("form.submitting")
                : warehouseConfig.ctas.primary.text}
            </button>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-xs text-gray-500 text-center leading-relaxed font-['Assistant',sans-serif]">
            {warehouseConfig.disclaimer}
          </p>
        </form>
      </div>
    </section>
  );
}
