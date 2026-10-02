"use client";

import { ArrowRight, Briefcase, Code2, Mail, MapPin } from 'lucide-react';
import { useTranslations } from "next-intl";
import AutomationDemoPanel from "@/components/AutomationDemoPanel";
import ContactForm from "@/components/blocks/ContactForm";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import { Section, SectionHeader } from "@/components/blocks/shared";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import SystemsGraph from "@/components/SystemsGraph";
import TestingMatrix, { type AreaItem } from "@/components/TestingMatrix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/data";

type CaseStudy = {
  name: string;
  tag: string;
  url?: string;
  context: string;
  challenge: string;
  responsibility: string;
  approach: string;
  scenarios: string[];
  tools: string[];
  learned: string;
  roadmap?: string[];
};

type SkillGroup = { group: string; items: string[] };
type ContactDetail = { label: string; value: string };
type SystemNodeItem = { key: string; label: string; risks: string; approach: string };

export default function Page() {
  const t = useTranslations("portfolio");

  const aboutParagraphs = Array.isArray(t.raw("about.paragraphs")) ? (t.raw("about.paragraphs") as string[]) : [];
  const expertiseAreas = Array.isArray(t.raw("expertise.areas")) ? (t.raw("expertise.areas") as AreaItem[]) : [];
  const workflowSteps = Array.isArray(t.raw("automation.workflowSteps")) ? (t.raw("automation.workflowSteps") as string[]) : [];
  const demoChecks = Array.isArray(t.raw("automation.demoChecks"))
    ? (t.raw("automation.demoChecks") as { name: string; status: string }[])
    : [];
  const automationCards = Array.isArray(t.raw("automation.cards"))
    ? (t.raw("automation.cards") as { title: string; description: string }[])
    : [];
  const experienceBullets = Array.isArray(t.raw("experience.bullets")) ? (t.raw("experience.bullets") as string[]) : [];
  const caseStudies = Array.isArray(t.raw("caseStudies")) ? (t.raw("caseStudies") as CaseStudy[]) : [];
  const systemsNodes = Array.isArray(t.raw("systems.nodes")) ? (t.raw("systems.nodes") as SystemNodeItem[]) : [];
  const skillGroups = Array.isArray(t.raw("skills.groups")) ? (t.raw("skills.groups") as SkillGroup[]) : [];
  const principles = Array.isArray(t.raw("philosophy.principles"))
    ? (t.raw("philosophy.principles") as { title: string; description: string }[])
    : [];
  const contactDetails = Array.isArray(t.raw("contact.details")) ? (t.raw("contact.details") as ContactDetail[]) : [];

  const featureItems: FeatureItem[] = automationCards.map((card) => ({ title: card.title, description: card.description }));

  const handleContactSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <main>
      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-mesh">
        <Reveal>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-[1.15fr_1fr] md:py-32">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("hero.eyebrow")}
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{t("hero.name")}</h1>
              <p className="mt-2 font-display text-2xl text-muted-foreground md:text-3xl">{t("hero.role")}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("hero.intro")}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="default" size="lg" className="shadow-glow">
                  <a href="#work">{t("hero.primaryCta")}</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#" download>
                    {t("hero.secondaryCta")}
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.platform.toLowerCase() === "github" ? Code2 : Briefcase;
                  return (
                    <a
                      key={social.platform + social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
                <a
                  href={`mailto:${t("hero.email")}`}
                  aria-label="Email"
                  className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{t("hero.availabilityLabel")}</span>
              </div>
              <p className="mt-2 text-sm italic text-muted-foreground/70">{t("hero.aside")}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <HeroScene label={t("hero.threeDLabel")} />
              <p className="text-center text-sm text-muted-foreground">{t("hero.threeDLabel")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section id="about" className="bg-background py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader eyebrow={t("about.eyebrow")} title={t("about.title")} align="left" />
            {aboutParagraphs.map((paragraph, i) => (
              <p key={i} className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 text-sm font-medium text-primary">{t("about.location")}</p>
          </div>
        </Reveal>
      </section>

      {/* Testing expertise */}
      <section id="expertise" className="bg-muted/30 py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow={t("expertise.eyebrow")} title={t("expertise.title")} subtitle={t("expertise.subtitle")} />
            <div className="glass-strong rounded-3xl p-6 md:p-10">
              <TestingMatrix areas={expertiseAreas} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Automation laboratory */}
      <section id="automation" className="bg-mesh py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow={t("automation.eyebrow")} title={t("automation.title")} subtitle={t("automation.subtitle")} />

            <div className="flex flex-wrap items-center gap-3">
              {workflowSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="glass rounded-full px-4 py-2 text-sm font-medium">{step}</span>
                  {i < workflowSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <AutomationDemoPanel checks={demoChecks} />
              <FeatureGrid items={featureItems} columns={2} variant="glass" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-background py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeader eyebrow={t("experience.eyebrow")} title={t("experience.title")} align="left" />
            <ul className="mt-8 space-y-4">
              {experienceBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Case studies */}
      <section id="work" className="bg-muted/30 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow={t("caseStudies.eyebrow") || ""} title={t("caseStudies.title") || ""} />
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((study) => (
                <div key={study.name} className="surface-elevated rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold">{study.name}</h3>
                    <Badge variant="secondary">{study.tag}</Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{study.context}</p>
                  <p className="mt-2 text-sm text-muted-foreground"><strong>{study.challenge}</strong></p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.responsibility}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.approach}</p>
                  <ul className="mt-4 space-y-1">
                    {study.scenarios.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <Badge key={tool} variant="outline">{tool}</Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-sm italic text-muted-foreground">{study.learned}</p>
                  {study.url && (
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-primary">
                      {study.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Systems graph */}
      {systemsNodes.length > 0 && (
        <section id="systems" className="bg-background py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeader eyebrow={t("systems.eyebrow") || ""} title={t("systems.title") || ""} />
              <SystemsGraph nodes={systemsNodes} />
            </div>
          </Reveal>
        </section>
      )}

      {/* Skills */}
      <section id="skills" className="bg-muted/30 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader eyebrow={t("skills.eyebrow") || ""} title={t("skills.title") || ""} />
            <div className="grid gap-8 md:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.group}>
                  <h3 className="font-display text-lg font-semibold">{group.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Philosophy */}
      {principles.length > 0 && (
        <section id="philosophy" className="bg-background py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeader eyebrow={t("philosophy.eyebrow") || ""} title={t("philosophy.title") || ""} />
              <FeatureGrid
                items={principles.map((p) => ({ title: p.title, description: p.description }))}
                columns={3}
                variant="minimal"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Contact */}
      <ContactForm
        id="contact"
        eyebrow={t("contact.eyebrow") || ""}
        title={t("contact.title") || ""}
        subtitle={t("contact.subtitle") || ""}
        nameLabel={t("contact.nameLabel") || "Name"}
        emailLabel={t("contact.emailLabel") || "Email"}
        messageLabel={t("contact.messageLabel") || "Message"}
        submitLabel={t("contact.submitLabel") || "Send"}
        successMessage={t("contact.successMessage") || "Thanks for reaching out!"}
        details={contactDetails}
        onSubmit={handleContactSubmit}
        variant="split"
      />
    </main>
  );
}
