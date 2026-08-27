# Propuesta 1 — Aplicación web con usuario nominal

> **Fuente:** `docs/Dos ideas como propuestas (2).docx`, sección *"Primera alternativa y la más factible"*.
> El documento fuente la califica explícitamente como **la más factible**.
>
> Este documento reorganiza y completa esa fuente para hacerla comparable con la
> Propuesta 2. Lo que proviene de la fuente está marcado como **[fuente]**; lo que
> agrega el equipo para poder decidir está marcado como **[análisis]**.

---

## 1. Qué propone

**[fuente]** Desarrollar una **aplicación web para PC o Tablet** donde se puedan
gestionar las diferentes alternativas de entrega, de forma similar a la operación
actual con Office Track.

**[fuente]** Para poder llevar a cabo el proceso en PC es necesario contar con
**cámara** y **colector de firma digital**.

**[análisis]** El cambio de fondo respecto de la operación actual es **quién queda
registrado**: la entrega se realiza bajo una cuenta individual del operador, no
bajo un usuario genérico de sucursal.

---

## 2. Proceso

**[fuente]** Los seis pasos, tal como los define el documento:

1. El operador ingresa a la aplicación con sus credenciales.
2. Ingresa la pieza a la aplicación; luego se despliega un formulario para su entrega.
3. Carga los valores solicitados (**foto, firma, texto**).
4. Al completar los datos solicitados, se envía el formulario.
5. En **T&T** se genera el estado de entrega.
6. Adicionalmente se genera el **RDU** como el actual.

**[análisis]** El documento no define **cómo** se ingresa la pieza en el paso 2
(tecleo manual del identificador, lectura de código, búsqueda por destinatario).
Queda como pregunta abierta.

---

## 3. Actores

**[fuente]** El documento no enumera actores de forma explícita, pero las
precondiciones exigen administración de usuarios, roles y perfiles, lo que implica
al menos dos funciones diferenciadas:

| Actor | Responsabilidad | Origen |
|---|---|---|
| Operador | Ingresa con su cuenta individual, gestiona la entrega y carga las evidencias | **[fuente]** (paso 1 a 4) |
| Administrador | Da de alta usuarios, los asocia a una unidad de negocio y define roles y perfiles | **[fuente]** (precondiciones) |

---

## 4. Precondiciones

**[fuente]** Son requisitos que deben existir **antes** de poder operar:

- **ABM de usuarios** con asignación a unidad de negocio.
- **ABM de roles y perfiles.**

**[análisis]** Estas dos precondiciones son las que justifican que el prototipo
incluya los módulos de Usuarios y Roles: sin ellos la propuesta no es operable.

---

## 5. Prerrequisitos

**[fuente]**

- **Dependencia total de conectividad.**
- **Compra de cámaras y colector USB de firmas.**

**[análisis]** Ambos son condicionantes de despliegue, no de diseño: afectan costo,
logística y tiempos de puesta en marcha, y determinan en qué sucursales puede
operar la solución.

---

## 6. Beneficios

**[fuente]**

- La aplicación **trabaja en línea con T&T**, lo que mejora el procesamiento de los
  estados de entrega y del RDU.
- *(El documento aclara que esta solución hay que bajarla a detalle para poder
  realizar una estimación.)*

**[análisis]** Beneficios que se desprenden de la propuesta pero que la fuente no
enuncia como tales:

- **Trazabilidad individual:** al operar con cuenta nominal, cada gestión queda
  atribuida a una persona. Esto es exactamente lo que la Propuesta 2 declara como
  limitación propia ("no tenemos visibilidad de la persona que realizó la tarea").
- **Sin sincronización diferida:** al trabajar en línea, no existen tareas
  pendientes en un dispositivo ni necesidad de anular tareas duplicadas.

---

## 7. Limitaciones y riesgos

**[fuente]** El documento no lista limitaciones para esta propuesta.

**[análisis]** Riesgos que se desprenden de sus propios prerrequisitos:

- **Sin conectividad no hay operación.** La dependencia es total y declarada; no hay
  modo degradado previsto.
- **Costo y logística de hardware.** Requiere cámara y colector de firma por puesto.
- **Comportamiento ante falla de integración no definido.** La fuente describe el
  camino feliz (pasos 5 y 6) pero no qué ocurre si T&T no responde después de que
  el operador ya confirmó la entrega.

---

## 8. Impacto en sistemas

**[fuente]**

| Sistema | Rol en la propuesta |
|---|---|
| T&T | Recibe el estado de entrega (paso 5) |
| RDU | Se genera "como el actual" (paso 6) |
| Office Track | Referencia funcional: la app replica sus alternativas de entrega |

**[análisis]** La fuente no precisa el contrato de integración (qué datos, en qué
momento, con qué mecanismo de reintento).

---

## 9. Supuestos

- **[análisis]** "Símil operación actual con Office Track" se interpreta como
  equivalencia **funcional** (mismas alternativas de entrega), no como réplica
  visual de esa interfaz.
- **[análisis]** "Foto, firma, texto" se interpreta como evidencias obligatorias de
  la gestión; la fuente no distingue cuáles aplican a una entrega efectiva y cuáles
  a una no entrega.

---

## 10. Preguntas abiertas

1. ¿Cómo se ingresa la pieza: tecleo manual, lectura de código u otro medio?
2. ¿PC, Tablet, o ambos? La fuente dice "PC o Tablet" pero sólo detalla el
   hardware necesario para PC.
3. ¿Qué evidencias son obligatorias en una **no entrega** frente a una entrega efectiva?
4. ¿Qué ocurre si la integración con T&T falla después de confirmada la entrega?
5. ¿Qué alternativas de entrega de Office Track deben replicarse exactamente?
6. ¿Existe circuito de devolución en esta propuesta? La fuente no lo menciona,
   pero el diagrama de referencia sí lo contempla en el proceso actual.
