export type Cert = {
  name: string;
  issuer: string;
  date: string;
  status: 'completed' | 'in-progress';
  category: 'red' | 'blue' | 'devsecops' | 'general' | 'networking';
};

export const certs: Cert[] = [
  // Completed
  { name: 'Certified Red Team Analyst (CRTA)', issuer: 'CWL', date: 'Jul 2024', status: 'completed', category: 'red' },
  { name: 'Ethical Hacking', issuer: 'Cisco', date: 'Aug 2024', status: 'completed', category: 'red' },
  { name: 'Ethical Hacking Essentials (EHE)', issuer: 'EC-Council', date: 'Jan 2024', status: 'completed', category: 'red' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Feb 2024', status: 'completed', category: 'general' },
  { name: 'Introduction to Hacking & Pentest 2.0', issuer: 'Solyd', date: 'May 2024', status: 'completed', category: 'red' },
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'Udemy', date: 'Apr 2024', status: 'completed', category: 'red' },
  { name: 'SOC — Threat Hunting', issuer: 'Udemy', date: 'Apr 2024', status: 'completed', category: 'blue' },
  { name: 'SIEM · EDR · XDR', issuer: 'Udemy', date: 'Jun 2024', status: 'completed', category: 'blue' },
  { name: 'ISO/IEC 27001 Foundation', issuer: 'SkillFront', date: 'Feb 2023', status: 'completed', category: 'general' },
  { name: 'Wireshark — Analyzing Network Attacks', issuer: 'Udemy', date: 'Jun 2024', status: 'completed', category: 'networking' },
  { name: 'Elastic Stack / Elasticsearch', issuer: 'Udemy', date: '2024', status: 'completed', category: 'blue' },
  { name: 'Cybersecurity Awareness (CAPC)', issuer: 'CertiProf', date: '2024', status: 'completed', category: 'general' },
  { name: 'Python Essentials 1', issuer: 'Cisco / OpenEDG', date: '2024', status: 'completed', category: 'devsecops' },
  // In-progress
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', date: 'In progress', status: 'in-progress', category: 'red' },
  { name: 'CompTIA Security+ (SY0-701)', issuer: 'CompTIA', date: 'In progress', status: 'in-progress', category: 'general' },
  { name: 'CCST Cybersecurity', issuer: 'Cisco', date: 'In progress', status: 'in-progress', category: 'blue' },
  { name: 'CCST Networking', issuer: 'Cisco', date: 'In progress', status: 'in-progress', category: 'networking' },
  { name: 'LPIC-1', issuer: 'LPI', date: 'In progress', status: 'in-progress', category: 'devsecops' },
];

export const education = [
  {
    school: 'UNINTER — Centro Universitário Internacional',
    degree: "Bachelor's, Software Engineering",
    period: 'Jul 2024 — Jun 2028',
    status: 'in-progress' as const,
  },
  {
    school: 'Senac Santa Catarina',
    degree: 'Tech. Degree, Systems Analysis & Development',
    period: 'Apr 2017 — Mar 2019',
    status: 'completed' as const,
  },
  {
    school: 'Senac Santa Catarina',
    degree: 'Tech. Degree, Computer Networks',
    period: 'Apr 2017 — Jul 2019',
    status: 'completed' as const,
  },
];
