# Documentación del proyecto

## Propuestas

**Ambas están en igualdad de jerarquía: ninguna está descartada.**

- `propuesta-1-aplicacion-web-nominal.md`: aplicación web con usuario nominal en PC
  o Tablet. Es la propuesta que el prototipo materializa.
- `propuesta-2-usuarios-genericos.md`: usuarios genéricos múltiples por unidad de
  negocio sobre dispositivo móvil, con tareas offline.
- `reporte-impacto-propuestas.md`: comparación de ambas, impacto de deprecar el GC01
  como fuente de verdad, y efecto sobre lo ya construido.

## Análisis y arquitectura

- `functional-analysis.md`: alcance, flujo, actores, requisitos, supuestos y
  criterios de aceptación. **En revisión:** se redactó cuando la Propuesta 1 se daba
  por adoptada.
- `provisional-architecture.md`: arquitectura tentativa, componentes, modelo
  conceptual y decisiones diferidas.

## Fuentes

Los documentos originales viven en `../docs/` y no se modifican:

- `Dos ideas como propuestas (2).docx` — **fuente de verdad principal**.
- `image.png` — diagrama del proceso tentativo. Copia local en
  `../assets/process-reference.png`. Funciona como vista de proceso de la Propuesta 2.
- `GC01-Entrega con HH SUC V2 (1).docx` — **deprecado**, no eliminado. Pertenece a la
  etapa inicial del proceso. Ya no se usa para derivar requisitos, pero **se consulta
  para entender huecos** que las dos propuestas no explican: la motivación del
  cambio, el doble proceso actual, la pasividad de errores, el alcance de despliegue
  y Mosaic. Ver §1.5 del reporte de impacto.
