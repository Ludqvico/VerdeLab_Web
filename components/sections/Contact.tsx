"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedInputField from "@/components/ui/AnimatedInputField";

const COUNTRIES = [
  { name: "Italia", code: "+39", flag: "flag:it-4x3" },
  { name: "Stati Uniti", code: "+1", flag: "flag:us-4x3" },
  { name: "Regno Unito", code: "+44", flag: "flag:gb-4x3" },
  { name: "Germania", code: "+49", flag: "flag:de-4x3" },
  { name: "Francia", code: "+33", flag: "flag:fr-4x3" },
  { name: "Spagna", code: "+34", flag: "flag:es-4x3" },
  { name: "Svizzera", code: "+41", flag: "flag:ch-4x3" },
  { name: "Austria", code: "+43", flag: "flag:at-4x3" },
  { name: "Belgio", code: "+32", flag: "flag:be-4x3" },
  { name: "Olanda", code: "+31", flag: "flag:nl-4x3" },
  { name: "Portogallo", code: "+351", flag: "flag:pt-4x3" },
  { name: "Svezia", code: "+46", flag: "flag:se-4x3" },
  { name: "Norvegia", code: "+47", flag: "flag:no-4x3" },
  { name: "Danimarca", code: "+45", flag: "flag:dk-4x3" },
  { name: "Irlanda", code: "+353", flag: "flag:ie-4x3" },
];

const SECTORS = [
  { label: "Tecnologia & Software", value: "tech" },
  { label: "Finanza & Assicurazioni", value: "finance" },
  { label: "Healthcare & Pharma", value: "healthcare" },
  { label: "Manifattura & Industria", value: "manufacturing" },
  { label: "E-commerce & Retail", value: "ecommerce" },
  { label: "Altro", value: "other" },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", sector: "", message: "" });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectorDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (sectorDropdownRef.current && !sectorDropdownRef.current.contains(event.target as Node)) {
        setIsSectorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File troppo grande (Max 10MB)");
        return;
      }
      setAttachedFile(file);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSent(true);
  };

  const selectedSectorLabel = SECTORS.find(s => s.value === formState.sector)?.label || "Seleziona settore";

  return (
    <section
      id="contact"
      data-theme="light"
      className="relative py-16 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,180,166,0.09) 0%, transparent 60%),
          #F5F4F0
        `,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: "some" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Contatti</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif text-display-lg text-ink mt-4 leading-[0.9] md:leading-[0.85]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Parliamo
              <br />
              <span className="italic">
                <GradientText>del tuo progetto.</GradientText>
              </span>
            </motion.h2>
            <motion.p
              className="font-sans text-body-md text-ink-secondary mt-6 leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Che tu abbia un prodotto da costruire, un&apos;architettura da riprogettare
              o un&apos;idea ancora vaga, siamo il posto giusto.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                {
                  label: "Telefono",
                  value: "+39 338 455 4976",
                  href: "tel:+393384554976",
                  icon: <Icon icon="ph:phone-duotone" className="text-lg" />,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 group"
                  data-cursor="hover"
                >
                  <span className="w-9 h-9 rounded-xl border border-border bg-surface flex items-center justify-center font-sans text-xs font-medium text-ink-secondary group-hover:border-teal group-hover:text-teal transition-all duration-200">
                    {item.icon}
                  </span>
                  <div>
                    <span className="font-sans text-label text-teal uppercase tracking-widest block">{item.label}</span>
                    <span className="font-sans text-sm text-ink group-hover:text-teal transition-colors duration-200">{item.value}</span>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right, form */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <motion.div
                className="rounded-2xl border border-teal/30 bg-teal-light p-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-3xl block mb-4">✦</span>
                <h3 className="font-serif italic text-display-sm text-ink mb-2">Messaggio inviato.</h3>
                <p className="font-sans text-sm text-ink-secondary">Ti risponderemo il prima possibile.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Nome & Email */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: "some" }}
                  transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col gap-2 relative z-[1]">
                    <label className="font-sans text-[11px] font-semibold text-teal uppercase tracking-[0.1em]">
                      Nome
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-tertiary group-focus-within/input:text-teal transition-colors z-10">
                        <Icon icon="ph:user-duotone" className="text-lg" />
                      </div>
                      <AnimatedInputField
                        placeholder="Il tuo nome"
                        value={formState.name}
                        onChange={(val) => setFormState({ ...formState, name: val })}
                        required
                        className="w-full bg-white border border-border rounded-xl pl-11 pr-4 py-3.5 focus:border-teal"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-[1]">
                    <label className="font-sans text-[11px] font-semibold text-teal uppercase tracking-[0.1em]">
                      Email
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-tertiary group-focus-within/input:text-teal transition-colors z-10">
                        <Icon icon="ph:envelope-simple-duotone" className="text-lg" />
                      </div>
                      <AnimatedInputField
                        type="email"
                        placeholder="tua@email.com"
                        value={formState.email}
                        onChange={(val) => setFormState({ ...formState, email: val })}
                        required
                        className="w-full bg-white border border-border rounded-xl pl-11 pr-4 py-3.5 focus:border-teal"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Telefono & Settore */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: "some" }}
                  transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col gap-2 relative z-[20]">
                    <label className="font-sans text-[11px] font-semibold text-teal uppercase tracking-[0.1em]">
                      Telefono
                    </label>
                    <div className="relative flex rounded-xl border border-border bg-white focus-within:border-teal transition-all duration-200">
                      {/* Custom dropdown trigger */}
                      <div className="relative z-10" ref={dropdownRef}>
                        <button 
                          type="button" 
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="h-full flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-border text-ink-secondary hover:text-ink transition-colors outline-none"
                        >
                          <Icon icon={selectedCountry.flag} className="text-base rounded-[2px] overflow-hidden" />
                          <span className="font-sans text-sm">{selectedCountry.code}</span>
                          <Icon icon="ph:caret-down-bold" className={cn("text-[10px] transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden z-[50]"
                              data-lenis-prevent
                            >
                              <div className="max-h-60 overflow-y-auto py-2 
                                [&::-webkit-scrollbar]:w-1 
                                [&::-webkit-scrollbar-track]:bg-transparent 
                                [&::-webkit-scrollbar-thumb]:bg-teal/20 
                                [&::-webkit-scrollbar-thumb]:rounded-full 
                                hover:[&::-webkit-scrollbar-thumb]:bg-teal/40">
                                {COUNTRIES.map((c) => (
                                  <button
                                    key={c.name}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-teal/[0.05] transition-colors text-left group"
                                  >
                                    <Icon icon={c.flag} className="text-base rounded-sm" />
                                    <span className="font-sans text-xs text-ink-secondary group-hover:text-ink flex-1">{c.name}</span>
                                    <span className="font-sans text-[10px] text-teal/60 font-medium">{c.code}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <AnimatedInputField
                        type="tel"
                        placeholder="333 1234567"
                        value={formState.phone}
                        onChange={(val) => setFormState({ ...formState, phone: val })}
                        className="w-full bg-transparent rounded-r-xl px-4 py-3.5"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-[20]">
                    <label className="font-sans text-[11px] font-semibold text-teal uppercase tracking-[0.1em]">
                      Settore
                    </label>
                    <div className="relative" ref={sectorDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsSectorDropdownOpen(!isSectorDropdownOpen)}
                        className={cn(
                          "w-full flex items-center justify-between font-sans text-sm bg-white border border-border rounded-xl px-4 py-3.5 outline-none transition-all duration-200 group/sector",
                          isSectorDropdownOpen ? "border-teal" : "hover:border-ink-tertiary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon icon="ph:briefcase-duotone" className={cn("text-lg transition-colors", isSectorDropdownOpen ? "text-teal" : "text-ink-tertiary group-hover/sector:text-ink-secondary")} />
                          <span className={cn(formState.sector ? "text-ink" : "text-ink-tertiary")}>
                            {selectedSectorLabel}
                          </span>
                        </div>
                        <Icon icon="ph:caret-down-bold" className={cn("text-xs transition-all duration-300", isSectorDropdownOpen ? "text-teal rotate-180" : "text-ink-tertiary")} />
                      </button>

                      <AnimatePresence>
                        {isSectorDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 mt-2 w-full bg-white/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden z-[50]"
                            data-lenis-prevent
                          >
                            <div className="max-h-60 overflow-y-auto py-2
                              [&::-webkit-scrollbar]:w-1 
                              [&::-webkit-scrollbar-track]:bg-transparent 
                              [&::-webkit-scrollbar-thumb]:bg-teal/20 
                              [&::-webkit-scrollbar-thumb]:rounded-full 
                              hover:[&::-webkit-scrollbar-thumb]:bg-teal/40">
                              {SECTORS.map((s) => (
                                <button
                                  key={s.value}
                                  type="button"
                                  onClick={() => {
                                    setFormState({ ...formState, sector: s.value });
                                    setIsSectorDropdownOpen(false);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left group",
                                    formState.sector === s.value ? "bg-teal/[0.05]" : "hover:bg-teal/[0.03]"
                                  )}
                                >
                                  <span className={cn(
                                    "font-sans text-xs transition-colors",
                                    formState.sector === s.value ? "text-teal font-medium" : "text-ink-secondary group-hover:text-ink"
                                  )}>
                                    {s.label}
                                  </span>
                                  {formState.sector === s.value && (
                                    <Icon icon="ph:check-bold" className="text-[10px] text-teal ml-auto" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Messaggio */}
                <motion.div
                  className="flex flex-col gap-2 relative z-[0]"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: "some" }}
                  transition={{ duration: 0.55, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label className="font-sans text-[11px] font-semibold text-teal uppercase tracking-[0.1em]">
                    Messaggio
                  </label>
                  <div className="relative border border-border rounded-xl bg-white focus-within:border-teal transition-colors duration-200 flex flex-col">
                    <AnimatedInputField
                      isTextArea
                      placeholder="Descrivi il tuo progetto o la tua sfida..."
                      value={formState.message}
                      onChange={(val) => setFormState({ ...formState, message: val })}
                      required
                      rows={5}
                      className="w-full bg-transparent px-4 pt-4 pb-12"
                    />
                    
                    {/* Attachment Option within Textarea area */}
                    <div className="absolute bottom-2 left-2 right-4 flex items-center justify-between pointer-events-auto z-10">
                      <div className="flex flex-col gap-1">
                        <AnimatePresence mode="wait">
                          {attachedFile ? (
                            <motion.div 
                              key="file-chip"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-teal/[0.07] border border-teal/20"
                            >
                              <Icon icon="ph:file-duotone" className="text-teal text-sm" />
                              <span className="font-sans text-[11px] font-medium text-ink max-w-[120px] truncate">
                                {attachedFile.name}
                              </span>
                              <span className="font-sans text-[10px] text-ink-tertiary">
                                ({(attachedFile.size / 1024 / 1024).toFixed(1)}MB)
                              </span>
                              <button 
                                type="button"
                                onClick={removeFile}
                                className="ml-1 p-0.5 hover:bg-teal/10 rounded-full transition-colors"
                              >
                                <Icon icon="ph:x-bold" className="text-[10px] text-teal" />
                              </button>
                            </motion.div>
                          ) : (
                            <motion.label 
                              key="upload-label"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer"
                            >
                              <Icon icon="ph:paperclip-duotone" className="text-ink-secondary group-hover:text-teal transition-colors text-lg" />
                              <span className="font-sans text-xs text-ink-secondary group-hover:text-ink transition-colors font-medium">
                                Allega file
                              </span>
                              <input 
                                type="file" 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                            </motion.label>
                          )}
                        </AnimatePresence>
                        {fileError && (
                          <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-sans text-[10px] text-red-500 font-medium ml-3"
                          >
                            {fileError}
                          </motion.span>
                        )}
                      </div>
                      <span className="font-sans text-[10px] text-ink-tertiary uppercase tracking-wider">
                        Max 10MB
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: "some" }}
                  transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MagneticButton
                    variant="primary"
                    className="w-full justify-center mt-2 group/submit"
                    onClick={() => handleSubmit()}
                    icon="ph:paper-plane-tilt-duotone"
                  >
                    <span className="flex items-center gap-2">
                      Invia richiesta
                    </span>
                  </MagneticButton>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
