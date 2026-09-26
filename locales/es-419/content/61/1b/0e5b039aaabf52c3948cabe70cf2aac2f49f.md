# Instrucciones

La compañía de danza está preparando su espectáculo de fin de año: cuántas formas hay de acomodar a los bailarines y cómo se reparte el tiempo de duración entre los actos.

Las cinco tareas van en la clase `FORMATION_COUNT`.

## 1. ¿Cuántas formaciones hay?

Con `n` bailarines hay `n` factorial formas de formarlos en fila: `n` opciones para el frente, luego `n-1` para el siguiente, y así sucesivamente. Devuélvelo como un `INTI`. Con cero bailarines hay exactamente una formación, la vacía.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Escríbelo

El mismo número como una cadena, con todos sus dígitos.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Un `INT` no puede contener ese número, que es justamente el punto de la tarea.

## 3. La parte de un acto

Un espectáculo de `acts` actos iguales le da a cada acto `1/acts` del tiempo de duración. Devuélvelo como un `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Dos actos juntos

Suma dos partes y devuelve el total, exacto.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. ¿Llena el espectáculo?

Responde si una parte es exactamente el espectáculo completo, es decir, exactamente uno.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
