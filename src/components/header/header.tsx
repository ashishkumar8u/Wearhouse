'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { warehouseConfig } from '@/config/warehouse-content';
import { logo } from '@/assets';
import { useLanguage } from '@/contexts/language-context';
import { trackButtonClick } from '@/utils/button-tracking';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Use requestAnimationFrame to batch DOM reads/writes and prevent forced reflows
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with offset for anchor links - optimized to prevent forced reflows
  useEffect(() => {
    // Cache header height to avoid repeated DOM reads
    let cachedHeaderHeight = 140;
    let resizeTimeout: NodeJS.Timeout | undefined;
    
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        cachedHeaderHeight = header.offsetHeight + 20;
      }
    };
    
    // Update header height once on mount
    updateHeaderHeight();
    
    // Update on resize (debounced)
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(updateHeaderHeight, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    const scrollToSection = (targetId: string, smooth: boolean = true) => {
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Batch DOM reads using requestAnimationFrame
        requestAnimationFrame(() => {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - cachedHeaderHeight;
          
          // Batch DOM writes
          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: smooth ? 'smooth' : 'auto'
            });
          });
        });
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetId = href.substring(1);
          e.preventDefault();
          scrollToSection(targetId);
          
          // Close mobile menu if open
          setIsMobileMenuOpen(false);
        }
      }
    };

    // Handle initial hash in URL (e.g., page refresh with #gallery)
    const handleInitialHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          scrollToSection(targetId, false); // Instant scroll on page load
        }, 100);
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleAnchorClick);
    
    // Handle initial hash
    handleInitialHash();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Intersection Observer for active section detection - optimized to prevent forced reflows
  useEffect(() => {
    const sections = ['home', 'features', 'locations', 'specifications', 'gallery', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Batch state updates
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Use requestIdleCallback for non-critical DOM reads
    const observeSections = () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(observeSections);
    } else {
      setTimeout(observeSections, 0);
    }

    // Set initial active section - optimized to batch DOM reads
    let ticking = false;
    const handleInitialScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 100;
          // Batch all DOM reads
          const elements = sections.map(id => ({
            id,
            element: document.getElementById(id)
          }));
          
          for (let i = elements.length - 1; i >= 0; i--) {
            const { id, element } = elements[i];
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Delay initial scroll check to avoid blocking initial render
    setTimeout(handleInitialScroll, 100);
    window.addEventListener('scroll', handleInitialScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleInitialScroll);
    };
  }, []);

  // Navigation links - can be updated in config if needed
  const navLinks = [
    { key: 'home', label: t('nav.home') },
    { key: 'features', label: t('nav.features') },
    { key: 'locations', label: t('nav.locations') },
    { key: 'specifications', label: t('nav.specifications') },
    { key: 'gallery', label: t('nav.gallery') },
    { key: 'contact', label: t('nav.contact') },
  ];

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };
  const formattedPhoneNumber = warehouseConfig.contact.phoneNumber.replace(/\s|-|\(|\)/g, '');

  return (
    <header className="w-[1520px]  bg-white sticky top-0 z-999">
      {/* Main Navigation Bar */}
      <nav className={`max-w-[1520px] mx-auto  py-4 px-4 md:px-6 lg:px-8 transition-colors duration-300 fixed top-0 left-0 right-0 z-100 ${isScrolled ? 'bg-white' : 'bg-[#EFF6FF]'}`}>
        <div className="max-w-7xl mx-auto  flex items-center justify-between">
          {/* Mobile: Hamburger on the left */}
          <button
            onClick={() => {
              trackButtonClick('header-mobile-menu-toggle');
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="order-1 md:order-3 lg:hidden text-(--dark) focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo - centered on mobile, left on tablet/desktop */}
          <div className="order-2 md:order-1 lg:order-1 flex-1 flex justify-center md:flex-none md:justify-start">
            <Image
              src={logo}
              alt="NEWMARK Logo"
              width={180}
              height={45}
              className="h-5 md:h-6 w-auto"
              priority
              quality={90}
              sizes="180px"
            />
          </div>

          {/* Mobile: Language switcher and Call Now on the right */}
          <div className="order-3 md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                trackButtonClick('header-mobile-language-toggle');
                toggleLanguage();
              }}
              className="inline-flex items-center justify-center h-9 text-sm font-semibold text-[#173C65] bg-white border border-[#173C65] px-3 rounded-md shadow-sm hover:bg-[#EFF6FF] transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href={`tel:${formattedPhoneNumber}`}
              onClick={() => trackButtonClick('header-mobile-call-now')}
              className="inline-flex items-center justify-center h-9 text-sm font-semibold text-white bg-[#173C65] px-3 rounded-md shadow-sm"
            >
              {t('header.callNow')}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 lg:order-2">
            {navLinks.map((link, index) => {
              const linkId = link.key;
              const isActive = activeSection === linkId;
              
              return (
                <a
                  key={index}
                  href={`#${linkId}`}
                  onClick={() => trackButtonClick(`header-nav-${linkId}`)}
                  className={`text-base font-medium transition-colors font-['Assistant',sans-serif] ${
                    isActive
                      ? 'border-b-2 pb-1 text-[#173C65] border-[#173C65]'
                      : 'text-(--dark) border-transparent hover:text-[#173C65]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop: Language button and Call Now on the right */}
          <div className="hidden lg:flex items-center gap-3 lg:order-3">
            <button
              onClick={() => {
                trackButtonClick('header-language-toggle');
                toggleLanguage();
              }}
              className="inline-flex items-center justify-center h-9 text-sm font-semibold text-[#173C65] bg-white border border-[#173C65] px-4 rounded-md shadow-sm hover:bg-[#EFF6FF] transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href={`tel:${formattedPhoneNumber}`}
              onClick={() => trackButtonClick('header-desktop-call-now')}
              className="inline-flex hover:-translate-y-1 items-center justify-center h-9 text-sm font-semibold text-white bg-[#173C65] px-4 rounded-md shadow-sm"
            >
              {t('header.callNow')}
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-0">
              {navLinks.map((link, index) => {
                const linkId = link.key;
                const isActive = activeSection === linkId;
                
                return (
                  <a
                    key={index}
                    href={`#${linkId}`}
                    onClick={() => {
                      trackButtonClick(`header-mobile-nav-${linkId}`);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-base font-semibold transition-colors px-2 py-1 font-['Assistant',sans-serif] ${
                      isActive
                        ? 'border-l-4 text-[#173C65] border-[#173C65]'
                        : 'text-(--dark) border-transparent hover:text-[#173C65]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
