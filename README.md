# Entrega HH SUC — Centro del proyecto

Hub de navegación del proyecto "Entrega de piezas en sucursal con usuarios nominales" para Correo Argentino. Es la portada (`index.html`) desde donde se accede a los distintos módulos del proyecto.

## Estructura

```
/
├── index.html              # Portada del hub (tarjetas hacia los módulos)
├── hub/
│   ├── hub.css              # Estilos del hub y de las páginas placeholder
│   ├── flujo.html           # Módulo 2 — Flujo de navegación (próximamente)
│   ├── presentacion.html    # Módulo 3 — Presentación (próximamente)
│   ├── documentacion.html   # Módulo 4 — Documentación (próximamente)
│   └── docs/                # HTML generado a partir de Documents/*.md (a futuro)
├── Documents/                # Documentación funcional en Markdown (fuente de verdad)
├── assets/                   # Recursos compartidos (imágenes, referencias)
├── tools/
│   └── dev-server.js         # Server estático simple para previsualizar el hub
└── prototype-app/            # Módulo 1 — Prototipo navegable (app Next.js, deploy propio)
```

## Módulos

1. **Prototipo navegable** — la maqueta funcional (login, roles, entrega, historial, administración de usuarios). Vive en [`prototype-app/`](prototype-app/) como proyecto Next.js independiente, con su propio `README.md` y su propio deploy en Vercel.
2. **Flujo de navegación** — diagrama de pantallas y relaciones del prototipo. Placeholder por ahora.
3. **Presentación** — recorrido paginado del flujo con capturas, a modo de instructivo. Placeholder por ahora.
4. **Documentación** — documentos funcionales (`Documents/*.md`) listados y convertidos a HTML. Placeholder por ahora.

## Cómo previsualizar el hub

El hub es HTML/CSS/JS plano, sin build. Se puede abrir `index.html` directamente con doble clic, o levantar un servidor simple:

```bash
node tools/dev-server.js
```

Por defecto sirve en `http://localhost:5173`.

> La tarjeta "Prototipo navegable" apunta a la URL pública del deploy de `prototype-app/` (Vercel), no a un archivo local — ese módulo se ejecuta y despliega por separado.

## Cómo correr el prototipo (módulo 1)

```bash
cd prototype-app
npm install
npm run dev
```

Ver [`prototype-app/README.md`](prototype-app/README.md) para el detalle completo de esa app.
