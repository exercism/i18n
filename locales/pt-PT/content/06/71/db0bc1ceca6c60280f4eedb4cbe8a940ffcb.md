# Sobre

Os algarismos binários acabam por corresponder diretamente aos transístores da tua CPU ou RAM, e ao facto de cada um estar "ligado" ou "desligado".

A manipulação de baixo nível, informalmente chamada "bit-twiddling", é especialmente importante em linguagens de sistema.

As linguagens de alto nível, como a Julia, normalmente abstragem a maior parte destes detalhes.
No entanto, toda uma série de operações ao nível dos bits está [disponível][bitwise] na linguagem base.

***Nota:*** Para veres no REPL uma saída binária legível por humanos, quase todos os exemplos abaixo têm de ser envolvidos numa função [`bitstring()`][bitstring].
Isso distrai visualmente, por isso a maior parte das ocorrências desta função foi retirada.

## Operações de deslocamento de bits

Os tipos inteiros, com sinal ou sem sinal, podem ser representados como uma string de 1s e 0s.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Os deslocamentos de bits limitam-se a mover tudo para a esquerda ou para a direita um número especificado de posições.
Com os tipos `UInt`, alguns bits caem por uma das pontas e a outra ponta é preenchida com zeros:

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

Cada deslocamento para a esquerda duplica o valor e cada deslocamento para a direita divide-o por dois (sujeito a truncamento).
Isto é mais óbvio na representação decimal:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Este tipo de deslocamento de bits é muito mais rápido do que a aritmética "a sério", o que torna a técnica muito popular na programação de baixo nível.

Com os inteiros com sinal, é preciso ter um pouco mais de cuidado.

Os deslocamentos para a esquerda são relativamente simples:

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

Assim, deslocar para a esquerda inteiros positivos com sinal é o mesmo que com inteiros sem sinal.

Os valores negativos são armazenados na forma de [complemento para dois][2complement], o que significa que o bit mais à esquerda é 1.
Não há problema para um deslocamento para a esquerda, mas ao deslocar para a direita, como preenchemos os bits mais à esquerda?

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

O operador `>>>` realiza um [deslocamento lógico][logical], preenchendo com zeros como se o número não tivesse sinal.

Se isto ainda te parecer incompleto, existe também uma função [`bitrotate()`][bitrotate].

## Lógica bit a bit

Vimos num conceito anterior que os operadores `&&` (e), `||` (ou) e `!` (não) são usados com valores Boolean.

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

Aqui, `xor()` é o [ou exclusivo][xor], usado como função (vê mais abaixo uma notação alternativa).

A propósito, os operadores `&` e `|` também podem ser usados com valores Boolean.
Ao contrário de `&&` e `||`, todas as partes da expressão são então avaliadas: não há curto-circuito.


## Outros símbolos

A Julia adora matemática, e os matemáticos adoram símbolos enigmáticos, por isso temos mais símbolos com que brincar.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Nos editores com suporte para Julia, introduzem-se como `\xor`, `\nand` e `\nor`, cada um seguido de um tab.

Estes símbolos não são muito conhecidos, mesmo entre pessoas que estudaram matemática na universidade (o autor deste conceito nunca os tinha visto antes).
Se os quiseres usar, tem cuidado com quem pedes para rever o teu código!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
