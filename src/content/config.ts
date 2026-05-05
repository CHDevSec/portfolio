import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    company: z.string(),
    period: z.string(),
    category: z.enum(['devsecops', 'cloud', 'soc', 'pentest', 'automation', 'consulting']),
    cover: z.string(), // /images/wallpapers/...
    categoryIcon: z.string().optional(), // pixel-art PNG id, e.g. 'fc725' (decorative badge)
    categoryIconAlt: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    metrics: z.array(z.object({
      value: z.string(),
      label: z.string(),
      tone: z.enum(['phosphor', 'amber', 'alert']).optional(),
    })).default([]),
    stack: z.array(z.string()).default([]),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
