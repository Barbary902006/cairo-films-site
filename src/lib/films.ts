import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/utils';

export type Film = CollectionEntry<'films'>;

/** All visible films, sorted by `order` then title. */
export async function getFilms(): Promise<Film[]> {
  const films = await getCollection('films', ({ data }) => !data.hidden);
  return films.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getFeaturedFilm(): Promise<Film | undefined> {
  const films = await getFilms();
  return films.find((f) => f.data.featured) ?? films[0];
}

/** Film text in the requested language, falling back to English per field. */
export function localize(film: Film, lang: Lang) {
  const t = lang === defaultLang ? {} : (film.data.translations[lang] ?? {});
  return {
    ...film.data,
    title: t.title || film.data.title,
    logline: t.logline || film.data.logline,
    synopsis: t.synopsis || film.data.synopsis,
    format: t.format || film.data.format,
    statusNote: t.statusNote || film.data.statusNote,
  };
}

export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Page copy for a language, falling back to English when not yet translated. */
export async function getPage(name: string, lang: Lang) {
  return (await getEntry('pages', `${lang}/${name}`)) ?? (await getEntry('pages', `${defaultLang}/${name}`));
}

/** Recognise YouTube / Vimeo links so they can be embedded. */
export function parseTrailer(url?: string) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'youtube' as const, url, embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vm) {
    const h = vm[2] ? `&h=${vm[2]}` : '';
    return { kind: 'vimeo' as const, url, embed: `https://player.vimeo.com/video/${vm[1]}?autoplay=1&dnt=1${h}` };
  }
  return { kind: 'link' as const, url, embed: '' };
}
