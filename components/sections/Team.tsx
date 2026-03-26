"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { Icon } from "@iconify/react";

const team = [
  {
    index: "01",
    firstName: "Luigi",
    lastName: "Verde",
    linkedin: "https://www.linkedin.com/in/luigi-verde-bbbb261b/",
    role: "Co-founder\nFull Stack Developer & AI Engineer",
    description:
      "Architetture backend scalabili, sistemi distribuiti e integrazione di modelli di linguaggio.",
    tags: ["Backend", "AI Engineering", "System Design"],
    photo: "/team-luigi.png",
  },
  {
    index: "02",
    firstName: "Marzia",
    lastName: "Da Como",
    linkedin: "https://www.linkedin.com/in/marzia-da-como-976458145/",
    role: "Co-founder\nData Analyst & AI/Prompt Engineer",
    description:
      "Analisi dei dati, progettazione di flussi NLP e ottimizzazione dei modelli AI.",
    tags: ["Data Analysis", "NLP", "Prompt Engineering"],
    photo: "/team-marzia.png",
  },
  {
    index: "03",
    firstName: "Ludovico",
    lastName: "Verde",
    linkedin: "https://www.linkedin.com/in/ludovico-verde-593630238/",
    role: "Co-founder\nHead of Design & Marketing",
    description:
      "Identità visiva, design system e strategia di comunicazione digitale.",
    tags: ["Brand Design", "UX/UI", "Marketing Strategy"],
    photo: "/team-ludovico.png",
  },
];

function MemberRow({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: false, margin: "-10%" });
  const isTextInView = useInView(textRef, { once: false, margin: "-5%" });

  return (
    <motion.div
      ref={rowRef}
      className="relative flex flex-col md:grid md:grid-cols-[48px_180px_1fr_320px] items-start md:items-center gap-6 md:gap-10 py-10 md:py-10 border-b border-border last:border-b-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* MOBILE ONLY PHOTO CARD */}
      <motion.div 
        className="md:hidden relative w-full mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full aspect-[4/5] overflow-hidden border border-border">
          <img
            src={member.photo}
            alt={`${member.firstName} ${member.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Mobile Index overlay — Top-Left for 01,03 / Top-Right for 02 */}
        <motion.span 
          className={`absolute font-serif italic text-6xl text-ink/15 select-none tabular-nums z-20 pointer-events-none ${
            index % 2 === 0 ? "top-4 left-4" : "top-4 right-4"
          }`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {member.index}
        </motion.span>
      </motion.div>

      {/* ── DESKTOP ONLY: index number (grid col 1) ──────────────── */}
      <motion.span
        className="hidden md:block font-serif italic text-3xl text-ink-tertiary tabular-nums leading-none select-none"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
      >
        {member.index}
      </motion.span>

      {/* ── DESKTOP ONLY: photo (grid col 2) ─────────────────────── */}
      <motion.div
        className="hidden md:block w-[180px] aspect-square overflow-hidden border border-border flex-shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <img
          src={member.photo}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Name styling */}
      <div ref={textRef} className="flex flex-col w-full min-w-0 md:pb-4 mb-3 md:mb-0">
        <motion.div
          className="overflow-visible w-full"
          initial={{ clipPath: "inset(-10% 100% -10% 0)" }}
          animate={(typeof window !== 'undefined' && window.innerWidth < 1024 ? isTextInView : isInView) ? { clipPath: "inset(-10% 0% -10% 0)" } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Desktop: Entire header is a link with custom cursor */}
          <a 
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Linkedin"
            className="hidden md:flex group/link items-center justify-between w-full"
          >
            <h3 className="text-6xl leading-[1.3] tracking-tight transition-transform duration-300 group-hover/link:translate-x-1">
              <span className="font-serif italic font-semibold text-ink inline-block mr-4 uppercase group-hover/link:text-[#00B4A6] transition-colors duration-300">
                {member.firstName}
              </span>
              <span className="font-sans font-medium text-ink inline-block">
                {member.lastName}
              </span>
            </h3>
          </a>

          {/* Mobile: Name is static, only the icon is a link */}
          <div className="md:hidden flex items-center justify-between w-full">
            <h3 className="text-[2.5rem] leading-[1.1] tracking-tight">
              <span className="font-serif italic font-semibold text-ink inline-block mr-3 uppercase">
                {member.firstName}
              </span>
              <span className="font-sans font-medium text-ink inline-block">
                {member.lastName}
              </span>
            </h3>
            
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-teal/20 bg-teal/5 flex items-center justify-center text-teal flex-shrink-0"
            >
              <Icon icon="ph:linkedin-logo-duotone" className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Role + Description + Tags (hidden on tiny screens, show on md) */}
      <motion.div
        className="flex md:flex flex-col gap-2 md:gap-3"
        initial={{ opacity: 0, x: 10 }}
        animate={(typeof window !== 'undefined' && window.innerWidth < 1024 ? isTextInView : isInView) ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p 
          style={{ color: "#00B4A6" }}
          className="font-sans text-body-md md:text-base font-semibold whitespace-pre-line leading-tight"
        >
          {member.role}
        </p>
        <p className="font-sans text-sm md:text-xs text-ink-secondary leading-relaxed max-w-xl">
          {member.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] font-semibold text-ink-tertiary uppercase tracking-wider px-2 py-1 rounded-full border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const labelY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="team"
      ref={sectionRef}
      data-theme="light"
      className="bg-surface py-16 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div ref={headerRef} className="flex flex-col md:flex-row items-start justify-between mb-10 md:mb-14 gap-6 md:gap-8">
          <div>
            <SectionLabel>Il Team</SectionLabel>
            <motion.h2
              className="font-serif italic text-[3.25rem] md:text-display-md text-ink mt-4 leading-[0.9] md:leading-[0.85]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Le menti<br />dietro VerdeLab
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:block font-sans text-sm text-ink-secondary max-w-xs text-right mt-auto"
          >
            Tre co-fondatori, tre discipline complementari — unite da un'unica visione.
          </motion.p>
        </div>

        {/* Member rows */}
        <div>
          {team.map((member, i) => (
            <MemberRow key={`${member.firstName}-${member.lastName}`} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
