# Introducción

Los `Complex numbers` no son complicados.
Solo necesitan un nombre menos alarmante.

Son tan útiles, sobre todo en ingeniería y ciencia, que Julia incluye los números complejos como tipos numéricos estándar junto con los enteros y los números de punto flotante.

## Conceptos básicos

Un valor `complex` en Julia es esencialmente un par de números: por lo general, aunque no siempre, de punto flotante.
Se llaman partes «real» e «imaginaria», por desafortunadas razones históricas.
De nuevo, lo mejor es concentrarse en la simplicidad subyacente y no en los nombres extraños.

Para crear números complejos a partir de dos números reales, solo tienes que agregar el sufijo `im` a la parte imaginaria.

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> typeof(z)
ComplexF64 (alias for Complex{Float64})

julia> zi = 1 + 2im
1 + 2im

julia> typeof(zi)
Complex{Int64}
```

Así, existen varios tipos `Complex`, derivados del tipo entero o de punto flotante correspondiente.

Para crear un número complejo a partir de variables reales, la sintaxis anterior no funciona.
Escribir `a + bim` confunde al analizador sintáctico, que cree que `bim` es el nombre de una variable (que no existe).

Escribir `b*im` es posible, pero el método preferido usa la función `complex()`, que evita las operaciones de multiplicación y suma.

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

Para acceder a las partes de un número complejo por separado:

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> real(z)
1.2

julia> imag(z)
3.4
```

O juntas:

```julia-repl
julia> reim(z)
(1.2, 3.4)
```

Cualquiera de las dos partes puede ser cero, y los matemáticos pueden entonces hablar de que el número es «totalmente real» o «totalmente imaginario».
Sin embargo, en Julia sigue siendo un número complejo.

```julia-repl
julia> zr = 1.2 + 0im
1.2 + 0.0im

julia> typeof(zr)
ComplexF64 (alias for Complex{Float64})

julia> zi = 3.4im
0.0 + 3.4im

julia> typeof(zi)
ComplexF64 (alias for Complex{Float64})
```

Es posible que hayas oído que «`i` (o `j`) es la raíz cuadrada de -1».

Por ahora, todo esto significa que la parte imaginaria, _por definición_, satisface la siguiente igualdad:

```julia-repl
julia> 1im * 1im == -1
true
```

Es una idea sencilla, pero tiene consecuencias interesantes.

## Aritmética

Todos los `operators` matemáticos estándar y las funciones elementales que se usan con flotantes y enteros también funcionan con números complejos. Una pequeña muestra:

```julia-repl
julia> z1 = 1.5 + 2im
1.5 + 2.0im

julia> z2 = 2 + 1.5im
2.0 + 1.5im

julia> z1 + z2  # addition
3.5 + 3.5im

julia> z1 * z2  # multiplication
0.0 + 6.25im

julia> z1 / z2  # division
0.96 + 0.28im

julia> z1^2  # exponentiation
-1.75 + 6.0im

julia> 2^z1  # another exponentiation
0.5188946835878313 + 2.7804223253571183im
```

## Funciones

Existen varias funciones, además de `real()` e `imag()`, que son especialmente relevantes para los números complejos.

- `conj()` simplemente invierte el signo de la parte imaginaria de un número complejo (_de + a - o viceversa_).
    - Debido a cómo funciona la multiplicación de complejos, esto es más útil de lo que podrías pensar.
- `abs(<complex number>)` garantiza devolver un número real sin parte imaginaria.
- `abs2(<complex number>)` devuelve el cuadrado de `abs(<complex number>)`: se calcula más rápido que `abs()` y a menudo es lo que una operación necesita.
- `angle(<complex number>)` devuelve el ángulo de fase en radianes.

```julia-repl
julia> z1
1.5 + 2.0im

julia> conj(z1)
1.5 - 2.0im

julia> abs(z1)
2.5

julia> abs2(z1)
6.25

julia> angle(z1)
0.9272952180016122
```
Una explicación parcial, para quienes disfrutan de las matemáticas:

- La representación `(real, imag)` de `z1` en efecto usa coordenadas cartesianas en el plano complejo.
- El mismo número complejo se puede representar con la notación `(r, θ)`, usando coordenadas polares.
- Aquí, `r` y `θ` vienen dados por `abs(z1)` y `angle(z1)` respectivamente.

Un ejemplo con algunas constantes:

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

La notación polar `(r, θ)` es tan útil que existen funciones integradas `cis` (abreviatura de `cos(x) + isin(x)`) y `cispi` (abreviatura de `cos(πx) + isin(πx)`) que pueden ayudarte a construirla de forma más eficiente.

La utilidad de la notación polar se encuentra en la elegante fórmula de Euler, `ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`, donde `|x + iy| = 1`.
Con `|x + iy| = r`, tenemos la forma polar más general `r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`.
Fíjate que la forma exponencial, en particular, es compacta y fácil de manipular.

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

La igualdad aproximada anterior se debe a que las funciones `cis` y `cispi` pueden dar resultados numéricos más limpios, en particular `cispi` cuando se trabaja con argumentos que son factores arbitrarios de π (¡por ejemplo, radianes!).

```julia-repl
julia> cis(π)
-1.0 + 0.0im

julia> cispi(1)
-1.0 + 0.0im

julia> θ = π/2;
julia> exp(im*θ)
6.123233995736766e-17 + 1.0im

julia> cis(θ)
6.123233995736766e-17 + 1.0im

julia> cispi(θ / π)  # θ/π == 1/2
0.0 + 1.0im
```

De paso, esto hace que los números complejos sean muy útiles para realizar rotaciones y desplazamientos radiales en 2D.

Para las rotaciones, el número complejo `z = x + iy` se puede rotar un ángulo `θ` alrededor del origen con una simple multiplicación: `z * ℯ^(iθ)`.
Fíjate que `x` y `y` aquí son simplemente las coordenadas habituales del plano cartesiano 2D real, y que un ángulo positivo produce una rotación *en sentido antihorario*, mientras que un ángulo negativo produce una *en sentido horario*.

De forma igualmente sencilla, un desplazamiento radial `Δr` se puede hacer sumándolo a la magnitud `r` de un número complejo en forma polar (por ejemplo, `z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`).
Fíjate cómo la parte angular permanece igual y solo varía la magnitud, `r`, como era de esperar.
