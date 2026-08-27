export type PresentacionMeta = {
  slug: string;
  archivo: string; // ruta pública, dentro de /public/presentaciones/
  titulo: string;
  descripcion: string;
  slides: number;
  fecha: string;
};

/* Cada presentación es un deck HTML autocontenido en public/presentaciones/.
   Este archivo solo registra metadata para el selector; el contenido vive en el .html. */
export const PRESENTACIONES: PresentacionMeta[] = [
  {
    slug: 'propuestas-1-y-2',
    archivo: '/presentaciones/propuestas-1-y-2.html',
    titulo: 'Propuesta 1 vs. Propuesta 2',
    descripcion:
      'Recorrido comparativo de las dos propuestas de solución: aplicación web con usuario nominal vs. usuarios genéricos múltiples. Incluye diagrama de flujo y comparación de ventajas y desventajas.',
    slides: 16,
    fecha: '2026-08-27',
  },
];
