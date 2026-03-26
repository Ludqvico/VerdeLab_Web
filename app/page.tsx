import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import MockupReveal from "@/components/sections/MockupReveal";
import Services from "@/components/sections/Services";
import BlaiseAI from "@/components/sections/BlaiseAI";
import Timeline from "@/components/sections/Timeline";
import Polaris from "@/components/sections/Polaris";
import Team from "@/components/sections/Team";
import Stats from "@/components/sections/Stats";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cos'è VerdeLab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VerdeLab è una software house italiana con sede ad Albinea (Reggio Emilia), specializzata in intelligenza artificiale applicata, architetture agentiche, NLP e automazione dei processi aziendali. Attiva nel Natural Language Processing dal 2003.",
      },
    },
    {
      "@type": "Question",
      name: "In cosa è specializzata VerdeLab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VerdeLab è specializzata in Agentic AI e orchestrazione multi-agente, Prompt Engineering e NLP avanzato, automazione documentale con integrazione ERP, Data Intelligence e machine learning, Office Automation e consulenza strategica AI.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è CleverFlow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CleverFlow è il prodotto AI-based di VerdeLab per l'automazione dei processi documentali aziendali. Crea workflow Zero-Touch che collegano email, documenti e ERP senza intervento umano, dalla ricezione all'aggiornamento del sistema gestionale.",
      },
    },
    {
      "@type": "Question",
      name: "VerdeLab lavora con modelli AI on-premise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. VerdeLab seleziona ogni volta l'architettura più adatta al problema: cloud API, modelli open source eseguibili in locale, o ibridi. Nessuna dipendenza da un singolo vendor.",
      },
    },
    {
      "@type": "Question",
      name: "Dove ha sede VerdeLab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VerdeLab ha sede ad Albinea, in provincia di Reggio Emilia, Italia. Via Giotto da Bondone 4, 42020 Albinea (RE).",
      },
    },
    {
      "@type": "Question",
      name: "Come posso contattare VerdeLab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puoi contattare VerdeLab tramite il form sul sito verdelab.info, su LinkedIn (verdelabgroup) o su GitHub (VerdeLab).",
      },
    },
  ],
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servizi VerdeLab",
  description: "Servizi di intelligenza artificiale, automazione e consulenza offerti da VerdeLab",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Agentic AI & Orchestrazione",
      url: "https://www.verdelab.info/servizi/agentic-ai",
      description: "Agenti autonomi multi-agente capaci di agire, decidere e integrarsi nei processi aziendali",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Prompt Engineering & NLP",
      url: "https://www.verdelab.info/servizi/prompt-engineering",
      description: "Prompt engineering avanzato, NLP su misura, RAG e knowledge retrieval calibrati sul dominio",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "CleverFlow",
      url: "https://www.verdelab.info/servizi/cleverflow",
      description: "Automazione documentale Zero-Touch con integrazione ERP, OCR e decisione agentica",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Office Automation",
      url: "https://www.verdelab.info/servizi/office-automation",
      description: "Gestione intelligente di pratiche, comunicazioni e processi ripetitivi con AI conversazionale",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Data Intelligence & ML",
      url: "https://www.verdelab.info/servizi/data-intelligence",
      description: "Modelli predittivi, pattern recognition e analytics integrati nei processi produttivi reali",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Consulenza & Formazione",
      url: "https://www.verdelab.info/servizi/consulenza-formazione",
      description: "Roadmap di adozione AI, project management tecnico e workshop su prompt engineering",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <main>
        <Navbar />
        <Hero />
        <Manifesto />
        <MockupReveal />
        <Services />
        <BlaiseAI />
        <Timeline />
        <Team />
        <Polaris />
        <Stats />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
