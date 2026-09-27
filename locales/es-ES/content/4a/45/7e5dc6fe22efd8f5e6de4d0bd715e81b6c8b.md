# Introducción

Los vectores pueden tener elementos con nombre, lo que a veces hace que sea más cómodo trabajar con ellos.

## Creación

Hay tres formas de añadir nombres a un vector.

1) Al crear el vector

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

Si ya no quieres los nombres, puedes eliminarlos asignando `NULL`.

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

La función `unname()` consigue lo mismo y puede dejar más clara tu intención.

## Trabajar con nombres

La función `names()` puede recuperar los nombres, además de asignarlos.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Se puede usar un nombre en lugar del índice de posición, aunque en este caso son obligatorias las comillas.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Para que este tipo de indexación funcione correctamente, lo mejor es asegurarse de que los nombres sean únicos y de que no falte ninguno.
Sin embargo, R no exige que sean únicos.

Las operaciones habituales con vectores siguen funcionando y, por lo general, los nombres se conservan si tiene sentido.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
