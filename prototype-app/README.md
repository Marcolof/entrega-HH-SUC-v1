# Entrega HH SUC — prototipo (módulo 1 del hub)

Wireframe funcional de escritorio para validar la propuesta de una aplicación web de entrega en sucursal con usuarios nominales.

> Este módulo es parte del [hub del proyecto](../README.md). Se ejecuta y se despliega de forma independiente (Next.js propio, deploy propio en Vercel).

## Roles de prueba

Al abrir la app se muestra una pantalla de login con tres accesos rápidos, uno por rol:

- **Operador** — busca y gestiona entregas, ve su propio historial.
- **Administrador** — administra usuarios y roles (ABM completo).
- **Supervisor** — ve el historial completo de todas las sucursales.

Cualquier contraseña es válida; no hay backend.

## Recorrido sugerido (rol Operador)

1. Ingresar como Operador.
2. Seleccionar **Usar una pieza de prueba**.
3. Iniciar la entrega.
4. Probar los caminos **Pieza entregada** y **Pieza no entregada**.
5. Completar todos los campos visibles.
6. Simular fotografía y, para una entrega exitosa, firma.
7. Revisar, confirmar y observar el resultado simulado.
8. Ir a **Historial** para ver las gestiones registradas.

## Ejecución local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`. El prototipo está diseñado para un ancho mínimo de 1180 px.

## Documentación

La documentación funcional del proyecto (análisis funcional, arquitectura provisoria) vive en [`../Documents/`](../Documents/), fuera de este módulo — es compartida por todo el hub.
