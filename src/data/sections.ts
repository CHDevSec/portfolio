import type { Lang } from './i18n';

export type SectionId =
  | 'top'
  | 'impact'
  | 'experience'
  | 'how'
  | 'projects'
  | 'skills'
  | 'certs'
  | 'contact';

export interface SectionMeta {
  id: SectionId;
  label: Record<Lang, string>;
  /** Paper-on-ink inversion, mirroring the CHDEVSEC rhythm of two light stops. */
  light?: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'top', label: { en: 'HOME', pt: 'HOME' } },
  { id: 'impact', label: { en: 'IMPACT', pt: 'IMPACTO' }, light: true },
  { id: 'experience', label: { en: 'EXPERIENCE', pt: 'EXPERIÊNCIA' } },
  { id: 'how', label: { en: 'METHOD', pt: 'MÉTODO' } },
  { id: 'projects', label: { en: 'PROJECTS', pt: 'PROJETOS' } },
  { id: 'skills', label: { en: 'STACK', pt: 'STACK' } },
  { id: 'certs', label: { en: 'CERTS', pt: 'CERTIFICAÇÕES' } },
  { id: 'contact', label: { en: 'CONTACT', pt: 'CONTATO' }, light: true },
];

export function isLightSection(id: string): boolean {
  return SECTIONS.find((s) => s.id === id)?.light ?? false;
}
