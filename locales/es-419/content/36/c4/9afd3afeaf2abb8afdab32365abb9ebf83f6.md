# Iteradores

Un iterador es una rutina cuyo nombre termina en `!` y que solo se puede llamar dentro de un `loop`. En cada vuelta del bucle produce su siguiente valor; cuando se agota, el bucle termina de inmediato.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather no tiene una sentencia `for`. Esto es lo que reemplaza a esa sentencia, y es la funcionalidad por la que se conoce el lenguaje.

## Los que conviene conocer desde el principio

| Iterador | Da |
| --- | --- |
| `a.elt!` | cada elemento de `a`, en orden |
| `a.ind!` | cada posición de `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | se ejecuta `n` veces y no produce nada |
| `n.up!` | `n`, `n+1`, … y nunca termina |
| `s.elt!` | cada carácter de un string |

`until!`, `while!` y `break!` también son iteradores. Por eso terminan en `!` y por eso solo funcionan dentro de un bucle.

## Dónde va la llamada

Una llamada a un iterador puede aparecer en cualquier lugar donde pueda aparecer una expresión, incluso en medio de una condición:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Cada *lugar* del programa donde se escribe un iterador mantiene su propia posición. Escribir `counts.elt!` dos veces en el cuerpo de un bucle hace dos recorridos independientes del array, lo que casi nunca es lo que se quiere:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

En su lugar, pídelo una sola vez y guarda el valor en una variable.

## Cómo termina el bucle

El bucle termina en cuanto *cualquier* iterador dentro de él se agota, no cuando todos lo hacen. Con un solo iterador eso es obvio. Con varios, es la regla que sorprende a todo el mundo, y de eso trata el siguiente ejercicio.

## Cuál elegir

Prefiere `elt!` cuando se quieren los valores e `ind!` cuando se quieren las posiciones. Recurre a `upto!` sobre `0 .. a.size - 1` solo cuando ambos se necesiten a la vez, o cuando la respuesta sea una posición en lugar de un valor.
