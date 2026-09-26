# Condicionales

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

La pregunta que va entre `if` y `then` debe ser un `BOOL`. Sather no acepta
un número ahí, así que no existe la costumbre del estilo C de tratar el cero
como falso.

## La forma

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

Las preguntas se hacen de arriba hacia abajo, y gana la primera que responda
true. Todo lo que queda debajo se omite sin llegar a preguntarse. Por eso una
cadena debe ir de la prueba más específica a la menos específica: poner
`score >= 5` por encima de `score >= 8` hace que la segunda nunca se alcance.

`else` es opcional. `elsif` se puede repetir tantas veces como haga falta.

## Los condicionales son sentencias, no valores

`if` por sí mismo no produce un valor, así que esto no es válido en Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

O devuelves desde dentro de cada rama, o asignas a una variable dentro de cada
rama.

## Cuándo no usar uno

Una rutina que responde una pregunta debería devolver la pregunta:

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

La segunda no dice nada que la primera no diga, y ocupa el triple de espacio.

## Anidamiento

Un `if` puede contener otro `if`. A menudo no es necesario: dos preguntas que
deben cumplirse ambas se pueden unir con `and`, lo que se lee mejor.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
