"use client";

import { ArrowRight, Briefcase, Code2, ExternalLink, Mail, MapPin, Milestone } from 'lucide-react';
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
              <div>
                <p className="mb-2 text-xs text-muted-foreground">playwright/tests/reset-password.spec.ts</p>
                <pre className="glass-strong overflow-x-auto rounded-xl p-6 font-mono text-sm leading-relaxed">
                  <code>
                    <span className="text-muted-foreground">{"// Verifies a user can reset their password end to end\n"}</span>
                    <span className="text-primary">import</span> {"{ test, expect } "}
                    <span className="text-primary">from</span> <span className="text-secondary">&apos;@playwright/test&apos;</span>;{"\n\n"}
                    <span className="text-primary">test</span>(<span className="text-secondary">&apos;user can reset password with a valid link&apos;</span>, <span className="text-primary">async</span> ({"{ page }"}) {"=> {"}{"\n"}
                    {"  "}<span className="text-primary">await</span> page.goto(<span className="text-secondary">&apos;/forgot-password&apos;</span>);{"\n"}
                    {"  "}<span className="text-primary">await</span> page.getByLabel(<span className="text-secondary">&apos;Email&apos;</span>).fill(<span className="text-secondary">&apos;qa.user@example.com&apos;</span>);{"\n"}
                    {"  "}<span className="text-primary">await</span> page.getByRole(<span className="text-secondary">&apos;button&apos;</span>, {"{ name: "}<span className="text-secondary">&apos;Send reset link&apos;</span>{" }"}).click();{"\n\n"}
                    {"  "}<span className="text-muted-foreground">{"// Confirmation state, not just a toast\n"}</span>
                    {"  "}<span className="text-primary">await</span> expect(page.getByText(<span className="text-secondary">&apos;Check your inbox&apos;</span>)).toBeVisible();{"\n\n"}
                    {"  "}<span className="text-primary">const</span> resetLink = <span className="text-primary">await</span> getLatestResetLink(<span className="text-secondary">&apos;qa.user@example.com&apos;</span>);{"\n"}
                    {"  "}<span className="text-primary">await</span> page.goto(resetLink);{"\n"}
                    {"  "}<span className="text-primary">await</span> page.getByLabel(<span className="text-secondary">&apos;New password&apos;</span>).fill(<span className="text-secondary">&apos;Str0ngPass!2&apos;</span>);{"\n"}
                    {"  "}<span className="text-primary">await</span> page.getByRole(<span className="text-secondary">&apos;button&apos;</span>, {"{ name: "}<span className="text-secondary">&apos;Update password&apos;</span>{" }"}).click();{"\n\n"}
                    {"  "}<span className="text-primary">await</span> expect(page).toHaveURL(<span className="text-secondary">&apos;/login&apos;</span>);{"\n"}
                    {"}"});{"\n"}
                  </code>
                </pre>
              </div>
              <AutomationDemoPanel checks={demoChecks} label={t("automation.demoLabel")} />
            </div>

            <div className="mt-12">
              <FeatureGrid items={featureItems} columns={3} variant="glass" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Professional experience */}
      <section id="experience" className="bg-background py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeader eyebrow={t("experience.eyebrow")} title={t("experience.title")} align="left" />
            <div className="mt-4">
              <p className="font-display text-xl font-semibold">{t("experience.role")}</p>
              <p className="text-muted-foreground">{t("experience.company")}</p>
            </div>

            <div className="relative mt-10 pl-8">
              <div aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
              <ul className="space-y-8">
                {experienceBullets.map((bullet, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-card text-primary">
                      <Milestone className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <p className="leading-relaxed text-muted-foreground">{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Case studies */}
      <section id="work" className="bg-muted/30 py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={t("caseStudiesSection.eyebrow")} title={t("caseStudiesSection.title")} subtitle={t("caseStudiesSection.subtitle")} />
            <div className="space-y-10">
              {caseStudies.map((study) => (
                <article
                  key={study.name}
                  className="surface-elevated rounded-2xl p-8 md:p-10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{study.tag}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">{study.name}</h3>
                    </div>
                    {study.url && (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        {study.url.replace("https://", "")}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.context")}</p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{study.context}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.challenge")}</p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.responsibility")}</p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{study.responsibility}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.approach")}</p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{study.approach}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.scenarios")}</p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {study.scenarios.map((scenario, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {scenario}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("caseStudiesSection.labels.tools")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {study.tools.map((tool) => (
                        <Badge key={tool} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-card/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("caseStudiesSection.labels.learned")}</p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{study.learned}</p>
                  </div>

                  {study.roadmap && study.roadmap.length > 0 && (
                    <div className="mt-8 rounded-xl border border-dashed border-muted-foreground/40 p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline">{t("caseStudiesSection.labels.current")}</Badge>
                        <Badge variant="outline" className="border-dashed text-muted-foreground">
                          {t("caseStudiesSection.labels.roadmap")}
                        </Badge>
                      </div>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {study.roadmap.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Systems tested */}
      <section id="systems" className="bg-background py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={t("systems.eyebrow")} title={t("systems.title")} subtitle={t("systems.subtitle")} />
            <SystemsGraph nodes={systemsNodes} />
          </div>
        </Reveal>
      </section>

      {/* Tools and skills */}
      <section id="skills" className="bg-muted/30 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader eyebrow={t("skills.eyebrow")} title={t("skills.title")} />
            <div className="grid gap-8 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.group} className="surface-elevated rounded-2xl p-6">
                  <h3 className="font-display text-base font-semibold">{group.group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="bg-mesh py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={t("philosophy.eyebrow")} title={t("philosophy.title")} />
            <div className="grid gap-6 sm:grid-cols-2">
              {principles.map((principle, i) => (
                <div key={principle.title} className="glass relative overflow-hidden rounded-2xl p-8 transition duration-200 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="pointer-events-none absolute -right-2 -top-6 font-display text-8xl font-bold text-foreground/5" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative font-display text-lg font-semibold">{principle.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <ContactForm
        id="contact"
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        nameLabel={t("contact.nameLabel")}
        emailLabel={t("contact.emailLabel")}
        messageLabel={t("contact.messageLabel")}
        submitLabel={t("contact.submitLabel")}
        successMessage={t("contact.successMessage")}
        errorMessage={t("contact.errorMessage")}
        details={contactDetails}
        onSubmit={handleContactSubmit}
        variant="split"
      />
    </main>
  );
}
