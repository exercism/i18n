# Introducción

Todo el track de Julia te exigirá tratar tu solución como pequeñas bibliotecas, es decir, necesitas definir funciones, tipos, etc. que luego se ejecutarán contra una suite de pruebas.
Por esa razón, presentaremos las funciones con nombre como el primer concepto.

Julia es un lenguaje de programación dinámico y de tipado fuerte.
El estilo de programación es principalmente funcional, aunque con más flexibilidad que en lenguajes como Haskell.

## Variables y asignación

No es necesario declarar una variable de antemano.
Solo tienes que asignarle un valor a un nombre adecuado:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Constantes

Si un valor debe estar disponible en todo el programa, pero no se espera que cambie, lo mejor es marcarlo como una constante.

Anteponer la palabra clave `const` a una asignación permite que el compilador genere código más eficiente que el que es posible para una variable.

Las constantes también te ayudan a protegerte de errores al programar.
Si por accidente intentas cambiar el valor de `const`, recibirás una advertencia:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Ten en cuenta que una `const` solo se puede declarar *fuera* de cualquier función.
Normalmente irá cerca del inicio del archivo `*.jl`, antes de las definiciones de funciones.

## Operadores aritméticos

Son los mismos que en muchos otros lenguajes:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funciones

Hay dos formas comunes de definir una función con nombre en Julia:

1. Usar la palabra clave `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    La indentación de 4 espacios es lo habitual por legibilidad, pero el compilador la ignora.
    La palabra clave `end` es esencial.

    Ten en cuenta que podríamos haber escrito `return x * y + z`.
    Sin embargo, las funciones de Julia siempre devuelven la última expresión evaluada, así que la palabra clave `return` es opcional.
    Muchos programadores prefieren incluirla para dejar más clara su intención.

2. Usar la «forma de asignación»

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Se usa sobre todo para crear funciones concisas de una sola expresión.

    La palabra clave `return` *nunca* se usa en la forma de asignación.

Las dos formas son equivalentes y se usan exactamente de la misma manera, así que elige la que te resulte más legible.

Para llamar a una función, se especifica su nombre y se pasan argumentos para cada uno de los parámetros de la función:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Convenciones de nombres

Como muchos lenguajes, Julia exige que los nombres (de variables, funciones y muchas otras cosas) empiecen con una letra, seguida de cualquier combinación de letras, dígitos y guiones bajos.

Por convención, los nombres de variables, constantes y funciones van en *minúsculas*, manteniendo los guiones bajos en un mínimo razonable.