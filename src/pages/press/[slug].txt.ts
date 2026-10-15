import type { APIRoute, GetStaticPaths } from 'astro';
import { getFilms, type Film } from '../../lib/films';
import { synopsisText } from '../../lib/synopsis';

export const getStaticPaths = (async () => {
  return (await getFilms()).map((film) => ({ params: { slug: film.id }, props: { film } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(synopsisText((props as { film: Film }).film, 'en'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
