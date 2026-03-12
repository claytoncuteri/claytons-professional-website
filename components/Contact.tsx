"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { CONTACT } from "@/lib/constants";
import { Linkedin, Send, CheckCircle, Github } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      }
    } catch {
      // Silently handle - form will remain for retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-4">
            {CONTACT.heading}
          </h2>
          <p className="text-muted text-center mb-16 max-w-2xl mx-auto">
            {CONTACT.subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact form */}
          <ScrollReveal direction="left">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 glass-card p-8">
                <CheckCircle size={48} className="text-emerald-400" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                  Message Sent
                </h3>
                <p className="text-muted text-center text-sm">
                  Thank you for reaching out. I will get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-accent-blue text-sm hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors resize-none"
                    placeholder="Tell me about your opportunity..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Connect section */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-6">
                  Connect with me
                </h3>
              </div>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 hover:border-accent-blue/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-colors">
                  <Linkedin size={20} className="text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted">LinkedIn</p>
                  <p className="text-foreground">Clayton Cuteri</p>
                </div>
              </a>

              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 hover:border-accent-blue/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-colors">
                  <Github size={20} className="text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted">GitHub</p>
                  <p className="text-foreground">claytoncuteri</p>
                </div>
              </a>

              <div className="glass-card p-6">
                <p className="text-sm text-muted leading-relaxed">
                  The best way to reach me is through the contact form or
                  LinkedIn. I typically respond within 24 hours for
                  opportunities involving engineering leadership, AI strategy,
                  or advisory roles.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
