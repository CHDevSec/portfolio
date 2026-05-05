export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  initial: string;
  tone: 'phosphor' | 'amber';
};

// Real testimonials go here when collected. For now: 1 placeholder + open slots.
// Replace with verified quotes from LinkedIn recommendations or DM with consent.
export const testimonials: Testimonial[] = [
  // EXAMPLE — replace once you have a real LinkedIn recommendation
  // {
  //   quote: "Caio drove vulnerability count down 44% in nine months. He didn't just patch — he redefined what we measured. Rare combination of hands-on engineer and metric-driven program lead.",
  //   author: "Tech Lead",
  //   role: "Engineering Manager",
  //   company: "frete.com",
  //   initial: "TL",
  //   tone: "phosphor",
  // },
];

export const placeholderCount = 3;
