'use client';

import { useState } from 'react';
import { useWarehouseConfig } from '@/hooks/use-warehouse-config';
import { useUITranslations } from '@/hooks/use-warehouse-config';
import { bg2 } from '@/assets';
import { trackButtonClick } from '@/utils/button-tracking';

export default function ContactMethods() {
  const warehouseConfig = useWarehouseConfig();
  const t = useUITranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  // Format phone number for tel: link (remove spaces, dashes, etc.)
  const formatPhoneForCall = (phone: string) => {
    return phone.replace(/\s|-|\(|\)/g, '');
  };

  // Handle call button click
  const handleCall = () => {
    const phoneNumber = warehouseConfig.contact?.phoneNumber || '';
    if (phoneNumber) {
      window.location.href = `tel:${formatPhoneForCall(phoneNumber)}`;
    }
  };

  return (
    <>
      {/* Desktop: Fixed Contact Buttons (Right Side) */}
      <div className="hidden lg:flex  fixed xl:right-6 lg:right-8 bottom-6 z-50 flex-col gap-4">
        {/* WhatsApp Button */}
        {warehouseConfig.ctas.whatsapp.link && warehouseConfig.ctas.whatsapp.link !== '#' && (
          <a
            href={warehouseConfig.ctas.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick('contact-whatsapp-desktop')}
            className="group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 bg-white text-black border-[#173C65]"
            aria-label="Contact via WhatsApp"
            title={warehouseConfig.ctas.whatsapp.text}
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        )}

        {/* Call Button */}
        {warehouseConfig.contact?.phoneNumber && (
          <button
            onClick={() => {
              trackButtonClick('contact-call-desktop');
              handleCall();
            }}
            className="group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 bg-white text-black border-[#173C65]"
            aria-label="Call us"
            title={`Call ${warehouseConfig.contact.phoneNumber}`}
            suppressHydrationWarning
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
        )}

        {/* Download Brochure Button */}
       
      </div>

      {/* Mobile: Expandable Contact Bar (Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        {/* Toggle Button */}
        <button 
          onClick={() => {
            trackButtonClick('contact-mobile-toggle');
            setIsExpanded(!isExpanded);
          }}
          className="w-fit mx-auto py-3 px-4 flex  items-center justify-between  font-['Assistant',sans-serif]"
          suppressHydrationWarning
        >
          <span className="font-bold text-gray-700 ">{t('contact.contactUs')}</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Expanded Contact Options */}
        {isExpanded && (
          <div className="px-4 pb-4 grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            {warehouseConfig.ctas.whatsapp.link && warehouseConfig.ctas.whatsapp.link !== '#' && (
              <a
                href={warehouseConfig.ctas.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('contact-whatsapp-mobile')}
                className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 hover:opacity-90 border-2 bg-white text-black border-[#173C65]"
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-xs font-medium">WhatsApp</span>
              </a>
            )}

            {/* Call */}
            {warehouseConfig.contact?.phoneNumber && (
              <button
                onClick={() => {
                  trackButtonClick('contact-call-mobile');
                  handleCall();
                }}
                className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 hover:opacity-90 border-2 bg-white text-black border-[#173C65]"
                suppressHydrationWarning
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-xs font-medium">Call</span>
              </button>
            )}

          
          </div>
        )}
      </div>

      {/* Desktop: Contact Section (Alternative - Can be placed in page) */}
      <section id="contact-methods" className="py-10 lg:py-14 bg-white relative overflow-hidden">
        {/* Background Image with Opacity */}
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
        <div className="container xl:max-w-7xl w-[94%] mx-auto  relative z-10">
          <div className="text-center mb-8">
            <h2
              className="text-xl   lg:text-2xl xl:text-3xl mb-3  md:mb-6 text-[#173C65] fw-bold font-libre  "
            >
              {t('contact.title')}
            </h2>
            <p
              className="md:text-xl text-base text-gray-600 max-w-xl mx-auto leading-relaxed font-['Assistant',sans-serif]"
            >
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {/* WhatsApp Card */}
            {warehouseConfig.ctas.whatsapp.link && warehouseConfig.ctas.whatsapp.link !== '#' && (
              <a
                href={warehouseConfig.ctas.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('contact-whatsapp-section')}
                className="group flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-gray-200 hover:border-[#25D366] transition-all duration-300 hover:shadow-xl bg-white"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 bg-[#25D366]"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-bold mb-1 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal"
                >
                  {t('contact.whatsapp')}
                </h3>
                <p
                  className="text-xs md:text-sm text-gray-600 text-center font-['Assistant',sans-serif]"
                >
                  {t('contact.chatWithUs')}
                </p>
              </a>
            )}

            {/* Call Card */}
            {warehouseConfig.contact?.phoneNumber && (
              <button
                onClick={() => {
                  trackButtonClick('contact-call-section');
                  handleCall();
                }}
                className="group flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl bg-white"
                suppressHydrationWarning
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 bg-[#2563EB]"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-bold mb-1 text-[#173C65] font-['Libre_Baskerville',Georgia,serif] font-normal"
                >
                  {t('contact.callUs')}
                </h3>
                <p
                  className="text-xs md:text-sm text-gray-600 text-center font-['Assistant',sans-serif]"
                >
                  {warehouseConfig.contact.phoneNumber}
                </p>
              </button>
            )}

           
          </div>
        </div>
      </section>
    </>
  );
}

