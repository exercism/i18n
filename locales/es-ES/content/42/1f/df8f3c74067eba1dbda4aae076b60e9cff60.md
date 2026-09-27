# Iteradores

Recorrer un array con un contador exige cuatro líneas de gestión antes de
hacer ningún trabajo:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

El contador, la comprobación de fin y el incremento no tienen nada que ver
con sumar números. Un **iterador** se encarga de las tres cosas.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` entrega un elemento en cada vuelta y termina el bucle cuando ya no
quedan. Sin contador, sin nada que pueda salir mal y sin forma de salirte
del final del array.

## El signo de exclamación

El `!` marca un iterador. Ya has visto tres, `until!`, `while!` y `break!`,
y siguen la misma regla: **un iterador solo se puede llamar dentro de un
bucle.** Escribir `counts.elt!` fuera de uno es un error.

A un iterador llamado dentro de un bucle se le pide un valor en cada vuelta.
Cuando ya no le queda ninguno, el bucle termina de inmediato, esté donde
esté la llamada dentro del cuerpo.

## Dos para empezar

`elt!` da los elementos de un array o de un string, en orden.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` cuenta. `1.upto!(5)` da 1, 2, 3, 4, 5 y después termina el bucle.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Ambos son rutinas normales que resulta que acaban en `!`, así que ambos se
llaman con un punto, sobre un array o sobre un número.

## Guardar el resultado

El bucle termina por sí solo, así que todo lo que se calcula dentro tiene
que guardarse en una variable declarada **fuera**; de lo contrario,
desaparece cuando el bucle termina.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
