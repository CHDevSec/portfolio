import type { Lang } from './i18n';

// Display names for the project `category` field, which stays an English slug.
const LABELS: Record<string, Record<Lang, string>> = {
  devsecops: { en: 'DevSecOps', pt: 'DevSecOps' },
  automation: { en: 'Automation', pt: 'Automação' },
  pentest: { en: 'Pentest', pt: 'Pentest' },
  soc: { en: 'SOC', pt: 'SOC' },
  consulting: { en: 'Consulting', pt: 'Consultoria' },
};

export const categoryLabel = (category: string, lang: Lang): string =>
  LABELS[category]?.[lang] ?? category;
