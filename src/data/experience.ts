import type { Lang } from './i18n';

export type ExperienceI18n = {
  company: string;
  initials: string;
  logo?: string;
  url?: string;
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
    logo: '/portfolio/company/chdevsec.png',
    url: 'https://chdevsec.com.br/',
    sector: { en: 'Independent · Consulting', pt: 'Independente · Consultoria' },
    role: { en: 'Specialist Consultant · Security Engineering', pt: 'Consultor Especialista · Security Engineering' },
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
        'Faço deploy e tuning de Wazuh SIEM — monitoramento contínuo, regras de correlação e threat detection.',
        'Estruturo vulnerability management com DefectDojo — priorização baseada em risco e acompanhamento da remediação.',
        'Integro DevSecOps em CI/CD: SAST, SCA, IaC scanning e secrets detection — sem travar engenharia.',
        'Desenvolvo automações em Python / Bash / Go para scanning, relatórios e auto-remediation.',
      ],
    },
    stack: ['Python', 'Go', 'Bash', 'Wazuh', 'DefectDojo', 'Cloudflare WAF', 'OWASP', 'ISO 27001', 'CIS Benchmarks', 'Linux'],
  },
  {
    company: 'SoftExpert',
    initials: 'SE',
    logo: '/portfolio/company/softexpert.svg',
    url: 'https://www.softexpert.com',
    sector: { en: 'Enterprise Software · ECM/BPM', pt: 'Software Corporativo · ECM/BPM' },
    role: {
      en: 'Staff Security Engineer · Principal Security Architect',
      pt: 'Staff Security Engineer · Principal Security Architect',
    },
    period: { en: 'Jul 2026 — Aug 2026 · 2m · fixed scope', pt: 'Jul 2026 — Ago 2026 · 2m · escopo fechado' },
    location: 'Joinville, SC · Hybrid',
    tone: 'phosphor',
    bullets: {
      en: [
        'Principal security technical reference for the technology division (**120+ professionals**), bridging CloudOps, Architecture and Corporate IT with Governance through influence and enablement — reporting directly to the **CTO**.',
        'Ran a security risk assessment across three fronts — **AppSec, Cloud (AWS) and Corporate IT** — surveying processes, architecture, vulnerabilities and risks for business-impact-based prioritization.',
        "Designed the company's **AppSec architecture and workflow**, from code to vulnerability management, covering triage, prioritization and severity-based remediation SLAs.",
        'Led an end-to-end audit of **SAST governance (GitLab)**, identifying a structural **fail-open gate flaw** that allowed merges without effective blocking of vulnerabilities.',
        'Built a triage methodology based on **data-flow analysis (source→flow→sink)**, separating exploitable vulnerabilities from false positives and cutting SAST noise.',
        'Translated SAST findings and residual risk into actionable plans for each team\'s own pipelines, mapped against **NIST CSF 2.0 and ISO 27001**.',
      ],
      pt: [
        'Referência técnica principal de segurança da diretoria de tecnologia (**120+ profissionais**), fazendo a ponte entre CloudOps, Arquitetura e TI Corporativa e a Governança por influência e capacitação — reportando direto ao **CTO**.',
        'Conduzi avaliação de risco de segurança em três frentes — **AppSec, Cloud (AWS) e TI Corporativa** — levantando processos, arquitetura, vulnerabilidades e riscos para priorização por impacto no negócio.',
        'Desenhei a **arquitetura e o fluxo de AppSec** da empresa, do código à gestão de vulnerabilidades, cobrindo triagem, priorização e SLAs de correção por severidade.',
        'Liderei auditoria ponta a ponta da **governança de SAST (GitLab)**, identificando uma falha estrutural de **gate fail-open** que permitia merges sem bloqueio efetivo de vulnerabilidades.',
        'Criei metodologia de triagem baseada em **análise de fluxo de dados (source→flow→sink)**, separando vulnerabilidades exploráveis de falsos positivos e reduzindo o ruído do SAST.',
        'Traduzi achados de SAST e risco residual em planos acionáveis para os pipelines de cada time, mapeados contra **NIST CSF 2.0 e ISO 27001**.',
      ],
    },
    stack: ['SAST', 'GitLab CI', 'AWS', 'AppSec', 'NIST CSF 2.0', 'ISO 27001', 'Threat Modeling', 'Vulnerability Management'],
  },
  {
    company: 'frete.com',
    initials: 'FC',
    logo: '/portfolio/company/frete.png',
    url: 'https://frete.com',
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
        'Integrated SIEM + EDR/XDR (Wazuh, SentinelOne) — improving real-time detection and response.',
        'Implemented DevSecOps gates in CI/CD: SAST/SCA, IaC checks, secrets scanning, policy enforcement.',
        'Led end-to-end vulnerability management with risk-based prioritization across engineering teams.',
      ],
      pt: [
        'Reduzi vulnerabilidades Ubuntu **569k → 318k (−44%)** — superando a meta corporativa em 151k via automação e CI/CD enforcement.',
        'Desenvolvi o **SecScan (Go)** — scanner interno adotado em **60%+ do stack Go da empresa**, eliminando falsos positivos do Snyk e acelerando triagem.',
        'Criei o **CIS-Auditor** — automação atingindo **70% de cobertura do CIS Benchmark** em frotas Linux.',
        'Integrei SIEM + EDR/XDR (Wazuh, SentinelOne) — melhorando detecção e resposta em tempo real.',
        'Implementei gates DevSecOps em CI/CD: SAST/SCA, IaC checks, secrets scanning, policy enforcement.',
        'Liderei o vulnerability management de ponta a ponta, com priorização baseada em risco entre os times de engenharia.',
      ],
    },
    stack: ['Go', 'Python', 'AWS', 'GCP', 'Akamai', 'Netskope', 'Snyk', 'Wazuh', 'SentinelOne', 'CIS', 'IaC'],
  },
  {
    company: 'Volt Sport',
    initials: 'VS',
    logo: '/portfolio/company/logo-volt.svg',
    url: 'https://www.voltsport.com.br/',
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
    stack: ['Wazuh', 'Elastic', 'Bitdefender', 'Cloudflare WAF', 'Zero Trust', 'IAM', 'Python', 'PowerShell'],
  },
  {
    company: 'Evolution Soluções Empresariais',
    initials: 'EV',
    logo: '/portfolio/company/evolutionsul.avif',
    url: 'https://www.evolutionsul.com.br/',
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
    stack: ['pfSense', 'Suricata', 'Wazuh', 'Bitdefender', 'Active Directory', 'IAM', 'Bash'],
  },
  {
    company: 'Global Estratégias Financeiras',
    initials: 'GE',
    logo: '/portfolio/company/global.png',
    url: 'https://somosglobal.com.br/',
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
        'Gerenciei o **ciclo de vida de 500+ usuários** com IAM, Active Directory e RBAC em ambiente **fintech regulado** — reduzi permission drift e elevei a postura de compliance.',
        'Automatizei as revisões de IAM e o offboarding — reduzi erro manual e melhorei a maturidade do controle de acesso.',
        'Apliquei hardening em **3 servidores Linux críticos** com CIS Benchmarks e GPO — reduzi vulnerabilidades e alinhei com políticas internas.',
        'Monitorei endpoints com EDR (Bitdefender) e analisei Windows Event Logs via SIEM (Wazuh) — fortaleci detecção em ambiente com dados financeiros sensíveis.',
      ],
    },
    stack: ['IAM', 'Active Directory', 'RBAC', 'Bitdefender', 'Wazuh', 'CIS', 'Linux', 'GPO'],
  },
  {
    company: 'CHDevSec',
    initials: 'CH',
    logo: '/portfolio/company/chdevsec.png',
    url: 'https://chdevsec.com.br/',
    sector: { en: 'Independent · Early Career', pt: 'Independente · Carreira Inicial' },
    role: {
      en: 'Junior Pentester · Infrastructure',
      pt: 'Pentester Jr. · Infraestrutura',
    },
    period: { en: 'Jan 2018 — Dec 2019 · 2y', pt: 'Jan 2018 — Dez 2019 · 2a' },
    location: 'Joinville, SC',
    tone: 'amber',
    bullets: {
      en: [
        'Conducted **network penetration tests** for closed-scope clients — identifying critical vulnerabilities before they became incidents.',
        'Built and hardened **Linux-based infrastructure** (servers, networking, baseline hardening) for SMB clients across multiple sectors.',
        'Developed **embedded systems and firmware** — IoT devices and custom hardware integrations with security-first design.',
        'Operated end-to-end as solo consultant: scoping, execution, reporting and remediation guidance.',
        "Foundation of what would become CHDevSec's senior consulting practice years later.",
      ],
      pt: [
        'Conduzi **testes de invasão em redes** para clientes de escopo fechado — identificando vulnerabilidades críticas antes que virassem incidentes.',
        'Construí e apliquei hardening em **infraestrutura Linux** (servidores, rede, hardening de baseline) para pequenas e médias empresas de vários setores.',
        'Desenvolvi **sistemas embarcados e firmware** — dispositivos IoT e integrações de hardware customizadas com design security-first.',
        'Atuei de ponta a ponta como consultor solo: escopo, execução, relatório e orientação de remediação.',
        'Fundação do que viria a ser a prática consultiva sênior da CHDevSec anos depois.',
      ],
    },
    stack: ['Linux', 'Networking', 'Bash', 'C', 'Python', 'Embedded', 'Pentest', 'IoT'],
  },
];

export const experienceFor = (lang: Lang) =>
  experience.map((e) => ({
    company: e.company,
    initials: e.initials,
    logo: e.logo,
    url: e.url,
    sector: e.sector[lang],
    role: e.role[lang],
    period: e.period[lang],
    current: e.current,
    location: e.location,
    tone: e.tone,
    bullets: e.bullets[lang],
    stack: e.stack,
  }));
