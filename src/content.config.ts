import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * FILMS: one folder per film in src/content/films/<slug>/
 *   film.yaml   all text and links
 *   poster.jpg  poster (any name, referenced from film.yaml)
 *   stills/     stills (any names, referenced from film.yaml)
 * The folder name becomes the URL: /films/<slug>/
 */
const translatable = z.object({
  title: z.string().optional(),
  logline: z.string().optional(),
  synopsis: z.string().optional(),
  format: z.string().optional(),
  statusNote: z.string().optional(),
});

const films = defineCollection({
  loader: glob({
    pattern: '*/film.{yaml,yml}',
    base: './src/content/films',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().default(100),
      featured: z.boolean().default(false),
      hidden: z.boolean().default(false),
      format: z.string(),
      year: z.union([z.number(), z.string()]).optional(),
      runtime: z.string().optional(),
      countries: z.array(z.string()).default([]),
      language: z.string().optional(),
      status: z.enum([
        'development',
        'pre-production',
        'production',
        'post-production',
        'completed',
        'festival',
        'released',
      ]),
      statusNote: z.string().optional(),
      director: z.string(),
      logline: z.string(),
      synopsis: z.string(),
      credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
      laurels: z
        .array(
          z.object({
            festival: z.string(),
            award: z.string().default('Official Selection'),
            year: z.union([z.number(), z.string()]).optional(),
          }),
        )
        .default([]),
      trailer: z.url().or(z.literal('')).optional(),
      poster: image(),
      stills: z
        .array(
          z.object({
            src: image(),
            caption: z.string().optional(),
            credit: z.string().optional(),
          }),
        )
        .default([]),
      pressKitFile: z.string().optional(),
      translations: z.record(z.string(), translatable).default({}),
    }),
});

/** PAGES: long-form copy per language, e.g. src/content/pages/en/about.md */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    statement: z.string().optional(),
    highlights: z
      .array(z.object({ label: z.string(), detail: z.string(), year: z.string().optional() }))
      .default([]),
  }),
});

export const collections = { films, pages };
