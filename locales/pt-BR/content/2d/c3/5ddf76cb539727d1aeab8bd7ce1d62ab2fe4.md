# Introdução

A trilha de Julia inteira vai exigir que você trate sua solução como pequenas bibliotecas, ou seja, você precisa definir funções, tipos etc. que depois serão executados por uma suíte de testes.
Por isso, vamos apresentar as funções nomeadas como o primeiríssimo conceito.

Julia é uma linguagem de programação dinâmica e fortemente tipada.
O estilo de programação é principalmente funcional, embora com mais flexibilidade do que em linguagens como Haskell.

## Variáveis e atribuição

Não é preciso declarar uma variável de antemão.
Basta atribuir um valor a um nome adequado:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Constantes

Se um valor precisa estar disponível ao longo de todo o programa, mas não deve mudar, o melhor é marcá-lo como constante.

Colocar a palavra-chave `const` antes de uma atribuição permite que o compilador gere um código mais eficiente do que seria possível para uma variável.

Constantes também ajudam a proteger você contra erros de programação.
Se você tentar mudar o valor de uma `const` por acidente, vai receber um aviso:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Repare que uma `const` só pode ser declarada *fora* de qualquer função.
Isso normalmente fica perto do topo do arquivo `*.jl`, antes das definições de funções.

## Operadores aritméticos

Eles são os mesmos que em muitas outras linguagens:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funções

Existem duas formas comuns de definir uma função nomeada em Julia:

1. Usando a palavra-chave `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    A indentação com 4 espaços é convencional para facilitar a leitura, mas o compilador a ignora.
    A palavra-chave `end` é essencial.

    Repare que poderíamos ter escrito `return x * y + z`.
    No entanto, as funções em Julia sempre retornam a última expressão avaliada, então a palavra-chave `return` é opcional.
    Muitos programadores preferem incluí-la para deixar a intenção mais explícita.

2. Usando a "forma de atribuição"

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Essa forma é mais usada para criar funções concisas de uma única expressão.

    A palavra-chave `return` *nunca* é usada na forma de atribuição.

As duas formas são equivalentes e são usadas exatamente da mesma maneira, então escolha a que for mais legível.

Para chamar uma função, você especifica o nome dela e passa argumentos para cada um dos parâmetros da função:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Convenções de nomenclatura

Como muitas linguagens, Julia exige que nomes (de variáveis, funções e muitas outras coisas) comecem com uma letra, seguida por qualquer combinação de letras, dígitos e sublinhados.

Por convenção, nomes de variáveis, constantes e funções são escritos em *letras minúsculas*, com sublinhados mantidos a um mínimo razoável.