# Instrucciones

La compañía de danza está preparando su espectáculo de fin de curso: de cuántas formas se puede colocar a los bailarines y cómo se reparte la duración entre los actos.

Las cinco tareas van en la clase `FORMATION_COUNT`.

## 1. ¿Cuántas alineaciones?

Con `n` bailarines hay `n` factorial formas de colocarlos en fila: `n` opciones para el primero, luego `n-1` para el siguiente, y así sucesivamente. Devuelve eso como un `INTI`. Con cero bailarines hay exactamente una alineación: la vacía.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Escríbelo

El mismo número como string, con todos sus dígitos.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Un `INT` no puede contener ese número, y de eso trata precisamente la tarea.

## 3. La parte de un acto

Un espectáculo con `acts` actos iguales da a cada acto `1/acts` de la duración. Devuelve eso como un `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Dos actos juntos

Suma dos partes y devuelve el total, con exactitud.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. ¿Completa el espectáculo?

Responde si una parte es exactamente el espectáculo entero, es decir, exactamente uno.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
