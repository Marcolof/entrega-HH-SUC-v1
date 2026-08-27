import fs from 'node:fs';
import path from 'node:path';

export type DocMeta = {
  slug: string;
  file: string;
  titulo: string;
  descripcion: string;
  grupo: 'Propuestas' | 'Análisis y arquitectura';
  estado?: string;
};

/* Los .md de Documents/ son la fuente de verdad. Esta lista sólo define orden,
   agrupación y estado: el contenido siempre se lee del archivo. */
export const DOCS: DocMeta[] = [
  {
    slug: 'propuesta-1',
    file: 'propuesta-1-aplicacion-web-nominal.md',
    titulo: 'Propuesta 1 — Aplicación web con usuario nominal',
    descripcion:
      'Aplicación web para PC o Tablet, con credenciales individuales, foto y firma digital. Es la propuesta que el prototipo materializa.',
    grupo: 'Propuestas',
    estado: 'En evaluación',
  },
  {
    slug: 'propuesta-2',
    file: 'propuesta-2-usuarios-genericos.md',
    titulo: 'Propuesta 2 — Usuarios genéricos múltiples',
    descripcion:
      'Varios usuarios genéricos por unidad de negocio sobre el dispositivo móvil actual, con tareas offline y anulación de duplicados.',
    grupo: 'Propuestas',
    estado: 'En evaluación',
  },
  {
    slug: 'reporte-impacto',
    file: 'reporte-impacto-propuestas.md',
    titulo: 'Reporte de impacto',
    descripcion:
      'Comparación de ambas propuestas, efecto de deprecar el GC01 como fuente de verdad, y qué implica cada camino sobre lo ya construido.',
    grupo: 'Propuestas',
  },
  {
    slug: 'analisis-funcional',
    file: 'functional-analysis.md',
    titulo: 'Análisis funcional',
    descripcion:
      'Alcance, flujo, actores, requisitos, supuestos y criterios de aceptación del wireframe.',
    grupo: 'Análisis y arquitectura',
    estado: 'En revisión',
  },
  {
    slug: 'arquitectura-provisoria',
    file: 'provisional-architecture.md',
    titulo: 'Arquitectura provisoria',
    descripcion:
      'Arquitectura tentativa, componentes, modelo conceptual y decisiones diferidas.',
    grupo: 'Análisis y arquitectura',
  },
];

export const GRUPOS = ['Propuestas', 'Análisis y arquitectura'] as const;

export function getDoc(slug: string): DocMeta | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function readDoc(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'Documents', file), 'utf8');
}
