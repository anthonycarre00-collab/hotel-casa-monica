import { defineConfig } from 'tinacms';

// TinaCMS configuration
// This defines what content the owners (Fredy & Mónica) can edit visually.
// They log in at /admin (in dev) or via the TinaCMS Cloud (in production).

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  branch: 'main',
  localStudio: true,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    loadCustomStore: async () => {
      // Use local filesystem for media (no cloud storage needed)
      return {
        dir: 'public',
      };
    },
  },
  // Content collections — what can be edited
  schema: {
    collections: [
      {
        name: 'site_content',
        label: 'Contenido del sitio',
        path: 'content/site',
        format: 'json',
        ui: {
          global: true,
        },
        fields: [
          // === HERO ===
          {
            name: 'hero',
            label: 'Portada',
            type: 'object',
            fields: [
              { name: 'title1', label: 'Título (parte 1)', type: 'string', description: 'Ej: "Siéntete como"' },
              { name: 'title2', label: 'Título (parte 2, script)', type: 'string', description: 'Ej: "en casa"' },
              { name: 'subtitle', label: 'Subtítulo', type: 'string', ui: { component: 'textarea' } },
              { name: 'cta_book', label: 'Botón de reserva', type: 'string' },
              { name: 'cta_explore', label: 'Botón explorar', type: 'string' },
            ],
          },
          // === ABOUT ===
          {
            name: 'about',
            label: 'Nosotros',
            type: 'object',
            fields: [
              { name: 'title', label: 'Título', type: 'string' },
              { name: 'p1', label: 'Párrafo 1', type: 'string', ui: { component: 'textarea' } },
              { name: 'p2', label: 'Párrafo 2', type: 'string', ui: { component: 'textarea' } },
              { name: 'p3', label: 'Párrafo 3', type: 'string', ui: { component: 'textarea' } },
            ],
          },
          // === OWNERS ===
          {
            name: 'fredy',
            label: 'Sr Fredy',
            type: 'object',
            fields: [
              { name: 'name', label: 'Nombre', type: 'string' },
              { name: 'role', label: 'Rol', type: 'string' },
              { name: 'tagline', label: 'Frase', type: 'string' },
              { name: 'bio', label: 'Biografía', type: 'string', ui: { component: 'textarea' } },
              { name: 'photo', label: 'Foto', type: 'image' },
            ],
          },
          {
            name: 'monica',
            label: 'Sra Mónica',
            type: 'object',
            fields: [
              { name: 'name', label: 'Nombre', type: 'string' },
              { name: 'role', label: 'Rol', type: 'string' },
              { name: 'tagline', label: 'Frase', type: 'string' },
              { name: 'bio', label: 'Biografía', type: 'string', ui: { component: 'textarea' } },
              { name: 'photo', label: 'Foto', type: 'image' },
            ],
          },
          // === ROOMS ===
          {
            name: 'rooms',
            label: 'Habitaciones',
            type: 'object',
            fields: [
              { name: 'subtitle', label: 'Subtítulo', type: 'string', ui: { component: 'textarea' } },
            ],
          },
          // === CONTACT ===
          {
            name: 'contact',
            label: 'Contacto',
            type: 'object',
            fields: [
              { name: 'whatsapp', label: 'WhatsApp', type: 'string', description: 'Ej: +57 300 310 0299' },
              { name: 'instagram', label: 'Instagram', type: 'string' },
              { name: 'address', label: 'Dirección', type: 'string' },
            ],
          },
        ],
      },
      // === REVIEWS ===
      {
        name: 'review',
        label: 'Opiniones',
        path: 'content/reviews',
        format: 'md',
        fields: [
          { name: 'text', label: 'Texto', type: 'string', ui: { component: 'textarea' } },
          { name: 'author', label: 'Autor', type: 'string' },
          { name: 'rating', label: 'Calificación (1-5)', type: 'number' },
          { name: 'date', label: 'Fecha', type: 'datetime' },
        ],
        ui: {
          itemProps: (item) => ({ label: item?.author || 'New review' }),
        },
      },
      // === FESTIVALS ===
      {
        name: 'festival',
        label: 'Festivales',
        path: 'content/festivals',
        format: 'md',
        fields: [
          { name: 'name', label: 'Nombre', type: 'string' },
          { name: 'date', label: 'Fecha', type: 'string', description: 'Ej: "19-21 de Julio"' },
          { name: 'description', label: 'Descripción', type: 'string', ui: { component: 'textarea' } },
          { name: 'bookAhead', label: 'Reservar con tiempo', type: 'boolean' },
          { name: 'icon', label: 'Emoji', type: 'string' },
        ],
        ui: {
          itemProps: (item) => ({ label: item?.name || 'New festival' }),
        },
      },
    ],
  },
});
