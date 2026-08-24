# Entrega HH SUC — contexto del proyecto

Hub de navegación (`index.html` + `hub/`) para el proyecto de entrega de piezas en sucursal con usuarios nominales (Correo Argentino). Ver [`README.md`](README.md) para la estructura completa.

## Convenciones

- **Hub (`index.html`, `hub/`)**: HTML/CSS/JS plano, sin build ni frameworks. Estilos centralizados en `hub/hub.css` (variables CSS en `:root`: `--ink`, `--paper`, `--wash`, `--line`, `--muted`, `--accent`, más tags `ready`/`pending`).
- **Prototipo (`prototype-app/`)**: Next.js + React + TypeScript, build propio, deploy propio en Vercel. Estilo grayscale/wireframe intencional (interfaz "de prueba", no de producción visual). Tokens de diseño en `prototype-app/app/globals.css` (`:root`: `--ink`, `--paper`, `--wash`, `--line`, `--muted`).
- **Documentación (`Documents/*.md`)**: fuente de verdad de la documentación funcional. `hub/documentacion.html` eventualmente listará estos documentos convertidos a HTML (pendiente: `tools/md2html.js` + `hub/docs/` + `manifest.json`).
- **Roles y permisos**: el prototipo modela 3 roles (Operador, Administrador, Supervisor) con permisos granulares (`Gestionar entregas`, `Ver historial`, `Administrar usuarios`, `Administrar roles`, `Ver reportes`) que determinan qué ve cada uno en el sidebar. Ver `prototype-app/app/page.tsx`.

## Estado actual (referencia rápida)

- Módulo 1 (Prototipo navegable): **en desarrollo activo**, funcional — login por rol, flujo de entrega, historial, ABM de usuarios y roles.
- Módulos 2, 3 y 4 (Flujo, Presentación, Documentación): **placeholders**, sin contenido todavía.
- `openspec/` (specs formales de comportamiento) todavía no se incorporó a este proyecto.

## Pendientes conocidos

- Construir `hub/flujo.html` con el diagrama real de pantallas/roles.
- Construir `hub/presentacion.html` con capturas del prototipo.
- Construir `tools/md2html.js` + `manifest.json` + `hub/docs/*.html` a partir de `Documents/*.md`.
- Decidir si se incorpora `openspec/` para versionar specs de comportamiento.
