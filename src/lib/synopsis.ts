import { site } from '../site.config';
import { useTranslations, type Lang } from '../i18n/utils';
import { localize, paragraphs, type Film } from './films';

/** Plain-text synopsis sheet served at /press/<slug>.txt */
export function synopsisText(film: Film, lang: Lang): string {
  const t = useTranslations(lang);
  const f = localize(film, lang);
  const lines = [
    f.title.toUpperCase(),
    [f.format, f.year, f.runtime, f.countries.join(', '), f.language].filter(Boolean).join(' | '),
    `${t('film.directedBy')} ${f.director}`,
    `${t(`status.${f.status}` as const)}${f.statusNote ? ` (${f.statusNote})` : ''}`,
    '',
    t('press.logline').toUpperCase(),
    f.logline,
    '',
    t('film.synopsis').toUpperCase(),
    paragraphs(f.synopsis).join('\n\n'),
  ];
  if (f.credits.length) {
    lines.push('', t('film.credits').toUpperCase(), ...f.credits.map((c) => `${c.role}: ${c.name}`));
  }
  if (f.laurels.length) {
    lines.push('', 'FESTIVALS', ...f.laurels.map((l) => `${l.award}, ${l.festival}${l.year ? ` ${l.year}` : ''}`));
  }
  lines.push('', `${site.company} | ${site.email}`);
  return lines.join('\n') + '\n';
}
