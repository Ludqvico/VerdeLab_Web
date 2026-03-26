"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import MarqueeText from "@/components/ui/MarqueeText";

const navLinks = [
  { label: "Servizi", href: "#services" },
  { label: "CleverFlow", href: "#cleverflow" },
  { label: "Polaris", href: "#polaris" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/VerdeLab", icon: "ph:github-logo-duotone" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/verdelabgroup/", icon: "ph:linkedin-logo-duotone" },
];

const legalInfo = [
  { label: "P.IVA", value: "02744010360" },
  { label: "PEC", value: "luigi.verde@pec.it" },
  { label: "Indirizzo", value: "Via Giotto da Bondone 4\n42020 Albinea (RE)" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" style={{ background: "#080808" }} className="relative overflow-hidden">
      {/* Marquee */}
      <div className="border-b border-white/5 py-4">
        <MarqueeText
          text="Intelligenza Artificiale Applicata · Architetture Agentiche · Prompt Engineering · NLP dal 2003 · Software su Misura · Risultati Misurabili · CleverFlow · Zero-Touch Workflow · 2003–2026"
          className="font-sans text-label text-white/15 uppercase tracking-[0.12em]"
          speed={50}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* Top row – 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-10 mb-16">

          {/* Col 1 – Branding */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: "some" }}
            transition={{ duration: 0.6, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/logo.svg" alt="VerdeLab" className="w-7 h-7 object-contain" />
              <span className="font-sans font-semibold text-white text-sm tracking-tight">VerdeLab</span>
            </div>
            <p className="font-sans text-sm text-white/35 leading-relaxed mb-6 max-w-xs">
              Software house specializzata in AI agentiche, automazione dei processi e NLP. Costruiamo sistemi intelligenti che lavorano, davvero, da Albinea, RE.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-teal hover:border-teal/40 transition-all duration-200"
                >
                  <Icon icon={s.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 – Navigation */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-[10px] font-semibold text-teal uppercase tracking-[0.15em] mb-5">
              Navigazione
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-200 relative inline-flex items-center group w-fit"
                  data-cursor="hover"
                >
                  <span className="w-0 group-hover:w-3 group-hover:mr-2 h-px bg-teal transition-all duration-300 ease-out" />
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Col 3 – Legal */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-[10px] font-semibold text-teal uppercase tracking-[0.15em] mb-5">
              Informazioni Legali
            </p>
            <dl className="flex flex-col gap-4">
              {legalInfo.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-[10px] text-white/25 uppercase tracking-wider mb-1">{item.label}</dt>
                  <dd className="font-sans text-sm text-white/45 whitespace-pre-line leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-white/20">
              © {year} VerdeLab, Tutti i diritti riservati.
            </span>
            <span className="font-sans text-xs text-white/15">
              Design &amp; Brand:{" "}
              <a
                href="https://www.polariscreative.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal transition-colors duration-200"
                data-cursor="hover"
              >
                Polaris Creative Studio ↗
              </a>
            </span>
          </div>

          {/* Privacy Policy, Iubenda placeholder */}
          <button
            type="button"
            className="group font-sans text-xs text-white/20 hover:text-white/50 transition-colors duration-200 flex items-center gap-1.5"
            data-cursor="hover"
            aria-label="Privacy Policy"
          >
            <Icon icon="ph:shield-check-duotone" className="text-sm text-white/20 group-hover:text-teal transition-colors duration-200" />
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
