# Condicionales

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

La pregunta entre `if` y `then` debe ser un `BOOL`. Sather no acepta un número ahí, así que no existe la costumbre del estilo de C de tratar el cero como falso.

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

Las preguntas se hacen de arriba abajo, y gana la primera que responda verdadero. Todo lo que queda por debajo se omite sin llegar a preguntarse. Por eso una cadena debe ir de la prueba más específica a la menos específica: poner `score >= 5` por encima de `score >= 8` hace que nunca se llegue a la segunda.

`else` es opcional. `elsif` puede repetirse tantas veces como haga falta.

## Los condicionales son instrucciones, no valores

`if` no produce un valor por sí mismo, así que esto no es Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

O devuelve desde dentro de cada rama, o asigna a una variable dentro de cada rama.

## Cuándo no usar uno

Una rutina que responde a una pregunta debería devolver la pregunta:

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

La segunda no dice nada que no diga la primera, con el triple de longitud.

## Anidamiento

Un `if` puede contener otro `if`. A menudo no hace falta: dos preguntas que tengan que cumplirse las dos pueden unirse con `and`, que se lee mejor.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
