import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="block w-5 h-px bg-teal" />
      <span className="font-sans text-label text-teal uppercase tracking-[0.15em] font-medium">
        {children}
      </span>
    </div>
  );
}
