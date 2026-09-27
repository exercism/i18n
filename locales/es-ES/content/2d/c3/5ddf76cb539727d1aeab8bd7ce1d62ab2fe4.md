# Introducción

Todo el track de Julia te exigirá tratar tu solución como si fuera una pequeña biblioteca, es decir, tendrás que definir funciones, tipos, etc. que después se ejecutarán contra un conjunto de tests.
Por eso, el primer concepto que presentaremos serán las funciones con nombre.

Julia es un lenguaje de programación dinámico y de tipado fuerte.
El estilo de programación es principalmente funcional, aunque con más flexibilidad que en lenguajes como Haskell.

## Variables y asignación

No hay necesidad de declarar una variable de antemano.
Basta con asignar un valor a un nombre adecuado:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Constantes

Si un valor tiene que estar disponible en todo el programa, pero no se espera que cambie, lo mejor es marcarlo como constante.

Anteponer la palabra clave `const` a una asignación permite al compilador generar código más eficiente que el que es posible con una variable.

Las constantes también te ayudan a protegerte de errores de programación.
Si intentas cambiar por accidente el valor de una `const`, obtendrás una advertencia:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Ten en cuenta que una `const` solo se puede declarar *fuera* de cualquier función.
Normalmente estará cerca del principio del archivo `*.jl`, antes de las definiciones de funciones.

## Operadores aritméticos

Estos son los mismos que en muchos otros lenguajes:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funciones

Hay dos formas habituales de definir una función con nombre en Julia:

1. Usando la palabra clave `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    Sangrar con 4 espacios es lo habitual por legibilidad, pero el compilador lo ignora.
    La palabra clave `end` es imprescindible.

    Fíjate en que podríamos haber escrito `return x * y + z`.
    Sin embargo, las funciones de Julia siempre devuelven la última expresión evaluada, así que la palabra clave `return` es opcional.
    Muchos programadores prefieren incluirla para dejar más clara su intención.

2. Usando la «forma de asignación»

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Se usa sobre todo para crear funciones concisas de una sola expresión.

    En la forma de asignación *nunca* se usa la palabra clave `return`.

Las dos formas son equivalentes y se usan exactamente igual, así que elige la que te resulte más legible.

Para llamar a una función, se escribe su nombre y se pasan los argumentos correspondientes a cada uno de sus parámetros:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Convenciones de nombres

Como en muchos lenguajes, Julia exige que los nombres (de variables, funciones y muchas otras cosas) empiecen por una letra, seguida de cualquier combinación de letras, dígitos y guiones bajos.

Por convención, los nombres de variables, constantes y funciones se escriben *en minúsculas*, con los guiones bajos reducidos a un mínimo razonable.