# Bucles

Un **bucle** hace lo mismo una y otra vez.

```sather
   loop
      ...
   end;
```

Por sí solo eso nunca se detiene, así que algo dentro tiene que terminarlo.

## Un lugar donde llevar la cuenta

Un bucle casi siempre necesita un valor que cambie a medida que avanza. Eso es una
**variable**, y `::=` crea una:

```sather
   total ::= 0;
```

La variable se llama `total`, empieza en `0`, y Sather deduce a partir del `0` que
contiene un `INT`. Después de eso, `:=` le pone un valor nuevo:

```sather
   total := total + 5;
```

Lee eso de derecha a izquierda: toma lo que `total` vale ahora, súmale 5 y vuelve a
poner el resultado en `total`.

Una variable creada así vive hasta el final de la rutina.

## until!

`until!` recibe una pregunta. En cada vuelta se hace esa pregunta y, cuando la
respuesta es verdadera, el bucle se detiene ahí mismo.

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

`n` cuenta 1, 2, 3... y el bucle termina la primera vez que `n` supera a `last`.
Sin el `n := n + 1`, la pregunta nunca cambiaría su respuesta y el bucle se
ejecutaría para siempre.

`until!` no tiene que ser la primera línea. Ponlo donde la pregunta tenga
sentido: si está arriba, puede que el bucle no se ejecute ninguna vez; si está
abajo, siempre se ejecuta al menos una vez.

El `!` es parte del nombre. Sather marca ciertas cosas de esa manera; lo que
significa la marca viene más adelante.

## break!

`break!` termina el bucle de inmediato, sin ninguna pregunta de por medio. Es útil
cuando el motivo para parar aparece en medio del trabajo.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

`until!` y `break!` solo significan algo dentro de un `loop`. Ninguno de los dos
se puede usar por sí solo.
