"use client";

import { useWarehouseConfig } from "@/hooks/use-warehouse-config";
import { useUITranslations } from "@/hooks/use-warehouse-config";
import {
  CheckCircle2,
  MapPin,
  Truck,
  Building2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { warehouseLoc1, warehouseLoc2 } from "@/assets";
import { trackButtonClick } from "@/utils/button-tracking";

type LocationAddress = {
  name: string;
  address: string;
  mapLink: string;
  usps: string[];
  idealFor: string[];
};

export default function LocationComparison() {
  const warehouseConfig = useWarehouseConfig();
  const t = useUITranslations();
  const locations = warehouseConfig.locations.addresses;
  const locationImages = [warehouseLoc1, warehouseLoc2];

  return (
    <section className="py-16 lg:py-24 bg-white" id="locations">
      <div className="container lg:max-w-7xl w-[94%] mx-auto ">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl   lg:text-2xl xl:text-3xl mb-3 md:mb-6 text-[#173C65] fw-bold font-libre">
            {t('locationComparison.title')}
          </h2>
        
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Assistant',sans-serif]">
            {t('locationComparison.subtitle')}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="flex flex-col lg:w-[70%]  mx-auto">
          {locations.map((location: LocationAddress, index: number) => (
            <div
              key={index}
              className="bg-linear-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Location Header */}
              <div
                className={`p-6 border-b border-gray-200 shrink-0 min-h-[120px] flex flex-col justify-between ${
                  index === 0 ? "bg-[#EFF6FF]" : "bg-[#F0F9FF]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 shrink-0 text-[#173C65]" />
                    <h3 className="text-xl font-bold text-[#173C65] font-['Libre_Baskerville',Georgia,serif]">
                      {location.name}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-3 font-['Assistant',sans-serif]">
                    {location.address}
                  </p>
                </div>
                
              </div>

              {/* Content Grid: Row 1 = Image & Key Points, Row 2 = Map & Ideal For */}
              <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-gray-200">
                {/* Row 1 - Image */}
                <div className="lg:border-r border-gray-200">
                  {locationImages[index] && (
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={locationImages[index]}
                        alt={`${location.name} warehouse`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                  )}
                </div>

                {/* Row 1 - Key Advantages */}
                <div className="p-4 md:p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-[#173C65]" />
                    <h4 className="text-lg font-bold text-[#173C65] font-['Libre_Baskerville',Georgia,serif]">
                      {t('locationComparison.keyAdvantages')}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {location.usps.map((usp: string, uspIndex: number) => (
                      <li key={uspIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="md:w-6 md:h-6 h-4 w-6 shrink-0 text-[#173C65]" />
                        <span className="text-sm md:text-base text-gray-700 font-['Assistant',sans-serif]">
                          {usp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Row 2 - Map */}
                <div className="border-t lg:border-t-0 lg:border-r border-gray-200">
                  <div className="md:p-6 p-4 flex flex-col gap-4">
                    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d-99.2!3d19.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDMwJzAwLjAiTiA5OcKwMTInMDAuMCJX!5e0!3m2!1sen!2smx!4v1234567890`}
                        width="100%"
                        height="250"
                        className="border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${location.name} Location Map`}
                      />
                    </div>
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackButtonClick(`location-comparison-map-${index}-${location.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="inline-flex items-center gap-2 text-sm md:text-base font-medium hover:opacity-80 transition-opacity text-[#173C65] font-['Assistant',sans-serif]"
                    >
                      <span>{t('locationComparison.openInMaps')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Row 2 - Ideal For */}
                <div className="p-4 md:p-6 flex flex-col xl:w-[65%] lg:w-[88%] md:w-[40%]">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-[#173C65]" />
                    <h4 className="text-lg font-bold text-[#173C65] font-['Libre_Baskerville',Georgia,serif]">
                      {t('locationComparison.idealFor')}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {location.idealFor.map((useCase: string, useCaseIndex: number) => (
                      <span
                        key={useCaseIndex}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#173C65] font-['Assistant',sans-serif]"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
