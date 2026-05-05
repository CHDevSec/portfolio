import type { Lang } from './i18n';

export type ExperienceI18n = {
  company: string;
  initials: string;
  sector: { en: string; pt: string };
  role: { en: string; pt: string };
  period: { en: string; pt: string };
  current?: boolean;
  location: string;
  tone: 'phosphor' | 'amber' | 'alert';
  bullets: { en: string[]; pt: string[] };
  stack: string[];
};

export const experience: ExperienceI18n[] = [
  {
    company: 'CHDevSec',
    initials: 'CH',
    sector: { en: 'Independent · Consulting', pt: 'Independente · Consultoria' },
    role: { en: 'Cybersecurity Consultant · Pentest & Cloud Security', pt: 'Consultor de Cibersegurança · Pentest & Cloud Security' },
    period: { en: 'Mar 2026 — Present', pt: 'Mar 2026 — Presente' },
    current: true,
    location: 'Joinville, SC',
    tone: 'phosphor',
    bullets: {
      en: [
        'Conduct pentests on web apps, APIs and cloud infrastructure — flagging critical findings before they become incidents.',
        'Implement Linux hardening with CIS controls — measurable attack-surface reduction across client environments.',
        'Deploy and tune Wazuh SIEM — continuous monitoring, correlation rules and threat detection.',
        'Structure vulnerability management with DefectDojo — risk-based prioritization and remediation tracking.',
        'Embed DevSecOps into CI/CD: SAST, SCA, IaC scanning and secrets detection — without slowing engineering.',
        'Ship Python / Bash / Go automations for scanning, reporting and auto-remediation.',
      ],
      pt: [
        'Conduzo pentests em aplicações web, APIs e infraestrutura cloud — identificando findings críticos antes que virem incidentes.',
        'Implemento Linux hardening com CIS controls — redução mensurável de superfície de ataque nos ambientes dos clientes.',
        'Deploy e tuning de Wazuh SIEM — monitoramento contínuo, regras de correlação e threat detection.',
        'Estruturo vulnerability management com DefectDojo — priorização baseada em risco e tracking de remediação.',
        'Integro DevSecOps em CI/CD: SAST, SCA, IaC scanning e secrets detection — sem travar engenharia.',
        'Desenvolvo automações em Python / Bash / Go para scanning, relatórios e auto-remediation.',
      ],
    },
    stack: ['Python', 'Go', 'Bash', 'Wazuh', 'DefectDojo', 'CIS Benchmarks', 'Linux'],
  },
  {
    company: 'frete.com',
    initials: 'FC',
    sector: { en: 'Logistics SaaS · Series C', pt: 'SaaS de Logística · Series C' },
    role: { en: 'Security Engineer · Cloud & DevSecOps', pt: 'Engenheiro de Segurança · Cloud & DevSecOps' },
    period: { en: 'Sep 2024 — Mar 2026 · 1y 7m', pt: 'Set 2024 — Mar 2026 · 1a 7m' },
    location: 'São Paulo, BR',
    tone: 'amber',
    bullets: {
      en: [
        'Reduced Ubuntu vulnerabilities **569k → 318k (−44%)** — beating corporate target by 151k via automation and CI/CD enforcement.',
        "Shipped **SecScan (Go)** — internal vulnerability scanner adopted across **60%+ of the company's Go stack**, slashing Snyk false positives and accelerating triage.",
        'Built **CIS-Auditor** — automation reaching **70% CIS Benchmark coverage** across Linux fleets.',
        'Integrated SIEM + EDR/XDR (Elastic, Wazuh, SentinelOne) — improving real-time detection and response.',
        'Implemented DevSecOps gates in CI/CD: SAST/SCA, IaC checks, secrets scanning, policy enforcement.',
        'Led end-to-end vulnerability management with risk-based prioritization across engineering teams.',
      ],
      pt: [
        'Reduzi vulnerabilidades Ubuntu **569k → 318k (−44%)** — superando a meta corporativa em 151k via automação e CI/CD enforcement.',
        'Desenvolvi o **SecScan (Go)** — scanner interno adotado em **60%+ do stack Go da empresa**, eliminando falsos positivos do Snyk e acelerando triagem.',
        'Criei o **CIS-Auditor** — automação atingindo **70% de cobertura do CIS Benchmark** em frotas Linux.',
        'Integrei SIEM + EDR/XDR (Elastic, Wazuh, SentinelOne) — melhorando detecção e resposta em tempo real.',
        'Implementei gates DevSecOps em CI/CD: SAST/SCA, IaC checks, secrets scanning, policy enforcement.',
        'Liderei vulnerability management end-to-end com priorização baseada em risco entre os times de engenharia.',
      ],
    },
    stack: ['Go', 'Python', 'AWS', 'Snyk', 'Elastic', 'Wazuh', 'SentinelOne', 'CIS', 'IaC'],
  },
  {
    company: 'Volt Sport',
    initials: 'VS',
    sector: { en: 'Sports Retail · Multi-branch', pt: 'Varejo Esportivo · Multi-filial' },
    role: { en: 'Security Engineer · Cloud & DevSecOps', pt: 'Engenheiro de Segurança · Cloud & DevSecOps' },
    period: { en: 'Jun 2023 — Aug 2024 · 1y 3m', pt: 'Jun 2023 — Ago 2024 · 1a 3m' },
    location: 'Joinville, SC',
    tone: 'phosphor',
    bullets: {
      en: [
        'Stood up **SOC with Wazuh** — ~80% visibility over 80 critical assets in a 400+ asset environment.',
        'Conducted infrastructure pentest — identified **16 critical vulnerabilities** with prioritized remediation roadmap.',
        'Cut attack surface across multiple branches with **Zero Trust architecture, Cloudflare WAF and infra hardening**.',
        'Implemented IAM governance and privileged access controls — scalable security policies.',
        'Authored Python / Bash / PowerShell automations for compliance and operational security.',
      ],
      pt: [
        'Implantei **SOC com Wazuh** — ~80% de visibilidade sobre 80 ativos críticos em ambiente com 400+ ativos.',
        'Conduzi pentest de infraestrutura — identifiquei **16 vulnerabilidades críticas** com roadmap de remediação priorizado.',
        'Reduzi superfície de ataque em múltiplas filiais com **arquitetura Zero Trust, Cloudflare WAF e hardening de infra**.',
        'Implementei IAM governance e controles de acesso privilegiado — políticas de segurança escaláveis.',
        'Desenvolvi automações em Python / Bash / PowerShell para compliance e segurança operacional.',
      ],
    },
    stack: ['Wazuh', 'Cloudflare WAF', 'Zero Trust', 'IAM', 'Python', 'PowerShell'],
  },
  {
    company: 'Evolution Soluções Empresariais',
    initials: 'EV',
    sector: { en: 'IT Services · Consulting', pt: 'Serviços de TI · Consultoria' },
    role: { en: 'Network & Infrastructure Analyst', pt: 'Analista de Rede & Infraestrutura' },
    period: { en: 'Jan 2023 — May 2023 · 5m', pt: 'Jan 2023 — Mai 2023 · 5m' },
    location: 'Joinville, SC',
    tone: 'amber',
    bullets: {
      en: [
        'Deployed **pfSense firewalls** with network segmentation, VPNs and **Suricata IDS/IPS** — **~70% attack-vector reduction** in client environments.',
        'Integrated Wazuh and firewall log monitoring — increased threat visibility and accelerated incident response.',
        'Managed IAM and Active Directory across multiple clients — applied least-privilege policies on servers and endpoints.',
        'Automated repeatable ops tasks and documented procedures — raised operational maturity for client infra.',
      ],
      pt: [
        'Implantei **firewalls pfSense** com segmentação de rede, VPNs e **Suricata IDS/IPS** — **~70% de redução de vetores de ataque** nos ambientes dos clientes.',
        'Integrei Wazuh e monitoramento de logs de firewall — aumentei visibilidade de ameaças e acelerei resposta a incidentes.',
        'Gerenciei IAM e Active Directory em múltiplos clientes — apliquei políticas de least-privilege em servidores e endpoints.',
        'Automatizei tarefas operacionais repetíveis e documentei procedimentos — elevei a maturidade operacional da infra dos clientes.',
      ],
    },
    stack: ['pfSense', 'Suricata', 'Wazuh', 'Active Directory', 'IAM', 'Bash'],
  },
  {
    company: 'Global Estratégias Financeiras',
    initials: 'GE',
    sector: { en: 'Fintech · Regulated', pt: 'Fintech · Regulada' },
    role: { en: 'Junior Cybersecurity Analyst', pt: 'Analista Jr. de Cibersegurança' },
    period: { en: 'Feb 2021 — Jan 2023 · 2y', pt: 'Fev 2021 — Jan 2023 · 2a' },
    location: 'Joinville, SC',
    tone: 'phosphor',
    bullets: {
      en: [
        'Managed **lifecycle of 500+ users** with IAM, Active Directory and RBAC in a regulated **fintech** environment — cut permission drift, raised compliance posture.',
        'Automated IAM reviews and offboarding — reduced manual error and improved access-control maturity.',
        'Hardened **3 critical Linux servers** with CIS Benchmarks and GPO — drove down vulnerabilities and improved policy alignment.',
        'Monitored endpoints with EDR (Bitdefender) and analyzed Windows Event Logs through SIEM (Wazuh) — strengthened detection in a sensitive financial-data environment.',
      ],
      pt: [
        'Gerenciei o **lifecycle de 500+ usuários** com IAM, Active Directory e RBAC em ambiente **fintech regulado** — reduzi permission drift e elevei a postura de compliance.',
        'Automatizei reviews de IAM e offboarding — reduzi erro manual e melhorei a maturidade do controle de acesso.',
        'Hardening de **3 servidores Linux críticos** com CIS Benchmarks e GPO — reduzi vulnerabilidades e alinhei com políticas internas.',
        'Monitorei endpoints com EDR (Bitdefender) e analisei Windows Event Logs via SIEM (Wazuh) — fortaleci detecção em ambiente com dados financeiros sensíveis.',
      ],
    },
    stack: ['IAM', 'Active Directory', 'RBAC', 'Bitdefender', 'Wazuh', 'CIS', 'Linux', 'GPO'],
  },
];

export const experienceFor = (lang: Lang) =>
  experience.map((e) => ({
    company: e.company,
    initials: e.initials,
    sector: e.sector[lang],
    role: e.role[lang],
    period: e.period[lang],
    current: e.current,
    location: e.location,
    tone: e.tone,
    bullets: e.bullets[lang],
    stack: e.stack,
  }));
