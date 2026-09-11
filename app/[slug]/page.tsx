import React from "react";
import { notFound } from "next/navigation";
import { components } from "@/components/handwerker-in-der-naehe/componentsMap";
import { serviceSchemas, generateServiceJsonLd } from "@/lib/serviceSchemas";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import HeroSearchAndText from "@/app/components/landingPage/HeroSearchAndText";
import { Metadata } from "next";

// Define the shape of search params if needed
type Props = {
  params: { slug: string };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const originalSlug = slug.replace("-in-der-naehe", "");
  const service = components[originalSlug];

  if (!service) return {};

  const serviceData = serviceSchemas[originalSlug];
  
  return {
    title: service.title,
    description: serviceData?.description || `Finden Sie professionelle ${service.title} in Ihrer Nähe.`,
    alternates: {
       canonical: `/${slug}`,
    }
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return Object.keys(components).map((slug) => ({
    slug: `${slug}-in-der-naehe`,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  
  // Verify suffix and slug validity
  if (!slug.endsWith("-in-der-naehe")) {
    return notFound();
  }

  const originalSlug = slug.replace("-in-der-naehe", "");
  const service = components[originalSlug];

  if (!service) {
    return notFound();
  }

  const { Component, title } = service;
  const jsonLd = generateServiceJsonLd(originalSlug);

  return (
    <main className="min-h-screen">
      {/* JSON-LD for Search Engines */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Hero / Header Section for Service */}
      <section className="bg-mainBackground py-12 md:py-20">
         <div className="Container">
            <div className="text-center max-w-4xl mx-auto space-y-8">
               <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight">{title}</h1>
               <div className="glass-card p-4 md:p-8 max-w-2xl mx-auto shadow-premium">
                 <HeroSearchAndText
                    homePageOrNot={false}
                    title={false}
                    searchDefaultField={changeServiceFormat(originalSlug)}
                    initialSlug={originalSlug}
                  />
               </div>
            </div>
         </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 bg-white">
        <div className="Container">
           {/* The dynamic service component */}
           <Component searchDefaultField={changeServiceFormat(originalSlug)} />
        </div>
      </section>
    </main>
  );
}
