# Glosario de dominio — Entrega HH SUC

> Fuente: notas del usuario transmitidas en el chat (2026-08-27), no un documento
> formal del cliente. Refleja conocimiento de negocio del propio equipo, con su nivel
> de certeza declarado en cada término — algunos marcados por el usuario mismo como
> "no estoy seguro". Este documento no reemplaza al GC01 ni a "Dos ideas como
> propuestas"; los complementa como capa de vocabulario.

## Sistemas

### Track & Trace (T&T)
**Confirmado, con un matiz que el propio usuario marca como impreciso.** No es
sólo "un sistema" en abstracto: es, en esencia, un **listado de eventos** de la
pieza/envío, y funciona como una **forma de seguimiento** (tracking) de esos
eventos. El usuario aclara explícitamente que no conoce los detalles de cómo
funciona puertas adentro — esto es una descripción de alto nivel, no una
especificación.

El término ya aparecía en toda la documentación existente (`functional-analysis.md`,
`propuesta-1`, `propuesta-2`, `provisional-architecture.md`), pero sin definición —
esta es la primera vez que se aclara qué es.

### Mosaic
**Parcialmente confirmado — es un hallazgo, no una corrección hecha y cerrada.**
Sistema de punto de venta **viejo**. La sucursal recibe eventos vía T&T y los carga
en Mosaic. Mecanismo de carga: algo asociado a una "palabra clave" y a "operador
RMS" (**fragmento incompleto, no se terminó de explicar** — ver preguntas abiertas).

**Lo confirmado:** Mosaic es un sistema real y vigente (no algo que sólo mencionaba
el GC01 deprecado, sin respaldo).

**Lo que sigue sin definir — y es el punto clave:** no está claro si la solución
**HH SUC puede comunicarse con Mosaic**. El usuario habló con un analista sobre esto
puntualmente y no obtuvo una respuesta clara. Esto **no es una corrección** al
disclaimer actual del prototipo ("Sin conexión real con T&T, Mosaic ni Office
Track") — de hecho es consistente con ese disclaimer, que ya asumía que no hay
integración confirmada. Lo que cambia es el nivel de importancia de la pregunta: no
es "¿mencionamos Mosaic o no?", es **"¿la arquitectura de la solución necesita
resolver esta integración antes de avanzar?"** — una definición de arquitectura
pendiente, no un detalle de redacción.

`reporte-impacto-propuestas.md` §1.2 todavía no se tocó por esto (ver decisión al
final) — su pregunta abierta original ("¿se confirma o se retira la mención a
Mosaic?") queda reemplazada por esta, más específica y más importante.

### Office Core
Ya aparecía en `propuesta-2-usuarios-genericos.md` (recibe la baja del circuito de
devolución, según el diagrama de referencia). El usuario agrega: trabaja con
**proveedores**, mediante **formularios** según el servicio o acuerdo — un
formulario de carga de datos, la firma, y posiblemente una foto de DNI.

**Sin confirmar del todo** — el propio usuario aclara que no está seguro de que la
foto de DNI aplique al flujo de este proyecto en particular.

## Eventos

### P80
**Confirmado — resuelve una pregunta abierta del proyecto.** Es un evento de
Track & Trace. `functional-analysis.md` y `propuesta-2-usuarios-genericos.md` ya lo
trataban como "el evento que probablemente habilita la asignación de la tarea", pero
como hipótesis del equipo (`[análisis]`), no como algo confirmado.

Con esta nota queda confirmado que P80 **es** un evento de T&T. Lo que sigue sin
confirmarse es si P80 es específicamente el evento que *habilita* la entrega en
sucursal — eso sigue siendo una inferencia del equipo, no algo que el usuario haya
afirmado acá.

### HH (Hand Held)
**Con incertidumbre — el propio usuario lo marca así.** "Hand Held" — no queda claro
si es el **dispositivo** (como asumían `propuesta-2-usuarios-genericos.md` y
`reporte-impacto-propuestas.md`, que hablan de "dispositivo móvil (HH)") o un
**tipo de evento de entrega** en sí mismo — dejar una tarjeta, una carta documento,
un paquete. Podría ser ambas cosas a la vez: el dispositivo Hand Held que registra el
evento de entrega personal.

No se corrige nada todavía en los documentos existentes por este término — queda
como pregunta abierta hasta confirmarlo.

## Listados (en construcción)

### Listado de dispositivos
**Sin confirmar — hipótesis propia del usuario, pendiente de verificar.**

No está claro de dónde salen ni cómo se toman desde Mosaic, justamente porque Mosaic
no parece poder comunicarse con la solución HH SUC (ver más arriba). Como hipótesis
de trabajo, el usuario propone una definición amplia:

> "Dispositivos" = cualquier cosa que llega a una sucursal.

Es decir, no necesariamente hardware/equipos — podría ser cualquier ítem/envío que
ingresa a la sucursal y que el sistema debe poder listar. **El propio usuario pide
verificarlo antes de darlo por válido.**

### Listado de eventos
**Probablemente respondido, no es una lista aparte.** El usuario aclaró que lo que
tenía en mente al escribir este punto era T&T mismo: T&T *es*, en esencia, el
listado de eventos (ver arriba). No parece haber un "listado de eventos" distinto
de T&T que documentar — pero como el propio usuario dice no conocer el detalle,
esto queda como interpretación razonable, no como confirmación cerrada.

---

## Preguntas abiertas que agrega este glosario

1. **Bloqueante de arquitectura:** ¿la solución HH SUC puede comunicarse con
   Mosaic? El propio analista del cliente no lo dejó claro.
2. ¿Qué significa exactamente "palabra clave... operador RMS" en la carga de eventos
   a Mosaic?
3. HH — ¿es el dispositivo, el tipo de evento, o ambos?
4. ¿"Dispositivos" significa hardware, o "cualquier cosa que llega a una sucursal"
   (ítems/envíos)? Hipótesis del usuario, sin verificar.
5. ¿La foto de DNI en el formulario de Office Core aplica al flujo de este proyecto,
   o es de otro proceso?

## Decisión pendiente

Este glosario **no modificó** `reporte-impacto-propuestas.md` ni
`functional-analysis.md`. La pregunta original de esos documentos sobre Mosaic
("¿se confirma o se retira la mención?") quedó reemplazada acá por una más precisa
y más importante ("¿HH SUC puede comunicarse con Mosaic?"), pero todavía no se
trasladó a esos documentos — queda pendiente de que el usuario confirme si aplicar
la actualización ahora.
