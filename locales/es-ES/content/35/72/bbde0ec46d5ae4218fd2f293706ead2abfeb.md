# Bucles

Un **bucle** hace lo mismo una y otra vez.

```sather
   loop
      ...
   end;
```

Por sí solo no se detiene nunca, así que algo de dentro tiene que terminarlo.

## Dónde llevar la cuenta

Un bucle casi siempre necesita un valor que cambie a medida que avanza. Eso es
una **variable**, y `::=` crea una:

```sather
   total ::= 0;
```

La variable se llama `total`, empieza en `0`, y Sather deduce a partir del
`0` que contiene un `INT`. Después, `:=` le asigna un valor nuevo:

```sather
   total := total + 5;
```

Léelo de derecha a izquierda: toma lo que vale `total` ahora, súmale 5 y
guarda el resultado de nuevo en `total`.

Una variable creada así vive hasta el final de la rutina.

## until!

`until!` recibe una pregunta. Se formula en cada vuelta y, cuando la respuesta
es verdadera, el bucle se detiene ahí mismo.

```sather
   sum_to(last : INT) : INT is
      total ::= 0;
      n ::= 1;
      loop
         until!(n > last);
         total := total + n;
         n := n + 1;
      end;
      return total;
   end;
```

`n` cuenta 1, 2, 3... y el bucle termina la primera vez que `n` supera a
`last`. Sin el `n := n + 1`, la pregunta nunca cambiaría de respuesta y el
bucle se ejecutaría para siempre.

`until!` no tiene que ser la primera línea. Colócalo donde la pregunta tenga
sentido: arriba, puede que el bucle no se ejecute ninguna vez; abajo, se
ejecuta siempre al menos una vez.

El `!` forma parte del nombre. Sather marca así ciertas cosas; lo que
significa esa marca se explica más adelante.

## break!

`break!` termina el bucle de inmediato, sin ninguna pregunta asociada. Es útil
cuando el motivo para parar aparece en mitad del trabajo.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

`until!` y `break!` solo significan algo dentro de un `loop`. Ninguno de los
dos puede usarse por sí solo.
