# Entrega HH SUC — contexto del proyecto

Proyecto Next.js único (`app/`) que sirve el hub (portada) y sus módulos bajo una sola URL. Ver [`README.md`](README.md) para la estructura completa.

## Convenciones

- **Un solo proyecto Next.js**: el hub (`/`) y el prototipo (`/prototype`) viven en el mismo deploy, no en proyectos separados. Evitar volver a separarlos salvo que haya una razón técnica fuerte — ya se intentó con dos deploys de Vercel y generaba confusión de URLs.
- **Estilos**: todo centralizado en `app/globals.css`. Tokens en `:root` (`--ink`, `--paper`, `--wash`, `--line`, `--muted`, más los del hub: `--accent`, `--ok`, `--pending`, `--radius`, `--shadow`). Estilo grayscale/wireframe intencional en el prototipo (interfaz "de prueba", no de producción visual); el hub usa el mismo esquema de color con acentos leves.
- **Navegación entre módulos**: desde el hub, `next/link` con rutas relativas (`/prototype`, `/flujo`, etc.). Desde el prototipo, el botón flotante (`.hub-nav`, abajo a la derecha) usa las mismas rutas relativas — no hay URLs absolutas ni detección de entorno, todo vive bajo el mismo dominio.
- **Documentación (`Documents/*.md`)**: fuente de verdad de la documentación funcional. `/documentacion` eventualmente listará estos documentos convertidos a HTML (pendiente).
- **Roles y permisos**: el prototipo modela 3 roles (Operador, Administrador, Supervisor) con permisos granulares (`Gestionar entregas`, `Ver historial`, `Administrar usuarios`, `Administrar roles`, `Ver reportes`) que determinan qué ve cada uno en el sidebar. Ver `app/prototype/page.tsx`.

## Estado actual (referencia rápida)

- `/prototype`: **en desarrollo activo**, funcional — login por rol, flujo de entrega, historial, ABM de usuarios y roles.
- `/flujo`, `/presentacion`, `/documentacion`: **placeholders**, sin contenido todavía.
- `openspec/` (specs formales de comportamiento) todavía no se incorporó a este proyecto.

## Pendientes conocidos

- Construir `/flujo` con el diagrama real de pantallas/roles.
- Construir `/presentacion` con capturas del prototipo.
- Construir el listado de `/documentacion` a partir de `Documents/*.md`.
- Decidir si se incorpora `openspec/` para versionar specs de comportamiento.
