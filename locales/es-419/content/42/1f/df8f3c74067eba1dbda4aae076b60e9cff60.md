# Iteradores

Recorrer un array con un contador exige cuatro líneas de gestión antes de que ocurra cualquier trabajo real:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

El contador, la prueba de terminación y el paso no tienen nada que ver con sumar números. Un **iterador** se encarga de las tres cosas.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` entrega un elemento en cada vuelta y termina el bucle cuando ya no queda ninguno. Sin contador, nada que puedas hacer mal y ninguna manera de pasarte del final del array.

## El signo de exclamación

El `!` marca un iterador. Ya conociste tres (`until!`, `while!` y `break!`) y siguen la misma regla: **un iterador solo se puede llamar dentro de un bucle.** Escribir `counts.elt!` fuera de uno es un error.

Cuando se llama a un iterador dentro de un bucle, se le pide un valor en cada vuelta. Cuando ya no le queda ninguno, el bucle termina de inmediato, sin importar en qué parte del cuerpo esté la llamada.

## Dos para empezar

`elt!` entrega los elementos de un array o de un string, en orden.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` cuenta. `1.upto!(5)` da 1, 2, 3, 4, 5 y luego termina el bucle.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Ambas son rutinas comunes que casualmente terminan en `!`, así que se llaman con un punto, sobre un array o sobre un número.

## Conservar el resultado

El bucle termina por sí solo, así que todo lo que calcules dentro de él tiene que guardarse en una variable declarada **fuera**; de lo contrario, desaparece cuando termina el bucle.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
