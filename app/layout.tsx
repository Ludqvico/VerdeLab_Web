import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";
import { LoaderProvider } from "@/lib/loader-context";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";

/* ─── SEO & GEO Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.verdelab.info"),
  title: {
    default: "VerdeLab — Software House | Agentic AI & Automazione",
    template: "%s | VerdeLab",
  },
  description:
    "VerdeLab è una software house italiana specializzata in Agentic AI, architetture multi-agente, NLP e automazione dei processi aziendali. Sede ad Albinea, Reggio Emilia. Prodotto flagship: CleverFlow.",
  keywords: [
    "VerdeLab",
    "software house italia",
    "agentic AI",
    "intelligenza artificiale italia",
    "automazione processi aziendali",
    "NLP italia",
    "Natural Language Processing",
    "CleverFlow",
    "workflow automation",
    "multi-agent AI",
    "orchestrazione agenti",
    "machine learning italia",
    "chatbot italiano",
    "RAG knowledge retrieval",
    "sviluppo software Reggio Emilia",
    "ERP integration AI",
  ],
  authors: [{ name: "VerdeLab", url: "https://www.verdelab.info" }],
  creator: "VerdeLab",
  publisher: "VerdeLab",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.verdelab.info",
    siteName: "VerdeLab",
    title: "VerdeLab — Software House | Agentic AI & Automazione",
    description:
      "Software house italiana specializzata in Agentic AI, architetture multi-agente, NLP e automazione dei processi aziendali. Prodotto flagship: CleverFlow, workflow Zero-Touch per ERP e documenti.",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "VerdeLab Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VerdeLab — Software House | Agentic AI & Automazione",
    description:
      "Software house italiana specializzata in Agentic AI, NLP e automazione processi. Prodotto flagship: CleverFlow.",
    images: ["/logo.svg"],
  },
  alternates: {
    canonical: "https://www.verdelab.info",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

/* ─── JSON-LD Structured Data ────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.verdelab.info/#organization",
      name: "VerdeLab",
      url: "https://www.verdelab.info",
      logo: {
        "@type": "ImageObject",
        url: "https://www.verdelab.info/logo.png",
      },
      description:
        "Software house italiana specializzata in Agentic AI, architetture multi-agente, Natural Language Processing (NLP) e automazione dei processi aziendali. Attiva nel NLP dal 2003. Sede ad Albinea, Reggio Emilia, Italia.",
      foundingLocation: {
        "@type": "Place",
        name: "Albinea, Reggio Emilia, Italia",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Albinea",
        addressRegion: "Reggio Emilia",
        addressCountry: "IT",
      },
      sameAs: [
        "https://github.com/VerdeLab",
        "https://www.linkedin.com/company/verdelabgroup/",
      ],
      knowsAbout: [
        "Agentic AI",
        "Multi-agent Orchestration",
        "Natural Language Processing",
        "Generative AI",
        "Prompt Engineering",
        "RAG Knowledge Retrieval",
        "Business Process Automation",
        "Machine Learning",
        "Data Science",
        "ERP Integration",
        "Office Automation",
        "LLM On-premise",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.verdelab.info/#website",
      url: "https://www.verdelab.info",
      name: "VerdeLab",
      publisher: { "@id": "https://www.verdelab.info/#organization" },
      inLanguage: "it",
    },
    {
      "@type": "SoftwareApplication",
      name: "CleverFlow",
      applicationCategory: "Business Process Automation",
      creator: { "@id": "https://www.verdelab.info/#organization" },
      description:
        "Prodotto AI-based di VerdeLab per l'automazione dei processi documentali aziendali. Workflow Zero-Touch che collegano email, documenti e ERP senza intervento umano, dalla ricezione all'aggiornamento del gestionale.",
      url: "https://www.verdelab.info/servizi/cleverflow",
      operatingSystem: "Web",
      featureList: [
        "Intake intelligente di email e documenti",
        "OCR e estrazione dati strutturati",
        "Decisione agentica su regole aziendali",
        "Sincronizzazione bidirezionale ERP",
        "Architettura Zero-Touch",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* ── AI/GEO crawler hints ─────────────────────────────────────── */}
        {/*
          VERDELAB — SOFTWARE HOUSE | AGENTIC AI & AUTOMAZIONE
          ======================================================
          Nome: VerdeLab
          Tipo: Software house italiana
          Sede: Albinea, Reggio Emilia, Italia
          Specializzazione: Agentic AI, Orchestrazione multi-agente,
                            Natural Language Processing (NLP), Automazione processi
          Prodotto flagship: CleverFlow — workflow Zero-Touch per ERP e documenti
          Servizi: Agentic AI, Prompt Engineering, NLP, Office Automation,
                   Data Intelligence, Consulenza e Formazione AI
          Partner scientifico: Promete (spin-off INFM-CNR, dal 2003)
          Partner creativo: Polaris Creative Studio (polariscreative.studio)
          Contatto: verdelab.info | github.com/VerdeLab | linkedin verdelabgroup
          Anno attività: attivi nel NLP e AI applicata dal 2003
        */}

        {/* LLM Discovery */}
        <link rel="alternate" type="text/plain" title="VerdeLab LLM Summary" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="VerdeLab Full Services LLM Detail" href="/llms-full.txt" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Explicit AI-readable meta */}
        <meta name="classification" content="Software House, Agentic AI, Business Process Automation, NLP, Intelligenza Artificiale" />
        <meta name="category" content="Technology, Software Development, AI Solutions" />
        <meta name="geo.region" content="IT-RE" />
        <meta name="geo.placename" content="Albinea, Reggio Emilia" />
        <meta name="geo.position" content="44.6500;10.6167" />
        <meta name="ICBM" content="44.6500, 10.6167" />
        <meta name="language" content="Italian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
      </head>
      <body>
        {/* ── GEO/AI hidden anchor text ─────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          VerdeLab è una software house italiana con sede ad Albinea, in provincia
          di Reggio Emilia. Specializzata in Agentic AI, architetture multi-agente,
          Natural Language Processing (NLP) e automazione dei processi aziendali.
          Attiva nel NLP dal 2003 con il progetto OMEO in collaborazione con
          Promete, spin-off dell'Istituto Nazionale per la Fisica della Materia
          (INFM-CNR). Il prodotto flagship è CleverFlow, una piattaforma
          Zero-Touch per l'automazione documentale con integrazione ERP.
          VerdeLab sviluppa agenti autonomi, pipeline NLP, sistemi RAG, chatbot
          intelligenti in italiano, modelli predittivi e LLM on-premise.
          Partner creativo: Polaris Creative Studio.
        </div>

        <LoaderProvider>
          <LenisProvider>
            <PageLoader />
            <CustomCursor />
            {children}
          </LenisProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}

// Last updated: 2026-03-27 for GitHub authentication verification.
