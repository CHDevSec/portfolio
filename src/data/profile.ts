export const profile = {
  name: 'Caio Henrique',
  handle: 'chdevsec',
  title: 'Senior Security Engineer',
  pitch: 'DevSecOps · Cloud Security · Vulnerability Management',
  tagline: '7+ years reducing risk at scale',
  location: 'Joinville, SC · Brasil',
  email: 'caiohenriquesinger@gmail.com',
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
      'Senior Security Engineer with 7+ years building security solutions that scale. I bridge offensive and defensive security to reduce risk without slowing engineering down.',
    long: [
      'I specialize in **Cloud Security**, **DevSecOps** and **Vulnerability Management** — embedding security from code to infrastructure without blocking the engineering team.',
      'My work spans CI/CD security automation, threat detection with SIEM and EDR/XDR, and Application Security via SAST, DAST and SCA — delivering continuous security through the SDLC.',
      'At frete.com I cut Ubuntu vulnerabilities **569k → 318k (−44%)** and shipped **SecScan**, a Go-based scanner adopted across 60%+ of the company\'s Go stack. I also built **CIS-Auditor**, a Linux hardening automation reaching 70% benchmark coverage.',
      'I am open to global Senior Security Engineer roles — particularly in high-performance environments where I can apply AWS, DevSecOps and security automation expertise to protect systems at scale.',
    ],
  },
} as const;

export type Profile = typeof profile;
