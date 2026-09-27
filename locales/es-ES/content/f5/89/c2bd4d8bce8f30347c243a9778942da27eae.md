# Introducción

Los `Complex numbers` no son complicados.
Solo necesitan un nombre menos alarmante.

Son tan útiles, sobre todo en ingeniería y ciencia, que R incluye los [números complejos][web-complex] como [tipos atómicos][ref-atomic] estándar, junto con entero, doble, lógico, carácter y raw.

## Conceptos básicos

Un número `complex` en R es un valor único.
En la práctica, sin embargo, se puede pensar en él como un par de números.
Se llaman las partes «real» e «imaginaria», por desafortunadas razones históricas.
De nuevo, lo mejor es centrarse en la simplicidad subyacente y no en los nombres extraños.

Para crear números complejos a partir de dos números reales, basta con añadir el sufijo `i` a la parte imaginaria.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Para crear un número complejo a partir de variables reales, la sintaxis anterior no funcionará.
Escribir `r + imi` confunde al analizador sintáctico y hace que piense que `imi` es un nombre de variable (inexistente).

Puedes multiplicar la parte imaginaria por `1i` o usar la función [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Quizá te preguntes por qué `i` y no `j`.

La mayoría de los ingenieros prefiere `j`.
La mayoría de los científicos y matemáticos prefiere la notación matemática `i` para _imaginario_, pero esa notación entra en conflicto con el uso de `i` para referirse a la _corriente_ en ingeniería eléctrica.

R eligió `i`, Python eligió `j` y Julia esquivó la polémica eligiendo `im`.
Ten cuidado al cambiar entre lenguajes de programación [STEM][wiki-STEM].

Para acceder a las partes de un número complejo por separado:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

Cualquiera de las dos partes puede ser cero, y entonces los matemáticos pueden hablar de que el número es «totalmente real» o «totalmente imaginario».
Sin embargo, en R sigue siendo un número complejo.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

Puede que hayas oído que «`i` (o `j`) es la raíz cuadrada de -1».

Por ahora, todo esto significa que la parte imaginaria, _por definición_, cumple la siguiente igualdad:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

Es una idea sencilla, pero conduce a consecuencias interesantes.

## Aritmética

La mayoría de los [`operators`][ref-operators] que se usan con números decimales y enteros también funcionan con números complejos:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

Explicar las reglas de la multiplicación y la división de números complejos queda fuera del alcance de este concepto (_y es poco probable que tengas que hacer esas operaciones «a mano» muy a menudo_).

Cualquier introducción [matemática][web-math-complex] o de [ingeniería eléctrica][web-engineering-complex] a los números complejos tratará esto, si quieres profundizar en el tema.

Como alternativa, Exercism tiene un ejercicio de práctica [`Complex Numbers`][exercise-complex-numbers] en el que puedes implementar una clase de números complejos con estas operaciones desde los primeros principios.

La división entera generalmente ___no___ es posible con números complejos, así que los operadores `%/%` y `%%` fallarán con el tipo de número complejo.

## Funciones

La mayoría de las funciones matemáticas funcionan con entradas complejas.

Sin embargo, proporcionar entradas reales y esperar una salida compleja no suele funcionar.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

Hay varias funciones, además de `Re()` e `Im()`, con especial relevancia para los números complejos.

- `Conj()` simplemente invierte el signo de la parte imaginaria de un número complejo (_de + a - o viceversa_).
  - Debido a cómo funciona la multiplicación de números complejos, esto es más útil de lo que podrías pensar.
- `abs(<complex number>)` garantiza devolver un número real sin parte imaginaria (su «magnitud»), y `Mod(<complex number>)` es un sinónimo.
- `Arg(<complex number>)` devuelve el ángulo de fase en radianes.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
