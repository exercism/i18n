# Sobre

No fim das contas, os dígitos binários correspondem diretamente aos transistores da sua CPU ou da sua RAM, e ao fato de cada um estar "ligado" ou "desligado".

A manipulação de baixo nível, informalmente chamada de "bit-twiddling", é especialmente importante em linguagens de sistema.

Linguagens de alto nível como Julia costumam abstrair a maior parte desse detalhe. Ainda assim, toda uma gama de operações em nível de bits está [disponível][bitwise] na linguagem base.

***Nota:*** Para ver uma saída binária legível por humanos no REPL, quase todos os exemplos abaixo precisam ser envolvidos em uma função [`bitstring()`][bitstring]. Isso distrai visualmente, então a maioria das ocorrências dessa função foi removida.

## Operações de deslocamento de bits

Tipos inteiros, com sinal ou sem sinal, podem ser representados como uma string de 1s e 0s.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Os deslocamentos de bits apenas movem tudo para a esquerda ou para a direita por um número especificado de posições. Com tipos `UInt`, alguns bits caem de uma extremidade, e a outra extremidade é preenchida com zeros:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Cada deslocamento à esquerda dobra o valor, e cada deslocamento à direita o divide pela metade (sujeito a truncamento). Isso fica mais óbvio na representação decimal:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Esse tipo de deslocamento de bits é muito mais rápido do que a aritmética "de verdade", o que torna a técnica muito popular na programação de baixo nível.

Com inteiros com sinal, precisamos tomar um pouco mais de cuidado.

Os deslocamentos à esquerda são relativamente simples:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

Assim, deslocar inteiros positivos com sinal para a esquerda é o mesmo que com inteiros sem sinal.

Valores negativos são armazenados na forma de [complemento de dois][2complement], o que significa que o bit mais à esquerda é 1. Sem problema para um deslocamento à esquerda, mas ao deslocar à direita, como preenchemos os bits mais à esquerda?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

O operador `>>` realiza um [deslocamento aritmético][arithmetic], preservando o bit de sinal.

O operador `>>>` realiza um [deslocamento lógico][logical], preenchendo com zeros como se o número fosse sem sinal.

Se isso ainda parecer incompleto, existe também a função [`bitrotate()`][bitrotate].

## Lógica bit a bit

Vimos em um Conceito anterior que os operadores `&&` (e), `||` (ou) e `!` (não) são usados com valores do tipo Boolean.

Existem operadores equivalentes `&` (e bit a bit), `|` (ou bit a bit) e `~` (um til, não bit a bit) para comparar os bits de dois inteiros.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Aqui, `xor()` é o [ou exclusivo][xor], usado como função (veja abaixo uma notação alternativa).

A propósito, os operadores `&` e `|` também podem ser usados com valores do tipo Boolean. Diferente de `&&` e `||`, todas as partes da expressão são então avaliadas: não há curto-circuito.


## Outros símbolos

Julia adora matemática, e os matemáticos adoram símbolos crípticos; por isso, temos mais símbolos para brincar.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Em editores que conhecem Julia, eles são digitados como `\xor`, `\nand` e `\nor`, seguidos de um Tab em cada caso.

Esses símbolos não são muito conhecidos, nem mesmo entre pessoas que cursaram matemática na faculdade (o autor deste Conceito nunca os tinha visto antes). Se você quiser usá-los, cuidado com quem você pede para revisar seu código!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
