export type Stat = {
  value: string;
  label: string;
  hint?: string;
  tone?: 'phosphor' | 'amber' | 'alert' | 'ink';
};

export const heroStats: Stat[] = [
  { value: '7+', label: 'Years in Sec Eng', tone: 'phosphor' },
  { value: '−44%', label: 'Vulns reduced', hint: '569k → 318k @ frete.com', tone: 'amber' },
  { value: '60%+', label: 'Go stack coverage', hint: 'SecScan tool', tone: 'phosphor' },
  { value: '70%', label: 'CIS hardening', hint: 'CIS-Auditor', tone: 'phosphor' },
];

export const deepStats: Stat[] = [
  { value: '500+', label: 'Users IAM lifecycle', hint: 'Fintech regulated', tone: 'amber' },
  { value: '400+', label: 'Assets monitored', hint: 'Wazuh SOC, ~80% visibility', tone: 'phosphor' },
  { value: '16', label: 'Critical CVEs', hint: 'Infra pentest', tone: 'alert' },
  { value: '~70%', label: 'Attack surface cut', hint: 'pfSense + Suricata', tone: 'amber' },
  { value: '5', label: 'Companies', hint: '2021 → present', tone: 'ink' },
  { value: '15+', label: 'Security projects', hint: 'Tools, automations, audits', tone: 'phosphor' },
];
