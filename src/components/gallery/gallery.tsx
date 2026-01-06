'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useUITranslations } from '@/hooks/use-warehouse-config';
import { trackButtonClick } from '@/utils/button-tracking';
import {
  warehouseIndustrial,
  warehouseShot1,
  warehouseShot2,
  warehouseShot3,
  warehouseShot4,
  bg2,
  warehouseLayout,
} from '@/assets';

type GalleryItem = {
  src: StaticImageData | string;
  alt: string;
};

export default function Gallery() {
  const t = useUITranslations();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mix images and videos together
  const galleryItems: GalleryItem[] = [
    { src: warehouseIndustrial, alt: 'Industrial warehouse exterior' },
    { src: warehouseShot1, alt: 'Warehouse interior shot 1' },
    { src: warehouseShot2, alt: 'Warehouse interior shot 2' },
    { src: warehouseShot3, alt: 'Warehouse interior shot 3' },
    { src: warehouseShot4, alt: 'Warehouse interior shot 4' },
    { src: warehouseLayout, alt: 'Warehouse floor plan layout' },
  ];

  const openModal = (index: number) => {
    trackButtonClick(`gallery-image-${index}`);
    setSelectedImage(index);
  };

  const closeModal = () => {
    trackButtonClick('gallery-close-modal');
    setSelectedImage(null);
  };

  // Sync body overflow with modal state - client-side only
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // No video autoplay logic needed since we only use images

  return (
    <>
      <section className="py-4 lg:py-6 bg-white relative overflow-hidden" id="gallery">
        {/* Background Image with Opacity - Low priority, lazy loaded */}
        {(() => {
          const bgImageUrl = typeof bg2 === 'string' ? bg2 : bg2.src || bg2;
          return (
            <div
              className="absolute max-w-[1520px] mx-auto inset-0 bg-no-repeat bg-center bg-cover opacity-30 z-0"
              style={{
                backgroundImage: `url(${bgImageUrl})`,
              }}
            />
          );
        })()}
        <div className="w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-4 lg:mb-5 px-4 md:px-6 lg:px-8">
            <h2
              className="text-xl   lg:text-2xl xl:text-3xl  md:mb-6 mb-0 py-6 text-[#173C65] fw-bold font-libre"
            >
              {t('gallery.title')}
            </h2>
            <p
              className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Assistant',sans-serif]"
            >
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Gallery Masonry Grid */}
          {galleryItems.length > 0 ? (
            <div className="xl:w-[88%] w-[95%] max-w-[1300px] mx-auto px-2  lg:px-2">
              <div 
                className="grid gap-1 lg:gap-1.5 grid-cols-2 md:grid-cols-3 xl:grid-cols-6 auto-rows-[minmax(150px,auto)] md:auto-rows-[minmax(250px,auto)]"
              >
                {galleryItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100"
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={75}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>No images available</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-1000 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
         <button
            onClick={closeModal}
            // UPDATED: Added background and padding to make close button visible
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-2"
            aria-label="Close modal"
          >

            <svg
                className="w-8 h-8 md:w-10 md:h-10 transform group-hover:rotate-90 transition-transform duration-300"

              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={galleryItems[selectedImage].src}
              alt={galleryItems[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              quality={90}
              priority
            />
          </div>
          {/* Navigation */}
          {galleryItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  trackButtonClick('gallery-nav-prev');
                  setSelectedImage((prev) => (prev === 0 ? galleryItems.length - 1 : (prev || 0) - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  trackButtonClick('gallery-nav-next');
                  setSelectedImage((prev) => ((prev || 0) + 1) % galleryItems.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

