import type { APIRoute, GetStaticPaths } from 'astro';
import { getFilms, type Film } from '../../../lib/films';
import { synopsisText } from '../../../lib/synopsis';
import { prefixedLocales, type Lang } from '../../../i18n/utils';

export const getStaticPaths = (async () => {
  const films = await getFilms();
  return prefixedLocales.flatMap((lang) => films.map((film) => ({ params: { lang, slug: film.id }, props: { film } })));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params }) =>
  new Response(synopsisText((props as { film: Film }).film, params.lang as Lang), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
