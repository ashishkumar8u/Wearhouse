'use client';

import type { ReactElement } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {Building1, Building6, Buildingtwo, Building3, Building4,Building5 } from '@/assets';  
import { Warehouse, Ruler, Building2, Layers } from 'lucide-react';
import { useWarehouseConfig } from '@/hooks/use-warehouse-config';
import { bg2 } from '@/assets';




type WarehouseFeature = {
  label: string;
  value: string;
  icon: string;
  description?: string;
};

export default function Apartments() {
  const warehouseConfig = useWarehouseConfig();
  // Convert warehouse features to display cards
  const features = warehouseConfig.warehouseFeatures.features;
  const featureImages = [Building1, Building6, Buildingtwo, Building3, Building4,Building5];

  // Icon map for feature icons
  const iconMap: Record<string, ReactElement> = {
    area: <Ruler className="w-6 h-6 text-[#173C65]" />,
    rentable: <Building2 className="w-6 h-6 text-[#173C65]" />,
    warehouse: <Warehouse className="w-6 h-6 text-[#173C65]" />,
    mezzanine: <Layers className="w-6 h-6 text-[#173C65]" />,
    height: <Ruler className="w-6 h-6 text-[#173C65]" />,
    spacing: <Ruler className="w-6 h-6 text-[#173C65]" />,
  };

  const featureCards = features.map((feature: WarehouseFeature, index: number) => ({
    image: featureImages[index % featureImages.length],
    iconEl: iconMap[feature.icon] || <Warehouse className="w-6 h-6 text-[#173C65]" />,
    label: feature.label,
    value: feature.value,
    description: feature.description,
  }));

  const bgImageUrl = typeof bg2 === 'string' ? bg2 : bg2.src || bg2;
  
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden" id="features">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30 z-0 max-w-[1520px] mx-auto"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      />
      <div className="container lg:max-w-7xl w-[94%] mx-auto  relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-12 lg:mb-16">
          <h2
            className="text-xl   lg:text-2xl xl:text-3xl fw-bold font-libre mb-3   md:mb-6 text-[#173C65] "
            suppressHydrationWarning
          >
            {warehouseConfig.warehouseFeatures.title}
          </h2>
          <p
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-(--gray) font-(--font-family-sans-serif)"
            suppressHydrationWarning
          >
            {warehouseConfig.warehouseFeatures.subtitle}
          </p>
        </div>

        {/* Warehouse Features Cards */}
        <Swiper
          className="mySwipers"
          spaceBetween={16}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={
            features.length > 1
              ? { delay: 5000, disableOnInteraction: false }
              : false
          }
          loop={features.length > 1}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featureCards.map((card: { image: string | StaticImageData; iconEl: ReactElement; label: string; value: string; description?: string }, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="shrink-0 w-full border-2 ">
                  <div
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl border border-gray-100 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full h-54 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
                      {card.image && (
                        <Image
                          src={card.image}
                          alt={card.label}
                          fill
                          className="object-cover rounded-t-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          quality={75}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-[160px] grow">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3 mb-3">
                        {card.iconEl}
                        <h3
                          className="text-xl  font-bold text-[#173C65] font-['Libre_Baskerville',Georgia,serif] text-[1.25rem]"
                        >
                          {card.label}
                        </h3>
                      </div>

                      {/* Value */}
                      <div className="mb-2 mx-9">
                        <span
                          className="md:text-2xl text-lg  font-bold text-[#173C65]"
                        >
                          {card.value}
                        </span>
                      </div>

                      {/* Description */}
                      {card.description && (
                        <p
                          className="text-sm md:text-base text-(--gray) mx-9  font-(--font-family-sans-serif)"
                        >
                          {card.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
