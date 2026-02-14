import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const galleries = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/galleries' }),
  schema: z.object({
    title: z.string(),
    featuredPhoto: z.string(),
    order: z.number(),
  }),
});

export const collections = { galleries };
