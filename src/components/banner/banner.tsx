'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { banner1, banner2, bg1, warehouseShot1, warehouseShot2, warehouseShot3 } from '@/assets';
import { useWarehouseConfig } from '@/hooks/use-warehouse-config';
import { trackButtonClick } from '@/utils/button-tracking';

export default function Banner() {
  const warehouseConfig = useWarehouseConfig();
  // Use warehouse images - can be easily changed in config
  // Default to warehouse images, fallback to original banners if needed
  const warehouseImages = [warehouseShot1, warehouseShot2, warehouseShot3].filter(Boolean);
  const banners = warehouseImages.length > 0 ? warehouseImages : [banner1, banner2];

  return (
    <section 
      className=" relative overflow-hidden pt-[100px] pb-0 md:pb-20 bg-white" 
      id="home"
    >
      {/* Background Image with Opacity - Low priority, lazy loaded */}
      <div className="absolute inset-0 z-0 pointer-events-none">
  <Image
    src={bg1}
    alt=""
    fill
    sizes="100vw"
    className="object-cover object-bottom opacity-[0.15] max-w-[1520px] mx-auto"
    priority={false}
    loading="lazy"
    quality={75}
  />
</div>

      <div className="text-block relative  xl:max-w-7xl  w-[94%]  mx-auto z-10">
        <div className=" ">
          <div className="row flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-12 lg:mt-10">
            {/* Left Column - Text Content */}
            <div className="col-lg-6 v-center  w-full lg:w-[50%] flex flex-col   md:justify-start ">
              <div className="header-heading">
                <h1 
                  className="font-bold md:text-left text-xl   lg:text-2xl xl:text-3xl  text-center leading-[1.2] mb-[15px] md:mb-[18px] m-0 p-0 mt-0 text-[#173C65] font-['Libre_Baskerville',Georgia,serif]" 
                >
                  {warehouseConfig.banner.title}
                  {warehouseConfig.banner.subtitle && (
                    <>
                      <br className="leading-none" />
                      <span className=" font-medium text-lg xl:text-2xl leading-tight block md:mt-3 mt-2 ">
                        {warehouseConfig.banner.subtitle}
                      </span>
                    </>
                  )}
                </h1>
                <p 
                  className="text-[14px] md:text-[16px] text-center md:text-left leading-normal mb-[20px] md:mb-[24px] md:mt-12 mt-0 font-medium text-[#505050] font-['Assistant',sans-serif]" 
                >
                  {warehouseConfig.banner.description}
                </p>
                <div className=' md:flex hidden'>
                <a
                  href={warehouseConfig.banner.ctaLink}
                  onClick={() => trackButtonClick('banner-cta-desktop')}
                  className="cta learnmore hover:-translate-y-1 inline-block mx-auto md:mx-0  px-8 py-4 rounded-lg font-semibold text-white transition-opacity  w-fit border-2 bg-[#173C65]  font-['Assistant',sans-serif]"
                  suppressHydrationWarning
                >
                  {warehouseConfig.banner.ctaText}
                </a>
                </div>
              </div>
            </div>

            {/* Right Column - Image Slider */}
            <div className="col-lg-6 w-full lg:w-1/2 flex flex-col items-center ">
              <div className="single-image relative w-full ">
                <div className="relative w-full overflow-hidden h-auto min-h-[400px]">
                  <Swiper
                    className="mySwiper md:h-[480px] h-[400px]"
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    loop={banners.length > 1}
                    autoplay={
                      banners.length > 1
                        ? { delay: 3000, disableOnInteraction: false }
                        : false
                    }
                  >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index} className="md:h-[450px] h-[350px] ">
                          <Image
                            src={banner}
                            alt={warehouseConfig.banner.title}
                            width={800}
                            height={450}
                            className="w-full md:h-[450px] h-[350px] object-cover transition-opacity duration-500 rounded-[6px_6px_6px_50px]"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            quality={index === 0 ? 90 : 75}
                          />
               
                      </SwiperSlide>
                      
                    ))}
                
                  </Swiper>
                  <div className=' flex mb-8 md:hidden'>
                <a
                  href={warehouseConfig.banner.ctaLink}
                  onClick={() => trackButtonClick('banner-cta-mobile')}
                  className="cta learnmore hover:-translate-y-1 inline-block mx-auto md:mx-0  px-8 py-2 rounded-lg font-semibold text-base transition-opacity w-fit border-2 bg-[#173C65] text-white font-['Assistant',sans-serif]"
                  suppressHydrationWarning
                >
                  {warehouseConfig.banner.ctaText}
                </a>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave Shape */}
      <div className="absolute bottom-0 left-0 max-w-[1520px] mx-auto h-80 lg:h-96 pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 400 L 0 240 Q 200 200 400 220 T 800 210 T 1200 200 L 1200 400 Z"
            fill="#EFF6FF"
          />
        </svg>
      </div>
    </section>
  );
}
