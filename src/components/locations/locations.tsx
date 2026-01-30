"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { locationImage, bg2 } from "@/assets"
import { useWarehouseConfig } from "@/hooks/use-warehouse-config"
import { useUITranslations } from "@/hooks/use-warehouse-config"

export default function Locations() {
  const warehouseConfig = useWarehouseConfig();
  const t = useUITranslations();
  const highlights = warehouseConfig.locations.highlights

  const bgImageUrl = typeof bg2 === 'string' ? bg2 : bg2.src || bg2;
  
  return (
    <main className="md:min-h-[700px] min-h-[620px] max-w-[1520px] mx-auto bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden" id="locations">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30 z-0 max-w-[1520px] mx-auto"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      />
      <div className="xl:max-w-7xl w-[94%] mx-auto  relative z-10">
        {/* Header Section */}
        <div className="md:pt-16 pt-14 md:pb-12 pb-8 text-center">
          <h1 className="text-xl   lg:text-2xl xl:text-3xl mb-3  md:mb-6 text-[#173C65] fw-bold font-libre">{warehouseConfig.locations.title}</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
            {warehouseConfig.locations.subtitle}
          </p>
          {warehouseConfig.locations.description && (
            <p className="max-w-3xl mx-auto text-sm md:text-base text-slate-500 leading-relaxed mt-4">
              {warehouseConfig.locations.description}
            </p>
          )}
        </div>

        {/* Main Content Section */}
        <div className="pb-12 md:pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Left Column - Highlights */}
          <div className="flex flex-col">
            <h2 className="md:text-xl text-lg font-bold mb-4 md:mb-8 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal">{t('locations.strategicAccessPoints')}</h2>
            <ul className="space-y-4 flex-grow">
              {highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-center gap-4 text-slate-700">
                  <CheckCircle2 className="md:w-6 md:h-6 w-4 h-4 flex-shrink-0 text-[#173C65]" />
                  <span className="md:text-base text-sm font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center h-full w-full">
            <div className="w-full h-[300px] md:h-full relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={locationImage}
                alt="Aerial city view with modern buildings"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}
