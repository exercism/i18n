# Introdução

Todo o percurso de Julia vai exigir que trates a tua solução como uma pequena biblioteca, ou seja, precisas de definir funções, tipos, etc., que depois vão ser executados contra um conjunto de testes.
Por esse motivo, vamos introduzir as funções com nome logo como o primeiro conceito.

Julia é uma linguagem de programação dinâmica e fortemente tipada.
O estilo de programação é sobretudo funcional, embora com mais flexibilidade do que em linguagens como Haskell.

## Variáveis e atribuição

Não é preciso declarar uma variável antecipadamente.
Basta atribuir um valor a um nome adequado:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Constantes

Se um valor tiver de estar disponível ao longo de todo o programa, mas não se espera que mude, o melhor é marcá-lo como constante.

Colocar a palavra-chave `const` antes de uma atribuição permite ao compilador gerar código mais eficiente do que é possível para uma variável.

As constantes também ajudam a proteger-te contra erros ao programar.
Se tentares alterar o valor de `const` por engano, recebes um aviso:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Repara que uma `const` só pode ser declarada *fora* de qualquer função.
Normalmente fica perto do início do ficheiro `*.jl`, antes das definições de funções.

## Operadores aritméticos

São iguais aos de muitas outras linguagens:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funções

Há duas formas comuns de definir uma função com nome em Julia:

1. Usar a palavra-chave `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    A indentação de 4 espaços é habitual para melhorar a legibilidade, mas o compilador ignora-a.
    A palavra-chave `end` é essencial.

    Repara que podíamos ter escrito `return x * y + z`.
    No entanto, as funções em Julia devolvem sempre a última expressão avaliada, por isso a palavra-chave `return` é opcional.
    Muitos programadores preferem incluí-la para tornar as suas intenções mais explícitas.

2. Usar a "forma de atribuição"

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    É sobretudo usada para criar funções concisas de uma só expressão.

    Na forma de atribuição, a palavra-chave `return` *nunca* é usada.

As duas formas são equivalentes e usam-se exatamente da mesma maneira, por isso escolhe a que for mais legível.

Para invocar uma função, indicas o nome dela e passas um argumento para cada um dos parâmetros da função:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Convenções de nomenclatura

Como muitas linguagens, Julia exige que os nomes (de variáveis, funções e muitas outras coisas) comecem por uma letra, seguida de qualquer combinação de letras, algarismos e underscores.

Por convenção, os nomes de variáveis, constantes e funções escrevem-se em *minúsculas*, mantendo os underscores num mínimo razoável.