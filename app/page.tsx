"use client";

import { ArrowRight, Briefcase, CheckCircle2, Code2, ExternalLink, Mail, MapPin } from 'lucide-react';
import { useTranslations } from "next-intl";
import AutomationDemoPanel from "@/components/AutomationDemoPanel";
import ContactForm from "@/components/blocks/ContactForm";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import { Section, SectionHeader } from "@/components/blocks/shared";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import SystemsGraph from "@/components/SystemsGraph";
import TestingMatrix from "@/components/TestingMatrix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Page() {
  const t = useTranslations("portfolio");

  const aboutParagraphs = Array.isArray(t.raw("about.paragraphs")) ? (t.raw("about.paragraphs") as string[]) : [];
  const expertiseAreas = Array.isArray(t.raw("expertise.areas")) ? (t.raw("expertise.areas") as never[]) : [];
  const workflowSteps = Array.isArray(t.raw("automation.workflowSteps")) ? (t.raw("automation.workflowSteps") as string[]) : [];
  const demoChecks = Array.isArray(t.raw("automation.demoChecks")) ? (t.raw("automation.demoChecks") as never[]) : [];
  const automationCards = Array.isArray(t.raw("automation.cards"))
    ? (t.raw("automation.cards") as { title: string; description: string }[])
    : [];
  const experienceBullets = Array.isArray(t.raw("experience.bullets")) ? (t.raw("experience.bullets") as string[]) : [];
  const caseStudies = Array.isArray(t.raw("caseStudies")) ? (t.raw("caseStudies") as CaseStudy[]) : [];
  const systemsNodes = Array.isArray(t.raw("systems.nodes")) ? (t.raw("systems.nodes") as never[]) : [];
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
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("hero.eyebrow")}
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{t("hero.name")}</h1>
              <p className="mt-2 font-display text-2xl text-muted-foreground md:text-3xl">{t("hero.role")}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("hero.intro")}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="default" size="lg">
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
            </div>

            <HeroScene label={t("hero.threeDLabel")} />
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
            <p className="mt-8 text-sm font-medium text-primary">Based in Lahore, Pakistan · Currently at DaticsAI</p>
          </div>
        </Reveal>
      </section>

      {/* Testing expertise */}
      <Section id="expertise">
        <SectionHeader eyebrow={t("expertise.eyebrow")} title={t("expertise.title")} subtitle={t("expertise.subtitle")} />
        <TestingMatrix areas={expertiseAreas} />
      </Section>

      {/* Automation laboratory */}
      <Section id="automation" className="bg-mesh">
        <SectionHeader eyebrow={t("automation.eyebrow")} title={t("automation.title")} subtitle={t("automation.subtitle")} />
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {workflowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="glass rounded-full px-4 py-2 text-sm font-medium">{step}</span>
                {i < workflowSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">playwright/tests/reset-password.spec.ts</p>
            <pre className="glass-strong overflow-x-auto rounded-xl p-6 text-sm font-mono leading-relaxed text-foreground/90">
              <code>{t("automation.codeSample")}</code>
            </pre>
          </div>
          <AutomationDemoPanel checks={demoChecks} label={t("automation.demoLabel")} />
        </div>

        <div className="mt-12">
          <FeatureGrid items={featureItems} columns={3} variant="glass" />
        </div>
      </Section>

      {/* Professional experience */}
      <Section id="experience">
        <SectionHeader eyebrow={t("experience.eyebrow")} title={t("experience.title")} />
        <div className="mx-auto max-w-3xl space-y-4 border-l-2 border-primary/30 pl-6">
          <h3 className="font-display text-xl font-semibold">{t("experience.role")}</h3>
          <p className="text-sm font-medium text-primary">{t("experience.company")}</p>
          <ul className="mt-6 space-y-3">
            {experienceBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Case studies */}
      <Section id="work" className="bg-mesh">
        <SectionHeader eyebrow="Case Studies" title="Featured work" />
        {caseStudies.map((study) => {
          const roadmap = Array.isArray(study.roadmap) ? study.roadmap : [];
          return (
            <Card key={study.name} className="surface-elevated mb-8 p-8 last:mb-0 md:p-10">
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 p-0">
                <div className="flex items-center gap-3">
                  <CardTitle>{study.name}</CardTitle>
                  <Badge variant="secondary">{study.tag}</Badge>
                </div>
                {study.url && (
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Visit site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </CardHeader>
              <CardContent className="mt-6 space-y-6 p-0">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product context</p>
                    <p className="mt-2 text-muted-foreground">{study.context}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quality challenge</p>
                    <p className="mt-2 text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rao&apos;s responsibility</p>
                    <p className="mt-2 text-muted-foreground">{study.responsibility}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Testing approach</p>
                    <p className="mt-2 text-muted-foreground">{study.approach}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Important scenarios</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.scenarios.map((scenario) => (
                      <Badge key={scenario} variant="outline">
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools used</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What was learned</p>
                  <p className="mt-2 text-muted-foreground">{study.learned}</p>
                </div>

                {roadmap.length > 0 && (
                  <div className="rounded-lg border border-dashed border-secondary/50 bg-secondary/5 p-4">
                    <Badge variant="outline" className="mb-3">
                      Roadmap
                    </Badge>
                    <ul className="space-y-2">
                      {roadmap.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Section>

      {/* Systems tested */}
      <Section id="systems">
        <SectionHeader eyebrow={t("systems.eyebrow")} title={t("systems.title")} subtitle={t("systems.subtitle")} />
        <SystemsGraph nodes={systemsNodes} />
      </Section>

      {/* Tools & skills */}
      <Section id="skills" className="bg-mesh">
        <SectionHeader eyebrow={t("skills.eyebrow")} title={t("skills.title")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.group} className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold">{group.group}</h3>
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
      </Section>

      {/* Philosophy */}
      <Section id="philosophy">
        <SectionHeader eyebrow={t("philosophy.eyebrow")} title={t("philosophy.title")} />
        <div className="grid gap-6 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <div key={principle.title} className="rounded-xl border border-border bg-card p-6">
              <p className="font-display text-4xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-semibold">{principle.title}</h3>
              <p className="mt-2 text-muted-foreground">{principle.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <ContactForm
        id="contact"
        variant="split"
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
      />
    </main>
  );
}
