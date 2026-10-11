import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(170),
      topic: z.enum(['historia', 'costumbres', 'cultura']),
      published: z.coerce.date(),
      updated: z.coerce.date(),
      wpId: z.number(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { articulos };
