/**
 * Site-wide settings. Edit freely: nothing here touches layout code.
 */
export const site = {
  name: 'Moustafa Elbarbari',
  company: 'Cairo Films',
  role: 'Film Producer',
  cities: ['Toronto', 'Cairo'],

  // Contact. Replace with the address you want public.
  email: 'hello@cairofilms.example',

  // Social / industry profiles. Leave a value empty ('') to hide it.
  // Tip: keep the spelling "Moustafa Elbarbari" on every profile.
  links: {
    imdb: '',
    vimeo: '',
    instagram: '',
    linkedin: '',
  },

  // Languages that are built and shown in the language switcher.
  // English is the default and lives at the site root (/).
  // To launch Arabic, change this to ['en', 'ar'] (pages appear under /ar/).
  enabledLocales: ['en'] as const satisfies readonly ('en' | 'ar')[],
};
