# Propuesta 2 — Usuarios genéricos múltiples por unidad de negocio

> **Fuentes:** `docs/Dos ideas como propuestas (2).docx`, sección *"Segunda alternativa"*,
> y el diagrama `docs/image.png` (copia local en `assets/process-reference.png`).
>
> Lo que proviene de las fuentes está marcado como **[fuente]**; lo que agrega el
> equipo para poder decidir está marcado como **[análisis]**.

---

## 1. Qué propone

**[fuente]** Generar **varios usuarios genéricos para cada sucursal**. El proceso de
entrega sería **el mismo al actual**.

**[análisis] El diagrama de referencia describe esta propuesta.** Como la fuente
declara que el proceso "sería el mismo al actual", y `image.png` documenta
justamente el proceso actual/tentativo —con `INGRESO USUARIO GENERICO`,
`INGRESO TAREAS`, `P80 → ASIGNACION USUARIO GENERICO` y
`BAJA TAREAS USUARIO GENERICO`—, ese diagrama funciona como **la vista de proceso
de la Propuesta 2**. Es la propuesta que llega mejor documentada de las dos.

---

## 2. Proceso

**[fuente]** Mecánica descrita en el documento:

1. Cada unidad de negocio cuenta con **uno o N usuarios genéricos**.
2. Cada vez que se recibe un **P80** de una pieza de una unidad de negocio…
3. …se envía la tarea de la pieza **N veces**, según la cantidad de usuarios
   genéricos que tenga esa unidad.
4. Un usuario genérico se loguea al dispositivo y **automáticamente se bajan todas
   las tareas** enviadas en el paso anterior.
5. Se gestiona una tarea y se envía.
6. Se genera el estado de entrega en **T&T**.
7. Adicionalmente se genera el **RDU** como el actual.
8. **Debe construirse un proceso nuevo** que, al recibir la tarea de un usuario
   genérico, **anule las tareas de los N usuarios genéricos** de esa misma unidad
   de negocio.

**[fuente — diagrama]** El diagrama agrega elementos que el texto no menciona:

- La **búsqueda de la pieza** ocurre en la aplicación de punto de venta, antes de
  pasar al dispositivo móvil.
- Tras la confirmación de entrega hay una **decisión explícita**: envía o no envía
  **novedad de baja de stock**.
- Existe un **circuito de devolución** paralelo: `MOTIVOS DEVOLUCION` →
  `BAJA OFFICE CORE`, y en el subproceso de tareas → `BAJA TAREAS USUARIO GENERICO`.

**[análisis]** El diagrama está rotulado **"PROCESO TENTATIVO"**, por lo que sus
ramas describen una intención de proceso, no reglas de negocio confirmadas.

---

## 3. Actores

**[fuente]** No hay actores nominales: la operación se realiza bajo **usuarios
genéricos de sucursal**, compartidos por el personal de esa unidad.

**[análisis]** Esto es la diferencia estructural con la Propuesta 1 y el origen de
casi todas sus limitaciones.

---

## 4. Precondiciones

**[fuente]** El documento no enuncia precondiciones para esta propuesta.

**[análisis]** Se desprenden de la mecánica descrita:

- Definir **cuántos usuarios genéricos** tiene cada unidad de negocio.
- Disponer de los **dispositivos móviles (HH)** ya en uso.
- Construir el **proceso de anulación de tareas duplicadas** (paso 8): es un
  desarrollo nuevo y obligatorio, no un ajuste.

---

## 5. Prerrequisitos

**[fuente]** El documento no los enuncia por separado.

**[análisis]** A diferencia de la Propuesta 1, **no requiere compra de hardware
nuevo**: reutiliza los dispositivos móviles existentes, y no depende de
conectividad permanente porque **trabaja offline**.

---

## 6. Beneficios

**[fuente]** El documento **no enuncia beneficios** para esta propuesta — sólo
limitantes.

**[análisis]** Ventajas que igualmente se desprenden:

- **Sin inversión en hardware**: aprovecha el parque de dispositivos actual.
- **Continuidad operativa sin conexión**: al trabajar offline, una caída de
  conectividad no detiene la entrega.
- **Menor cambio para el operador**: el proceso es el mismo que ya conoce.

> **Nota de interpretación.** La fuente lista *"Trabaja OFFLINE"* entre las
> **limitantes**, no entre los beneficios. Se entiende que el redactor lo señala
> como causa de los problemas de sincronización que enumera a continuación, no como
> defecto en sí mismo. Es una ambigüedad de la fuente que conviene confirmar.

---

## 7. Limitaciones y riesgos

**[fuente]** Lista textual del documento:

- Se deben asignar **las mismas tareas** a los diferentes usuarios genéricos de la
  unidad de negocio.
- En caso de incidentes, **no hay visibilidad de la persona** que realizó la tarea.
- **Dos operadores podrían tomar la misma tarea** y entregar el mismo envío.
- La tarea **puede quedar en el dispositivo** por falta de conectividad o por
  apagado del equipo.
- Trabaja **OFFLINE**.
- **Proceso más complejo.**

**[análisis]** Las dos primeras son de naturaleza distinta al resto:

- *"No hay visibilidad de la persona"* es un problema de **trazabilidad y
  responsabilidad**, no de rendimiento: sobrevive a cualquier mejora técnica,
  porque es consecuencia directa del usuario compartido.
- *"Dos operadores podrían entregar el mismo envío"* es un riesgo de **doble
  entrega**, que el proceso de anulación del paso 8 busca mitigar pero no puede
  eliminar mientras haya operación offline.

---

## 8. Impacto en sistemas

**[fuente]**

| Sistema | Rol en la propuesta |
|---|---|
| T&T | Recibe el estado de entrega |
| RDU | Se genera "como el actual" |
| Office Core | Recibe la baja en el circuito de devolución **(diagrama)** |
| Gestión de tareas | Debe soportar el envío N veces y la anulación masiva **(paso 8)** |

---

## 9. Supuestos

- **[análisis]** "El mismo proceso al actual" se interpreta como el flujo del
  diagrama `image.png`.
- **[análisis]** El P80 es el evento que habilita la asignación de la tarea; el
  diagrama lo muestra como disparador del subproceso de tareas.

---

## 10. Preguntas abiertas

1. ¿Cuántos usuarios genéricos por unidad de negocio, y con qué criterio se define
   ese número?
2. ¿Qué ocurre si la anulación de tareas duplicadas falla o llega tarde?
3. ¿Cuándo se envía la novedad de baja de stock y cuándo no? (bifurcación del diagrama)
4. ¿El circuito de devolución es parte del alcance o es un proceso separado?
5. ¿Cómo se resuelve una investigación de incidente sin poder identificar al operador?
