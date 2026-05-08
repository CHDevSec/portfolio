export type Lang = 'en' | 'pt';

export const langs: Lang[] = ['en', 'pt'];
export const defaultLang: Lang = 'en';

// Astro base URL ('/' in dev, '/portfolio/' in prod). Strip trailing slash for prefix use.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

// Strip the deploy base from a pathname so internal logic is base-agnostic.
// Returns a path that always starts with '/' and has no base prefix.
const stripBase = (pathname: string): string => {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
};

// Build localized URL from a base- and lang-free path. Returns full deploy URL with base + lang prefix.
// e.g. localizedUrl('/projects/secscan', 'pt') -> '/portfolio/pt/projects/secscan'
export const localizedUrl = (path: string, lang: Lang): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const langPath = lang === 'en' ? clean : `/pt${clean === '/' ? '' : clean}`;
  return `${BASE}${langPath}`;
};

// Strip both base and language prefix from a pathname. Always returns base-/lang-free path starting with '/'.
// Use to get the canonical "logical" path before re-localizing for the other language.
export const stripLang = (path: string): string => {
  const p = stripBase(path);
  if (p.startsWith('/pt/')) return p.slice(3) || '/';
  if (p === '/pt') return '/';
  return p;
};

// Detect lang from URL pathname (base-aware)
export const detectLang = (pathname: string): Lang => {
  const p = stripBase(pathname);
  if (p === '/pt' || p.startsWith('/pt/')) return 'pt';
  return 'en';
};

// Common UI strings
type StringMap = Record<Lang, string>;

export const t = {
  // Nav
  navExperience: { en: 'Experience', pt: 'Experiência' } satisfies StringMap,
  navMethod: { en: 'Method', pt: 'Método' } satisfies StringMap,
  navProjects: { en: 'Projects', pt: 'Projetos' } satisfies StringMap,
  navSkills: { en: 'Skills', pt: 'Stack' } satisfies StringMap,
  navCerts: { en: 'Certs', pt: 'Certs' } satisfies StringMap,
  navNotes: { en: 'Notes', pt: 'Notas' } satisfies StringMap,
  navCV: { en: '▼ CV', pt: '▼ CV' } satisfies StringMap,

  // Hero
  heroWelcome: { en: 'WELCOME TO MY PORTFOLIO', pt: 'BEM-VINDO AO MEU PORTFÓLIO' } satisfies StringMap,
  heroGreeting: { en: 'Hey there 👋', pt: 'Olá, tudo bem?' } satisfies StringMap,
  heroIntro: {
    en: "I'm Caio. Glad you stopped by — pull up a chair, take a look around.",
    pt: 'Sou o Caio. Que bom ter você aqui — fica à vontade pra dar uma olhada.',
  } satisfies StringMap,
  heroAvailable: { en: 'AVAILABLE FOR HIRE', pt: 'DISPONÍVEL PARA CONTRATAÇÃO' } satisfies StringMap,
  heroGlobal: { en: 'GLOBAL', pt: 'GLOBAL' } satisfies StringMap,
  heroRemote: { en: 'REMOTE', pt: 'REMOTO' } satisfies StringMap,
  heroTitle1: { en: 'SENIOR', pt: 'ENGENHEIRO DE' } satisfies StringMap,
  heroTitle2: { en: 'SECURITY ENGINEER', pt: 'SEGURANÇA SÊNIOR' } satisfies StringMap,
  heroPitchLine1: { en: 'DevSecOps · Cloud Security', pt: 'DevSecOps · Cloud Security' } satisfies StringMap,
  heroPitchLine2: { en: 'Vulnerability Management', pt: 'Vulnerability Management' } satisfies StringMap,
  heroTagline: { en: '7+ years reducing risk at scale', pt: '7+ anos reduzindo risco em escala' } satisfies StringMap,
  heroBio: {
    en: 'I build security solutions that **scale** — bridging offensive and defensive practice to cut risk without slowing engineering down. Specialized in Cloud Security, DevSecOps and Vulnerability Management.',
    pt: 'Construo soluções de segurança que **escalam** — unindo prática ofensiva e defensiva para reduzir risco sem travar o time de engenharia. Especializado em Cloud Security, DevSecOps e Vulnerability Management.',
  } satisfies StringMap,
  heroCtaHire: { en: '▸ Hire me', pt: '▸ Me contrate' } satisfies StringMap,
  heroCtaDownloadCV: { en: '▼ Download CV', pt: '▼ Baixar CV' } satisfies StringMap,
  heroCtaSeeProjects: { en: '› See projects', pt: '› Ver projetos' } satisfies StringMap,
  heroAvailableBadge: { en: 'AVAILABLE', pt: 'DISPONÍVEL' } satisfies StringMap,
  heroXP: { en: '7Y · XP', pt: '7A · XP' } satisfies StringMap,
  heroSeniorEng: { en: 'Senior Security Engineer', pt: 'Engenheiro de Segurança Sênior' } satisfies StringMap,

  // Hero v2 (redesign — additive, do not remove legacy keys above)
  heroStatusAvailable: {
    en: 'AVAILABLE FOR SENIOR ROLES · BR/REMOTE',
    pt: 'DISPONÍVEL PARA VAGAS SENIOR · BR/REMOTO',
  } satisfies StringMap,
  heroNameLabel: { en: '// Caio Henrique', pt: '// Caio Henrique' } satisfies StringMap,
  heroRoleLine1: { en: 'Senior', pt: 'Senior' } satisfies StringMap,
  heroRoleHighlight: { en: 'Security', pt: 'Security' } satisfies StringMap,
  heroRoleLine2: { en: 'Engineer', pt: 'Engineer' } satisfies StringMap,
  heroSubtitle: {
    en: 'AppSec · DevSecOps · Cloud · Backend (Go / Python)',
    pt: 'AppSec · DevSecOps · Cloud · Backend (Go / Python)',
  } satisfies StringMap,
  heroPitchPrimary: { en: 'I cut', pt: 'Cortei' } satisfies StringMap,
  heroPitchPrimaryMetric: { en: '569k → 318k vulns', pt: '569k → 318k vulns' } satisfies StringMap,
  heroPitchPrimaryRest: {
    en: 'across an Ubuntu fleet without blocking engineering.',
    pt: 'em uma frota Ubuntu sem travar a engenharia.',
  } satisfies StringMap,
  heroPitchSecondary: {
    en: '7 years shipping security at scale — from Go scanners to CI/CD pipelines. Open to senior roles.',
    pt: '7 anos entregando security em escala — de scanners em Go a pipelines de CI/CD. Aberto a vagas sênior.',
  } satisfies StringMap,
  heroCtaImpact: { en: '▸ SEE IMPACT', pt: '▸ VER IMPACTO' } satisfies StringMap,
  heroCtaCV: { en: '▸ CV', pt: '▸ CV' } satisfies StringMap,
  heroTrustLine: { en: 'Shipped at', pt: 'Operando em' } satisfies StringMap,
  heroTrustCompanies: {
    en: 'CHDEVSEC',
    pt: 'CHDEVSEC',
  } satisfies StringMap,
  heroAvatarAlt: {
    en: 'Caio Henrique, Senior DevSecOps Engineer',
    pt: 'Caio Henrique, Senior DevSecOps Engineer',
  } satisfies StringMap,
  heroVersionLabel: { en: 'v_7.2026', pt: 'v_7.2026' } satisfies StringMap,

  // Stats
  statYears: { en: 'Years in Sec Eng', pt: 'Anos em Sec Eng' } satisfies StringMap,
  statVulns: { en: 'Vulns reduced', pt: 'Vulns reduzidas' } satisfies StringMap,
  statGoStack: { en: 'Go stack coverage', pt: 'Cobertura stack Go' } satisfies StringMap,
  statCIS: { en: 'CIS hardening', pt: 'CIS hardening' } satisfies StringMap,
  statUsers: { en: 'Users IAM lifecycle', pt: 'Usuários IAM' } satisfies StringMap,
  statAssets: { en: 'Assets monitored', pt: 'Ativos monitorados' } satisfies StringMap,
  statCriticalCVEs: { en: 'Critical CVEs', pt: 'CVEs críticas' } satisfies StringMap,
  statAttackSurface: { en: 'Attack surface cut', pt: 'Superfície de ataque' } satisfies StringMap,
  statCompanies: { en: 'Companies', pt: 'Empresas' } satisfies StringMap,
  statProjects: { en: 'Security projects', pt: 'Projetos de segurança' } satisfies StringMap,
  statHintFinTech: { en: 'Fintech regulated', pt: 'Fintech regulada' } satisfies StringMap,
  statHintWazuhSOC: { en: 'Wazuh SOC, ~80% visibility', pt: 'Wazuh SOC, ~80% visibilidade' } satisfies StringMap,
  statHintInfraPentest: { en: 'Infra pentest', pt: 'Pentest de infra' } satisfies StringMap,
  statHintPfsense: { en: 'pfSense + Suricata', pt: 'pfSense + Suricata' } satisfies StringMap,
  statHintSince: { en: '2021 → present', pt: '2021 → presente' } satisfies StringMap,
  statHintProjects: { en: 'Tools, automations, audits', pt: 'Ferramentas, automações, auditorias' } satisfies StringMap,
  statHintCloudDevsec: { en: 'cloud · devsecops', pt: 'cloud · devsecops' } satisfies StringMap,
  statHintFrete: { en: '569k → 318k @ frete.com', pt: '569k → 318k @ frete.com' } satisfies StringMap,
  statHintSecScan: { en: 'SecScan tool', pt: 'Ferramenta SecScan' } satisfies StringMap,
  statHintCisAuditor: { en: 'CIS-Auditor', pt: 'CIS-Auditor' } satisfies StringMap,
  impactMeasured: { en: '// IMPACT · MEASURED', pt: '// IMPACTO · MENSURADO' } satisfies StringMap,

  // Sections
  experienceEyebrow: { en: '// EXPERIENCE', pt: '// EXPERIÊNCIA' } satisfies StringMap,
  experienceTitle: { en: 'Career timeline', pt: 'Linha do tempo' } satisfies StringMap,
  experienceSubtitle: {
    en: 'Five companies, one focus: cut risk at scale without blocking engineering.',
    pt: 'Cinco empresas, um foco: reduzir risco em escala sem travar engenharia.',
  } satisfies StringMap,
  liveBadge: { en: 'LIVE', pt: 'ATIVO' } satisfies StringMap,

  methodEyebrow: { en: '// METHODOLOGY · HOW I WORK', pt: '// METODOLOGIA · COMO TRABALHO' } satisfies StringMap,
  methodTitle: { en: 'Three principles, every engagement', pt: 'Três princípios, todo projeto' } satisfies StringMap,
  methodSubtitle: {
    en: 'The rules I learned shipping security at scale — and why they hold up under pressure.',
    pt: 'As regras que aprendi entregando segurança em escala — e por que aguentam sob pressão.',
  } satisfies StringMap,

  projectsEyebrow: { en: '// PROJECTS · CASE STUDIES', pt: '// PROJETOS · CASE STUDIES' } satisfies StringMap,
  projectsTitle: { en: "Things I've shipped", pt: 'O que entreguei' } satisfies StringMap,
  projectsSubtitle: {
    en: 'Each project ships with the problem, the approach, the outcome and the metric. No vague descriptions.',
    pt: 'Cada projeto vem com o problema, a abordagem, o resultado e a métrica. Sem descrições vagas.',
  } satisfies StringMap,
  projectsMoreWork: { en: '▸ MORE WORK', pt: '▸ MAIS TRABALHO' } satisfies StringMap,

  testimonialsEyebrow: { en: '// SOCIAL PROOF · WHAT PEOPLE SAY', pt: '// PROVA SOCIAL · O QUE DIZEM' } satisfies StringMap,
  testimonialsTitle: { en: 'References & recommendations', pt: 'Referências e recomendações' } satisfies StringMap,
  testimonialsSubtitle: {
    en: 'LinkedIn recommendations and engagement quotes. More published as engagements close.',
    pt: 'Recomendações do LinkedIn e citações de engajamentos. Mais conforme novos projetos fecham.',
  } satisfies StringMap,
  testimonialsRecSlot: { en: '▢ Recommendation slot', pt: '▢ Espaço para recomendação' } satisfies StringMap,
  testimonialsRecAvailable: { en: '— available', pt: '— disponível' } satisfies StringMap,
  testimonialsRecPrompt: {
    en: 'Worked with Caio at _______? Open to drop a recommendation here. The slot is yours.',
    pt: 'Trabalhou com o Caio em _______? Pode deixar uma recomendação aqui. O espaço é seu.',
  } satisfies StringMap,
  testimonialsRecLinkedIn: { en: '▸ Recommend on LinkedIn →', pt: '▸ Recomendar no LinkedIn →' } satisfies StringMap,
  testimonialsTrusted: { en: '▸ TRUSTED IN PRODUCTION ACROSS', pt: '▸ EM PRODUÇÃO EM' } satisfies StringMap,

  skillsEyebrow: { en: '// STACK', pt: '// STACK' } satisfies StringMap,
  skillsTitle: { en: 'What I work with', pt: 'Com o que trabalho' } satisfies StringMap,
  skillsSubtitle: {
    en: 'Grouped by domain, not by self-rated percentages — these are the tools and frameworks I ship with.',
    pt: 'Agrupado por domínio, não por porcentagens auto-atribuídas — são as ferramentas e frameworks que uso em produção.',
  } satisfies StringMap,
  primaryStackTitle: { en: 'PRIMARY STACK', pt: 'STACK PRIMÁRIA' } satisfies StringMap,
  primaryStackLanguagesLabel: { en: 'LANGUAGES', pt: 'LINGUAGENS' } satisfies StringMap,
  primaryStackPlatformsLabel: { en: 'PLATFORMS', pt: 'PLATAFORMAS' } satisfies StringMap,
  primaryStackToolingLabel: { en: 'TOOLING', pt: 'FERRAMENTAS' } satisfies StringMap,
  primaryStackPrimaryTag: { en: '(primary)', pt: '(principal)' } satisfies StringMap,
  primaryStackFooter: { en: 'USED IN PRODUCTION DAILY', pt: 'EM PRODUÇÃO TODOS OS DIAS' } satisfies StringMap,
  skillsLanguagesBgSubtitle: { en: 'Systems · Offensive · Windows ops', pt: 'Systems · Offensive · Windows ops' } satisfies StringMap,

  certsEyebrow: { en: '// CERTS · EDU', pt: '// CERTS · FORMAÇÃO' } satisfies StringMap,
  certsTitle: { en: 'Credentials', pt: 'Credenciais' } satisfies StringMap,
  certsSubtitleA: { en: 'completed certifications and', pt: 'certificações concluídas e' } satisfies StringMap,
  certsSubtitleB: { en: 'in active study.', pt: 'em estudo ativo.' } satisfies StringMap,
  certsEducation: { en: '▸ EDUCATION', pt: '▸ FORMAÇÃO' } satisfies StringMap,
  certsCompleted: { en: '▸ COMPLETED', pt: '▸ CONCLUÍDAS' } satisfies StringMap,
  certsInProgress: { en: 'IN PROGRESS', pt: 'EM ANDAMENTO' } satisfies StringMap,
  certsStatusCompleted: { en: 'COMPLETED', pt: 'CONCLUÍDO' } satisfies StringMap,
  certsInProgressDot: { en: '▸ IN PROGRESS', pt: '▸ EM ANDAMENTO' } satisfies StringMap,

  contactEyebrow: { en: '// REACH OUT', pt: '// CONTATO' } satisfies StringMap,
  contactTitle: { en: "Let's talk security", pt: 'Vamos conversar sobre segurança' } satisfies StringMap,
  contactSubtitle: {
    en: "Open to Senior Security Engineer roles, consulting engagements and pentest scopes. Reply usually within 24h.",
    pt: 'Aberto a vagas de Engenheiro de Segurança Sênior, consultoria e escopos de pentest. Resposta normalmente em até 24h.',
  } satisfies StringMap,
  contactDirect: { en: '▸ DIRECT', pt: '▸ DIRETO' } satisfies StringMap,
  contactEmailLabel: { en: 'Email', pt: 'Email' } satisfies StringMap,
  contactPhoneLabel: { en: 'Phone', pt: 'Telefone' } satisfies StringMap,
  contactLocationLabel: { en: 'Location', pt: 'Localização' } satisfies StringMap,
  contactCopy: { en: 'COPY ▸', pt: 'COPIAR ▸' } satisfies StringMap,
  contactCopied: { en: 'COPIED ✓', pt: 'COPIADO ✓' } satisfies StringMap,
  contactSendEmail: { en: 'Send email', pt: 'Enviar email' } satisfies StringMap,
  contactLinkedIn: { en: 'LinkedIn', pt: 'LinkedIn' } satisfies StringMap,
  leadFreePlaybook: { en: '▸ FREE PLAYBOOK', pt: '▸ PLAYBOOK GRÁTIS' } satisfies StringMap,
  leadTitle: { en: 'Linux Hardening Checklist', pt: 'Linux Hardening Checklist' } satisfies StringMap,
  leadDesc: {
    en: '7 CIS controls most teams skip — with the exact commands, the rationale and the gotchas. Used in production at companies running 400+ assets.',
    pt: '7 controles CIS que a maioria dos times pula — com os comandos exatos, o porquê e as pegadinhas. Em produção em empresas com 400+ ativos.',
  } satisfies StringMap,
  leadBullet1: { en: '› SSH config and auth hardening', pt: '› Hardening de SSH e autenticação' } satisfies StringMap,
  leadBullet2: { en: '› Filesystem mount options that actually matter', pt: '› Opções de mount de filesystem que realmente importam' } satisfies StringMap,
  leadBullet3: { en: "› Audit daemon setup that won't drown you", pt: '› Setup do audit daemon sem afogar em logs' } satisfies StringMap,
  leadBullet4: { en: '› Sysctl baseline for production hosts', pt: '› Baseline sysctl para hosts de produção' } satisfies StringMap,
  leadBullet5: { en: '› + 3 more', pt: '› + 3 outros' } satisfies StringMap,
  leadCta: { en: '▼ Email me the checklist', pt: '▼ Me envie o checklist' } satisfies StringMap,
  leadCtaSubject: { en: 'Send me the Linux Hardening Checklist', pt: 'Me envie o Linux Hardening Checklist' } satisfies StringMap,
  leadCtaBody: {
    en: 'Hey Caio, please send me the Linux Hardening Checklist (47 CIS controls).\n\nMy role / company: \n',
    pt: 'Oi Caio, por favor me envie o Linux Hardening Checklist (47 controles CIS).\n\nMinha função / empresa: \n',
  } satisfies StringMap,
  leadDisclaimer: {
    en: 'Quick reply with the PDF — usually within a few hours. No mailing list, no spam.',
    pt: 'Resposta rápida com o PDF — normalmente em poucas horas. Sem mailing list, sem spam.',
  } satisfies StringMap,

  // Footer
  footerReach: { en: '// Reach', pt: '// Contato' } satisfies StringMap,
  footerOpenTo: { en: '// Open to', pt: '// Aberto a' } satisfies StringMap,
  footerOpenToDesc: {
    en: 'Senior Security Engineer roles — global, high-performance environments. Cloud Security · DevSecOps · Vulnerability Management.',
    pt: 'Vagas de Engenheiro de Segurança Sênior — ambientes globais e de alta performance. Cloud Security · DevSecOps · Vulnerability Management.',
  } satisfies StringMap,
  footerHireMe: { en: '▸ Hire me →', pt: '▸ Me contrate →' } satisfies StringMap,
  footerBuilt: { en: 'Built with Astro · Tailwind · pixels.', pt: 'Construído com Astro · Tailwind · pixels.' } satisfies StringMap,
  footerNoCookies: { en: '⌬ no cookies · no trackers · self-hosted', pt: '⌬ sem cookies · sem trackers · self-hosted' } satisfies StringMap,

  // 404
  notFoundTitle: { en: 'Page not found', pt: 'Página não encontrada' } satisfies StringMap,
  notFoundDesc: {
    en: "The page you tried to reach doesn't exist — or was moved during a hardening sweep.",
    pt: 'A página que você tentou acessar não existe — ou foi movida durante um hardening sweep.',
  } satisfies StringMap,
  notFoundHome: { en: '▸ Back to home', pt: '▸ Voltar pro início' } satisfies StringMap,
  notFoundNotes: { en: '▢ Read notes', pt: '▢ Ler notas' } satisfies StringMap,

  // Blog
  blogTitle: { en: 'Notes from the trenches', pt: 'Notas da trincheira' } satisfies StringMap,
  blogEyebrow: { en: '// NOTES', pt: '// NOTAS' } satisfies StringMap,
  blogSubtitle: {
    en: 'Practical posts on Linux hardening, DevSecOps, and security engineering.',
    pt: 'Posts práticos sobre Linux hardening, DevSecOps e engenharia de segurança.',
  } satisfies StringMap,
  blogBack: { en: '← BACK TO NOTES', pt: '← VOLTAR PARA AS NOTAS' } satisfies StringMap,
  blogMore: { en: 'Want more like this?', pt: 'Quer mais conteúdo assim?' } satisfies StringMap,
  blogMoreDesc: {
    en: 'Free Linux Hardening Checklist — 47 CIS controls, real commands.',
    pt: 'Linux Hardening Checklist grátis — 47 controles CIS, comandos reais.',
  } satisfies StringMap,
  blogGetChecklist: { en: '▼ Get the checklist', pt: '▼ Pegar o checklist' } satisfies StringMap,

  // Project page
  projectBack: { en: '← BACK TO PROJECTS', pt: '← VOLTAR PARA PROJETOS' } satisfies StringMap,
  projectFooterTitle: { en: 'Want results like this in your environment?', pt: 'Quer resultados assim no seu ambiente?' } satisfies StringMap,
  projectFooterDesc: {
    en: 'Available for Senior Security Engineer roles · DevSecOps consulting · Pentest engagements.',
    pt: 'Disponível para vagas Sênior · Consultoria DevSecOps · Engajamentos de Pentest.',
  } satisfies StringMap,
  projectCtaTalk: { en: "▸ Let's talk", pt: '▸ Vamos conversar' } satisfies StringMap,
  projectCtaMoreWork: { en: '› See more work', pt: '› Ver mais trabalhos' } satisfies StringMap,
  projectRepoLabel: { en: '▸ View source', pt: '▸ Ver código' } satisfies StringMap,
  projectProofsTitle: { en: 'Proof of work', pt: 'Prova de funcionamento' } satisfies StringMap,

  // Project category labels
  catDevsecops: { en: 'DEVSECOPS', pt: 'DEVSECOPS' } satisfies StringMap,
  catCloud: { en: 'CLOUD', pt: 'CLOUD' } satisfies StringMap,
  catSoc: { en: 'SOC', pt: 'SOC' } satisfies StringMap,
  catPentest: { en: 'PENTEST', pt: 'PENTEST' } satisfies StringMap,
  catAutomation: { en: 'AUTOMATION', pt: 'AUTOMAÇÃO' } satisfies StringMap,
  catConsulting: { en: 'CONSULTING', pt: 'CONSULTORIA' } satisfies StringMap,
  catFeatured: { en: '★ FEATURED', pt: '★ DESTAQUE' } satisfies StringMap,
  cardRead: { en: 'READ →', pt: 'LER →' } satisfies StringMap,

  // Cert categories
  catRed: { en: 'RED TEAM', pt: 'RED TEAM' } satisfies StringMap,
  catBlue: { en: 'BLUE TEAM', pt: 'BLUE TEAM' } satisfies StringMap,
  catGeneral: { en: 'GENERAL', pt: 'GERAL' } satisfies StringMap,
  catNetworking: { en: 'NETWORKING', pt: 'NETWORKING' } satisfies StringMap,

  // Method principles
  methodP1Title: { en: 'Block on signal', pt: 'Bloqueia no sinal' } satisfies StringMap,
  methodP1Body: {
    en: "Security gates fail builds only on real, exploitable findings — never on noise. Engineers stop bypassing security when security stops crying wolf.",
    pt: 'Gates de segurança falham builds apenas em findings reais e exploráveis — nunca em ruído. Engenheiros param de burlar segurança quando segurança para de gritar lobo.',
  } satisfies StringMap,
  methodP1Stat: { en: 'False positives at frete.com', pt: 'Falsos positivos na frete.com' } satisfies StringMap,
  methodP2Title: { en: 'Ship the diff', pt: 'Entregue o diff' } satisfies StringMap,
  methodP2Body: {
    en: "Every Friday: closed N this week, introduced M, net -X. Engineering leads compete on the leaderboard. Vulnerabilities go from 'scary big number' to 'visible curve trending down'.",
    pt: 'Toda sexta: fechadas N esta semana, introduzidas M, net -X. Tech leads competem no ranking. Vulnerabilidades passam de "número grande assustador" para "curva visível caindo".',
  } satisfies StringMap,
  methodP2Stat: { en: 'Vulns over 9 months', pt: 'Vulns em 9 meses' } satisfies StringMap,
  methodP3Title: { en: 'Earn engineering trust', pt: 'Ganhe a confiança da engenharia' } satisfies StringMap,
  methodP3Body: {
    en: 'Before scaling a scanner, talk to 2–3 senior engineers about what should NOT trip it. Their answers (false positives, runtime cost, language quirks) are the configuration security needs.',
    pt: 'Antes de escalar um scanner, converse com 2–3 engenheiros sêniors sobre o que NÃO deve disparar. As respostas (falsos positivos, custo de runtime, peculiaridades de linguagem) são a config que segurança precisa.',
  } satisfies StringMap,
  methodP3Stat: { en: 'SecScan voluntary adoption', pt: 'Adoção voluntária do SecScan' } satisfies StringMap,

  // Lang switcher
  switchToPT: { en: 'Português', pt: 'Português' } satisfies StringMap,
  switchToEN: { en: 'English', pt: 'English' } satisfies StringMap,
};

export const tr = (key: keyof typeof t, lang: Lang): string => t[key][lang];
