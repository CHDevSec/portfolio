export type SkillGroup = {
  title: string;
  icon: string; // icon component name
  items: string[];
  highlight?: boolean;
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'DevSecOps',
    icon: 'pipe',
    highlight: true,
    items: [
      'SAST · SCA · DAST',
      'Snyk · Checkmarx',
      'IaC Security (Kics, Polaris)',
      'CI/CD Gating',
      'Secrets Scanning',
      'Policy Enforcement',
    ],
  },
  {
    title: 'Cloud Security',
    icon: 'cloud',
    highlight: true,
    items: [
      'AWS — IAM · GuardDuty · CloudTrail · Inspector',
      'GCP Security',
      'Azure Security',
      'Docker · Kubernetes',
    ],
  },
  {
    title: 'AppSec',
    icon: 'shield',
    items: [
      'OWASP Top 10 · ASVS',
      'Threat Modeling',
      'API Security',
      'Dependency Security',
      'Secure SDLC',
    ],
  },
  {
    title: 'Vuln Mgmt & Hardening',
    icon: 'bug',
    highlight: true,
    items: [
      'Nessus · Qualys · DefectDojo',
      'CIS Benchmarks',
      'Ubuntu Hardening · STIG',
      'MITRE ATT&CK',
    ],
  },
  {
    title: 'SIEM & Detection',
    icon: 'eye',
    items: [
      'Elastic Stack',
      'Wazuh',
      'SentinelOne (EDR/XDR)',
      'Bitdefender',
      'Correlation rules · IR',
    ],
  },
  {
    title: 'Automation',
    icon: 'terminal',
    highlight: true,
    items: [
      'Python (primary)',
      'Go (SecScan, CIS-Auditor)',
      'Bash · PowerShell',
      'API integrations · CI/CD pipelines',
    ],
  },
  {
    title: 'Frameworks',
    icon: 'book',
    items: [
      'OWASP',
      'NIST CSF',
      'CIS Controls',
      'Zero Trust',
      'ISO/IEC 27001',
    ],
  },
  {
    title: 'OS & Infra',
    icon: 'server',
    items: [
      'Linux — Ubuntu/Debian/Arch (advanced)',
      'Windows Server',
      'Active Directory',
      'pfSense · Suricata',
      'Cloudflare WAF',
    ],
  },
];
