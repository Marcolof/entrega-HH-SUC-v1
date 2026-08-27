# login-y-roles Specification

## Purpose
Define cómo se identifican los usuarios del prototipo y cómo el rol de cada uno
determina qué partes del sistema puede ver y usar.

## Requirements

### Requirement: Identificación mediante usuario y contraseña
El sistema SHALL identificar a cada usuario mediante un campo de usuario y un
campo de contraseña antes de dar acceso a cualquier pantalla.

#### Scenario: Login exitoso
- **WHEN** el usuario ingresa un nombre de usuario que existe, está activo, y
  cualquier contraseña no vacía
- **THEN** el sistema inicia sesión con ese usuario
- **AND** limpia el campo de contraseña

#### Scenario: Usuario inexistente
- **WHEN** el usuario ingresa un nombre de usuario que no coincide con ningún
  usuario registrado
- **THEN** el sistema muestra el mensaje "Usuario o contraseña incorrectos."
- **AND** no inicia sesión

#### Scenario: Usuario inactivo
- **WHEN** el usuario ingresa un nombre de usuario que existe pero cuyo estado
  es "Inactivo"
- **THEN** el sistema muestra el mensaje "El usuario está inactivo. Contactá a
  un administrador."
- **AND** no inicia sesión

#### Scenario: Contraseña vacía
- **WHEN** el usuario ingresa un nombre de usuario válido y activo, pero deja
  la contraseña vacía
- **THEN** el sistema muestra el mensaje "Ingresá la contraseña."
- **AND** no inicia sesión

### Requirement: Accesos rápidos de prueba
El sistema SHALL ofrecer, en la pantalla de login, un botón de acceso directo
por cada rol existente, que inicia sesión con un usuario activo de ese rol sin
pedir contraseña.

#### Scenario: Ingreso rápido por rol
- **WHEN** el usuario hace clic en un botón de acceso rápido (por ejemplo
  "Ingresar como Operador")
- **THEN** el sistema inicia sesión inmediatamente con un usuario activo de ese
  rol, sin validar contraseña

### Requirement: Roles y permisos del sistema
El sistema SHALL definir 3 roles — Operador, Administrador y Supervisor — cada
uno con un conjunto fijo de permisos que determina qué puede hacer:
- Operador: gestionar entregas, ver historial.
- Administrador: administrar usuarios, administrar roles, ver reportes.
- Supervisor: ver historial, ver reportes.

#### Scenario: Un usuario hereda los permisos de su rol
- **WHEN** un usuario con un rol determinado inicia sesión
- **THEN** el sistema le habilita únicamente las acciones asociadas a los
  permisos de ese rol

### Requirement: Redirección automática según permisos al iniciar sesión
El sistema SHALL llevar al usuario, apenas inicia sesión, a la primera pantalla
para la que tenga permiso, en este orden de prioridad: gestionar entregas,
administrar usuarios, administrar roles, ver historial.

#### Scenario: Operador aterriza en la entrega de piezas
- **WHEN** un usuario cuyo rol tiene el permiso "Gestionar entregas" inicia
  sesión
- **THEN** el sistema lo lleva a la pantalla de nueva entrega

#### Scenario: Administrador aterriza en usuarios
- **WHEN** un usuario cuyo rol no tiene "Gestionar entregas" pero sí
  "Administrar usuarios" inicia sesión
- **THEN** el sistema lo lleva a la pantalla de administración de usuarios

### Requirement: Navegación visible según permisos del rol
El sistema SHALL mostrar en el menú lateral únicamente los accesos a las
pantallas para las que el usuario tiene permiso, agrupados en "Operación"
(Nueva entrega, Historial) y "Administración" (Usuarios, Roles).

#### Scenario: Operador ve Operación pero no Administración
- **WHEN** un usuario con permisos "Gestionar entregas" y "Ver historial" ve el
  menú lateral
- **THEN** ve las opciones "Nueva entrega" e "Historial"
- **AND** no ve ninguna opción de la sección "Administración"

#### Scenario: Administrador ve Administración pero no Operación
- **WHEN** un usuario con permisos "Administrar usuarios" y "Administrar
  roles" ve el menú lateral
- **THEN** ve las opciones "Usuarios" y "Roles"
- **AND** no ve la sección "Operación"

### Requirement: Pantalla de acceso restringido
El sistema SHALL mostrar una pantalla de "sin acceso" cuando el rol del
usuario no tiene permiso para ninguna de las pantallas existentes.

#### Scenario: Rol sin pantallas asignadas
- **WHEN** un usuario cuyo rol no tiene ninguno de los permisos "Gestionar
  entregas", "Ver historial", "Administrar usuarios" o "Administrar roles"
  inicia sesión
- **THEN** el sistema muestra un mensaje indicando que ese rol todavía no
  tiene módulos disponibles

### Requirement: Cierre de sesión
El sistema SHALL permitir cerrar la sesión activa desde cualquier pantalla del
prototipo, devolviendo al usuario a la pantalla de login.

#### Scenario: Cerrar sesión
- **WHEN** el usuario hace clic en "Cerrar sesión"
- **THEN** el sistema termina la sesión actual
- **AND** muestra la pantalla de login
