import { SOCIAL_LINKS } from "@/lib/constants";
import { Github, Linkedin } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
};

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name + tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-medium font-[family-name:var(--font-heading)]">
              Clayton Cuteri
            </h3>
            <p className="text-muted text-xs mt-1">
              Engineering Leader. AI Architect. Startup Builder.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-8 text-xs text-muted">
            <a href="#about" className="hover:text-foreground transition-colors cursor-pointer">
              About
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors cursor-pointer">
              Experience
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors cursor-pointer">
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIconMap[social.icon] || Github;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-muted/40">
          &copy; {new Date().getFullYear()} Clayton Cuteri. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
