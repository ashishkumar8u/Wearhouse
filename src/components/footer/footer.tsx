'use client';

import Image from 'next/image';
import { useWarehouseConfig } from '@/hooks/use-warehouse-config';
import { useUITranslations } from '@/hooks/use-warehouse-config';
import { useLanguage } from '@/contexts/language-context';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { logo } from '@/assets';
import { trackButtonClick } from '@/utils/button-tracking';

export default function Footer() {
  const warehouseConfig = useWarehouseConfig();
  const t = useUITranslations();
  const { t: tNav } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { key: 'home', label: tNav('nav.home') },
    { key: 'locations', label: tNav('nav.locations') },
    { key: 'features', label: tNav('nav.features') },
    { key: 'specifications', label: tNav('nav.specifications') },
    { key: 'gallery', label: tNav('nav.gallery') },
    { key: 'contact', label: tNav('nav.contact') },
  ];

  return (
    <footer className="bg-[var(--gray-dark)] max-w-[1520px] mx-auto text-white">
      <div className="container lg:max-w-7xl w-[94%] mx-auto  py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src={logo}
                alt="NEWMARK Logo"
                width={150}
                height={38}
                className="h-6 w-auto brightness-0 invert"
                loading="lazy"
                quality={85}
                sizes="150px"
              />
            </div>
            <p
              className="text-gray-300 text-sm leading-relaxed mb-4"
            >
              Instalaciones industriales Clase A en ubicaciones estratégicas en México. Tu socio para la excelencia logística.
            </p>
            <a
              href={`https://${warehouseConfig.brand.website}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('footer-website-link')}
              className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>{warehouseConfig.brand.website}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
            >
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={`#${link.key}`}
                    onClick={() => trackButtonClick(`footer-nav-${link.key}`)}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              {warehouseConfig.contact?.phoneNumber && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <a
                    href={`tel:${warehouseConfig.contact.phoneNumber.replace(/\s|-|\(|\)/g, '')}`}
                    onClick={() => trackButtonClick('footer-phone-link')}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    {warehouseConfig.contact.phoneNumber}
                  </a>
                </li>
              )}
              {warehouseConfig.contact?.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <a
                    href={`mailto:${warehouseConfig.contact.email}`}
                    onClick={() => trackButtonClick('footer-email-link')}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    {warehouseConfig.contact.email}
                  </a>
                </li>
              )}
              {warehouseConfig.locations.addresses[0] && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <span
                    className="text-sm text-gray-300"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    {warehouseConfig.locations.addresses[0].address.split(',')[0]}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
            >
              {t('footer.ourLocations')}
            </h4>
            <ul className="space-y-2">
              {warehouseConfig.locations.addresses.map((location: { name: string; mapLink: string }, index: number) => (
                <li key={index}>
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(`footer-location-${index}-${location.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    <span>{location.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
            <h4
              className="text-sm text-center md:text-start font-semibold mb-3"
            >
              {t('footer.disclaimer')}
            </h4>
          <p
            className="text-xs text-gray-400 leading-relaxed"
            style={{
              fontFamily: 'Assistant, sans-serif',
            }}
          >
            {warehouseConfig.disclaimer}
          </p>
        </div>

        {/* Legal Links & Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {warehouseConfig.legal?.privacyPolicyUrl && (
                <a
                  href={warehouseConfig.legal.privacyPolicyUrl}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                  style={{
                    fontFamily: 'Assistant, sans-serif',
                  }}
                >
                  Privacy Policy
                </a>
              )}
              {warehouseConfig.legal?.termsConditionsUrl && (
                <>
                  <span className="text-gray-600">|</span>
                  <a
                    href={warehouseConfig.legal.termsConditionsUrl}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{
                      fontFamily: 'Assistant, sans-serif',
                    }}
                  >
                    Terms & Conditions
                  </a>
                </>
              )}
            </div> */}
            <p
              className="text-sm text-gray-400 text-center md:text-right "
            >
              © {currentYear} {warehouseConfig.brand.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

