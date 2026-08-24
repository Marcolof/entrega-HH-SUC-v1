# Análisis funcional — Entrega HH SUC

## 1. Propósito

Definir el primer alcance funcional de una aplicación web de escritorio para registrar entregas de piezas en sucursales, con identificación individual del operador y preparación para futuras integraciones con Office Track, Mosaic, Track & Trace (T&T) y la generación de RDU.

Este documento es provisorio. Se utiliza para validar el flujo y las pantallas antes de cerrar reglas de negocio, integraciones y arquitectura definitiva.

## 2. Decisión de alcance

Se adopta la **propuesta 1**: aplicación web para PC o tablet, operada en línea y con credenciales personales.

La alternativa basada en usuarios genéricos queda fuera de este prototipo porque no resuelve la trazabilidad individual y agrega riesgos de duplicación y sincronización de tareas.

## 3. Referencia del proceso actual

La imagen `process-reference.png` describe el proceso tentativo previo:

- Recepción y búsqueda de la pieza desde el punto de venta.
- Ingreso a un dispositivo móvil con usuario genérico.
- Consulta de tareas asignadas y decisión de entrega.
- Confirmación desde el dispositivo.
- Decisión sobre el envío de una novedad de baja de stock.
- Circuitos complementarios de P80, devolución, asignación y baja de tareas genéricas.

### Interpretación para la nueva propuesta

El nuevo flujo conserva la búsqueda, la confirmación, la actualización de estado y el tratamiento de devoluciones, pero sustituye el usuario genérico por un usuario nominal. La asignación y baja de tareas genéricas no forma parte del primer wireframe.

## 4. Actores

### Operador

- Busca una pieza.
- Registra el resultado de la gestión.
- Carga datos, descripción, fotografía y firma cuando corresponda.
- Revisa y confirma la operación.

### Administrador

- Administra usuarios.
- Administra roles y perfiles.
- Asocia usuarios a sucursales o unidades de negocio.
- Puede consultar operaciones y trazabilidad.

No se incorpora un tercer rol en esta etapa. Si posteriormente se necesita separar consulta y operación, se evaluará un rol de auditor o supervisor.

## 5. Alcance del wireframe

Incluye:

1. Navegación principal de escritorio.
2. Identificación visible del usuario y sucursal.
3. Búsqueda manual de una pieza.
4. Visualización de los datos básicos de la pieza.
5. Inicio de la entrega.
6. Selección entre pieza entregada y no entregada.
7. Carga condicional de datos del receptor o motivo de no entrega.
8. Descripción obligatoria.
9. Simulación de fotografía y firma digital.
10. Revisión previa.
11. Confirmación y resultado.
12. Representación visual de auditoría e integraciones simuladas.

No incluye integraciones reales, persistencia, autenticación real, cámara, firma biométrica, operación offline, impresión ni reglas definitivas de stock o RDU.

## 6. Flujo objetivo

1. El operador inicia sesión con un usuario personal.
2. El sistema muestra su identidad y sucursal activa.
3. El operador ingresa manualmente el código de la pieza.
4. El sistema valida que la pieza exista y pueda gestionarse en esa sucursal.
5. El operador inicia la entrega.
6. Informa si la pieza fue entregada.
7. Si fue entregada, carga receptor, documento, vínculo, descripción, fotografía y firma.
8. Si no fue entregada, carga motivo, descripción y fotografía.
9. Revisa la información.
10. Confirma la gestión.
11. El sistema registra auditoría y solicita las actualizaciones externas que correspondan.
12. El sistema informa el resultado al operador.

## 7. Requerimientos funcionales iniciales

- **RF-01:** identificar al operador mediante una cuenta individual.
- **RF-02:** asociar al operador con una sucursal o unidad de negocio.
- **RF-03:** permitir el ingreso manual del identificador de pieza.
- **RF-04:** mostrar datos básicos y condición de guarda de la pieza.
- **RF-05:** impedir la gestión de una pieza no disponible.
- **RF-06:** registrar resultado entregada/no entregada.
- **RF-07:** exigir todos los campos visibles según el resultado elegido.
- **RF-08:** registrar una descripción de la gestión.
- **RF-09:** adjuntar o capturar una fotografía.
- **RF-10:** capturar firma digital para una entrega exitosa.
- **RF-11:** permitir revisión antes de confirmar.
- **RF-12:** registrar usuario, sucursal, fecha, hora y evidencias en la auditoría.
- **RF-13:** comunicar el resultado a T&T/Mosaic y generar RDU cuando las reglas lo indiquen.
- **RF-14:** administrar usuarios, roles y perfiles.
- **RF-15:** permitir consultar operaciones anteriores.

## 8. Campos del prototipo

### Búsqueda

- Código de pieza: obligatorio, ingreso manual.

### Pieza entregada

- Resultado: obligatorio.
- Nombre y apellido del receptor: obligatorio.
- DNI o documento: obligatorio.
- Relación con el destinatario: obligatoria.
- Descripción: obligatoria.
- Fotografía: obligatoria.
- Firma digital: obligatoria.

### Pieza no entregada

- Resultado: obligatorio.
- Motivo: obligatorio.
- Descripción: obligatoria.
- Fotografía: obligatoria.

## 9. Supuestos provisorios

- La aplicación será web y se usará inicialmente en escritorio.
- La sesión representará un usuario individual, no genérico.
- El prototipo supone conectividad, aunque la decisión final está pendiente.
- La pieza de demostración se considera existente, en guarda y disponible.
- Todos los campos visibles son obligatorios.
- Fotografía y firma se simulan; no se define todavía el hardware.
- El envío a sistemas externos se representa como exitoso y simulado.
- El RDU se presenta como resultado esperado, pero su regla de generación queda pendiente.
- Las reglas de stock, P80 y devolución permanecen abiertas.

## 10. Criterios de aceptación del wireframe

- **CA-01:** el usuario puede ingresar manualmente un código de pieza.
- **CA-02:** no puede buscar con el campo vacío.
- **CA-03:** puede cargar automáticamente una pieza ficticia para recorrer el prototipo.
- **CA-04:** visualiza la pieza y puede iniciar su gestión.
- **CA-05:** puede elegir entregada o no entregada.
- **CA-06:** la pantalla presenta campos diferentes según el resultado.
- **CA-07:** no puede avanzar si falta algún campo o evidencia visible.
- **CA-08:** puede volver y corregir datos antes de confirmar.
- **CA-09:** la confirmación muestra el usuario, resultado y evidencias registradas.
- **CA-10:** el resultado diferencia auditoría registrada de integraciones simuladas.
- **CA-11:** puede iniciar una nueva gestión desde la pantalla final.
- **CA-12:** la interfaz se presenta exclusivamente en escala de grises y está diseñada para escritorio.

## 11. Aspectos del procedimiento vigente a consultar

1. ¿Qué evento habilita una pieza para entrega en sucursal: P80 u otro estado?
2. ¿Qué validaciones realiza hoy el punto de venta antes de entregar?
3. ¿Cuándo debe informarse la baja de stock y cuándo no?
4. ¿Qué sistema es dueño del estado final de la pieza?
5. ¿Qué datos exactos necesita T&T para registrar la novedad?
6. ¿Cómo se genera hoy el RDU y qué datos/evidencias contiene?
7. ¿Qué motivos de no entrega y devolución existen oficialmente?
8. ¿Qué diferencias operativas existen entre sucursales o unidades de negocio?
9. ¿Quién puede corregir o anular una entrega ya confirmada?
10. ¿Cuánto tiempo deben conservarse fotografía, firma y datos del receptor?
11. ¿Debe emitirse o imprimirse algún comprobante?
12. ¿Qué tratamiento corresponde cuando una integración falla después de registrar la entrega?

## 12. Pendientes posteriores al wireframe

- Contratos y responsables de cada integración.
- Reglas de negocio definitivas.
- Estrategia de errores, reintentos e idempotencia.
- Disponibilidad y desempeño esperados.
- Seguridad y retención de datos personales.
- Hardware homologado.
- Necesidad y alcance de operación offline.
