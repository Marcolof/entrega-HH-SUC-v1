# Reporte de impacto — Reencuadre de fuentes y comparación de propuestas

> **Contexto del reporte.** Se decidió que el **GC01 queda deprecado como fuente de
> verdad** —no se elimina— y que la documentación se apoya en
> `Dos ideas como propuestas` y en el diagrama `image.png`. Se decidió además que
> **las Propuestas 1 y 2 quedan en igualdad de jerarquía**: ninguna está descartada
> y ambas se van a presentar.
>
> **Alcance:** documentación. No se modificó el prototipo.

---

## 1. Qué cambia al deprecar el GC01

> **Deprecado no es eliminado.** El GC01 pertenece a la etapa inicial del proceso y
> quedó desactualizado, pero **sigue siendo consultable**: explica huecos que las dos
> propuestas no cubren. Ver §1.5.

### 1.1 Se disuelve una contradicción

El GC01 se titulaba *"Entrega de Pieza en Sucursales con **Dispositivos Móviles**"*,
mientras que la Propuesta 1 propone *"aplicación Web para **PC o Tablet**"*. Esa
tensión estaba registrada como pregunta abierta.

**Al retirar el GC01, la contradicción desaparece.** El dispositivo ya no es una
incógnita transversal: **cada propuesta trae el suyo**.

| | Dispositivo |
|---|---|
| Propuesta 1 | PC o Tablet, con cámara y colector de firma |
| Propuesta 2 | Dispositivo móvil (HH) existente |

La pregunta ya no es *"¿qué dispositivo?"* sino *"¿qué propuesta?"* — y el
dispositivo se deduce de la respuesta.

### 1.2 Mosaic queda con respaldo débil

**Mosaic aparece únicamente en el GC01** (*"Office Track – Mosaic – Track and
trace"*). Ni el documento de propuestas ni el diagrama lo mencionan: el diagrama
habla de **Office Core**, no de Mosaic.

El prototipo lo nombra en dos lugares:

- Paso 4 del flujo: *"Actualización de T&T / Mosaic — SIMULADO"*.
- Pie de la pantalla de login: *"Sin conexión real con T&T, Mosaic ni Office Track"*.

**Consecuencia:** esas menciones ya no se apoyan en una fuente vigente, sino en un
documento deprecado. No es un error —el GC01 sí lo declaraba— pero conviene
confirmarlo antes de sostenerlo en una presentación.

### 1.3 El "por qué" queda mejor sostenido

El GC01 aportaba la justificación de negocio (falta de trazabilidad, doble proceso,
RDU, tiempos de notificación). Al deprecarlo, **el argumento central no se pierde**:
está contenido en las propias limitantes de la Propuesta 2, que declara *"en caso de
incidentes no tenemos visibilidad de la persona que realizó la tarea"*.

Es decir: la razón para preferir un usuario nominal ya no depende de un pedido
externo, sino de una debilidad que la alternativa reconoce de sí misma.

### 1.4 Pierden vigencia los datos de gestión

Prioridad declarada (ALTA), usuario solicitante, referente y áreas impactadas siguen
existiendo en el GC01, pero como información de una etapa anterior. Si se necesitan
para planificar, hay que revalidarlos.

### 1.5 Qué sigue explicando el GC01

Estos puntos **no están cubiertos por ninguna de las dos propuestas** y sólo el GC01
los explica. Por eso el documento se conserva:

| Hueco en las propuestas | Lo que aporta el GC01 |
|---|---|
| Ninguna propuesta explica **por qué** hay que cambiar | Situación actual: la gestión se hace **en dos sistemas** y bajo usuario genérico |
| Ninguna menciona la **pasividad de errores** | Si el operador declara haber gestionado con HH y no lo hizo, no se envía la novedad a T&T y la pieza **queda sin gestión de entrega** |
| Ninguna define el **alcance de despliegue** | *"Toda oficina de correo"* |
| Ninguna nombra **Mosaic** | Lo lista entre los sistemas a modificar |
| Ninguna cuantifica el **beneficio esperado** | Generación de RDU y ahorro en tiempos de notificación a clientes |

**Uso recomendado:** consultarlo para entender contexto y motivación, no para
derivar requisitos ni reglas de negocio.

---

## 2. Comparación de las dos propuestas

| Criterio | Propuesta 1 — App web nominal | Propuesta 2 — Usuarios genéricos |
|---|---|---|
| Identificación | Individual, por operador | Compartida, por sucursal |
| Trazabilidad ante incidentes | Completa | **Nula** (limitante declarada) |
| Dispositivo | PC o Tablet | Móvil (HH) existente |
| Hardware nuevo | **Sí**: cámara + colector de firma | No |
| Conectividad | **Total y permanente** | Trabaja offline |
| Riesgo de doble entrega | No aplica | **Sí** (limitante declarada) |
| Desarrollo nuevo obligatorio | ABM usuarios + ABM roles | Proceso de anulación de tareas duplicadas |
| Complejidad declarada | *"la más factible"* | *"proceso más complejo"* |
| Cambio para el operador | Alto (herramienta nueva) | Bajo (mismo proceso) |
| Documentación de proceso disponible | 6 pasos en texto | **Diagrama completo** (`image.png`) |

**Observación.** El documento fuente **no es neutral**: califica a la Propuesta 1
como *"la más factible"*, le enumera beneficios y no le asigna limitantes; a la
Propuesta 2 le enumera seis limitantes y ningún beneficio. La comparación de arriba
equilibra esa asimetría explicitando las ventajas de la Propuesta 2 que la fuente
omite (sin hardware, sin dependencia de conectividad, menor curva de cambio).

---

## 3. Impacto sobre lo que ya está construido

### 3.1 Qué es hoy el prototipo

**El prototipo es la Propuesta 1 materializada.** No es una maqueta neutral: cada
decisión de pantalla responde a esa alternativa.

| Elemento del prototipo | Respaldo en Propuesta 1 |
|---|---|
| Login con usuario nominal | Paso 1 |
| Búsqueda de pieza + formulario | Paso 2 |
| Foto, firma y descripción | Paso 3 |
| Revisión y confirmación | Paso 4 |
| T&T y RDU simulados | Pasos 5 y 6 |
| ABM de usuarios con unidad de negocio | Precondición |
| ABM de roles y perfiles | Precondición |

**Cobertura: completa.** Todo lo que la Propuesta 1 pide está representado.

### 3.2 Qué queda sin respaldo documental

| Elemento | Situación |
|---|---|
| Módulo **Historial** | No aparece en ninguna de las dos propuestas. Agregado de diseño. |
| Rol **Supervisor** | No aparece en ninguna fuente. Ya documentado como decisión de diseño. |
| Mención a **Mosaic** | Perdió su única fuente al retirar el GC01. |
| Ingreso **manual** del código de pieza | La fuente no define el medio de ingreso. |

Ninguno es un error: son decisiones del equipo. Pero conviene que estén rotuladas
como tales y no como requisitos del cliente.

### 3.3 Decisión tomada: ambas propuestas en igualdad de jerarquía

Ninguna está descartada y ambas se presentan. **Impacto medio.** El material deja de
presentar la Propuesta 1 como decisión tomada:

| Ajuste | Estado |
|---|---|
| La tarjeta del Hub identifica el prototipo como **"Propuesta 1"** | Aplicado |
| `functional-analysis.md` afirmaba *"Se adopta la propuesta 1"* | Corregido y marcado en revisión |
| Ambas propuestas documentadas con la misma estructura y profundidad | Aplicado |
| El módulo de Documentación las presenta al mismo nivel | Aplicado |

**Asimetría pendiente.** La Propuesta 1 está materializada en un prototipo
navegable; la Propuesta 2 sólo existe como documento y diagrama. Presentarlas como
iguales mientras una se puede recorrer y la otra no **inclina la decisión por
disponibilidad, no por mérito**. Conviene decidir si se equilibra —por ejemplo,
representando la Propuesta 2 en la presentación— o si se explicita que el prototipo
no implica preferencia.

### 3.4 Qué implicaría adoptar la Propuesta 2

Si la evaluación se inclinara por la Propuesta 2, el prototipo actual dejaría de
representar la solución:

| Elemento | Bajo Propuesta 2 |
|---|---|
| Login nominal | **Se contradice** (usuario genérico compartido) |
| ABM usuarios / roles | Deja de ser precondición |
| Flujo de entrega | Parcialmente reutilizable, pero sobre lista de tareas |
| Faltaría modelar | Ingreso de tareas, asignación por P80, anulación de tareas duplicadas, estados offline, decisión de baja de stock, circuito de devolución |

El prototipo no se descartaría, pero quedaría como **la materialización de una de
las dos opciones**.

---

## 4. Artefactos afectados

| Artefacto | Estado | Motivo |
|---|---|---|
| `Documents/functional-analysis.md` | **en revisión** | Daba por adoptada la Propuesta 1. Corregido, pero requiere una relectura completa |
| `openspec/specs/login-y-roles/spec.md` | **stale** | Describe login nominal, comportamiento exclusivo de la Propuesta 1 |
| Tarjeta del Hub "Prototipo navegable" | **actualizada** | Ahora identifica la Propuesta 1 |
| Módulo `/documentacion` | **vigente** | Publica estas propuestas de forma navegable |
| Prototipo (`app/prototype`) | **vigente** | Implementación fiel de la Propuesta 1 |

---

## 5. Preguntas abiertas

1. ¿Se confirma o se retira la mención a **Mosaic**? Hoy sólo la sostiene un
   documento deprecado.
2. ¿**Historial** y **Supervisor** quedan dentro del alcance aceptado? Ninguna
   propuesta los menciona.
3. ¿Cómo se equilibra la **asimetría de materialización** entre una propuesta con
   prototipo navegable y otra que sólo existe en papel? (§3.3)
4. ¿Cuándo se envía la novedad de **baja de stock** y cuándo no? (bifurcación del
   diagrama, aplica a la Propuesta 2)
5. ¿El **circuito de devolución** entra en el alcance de alguna de las dos?
