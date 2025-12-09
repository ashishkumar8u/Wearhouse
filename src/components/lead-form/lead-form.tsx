'use client';

import { useState } from 'react';
import { warehouseConfig } from '@/config/warehouse-content';

export default function LeadForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    warehouseConfig.leadForm.fields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email address';
      }
      if (field.type === 'tel' && formData[field.name] && !/^[\d\s\-\+\(\)]+$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid phone number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint
      // Example: await fetch('/api/leads', { method: 'POST', body: JSON.stringify(formData) });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({});
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: typeof warehouseConfig.leadForm.fields[0]) => {
    const hasError = !!errors[field.name];
    const value = formData[field.name] || '';

    if (field.type === 'textarea') {
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
                ? 'border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
          {hasError && (
            <p className="mt-1 text-sm text-[#173C65] font-['Assistant',sans-serif]">
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    }

    if (field.type === 'select') {
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
                ? 'border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
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
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 font-['Assistant',sans-serif] text-[0.95rem] text-black bg-white ${
            hasError
              ? 'border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }`}
          placeholder={`Enter ${field.label.toLowerCase()}`}
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
        <div className="text-center mb-12">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal"
          >
            {warehouseConfig.leadForm.title}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-['Assistant',sans-serif]"
          >
            {warehouseConfig.leadForm.subtitle}
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div
            className="mb-6 p-4 rounded-lg border-2 border-green-500 bg-green-50 font-['Assistant',sans-serif]"
          >
            <p className="text-green-700 font-medium text-center">
              ✅ Thank you! We've received your inquiry and will get back to you shortly.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {warehouseConfig.leadForm.fields.map((field) => {
              // Full-width fields (textarea and some others)
              if (field.type === 'textarea' || field.name === 'additionalNotes') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    {renderField(field)}
                  </div>
                );
              }
              // Two-column layout for other fields
              return renderField(field);
            })}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 w-full sm:w-auto min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 border-2 bg-white text-black border-[#173C65] font-['Assistant',sans-serif]"
            >
              {isSubmitting ? 'Submitting...' : warehouseConfig.ctas.primary.text}
            </button>

            <a
              href={warehouseConfig.ctas.secondary.link}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 w-full sm:w-auto min-w-[150px] text-center border-2 hover:opacity-90 border-[#173C65] text-black bg-white font-['Assistant',sans-serif]"
            >
              {warehouseConfig.ctas.secondary.text}
            </a>
          </div>

          {/* Additional CTAs */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
              {warehouseConfig.ctas.whatsapp.link !== '#' && (
                <a
                  href={warehouseConfig.ctas.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg font-medium text-xs transition-all duration-200 flex items-center gap-2 hover:opacity-90 bg-white text-black font-['Assistant',sans-serif]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {warehouseConfig.ctas.whatsapp.text}
                </a>
              )}

              {warehouseConfig.ctas.download.link !== '#' && (
                <a
                  href={warehouseConfig.ctas.download.link}
                  download
                  className="px-4 py-2 rounded-lg font-medium text-xs transition-all duration-200 flex items-center gap-2 hover:opacity-90 bg-white text-[var(--gray-dark)] font-['Assistant',sans-serif]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {warehouseConfig.ctas.download.text}
                </a>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <p
            className="mt-4 text-xs text-gray-500 text-center leading-relaxed font-['Assistant',sans-serif]"
          >
            {warehouseConfig.disclaimer}
          </p>
        </form>
      </div>
    </section>
  );
}

