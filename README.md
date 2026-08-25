# Entrega HH SUC — Centro del proyecto

Proyecto Next.js único que sirve el hub de navegación y todos sus módulos bajo una sola URL/deploy.

## Estructura

```
app/
├── page.tsx              # "/" — Hub (portada, tarjetas hacia los módulos)
├── prototype/page.tsx     # "/prototype" — Módulo 1: prototipo navegable (disponible)
├── flujo/page.tsx         # "/flujo" — Módulo 2: flujo de navegación (próximamente)
├── presentacion/page.tsx  # "/presentacion" — Módulo 3: presentación (próximamente)
├── documentacion/page.tsx # "/documentacion" — Módulo 4: documentación (próximamente)
├── globals.css            # Estilos de todo el proyecto (tokens + hub + prototipo)
└── layout.tsx

Documents/    # Documentación funcional en Markdown (fuente de verdad, aparte del código)
assets/       # Recursos compartidos (imágenes, referencias)
public/       # Assets estáticos servidos por Next.js (favicon, etc.)
```

## Módulos

1. **Prototipo navegable** (`/prototype`) — maqueta funcional: login, roles (Operador, Administrador, Supervisor), flujo de entrega, historial y administración de usuarios.
2. **Flujo de navegación** (`/flujo`) — diagrama de pantallas y relaciones del prototipo. Placeholder por ahora.
3. **Presentación** (`/presentacion`) — recorrido paginado del flujo con capturas, a modo de instructivo. Placeholder por ahora.
4. **Documentación** (`/documentacion`) — documentos funcionales (`Documents/*.md`) listados y convertidos a HTML. Placeholder por ahora.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000` — ahí arranca el hub. El prototipo, al ser un módulo interno, se navega desde la tarjeta "Prototipo navegable" o directo en `/prototype`.

## Deploy

Un solo proyecto de Vercel, apuntando a la raíz del repo (framework Next.js, detección automática). La URL principal sirve el hub como pantalla de entrada.
