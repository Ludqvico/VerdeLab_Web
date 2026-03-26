import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import ServicePageClient from "./ServicePageClient";

/* ─── Static params ──────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

/* ─── Per-page SEO metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} | VerdeLab`;
  const description = `${service.tagline} — ${service.intro}`;

  return {
    title,
    description,
    keywords: [
      "VerdeLab",
      ...service.tags,
      "software house italia",
      "intelligenza artificiale",
      "AI su misura",
      "Reggio Emilia",
    ],
    alternates: {
      canonical: `https://www.verdelab.info/servizi/${service.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: `https://www.verdelab.info/servizi/${service.slug}`,
      siteName: "VerdeLab",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ─── JSON-LD for the service ────────────────────────────────────────────── */
function ServiceJsonLd({ slug, title, description }: { slug: string; title: string; description: string }) {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      "@id": "https://www.verdelab.info/#organization",
      name: "VerdeLab",
    },
    url: `https://www.verdelab.info/servizi/${slug}`,
    areaServed: {
      "@type": "Country",
      name: "Italia",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.verdelab.info",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servizi",
        item: "https://www.verdelab.info/#servizi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.verdelab.info/servizi/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd
        slug={service.slug}
        title={service.title}
        description={`${service.tagline} — ${service.intro}`}
      />
      <Navbar />
      <main>
        <ServicePageClient service={service} />
      </main>
      <Footer />
    </>
  );
}
