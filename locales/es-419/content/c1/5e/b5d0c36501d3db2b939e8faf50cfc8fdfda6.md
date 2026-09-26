# Introducción

En Common Lisp, el tiempo se representa de cuatro maneras, de las cuales aquí veremos dos.

- El tiempo universal es un tiempo absoluto, un entero que representa el número de segundos desde `1900-01-01T00:00:00Z` (es decir, la medianoche del 1 de enero de 1900 en UTC).
- El tiempo decodificado es una tupla de 9 valores que, en conjunto, representan un momento específico del calendario: segundos, minutos, hora, día del mes, mes, año, día de la semana, indicador de horario de verano y zona horaria.
(Se explica en detalle más abajo.)

## Tiempo universal

Para obtener el tiempo universal actual se usa `get-universal-time` o `get-decoded-time`.
La primera devuelve los segundos actuales desde `1900-01-01T00:00Z` y la segunda devuelve los mismos datos en formato decodificado.

## Tiempo decodificado

`decode-universal-time` y `encode-universal-time` son las funciones principales para trabajar con el tiempo.
La primera recibe un tiempo universal y devuelve un tiempo decodificado como [múltiples valores][concept-multiple-values], y la segunda recibe los valores del tiempo decodificado como argumentos y devuelve un tiempo universal.

Ambas reciben un argumento opcional de zona horaria.
Ve más abajo el formato de la zona horaria.

Un tiempo decodificado es un conjunto de valores:

- *segundos*: un entero entre 0 y 59
- *minutos*: un entero entre 0 y 59
- *hora*: un entero entre 0 y 23
- *día del mes*: un entero entre 1 y 31 (el límite superior en realidad depende del mes y del año, obviamente)
- *mes*: un entero entre 1 y 12
- *año*: un entero que indica el año.
- *día de la semana*: un entero entre 0 y 6. 0 significa lunes, 1 significa martes, etc. ... 6 significa domingo.
- *indicador de horario de verano*: un valor verdadero indica que el horario de verano está en vigor.
- *zona horaria*: un número de horas entre -24 y 24 que indica el desplazamiento desde UTC.
El número es un número racional y debe ser múltiplo de `1/3600`

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
