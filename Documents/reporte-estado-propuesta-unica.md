# Reporte de estado — Reencuadre a propuesta única

> **Fecha:** 2026-09-17
> **Destinatario:** equipo de análisis funcional
> **Alcance:** relevamiento de contradicciones, riesgos y puntos abiertos que quedaron
> tras la decisión de presentar una sola propuesta de solución.
>
> **Documento interno.** No está publicado en el módulo `/documentacion` ni es material
> de cliente. Los puntos abiertos que lista no deben trasladarse a la presentación.

---

## 0. Qué cambió

La decisión anterior era presentar **dos propuestas en igualdad de jerarquía**. Esa
decisión quedó **derogada**: ahora existe **una sola propuesta** —la ex Propuesta 1,
aplicación web con identificación nominal del operador— y ya no se habla de "v1", "v2"
ni "Propuesta 1".

Se sumó además un requisito explícito: el **ABM de usuarios y roles cumple con la norma
ISO/IEC 27001**.

**Estado de los artefactos:**

| Artefacto | Estado | Detalle |
|---|---|---|
| Presentación (deck HTML) | **vigente** | 13 slides, propuesta única, con slide de ISO/IEC 27001 |
| Export PPTX | **vigente** | Regenerado desde el deck de 13 slides |
| Prototipo | vigente | Materializa la propuesta; no requirió cambios |
| Hub — tarjetas 01 y 03 | actualizadas | Sin referencias a numeración de propuestas |
| Hub — tarjeta 04 (Documentación) | **sin actualizar** | Describe correctamente los `.md` actuales, que todavía hablan de dos propuestas |
| Documentación (`Documents/*.md`) | **desactualizada** | Es el trabajo pendiente principal |
| `openspec/specs/login-y-roles` | desactualizada | No cubre el ABM como pieza normativa |

---

## 1. Verificación de la norma ISO/IEC 27001

El número de norma **es correcto**. ISO/IEC 27001 es el estándar certificable de
gestión de seguridad de la información (SGSI).

Los controles de gestión de accesos del **Anexo A** (versión 2022) que respaldan el ABM:

| Control | Nombre | Relación con la propuesta |
|---|---|---|
| **A.5.15** | Control de acceso | Reglas de acceso por rol, con criterio de mínimo privilegio |
| **A.5.16** | Gestión de identidad | **Identidad única por persona, nunca compartida** |
| **A.5.17** | Información de autenticación | Credenciales individuales y su ciclo de vida |
| **A.5.18** | Derechos de acceso | Alta, cambio y baja de permisos, registrados y auditables |

**Hallazgo relevante:** el control **A.5.16 respalda directamente el núcleo de la
propuesta**. La norma exige identidad única y no compartida; el usuario genérico
compartido que se usa hoy es incompatible con ese control. Esto convierte al usuario
nominal, que antes era un argumento de trazabilidad operativa, en un **requisito
normativo**. Es el argumento más fuerte disponible y conviene usarlo como tal.

**Matiz a tener presente ante el cliente:** la certificación ISO/IEC 27001 es un proceso
organizacional que abarca a la organización, no algo que otorgue un módulo de software.
La formulación defendible es que el ABM **está diseñado sobre los controles de gestión
de accesos del Anexo A**. Si el cliente pregunta "¿están certificados?", esa es la
respuesta correcta.

---

## 2. Contradicciones activas

### 2.1 La documentación afirma lo contrario que la presentación

- `Documents/functional-analysis.md` (línea 22): *"No hay propuesta adoptada. Las
  Propuestas 1 y 2 están en igualdad de jerarquía"*.
- `Documents/reporte-impacto-propuestas.md` (línea 6): registra esa igualdad como
  decisión vigente.

Ambos archivos se publican en `/documentacion`, en la misma URL que la presentación.
Un lector que recorra los dos módulos encuentra dos versiones incompatibles del estado
del proyecto.

**Severidad: alta.** Es la inconsistencia más visible.

### 2.2 El reporte de impacto quedó sin objeto

`reporte-impacto-propuestas.md` está construido sobre la comparación:

- §2 es íntegramente la tabla comparativa de las dos propuestas.
- §3.3 se titula *"Asimetría pendiente"* y analiza que una propuesta tenga prototipo y
  la otra no.
- §5 pregunta cómo equilibrar esa asimetría.

Con una sola propuesta, esas secciones no describen nada real. **No está desactualizado:
perdió su objeto.** Recomendación en §5.

### 2.3 El mejor argumento se apoyaba en la propuesta descartada

Este punto es el más fino y requiere una decisión de análisis.

`reporte-impacto-propuestas.md` §1.3 establece que la justificación del usuario nominal
*"ya no depende de un pedido externo, sino de una debilidad que la alternativa reconoce
de sí misma"*. La cita textual que lo sostiene —*"en caso de incidentes no tenemos
visibilidad de la persona que realizó la tarea"*— proviene del documento de la
**Propuesta 2**.

Al retirar la Propuesta 2 de la narrativa, la afirmación "hoy no hay visibilidad de
quién hizo la gestión" queda respaldada **únicamente por el GC01, que está deprecado
como fuente de verdad**.

El hecho sigue siendo cierto y la Propuesta 2 declaraba replicar el proceso actual, por
lo que su limitante describe también la operación de hoy. Pero la cadena de evidencia
ahora pasa por dos documentos que ya no se citan.

**Acción sugerida:** re-anclar la afirmación en una fuente vigente, idealmente una
confirmación del área usuaria sobre la operación actual.

### 2.4 Lenguaje de "pendiente" sobre algo ya definido

`functional-analysis.md` (línea 76) todavía dice *"queda sujeto a confirmación del área
usuaria"* respecto de la propuesta, que ahora se presenta como definida.

---

## 3. Riesgos

| # | Riesgo | Severidad |
|---|---|---|
| 3.1 | Navegación del deck hacia el Hub | **Alta** (condicional) |
| 3.2 | ISO/IEC 27001 sin respaldo documental | **Alta** |
| 3.3 | Mosaic: integración no confirmada | Media-alta |
| 3.4 | Alcance no aprobado: Historial y Supervisor | Media |
| 3.5 | Especificación del ABM desactualizada | Media |

### 3.1 La presentación es navegable hacia material no destinado al cliente

El pill "Volver al hub" de cada slide apunta a `/`. El Hub expone la tarjeta **01
Prototipo navegable** y la tarjeta **04 Documentación**, que incluye los puntos abiertos
y las contradicciones de esta sección.

Si el deck HTML se proyecta al cliente desde el navegador, el prototipo y los huecos
quedan **a un clic**. El supuesto vigente es que el deck es de uso interno y que al
cliente se le entrega el PPTX —donde el botón no existe—, pero ese supuesto conviene
confirmarlo explícitamente.

**Opciones:** (a) confirmar que el deck HTML nunca se proyecta al cliente; (b) versión
del deck sin botón de retorno para proyección; (c) separar la documentación interna de
la publicada.

### 3.2 La afirmación normativa no tiene respaldo en la documentación

La presentación afirma el cumplimiento de ISO/IEC 27001, y **ningún documento del
proyecto menciona la norma** (verificado: cero menciones en `Documents/`). Si el cliente
o una auditoría piden el respaldo, no hay dónde apoyarse.

**Acción sugerida:** documento de seguridad y accesos (ver §5.2).

### 3.3 Mosaic aparece en el proyecto sin fuente vigente y sin integración confirmada

Dos problemas superpuestos:

1. **Respaldo documental:** Mosaic se menciona en `provisional-architecture.md` (líneas
   9 y 76) y en el prototipo, pero su única fuente es el GC01 deprecado. Ni el documento
   de propuestas ni el diagrama lo nombran —el diagrama habla de **Office Core**.
2. **Bloqueante de arquitectura:** no está confirmado si la solución HH SUC **puede**
   comunicarse con Mosaic. La consulta al analista del cliente no quedó resuelta.

El segundo punto condiciona el diseño de integraciones y no es un detalle de redacción.

### 3.4 Elementos del prototipo sin respaldo en la propuesta

`Historial` y el rol `Supervisor` no aparecen en ninguna fuente: son agregados de
diseño. Mientras había una decisión pendiente, figuraban como propuestas del equipo.
Ahora que la solución se presenta como definida, pasan a ser **alcance no aprobado**.
Igual situación para el ingreso manual del código de pieza, cuyo medio la fuente no
define.

### 3.5 La especificación del ABM no acompaña su nueva criticidad

`openspec/specs/login-y-roles/spec.md` está marcada desactualizada y no contempla el
cambio de rol desde el panel de prueba. Es justamente la especificación de la pieza que
ahora sostiene la afirmación normativa.

---

## 4. Puntos abiertos

Consolidados de `propuesta-1-aplicacion-web-nominal.md` §10 y del estado del proyecto,
ordenados por impacto:

| # | Punto abierto | Por qué importa |
|---|---|---|
| 1 | ¿La solución puede comunicarse con **Mosaic**? | Bloqueante de arquitectura |
| 2 | ¿Qué ocurre si **T&T falla después** de confirmada la entrega? | La fuente sólo describe el camino feliz; sin modo degradado previsto |
| 3 | ¿Cómo se **ingresa la pieza**: tecleo, lectura de código, otro? | El prototipo asume tecleo manual; la fuente no lo define |
| 4 | ¿**PC, Tablet, o ambos**? | La fuente dice "PC o Tablet" pero sólo detalla hardware para PC |
| 5 | ¿Qué **evidencias son obligatorias en una no entrega** frente a una entrega efectiva? | Foto, firma y texto se asumen obligatorias en todos los casos |
| 6 | ¿Qué **alternativas de entrega de Office Track** deben replicarse exactamente? | Define el alcance funcional real |
| 7 | ¿Cuándo se envía la **novedad de baja de stock** y cuándo no? | Bifurcación del diagrama sin regla definida |
| 8 | ¿El **circuito de devolución** entra en el alcance? | El diagrama lo contempla; la propuesta no lo menciona |
| 9 | ¿**Historial** y **Supervisor** quedan dentro del alcance? | Ver §3.4 |
| 10 | ¿Cuál es el **alcance de despliegue**? | *"Toda oficina de correo"* sólo lo declara el GC01 deprecado |
| 11 | Glosario: ¿**HH** es el dispositivo, el tipo de evento, o ambos? | Afecta la precisión de toda la documentación |
| 12 | ¿Qué significa **"palabra clave / operador RMS"** en la carga de eventos? | Sin interpretación confirmada |

---

## 5. Mejoras recomendadas

### 5.1 Separar documentación de cliente y documentación interna

**Prioridad: alta.** Es la mejora que habilita a las demás.

Si los puntos abiertos se trasladan a la documentación y la documentación es pública, el
problema se movió de lugar sin resolverse. Se propone que `/documentacion` publique
únicamente lo definido, y que los huecos, contradicciones y notas de fuentes vivan en un
espacio interno no enlazado desde el Hub —como este mismo reporte.

### 5.2 Documento de seguridad y control de accesos

**Prioridad: alta.** Respalda la afirmación normativa de la presentación (§3.2).

Contenido propuesto:

- Mapa de los controles A.5.15 a A.5.18 contra lo que implementa el ABM.
- **Matriz de roles × permisos.** El prototipo ya tiene tres roles con permisos
  diferenciados, de modo que la matriz se deriva del código y no de supuestos.
- Ciclo de vida de la identidad: alta, cambio de rol, baja, y qué queda registrado.

Esto convierte "cumple con la norma" en una afirmación auditable.

### 5.3 Migrar la documentación a propuesta única

**Prioridad: alta.** Resuelve las contradicciones 2.1 y 2.4.

| Archivo | Acción |
|---|---|
| `propuesta-2-usuarios-genericos.md` | Retirar |
| `propuesta-1-aplicacion-web-nominal.md` | Renombrar como la propuesta y quitar toda comparación |
| `reporte-impacto-propuestas.md` | Retirar (ver §5.4) |
| `functional-analysis.md` | Reencuadrar: quitar la igualdad de jerarquía y el lenguaje de pendiente |
| `app/documentacion/docs.ts` | Actualizar títulos y entradas |
| Hub, tarjeta 04 | Actualizar una vez migrados los `.md` |

### 5.4 Retirar el reporte de impacto en lugar de reescribirlo

`reporte-impacto-propuestas.md` documenta una decisión derogada y su estructura es la
comparación. Reescribirlo cuesta más que archivarlo y dejar un registro breve de
decisión. Su contenido todavía útil —el §1.5, que enumera qué sigue explicando el GC01—
puede absorberse en `functional-analysis.md`.

### 5.5 Renombrar el export PPTX

**Hecho.** El archivo se llamaba `Propuesta-1-vs-Propuesta-2.pptx`: el nombre por sí
solo contradecía el reencuadre y filtraba la existencia de una segunda alternativa.
Ahora es `Propuesta-Entrega-HH-SUC.pptx`.

---

## 6. Resumen para decidir

**Tres decisiones que bloquean al resto:**

1. **¿La documentación publicada es material de cliente?** De la respuesta depende
   dónde viven los puntos abiertos y si hace falta separar espacios (§5.1, §3.1).
2. **¿Se puede integrar con Mosaic?** Bloqueante de arquitectura, requiere respuesta del
   cliente (§3.3).
3. **¿Historial y Supervisor están dentro del alcance?** Define si el prototipo
   representa la solución acordada o la excede (§3.4).

**Dos acciones que no dependen de nadie más:** documentar el mapa ISO/IEC 27001 con la
matriz de roles y permisos (§5.2), y migrar la documentación a propuesta única (§5.3).
