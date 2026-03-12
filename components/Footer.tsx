import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { Github, Linkedin } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name + tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
              Clayton Cuteri
            </h3>
            <p className="text-muted text-sm">
              Engineering Leader. AI Architect. Startup Builder.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-6 text-sm text-muted">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a
              href="#experience"
              className="hover:text-foreground transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIconMap[social.icon] || Github;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-navy-800 hover:bg-accent-blue/20 text-muted hover:text-accent-blue transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted/60">
          &copy; {new Date().getFullYear()} Clayton Cuteri. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
