## Why

El prototipo navegable ya tiene login e identificación por rol implementados y
funcionando, pero ese comportamiento no está documentado en ningún lado más allá
del código. A medida que el proyecto crezca (más módulos, más roles, más reglas),
hace falta un registro claro de cómo funciona hoy la identificación de usuarios y
el control de acceso, para que cualquier cambio futuro parta de un entendimiento
correcto y no de suposiciones.

## What Changes

- Documentar la pantalla de login: campos, accesos de prueba, y los tres mensajes
  de error posibles (usuario inexistente, usuario inactivo, contraseña vacía).
- Documentar los 3 roles existentes (Operador, Administrador, Supervisor) y el
  permiso puntual que tiene cada uno.
- Documentar cómo los permisos del rol determinan qué ve cada usuario en el menú
  lateral y a qué pantalla lo manda el sistema apenas inicia sesión.
- Documentar el caso de un rol sin ningún módulo disponible (pantalla de "sin
  acceso") y el cierre de sesión.

No hay cambios de comportamiento: esto es una fotografía de lo que el prototipo
hace hoy.

## Capabilities

### New Capabilities
- `login-y-roles`: identificación de usuarios por login, los 3 roles del sistema,
  sus permisos, y cómo esos permisos controlan qué pantallas ve cada usuario.

### Modified Capabilities
(ninguna — es la primera spec del proyecto)

## Impact

- Código: `app/prototype/page.tsx` (pantalla de login, roles y permisos iniciales,
  navegación condicionada por permisos).
- No afecta APIs externas ni dependencias — el prototipo no tiene backend.
