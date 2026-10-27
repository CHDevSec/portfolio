export const profile = {
  name: 'Caio Henrique',
  handle: 'chdevsec',
  title: 'Staff Security Engineer',
  pitch: 'DevSecOps · Cloud Security · Vulnerability Management',
  tagline: '7+ years reducing risk at scale',
  location: 'Joinville, SC · Brasil',
  email: 'chdevsec@gmail.com',
  phone: '+55 (47) 99665-1207',
  phoneHref: '+5547996651207',
  links: {
    linkedin: 'https://www.linkedin.com/in/caio-henrique-security',
    github: 'https://github.com/chdevsec',
    cv: '/portfolio/cv/CV-CaioHenrique-PT.pdf',
  },
  languages: [
    { name: 'Português', level: 'Native' },
    { name: 'English', level: 'Intermediate (B1)' },
  ],
  bio: {
    short:
      'Staff Security Engineer with 7+ years building security programs and tooling across AppSec, DevSecOps, cloud security, and vulnerability management.',
    long: [
      'I specialize in **Cloud Security**, **DevSecOps** and **Vulnerability Management** — embedding security from code to infrastructure without blocking the engineering team.',
      'My work spans CI/CD security automation, threat detection with SIEM and EDR/XDR, and Application Security via SAST, DAST and SCA — delivering continuous security through the SDLC.',
      'Most recently, I worked as a **Staff Security Engineer** at SoftExpert, connecting AppSec, AWS and Corporate IT risk, designing the target AppSec operating model, and auditing SAST governance.',
      'At frete.com I cut Ubuntu vulnerabilities **569k → 318k (−44%)** and shipped **SecScan**, a Go-based scanner adopted across 60%+ of the company\'s Go stack. I also built **CIS-Auditor**, a Linux hardening automation reaching 70% benchmark coverage.',
      'I am open to global Staff and senior security roles where I can apply AppSec, AWS, DevSecOps, and security engineering experience to reduce risk at scale.',
    ],
  },
} as const;

export type Profile = typeof profile;
