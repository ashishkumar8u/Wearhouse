'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Banner from '@/components/banner/banner';

// Lazy load below-the-fold components to reduce initial bundle size
const Apartments = dynamic(() => import('@/components/apartments/apartments'), {
  loading: () => <div className="min-h-[400px]" />,
});

const LocationComparison = dynamic(() => import('@/components/location-comparison/location-comparison'), {
  loading: () => <div className="min-h-[300px]" />,
});

const CTASection = dynamic(() => import('@/components/cta-section/cta-section'), {
  loading: () => <div className="min-h-[200px]" />,
});

const Locations = dynamic(() => import('@/components/locations/locations'), {
  loading: () => <div className="min-h-[400px]" />,
});

const IdealFor = dynamic(() => import('@/components/ideal-for/ideal-for'), {
  loading: () => <div className="min-h-[300px]" />,
});

const PropertySpecification = dynamic(() => import('@/components/property/property'), {
  loading: () => <div className="min-h-[400px]" />,
});

const AvailabilityPricing = dynamic(() => import('@/components/availability-pricing/availability-pricing'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Gallery = dynamic(() => import('@/components/gallery/gallery'), {
  loading: () => <div className="min-h-[400px]" />,
});

const LeadForm = dynamic(() => import('@/components/lead-form/lead-form'), {
  loading: () => <div className="min-h-[300px]" />,
});

const ContactMethods = dynamic(() => import('@/components/contact-methods/contact-methods'), {
  loading: () => <div className="min-h-[300px]" />,
});

export default function Home() {
  return (
    <main>
      {/* Critical above-the-fold content - loaded immediately */}
      <Banner />
      
      {/* Below-the-fold content - lazy loaded */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Apartments />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <LocationComparison />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <CTASection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Locations />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <IdealFor />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <PropertySpecification />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <AvailabilityPricing />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Gallery />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <LeadForm />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <ContactMethods />
      </Suspense>
    </main>
  );
}
