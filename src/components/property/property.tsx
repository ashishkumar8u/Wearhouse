"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { propertyImage, warehouseLayout, bg2 } from "@/assets";
import Image from "next/image";
import { useWarehouseConfig } from "@/hooks/use-warehouse-config";
import { trackButtonClick } from "@/utils/button-tracking";

type SpecificationTab = {
  id: string;
  label: string;
  items: string[];
};

export default function PropertySpecification() {
  const warehouseConfig = useWarehouseConfig();
  const [activeTab, setActiveTab] = useState(
    warehouseConfig.specifications.tabs[0]?.id || "building"
  );

  // Convert config tabs to the format needed
  const specifications = warehouseConfig.specifications.tabs.reduce(
    (acc: Record<string, { title: string; items: string[] }>, tab: SpecificationTab) => {
      acc[tab.id] = {
        title: tab.label,
        items: tab.items,
      };
      return acc;
    },
    {} as Record<string, { title: string; items: string[] }>
  );

  const tabs = warehouseConfig.specifications.tabs;

  const activeSpec =
    specifications[activeTab] || specifications[tabs[0]?.id || "building"];
  const bgImageUrl = typeof bg2 === "string" ? bg2 : bg2.src || bg2;

  return (
    <div
      className="min-h-[700px] bg-white relative overflow-hidden"
      id="specifications"
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center max-w-[1520px] md:max-h-[800px] lg:max-h-[700px] mx-auto bg-cover opacity-30 z-0"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      />
      <div className="container w-[94%] xl:max-w-7xl mx-auto  relative z-10">
        {/* Header Section */}
        <div className="py-12 ">
          <h1 className="text-xl lg:text-2xl xl:text-3xl  text-center md:mb-6 mb-3 text-[#173C65] fw-bold font-libre ">
            {warehouseConfig.specifications.title}
          </h1>
          <p className="text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm lg:text-base">
            {warehouseConfig.specifications.subtitle}
          </p>
        </div>
        {/* Tabs */}
        <div className="w-full overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-4 md:mb-12 mb-8 flex-nowrap md:flex-wrap justify-start md:justify-center px-2">
            {tabs.map((tab: SpecificationTab) => (
              <button
                key={tab.id}
                onClick={() => {
                  trackButtonClick(`property-tab-${tab.id}`);
                  setActiveTab(tab.id);
                }}
                className={`px-6 md:py-3 py-1 rounded-lg font-serif md:text-lg text-base transition-all whitespace-nowrap duration-200 ${
                  activeTab === tab.id
                    ? "text-white shadow-lg bg-[#173C65]"
                    : "bg-blue-50 text-slate-800 hover:bg-blue-100"
                }`}
                suppressHydrationWarning
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Specifications List */}
            <div className="flex flex-col">
              <h2 className="md:text-3xl text-xl font-bold md:mb-8 mb-4 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal">
                {activeSpec.title}
              </h2>
              <ul className="space-y-4 flex-grow">
                {activeSpec.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 md:mt-1">
                      <CheckCircle2 className="md:w-6 md:h-6 w-4 h-4 flex-shrink-0 text-[#173C65]" />
                    </div>
                    <span className="text-slate-700 md:text-lg text-sm font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Column - Image */}
            <div className="flex justify-center h-full">
              <div className="w-full md:h-full h-[300px] relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={warehouseLayout || propertyImage}
                  alt="Warehouse Layout"
                  fill
                  className="object-cover transition-opacity duration-500 rounded-[6px_6px_6px_50px]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
