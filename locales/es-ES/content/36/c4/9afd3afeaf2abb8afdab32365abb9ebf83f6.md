# Iteradores

Un iterador es una rutina cuyo nombre termina en `!` y que solo puede llamarse dentro de un `loop`. Cada vuelta del bucle produce su siguiente valor; cuando se agota, el bucle termina al instante.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather no tiene ninguna instrucción `for`. Esto es lo que la sustituye, y es la característica por la que se conoce el lenguaje.

## Los que conviene conocer pronto

| Iterador | Da |
| --- | --- |
| `a.elt!` | cada elemento de `a`, en orden |
| `a.ind!` | cada posición de `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | se ejecuta `n` veces, sin dar nada |
| `n.up!` | `n`, `n+1`, … y no termina nunca |
| `s.elt!` | cada carácter de un string |

`until!`, `while!` y `break!` también son iteradores. Por eso terminan en `!` y por eso solo funcionan dentro de un bucle.

## Dónde va la llamada

Una llamada a un iterador puede aparecer en cualquier lugar donde pueda aparecer una expresión, incluso en medio de una condición:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Cada *lugar* del programa donde se escribe un iterador mantiene su propia posición. Escribir `counts.elt!` dos veces en el cuerpo de un bucle crea dos recorridos independientes del array, que casi nunca es lo que se quiere:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Pídelo una vez y guarda el valor en una variable.

## Terminar el bucle

El bucle termina en cuanto *cualquier* iterador se agota, no cuando se agotan todos. Con un solo iterador es obvio. Con varios es la regla que atrapa a todo el mundo, y es de lo que trata el próximo ejercicio.

## Cuál elegir

Usa `elt!` cuando quieras los valores e `ind!` cuando quieras las posiciones. Recurre a `upto!` sobre `0 .. a.size - 1` solo cuando necesites ambos a la vez, o cuando la respuesta sea una posición en lugar de un valor.
