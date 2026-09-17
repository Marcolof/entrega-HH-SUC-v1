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
    slug: 'propuesta-entrega-hh-suc',
    archivo: '/presentaciones/propuesta-entrega-hh-suc.html',
    titulo: 'Entrega de piezas en sucursal — La propuesta',
    descripcion:
      'Recorrido de la propuesta de solución: aplicación web con identificación nominal del operador, los 6 pasos del proceso, precondiciones y control de accesos según ISO/IEC 27001, con la comparación frente a la operación actual.',
    slides: 13,
    fecha: '2026-09-17',
  },
];
