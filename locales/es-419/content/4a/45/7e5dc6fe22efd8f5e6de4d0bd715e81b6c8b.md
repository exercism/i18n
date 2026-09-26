# Introducción

Los vectores pueden tener elementos con nombre, lo que a veces los hace más cómodos de usar.

## Creación

Hay tres formas de agregar nombres a un vector.

1) Al momento de crear el vector

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Asignando un vector de caracteres a `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) Con `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Eliminación

Si ya no quieres los nombres, puedes eliminarlos asignando `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

La función `unname()` logra lo mismo y puede dejar más clara tu intención.

## Trabajar con nombres

La función `names()` puede obtener los nombres, además de asignarlos.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Puedes usar un nombre en lugar del índice de posición, y en este caso las comillas son obligatorias.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Para que este tipo de indexación funcione bien, es mejor asegurarte de que los nombres sean únicos y no falte ninguno.
Sin embargo, R no exige que sean únicos.

Las operaciones habituales con vectores siguen funcionando y, por lo general, los nombres se conservan si eso tiene sentido.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
