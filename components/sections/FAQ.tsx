"use client";

import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";

const faqItems = [
  {
    question: "Cos'è VerdeLab?",
    answer: "VerdeLab è una software house italiana con sede ad Albinea (Reggio Emilia), specializzata in intelligenza artificiale applicata, architetture agentiche e sviluppo software su misura. Attiva nel NLP e nell'AI dal 2003, quando tutto è iniziato con OMEO, un sistema di analisi linguistica sviluppato in collaborazione con Promete (spin-off INFM-CNR), combina oltre venticinque anni di esperienza con le tecnologie AI più avanzate.",
  },
  {
    question: "Cosa significa 'architettura agentica'?",
    answer: "Un'architettura agentica è un sistema in cui uno o più agenti AI autonomi collaborano per portare a termine compiti complessi: ricevono input, prendono decisioni, eseguono azioni e si adattano al contesto, senza intervento umano. VerdeLab progetta queste architetture per l'automazione di processi aziendali reali: dall'elaborazione documentale all'aggiornamento degli ERP, fino alla gestione di comunicazioni critiche.",
  },
  {
    question: "Cos'è CleverFlow?",
    answer: "CleverFlow è il progetto flagship di VerdeLab per l'automazione dei processi aziendali. Crea workflow Zero-Touch che collegano email, documenti e sistemi ERP senza intervento umano: dalla ricezione di una comunicazione all'elaborazione, fino all'aggiornamento del gestionale. Un esempio concreto di architettura agentica applicata all'operation aziendale.",
  },
  {
    question: "In quali settori opera VerdeLab?",
    answer: "VerdeLab lavora in modo trasversale: metalmeccanico, food, healthcare (strutture ospedaliere e assistenziali), servizi professionali e altri comparti produttivi. I nostri sistemi si integrano in modo flessibile in ogni area aziendale, revisione e qualità, sicurezza e analisi, content e reputation, data intelligence, office automation.",
  },
  {
    question: "VerdeLab lavora con modelli AI on-premise?",
    answer: "Sì. Lavoriamo con modelli AI sia online che on-premise, selezionando ogni volta l'architettura più adatta al problema specifico. Per chi non vuole dipendere da infrastrutture cloud esterne o ha vincoli di licenza, sviluppiamo soluzioni basate su LLM open source eseguibili in locale, addestrati e ottimizzati sul dominio specifico del cliente.",
  },
  {
    question: "VerdeLab offre anche formazione?",
    answer: "Sì, la formazione è parte centrale della nostra consulenza. L'intelligenza artificiale sta cambiando il modo in cui si lavora, ma capire i processi che stanno dietro alle applicazioni è oggi una competenza fondamentale. Aiutiamo i team a dialogare con i modelli linguistici, costruire prompt efficaci e ragionare criticamente sui risultati. VerdeLab collabora con enti di formazione e ospita stage formativi.",
  },
  {
    question: "VerdeLab lavora con clienti internazionali?",
    answer: "Sì. Pur avendo sede in Italia, VerdeLab lavora con aziende italiane e internazionali. Le nostre soluzioni NLP supportano più lingue e siamo abituati a collaborare in contesti distribuiti e remoti. Il nostro approccio metodologico si adatta a ogni contesto e settore.",
  },
  {
    question: "Chi sono i partner di VerdeLab?",
    answer: "VerdeLab collabora con due realtà d'eccellenza: Promete (spin-off dell'Istituto Nazionale per la Fisica della Materia, INFM-CNR) per progetti ad alto contenuto scientifico e di ricerca applicata; e Polaris Creative Studio per UX/UI e sviluppo di esperienze digitali su misura, garantendo che ogni soluzione sia tanto potente quanto intuitiva da usare.",
  },
  {
    question: "Come posso contattare VerdeLab?",
    answer: "Puoi contattarci tramite il form nella sezione Contatti di questo sito, oppure attraverso il nostro profilo LinkedIn. Siamo sempre aperti a discutere nuovi progetti, collaborazioni e consulenze. Raccontaci la tua sfida.",
  },
  {
    question: "Cosa rende unica VerdeLab rispetto ad altre software house?",
    answer: "VerdeLab unisce oltre venticinque anni di esperienza nell'AI applicata, iniziata nel 2003 con il progetto OMEO, con la capacità di progettare architetture agentiche, orchestrare sistemi multi-agente e produrre risultati misurabili. Non vendiamo hype: selezioniamo ogni volta l'architettura più adatta al problema, non la più di moda. Formiamo, non solo sviluppiamo.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      data-theme="light"
      className="py-16 md:py-32 px-6 md:px-10"
      style={{ background: "#F5F4F0" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left */}
          <div className="md:col-span-4 md:sticky md:top-40">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: "some" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif text-[3.25rem] md:text-display-md text-ink mt-4 leading-[0.9] md:leading-[0.85]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, amount: "some" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Domande
              <br />
              <span className="italic">
                <GradientText>frequenti.</GradientText>
              </span>
            </motion.h2>
            <motion.p
              className="font-sans text-body-md text-ink-secondary mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tutto quello che vuoi sapere su VerdeLab, CleverFlow e le nostre soluzioni AI.
            </motion.p>
          </div>

          {/* Right, staggered accordion items */}
          <div className="md:col-span-8 divide-y divide-border">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i < 4 ? i * 0.07 : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                <FAQAccordion items={[item]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
