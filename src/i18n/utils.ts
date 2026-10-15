import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';
import { site } from '../site.config';

export { defaultLang, languages, type Lang };

/** Translate an interface string, falling back to English. */
export function useTranslations(lang: Lang) {
  return (key: UIKey): string => (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
}

export function dir(lang: Lang) {
  return languages[lang].dir;
}

/** Locales that get their own /<lang>/ prefix (every enabled one except the default). */
export const prefixedLocales = site.enabledLocales.filter((l) => l !== defaultLang) as Lang[];

/** getStaticPaths helper for pages under src/pages/[lang]/. */
export function langPaths() {
  return prefixedLocales.map((lang) => ({ params: { lang } }));
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Build an internal link that respects the GitHub Pages base path and language.
 * href('/films/', 'ar') -> '/cairo-films-site/ar/films/'
 */
export function href(path: string, lang: Lang = defaultLang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${base}${prefix}${clean}`;
}

/** Strip base and language prefix so a path can be re-linked in another language. */
export function pathWithoutLang(pathname: string): string {
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  for (const l of Object.keys(languages)) {
    if (p === `/${l}` || p.startsWith(`/${l}/`)) {
      p = p.slice(l.length + 1);
      break;
    }
  }
  return p || '/';
}
