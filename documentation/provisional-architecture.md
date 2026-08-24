# Arquitectura provisoria — Entrega HH SUC

## 1. Objetivo

Proponer una estructura técnica inicial que permita validar la experiencia sin convertir supuestos todavía abiertos en decisiones irreversibles.

## 2. Estado del prototipo

La versión actual es una interfaz web sin backend. Los datos son ficticios y permanecen únicamente durante la sesión del navegador. Las acciones de cámara, firma, auditoría, T&T, Mosaic y RDU están simuladas.

## 3. Arquitectura objetivo tentativa

```text
[Navegador de sucursal]
          |
          v
[Aplicación web de entrega]
          |
          v
[API de Entrega HH SUC]
    |        |         |
    v        v         v
[Usuarios] [Evidencias] [Auditoría]
    |                    |
    +---------+----------+
              v
       [Capa de integración]
        |       |       |
        v       v       v
      T&T     Mosaic    RDU
```

## 4. Componentes propuestos

### Aplicación web

- Interfaz optimizada inicialmente para escritorio.
- Validaciones de formato y campos obligatorios.
- Captura o carga de fotografía.
- Captura de firma.
- Revisión y confirmación explícita.
- Presentación de estados técnicos en lenguaje operativo.

### API de Entrega HH SUC

- Autorización por rol y sucursal.
- Consulta y bloqueo lógico de la pieza.
- Registro atómico de la gestión.
- Validaciones de negocio centralizadas.
- Coordinación de auditoría, evidencias e integraciones.
- Idempotencia para impedir entregas duplicadas.

### Identidad y acceso

- Usuario nominal corporativo.
- Roles iniciales: Operador y Administrador.
- Asociación a una o más sucursales por definir.
- La tecnología de autenticación queda pendiente.

### Evidencias

- Repositorio separado para fotografía y firma.
- Metadatos asociados a la operación.
- Cifrado, retención, tamaño y formatos aún por definir.

### Auditoría

- Usuario, rol, sucursal, fecha y hora.
- Pieza y resultado.
- Datos anteriores y posteriores relevantes.
- Referencia a evidencias.
- Resultado de cada integración y reintento.

### Capa de integración

- Adaptadores independientes para T&T, Mosaic, Office Track/RDU según se confirme la responsabilidad real.
- Evita acoplar la interfaz a contratos externos todavía desconocidos.
- Debe soportar trazabilidad técnica e idempotencia.

## 5. Modelo conceptual inicial

- **Usuario:** identificador, nombre, estado, rol.
- **Rol:** Operador o Administrador.
- **Sucursal:** identificador, nombre, unidad de negocio.
- **Pieza:** código, producto, destinatario, estado, sucursal de guarda.
- **Gestión de entrega:** pieza, operador, sucursal, resultado, fecha, descripción.
- **Receptor:** nombre, documento y relación con destinatario.
- **Evidencia:** tipo, ubicación, fecha, hash o integridad.
- **Motivo:** código, descripción y tipo de resultado.
- **Evento de integración:** sistema, estado, intento, respuesta y fecha.
- **RDU:** identificador y referencia a la gestión.

## 6. Estados tentativos

### Gestión

- Borrador.
- Confirmada.
- Registrada.
- Integración pendiente.
- Integrada.
- Integración con error.
- Anulada, únicamente si el procedimiento lo permite.

### Evento externo

- Pendiente.
- En proceso.
- Exitoso.
- Reintentable.
- Error definitivo.

Estos estados son una hipótesis técnica y necesitan validación funcional.

## 7. Consistencia y reintentos

Aunque el mecanismo está pendiente, la arquitectura deberá evitar dos confirmaciones sobre la misma pieza. Se propone:

- Clave de idempotencia por pieza y operación.
- Registro local confirmado antes de depender de los sistemas externos.
- Cola o mecanismo equivalente para integraciones posteriores.
- Reintentos controlados y visibles para soporte.
- Intervención manual sólo ante error definitivo.

La política, frecuencia y cantidad de reintentos no se definen en esta etapa.

## 8. Seguridad pendiente

- Proveedor de identidad corporativa.
- Autorización por rol y sucursal.
- Protección de DNI, fotografía y firma.
- Cifrado en tránsito y almacenamiento.
- Política de conservación y eliminación.
- Registro de consultas sobre evidencias.
- Revisión legal y de privacidad.

## 9. Decisiones diferidas

- Backend, base de datos y plataforma de despliegue.
- API o mensajería para cada integración.
- Estrategia online/offline.
- Origen maestro de usuarios y sucursales.
- Reglas de P80, devolución, stock y RDU.
- Capacidad, disponibilidad y recuperación.
- Formatos y límites de las evidencias.

## 10. Próximo hito recomendado

Validar el wireframe con operadores y referentes, responder las preguntas del procedimiento vigente y, recién entonces, transformar los supuestos aceptados en historias de usuario, contratos de integración y una arquitectura de solución detallada.
