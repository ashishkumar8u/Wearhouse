'use client';

import React from 'react';
import { useWarehouseConfig } from '@/hooks/use-warehouse-config';
import { Package, Truck, Store, Factory, Pill, Car } from 'lucide-react';

type Industry = {
  id: 'ecommerce' | 'logistics' | 'retail' | 'manufacturing' | 'pharma' | 'automotive';
  name: string;        // translated label
  description: string; // translated description
};


export default function IdealFor() {
  const warehouseConfig = useWarehouseConfig();
  const industries = warehouseConfig.targetIndustries.industries;

  const iconMap: Record<Industry['id'], React.ReactElement> = {
    'ecommerce': <Package className="w-8 h-8" />,
    'logistics': <Truck className="w-8 h-8" />,
    'retail': <Store className="w-8 h-8" />,
    'manufacturing': <Factory className="w-8 h-8" />,
    'pharma': <Pill className="w-8 h-8" />,
    'automotive': <Car className="w-8 h-8" />,
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white max-w-[1520px] mx-auto" id="ideal-for">
      <div className="container xl:max-w-7xl w-[94%] mx-auto ">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2
            className="text-xl   lg:text-2xl xl:text-3xl mb-3  md:mb-6 text-[#173C65] fw-bold font-libre"
           
          >
            {warehouseConfig.targetIndustries.title}
          </h2>
          <p
            className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Assistant',sans-serif]"
           
          >
            {warehouseConfig.targetIndustries.subtitle}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            {/* Left Column */}
            <div className="divide-y divide-gray-300">
              {industries.filter((_: Industry, index: number) => index % 2 === 0).map((industry: Industry, colIndex: number) => {
                const originalIndex = colIndex * 2;
                return (
                  <div key={originalIndex} className="flex items-start gap-6 p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-transform bg-[#EFF6FF] text-[#173C65] duration-300 hover:scale-110"
    
                    >
                      {iconMap[industry.id] || <Package className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-2 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal"
                      >
                        {industry.name}
                      </h3>
                      <p
                        className="text-sm md:text-base text-gray-600 leading-relaxed font-['Assistant',sans-serif]"
                      >
                        {industry.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Right Column */}
            <div className="divide-y divide-gray-300">
              {industries.filter((_: Industry, index: number) => index % 2 === 1).map((industry: Industry, colIndex: number) => {
                const originalIndex = colIndex * 2 + 1;
                return (
                  <div key={originalIndex} className="flex items-start gap-6 p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div
                      className="w-16 h-16 bg-[#EFF6FF] text-[#173C65] rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                      
                    >
                      {iconMap[industry.id] || <Package className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-2 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal"
                      >
                        {industry.name}
                      </h3>
                      <p
                        className="text-sm md:text-base text-gray-600 leading-relaxed font-['Assistant',sans-serif]"
                      >
                        {industry.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

