# Sobre

O conceito de [SIMD][SIMD] introduziu valores de vírgula flutuante empacotados: vários números guardados num único registo `xmm`, operados lane a lane e em paralelo.
Os mesmos registos `xmm` também podem guardar _inteiros_ empacotados.

## Sintaxe

A maior parte do modelo SIMD de vírgula flutuante mantém-se inalterada para os inteiros empacotados:

- Um registo de 128 bits é dividido em lanes
- As instruções atuam em paralelo sobre as lanes que estão na mesma posição
- Os operandos de memória seguem as mesmas regras de alinhamento de 16 bytes

No entanto, a sintaxe é um pouco diferente:

1. Um _prefixo_ `p` para indicar que a instrução opera sobre dados _empacotados_.
2. A operação realizada, com o mesmo nome da sua equivalente não-SIMD (também chamada _escalar_) (por exemplo, `add`, `mul`, etc.).
3. Um sufixo para indicar o tamanho de cada lane.

Os inteiros empacotados têm quatro tamanhos de lane, e cada um tem o seu próprio sufixo:

| largura da lane | bytes | lanes em 128 bits | sufixo |
|-----------------|-------|-------------------|--------|
| byte            | 1     | 16                | b      |
| word            | 2     | 8                 | w      |
| dword           | 4     | 4                 | d      |
| qword           | 8     | 2                 | q      |

Por exemplo:

| instrução | significado                          |
|-----------|--------------------------------------|
| `paddb`   | `add` empacotado, lanes de 8 bits (16 lanes) |
| `paddw`   | `add` empacotado, lanes de 16 bits (8 lanes) |
| `paddd`   | `add` empacotado, lanes de 32 bits (4 lanes) |
| `paddq`   | `add` empacotado, lanes de 64 bits (2 lanes) |

Algumas instruções recebem lanes de um tamanho como entrada, mas devolvem lanes de outro tamanho.
Seguem a mesma convenção geral, mas com _dois_ sufixos de tamanho.
O primeiro indica o tamanho da lane de entrada, o segundo indica o tamanho da lane de saída:

| instrução  | significado                                        |
|------------|---------------------------------------------------|
| `pmovsxwd` | `movsx` empacotado, de lanes de 16 bits para lanes de 32 bits |
| `pmuldq`   | `mul` empacotado, de lanes de 32 bits para lanes de 64 bits   |

## Movimentos de Memória

Duas instruções com nomes de inteiros copiam 128 bits entre um registo `xmm` e a memória:

| instrução | descrição                                               |
|-----------|---------------------------------------------------------|
| `movdqa`  | copia inteiros empacotados de ou para uma localização _alinhada_   |
| `movdqu`  | copia inteiros empacotados de ou para uma localização _não alinhada_ |

Comportam-se como `movaps` e `movups`: `movdqa` provoca uma falha num endereço desalinhado, enquanto `movdqu` aceita qualquer um.
As quatro copiam 128 bits sem os interpretar.
O par com nomes de inteiros é usado com dados inteiros por convenção, não por obrigação.

~~~~exercism/note
`dq` significa aqui `double-qword`, ou seja, 128 bits (16 bytes).
~~~~

## Adição/Subtração

A adição e a subtração seguem a regra de nomenclatura:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Não existe uma forma separada para valores com e sem sinal.
Em complemento para dois, a adição e a subtração produzem os mesmos bits quer as lanes sejam lidas como com sinal quer como sem sinal, por isso uma única instrução serve para ambos os casos.
A interpretação é tua, exatamente como acontece com `add` e `sub` escalares.

Estas instruções **dão a volta** no overflow, tal como as suas equivalentes escalares.
Uma lane de 8 bits guarda valores módulo 256, por isso um `paddb` de `200 + 100` produz `300 - 256 = 44`, descartando os bits que não cabem.

Repara que esses bits extra não transitam para a lane seguinte.
Cada lane é operada separadamente das outras, mesmo que partilhem o mesmo registo.

## Adição/Subtração com Saturação

O SIMD de inteiros acrescenta uma operação que o SIMD de vírgula flutuante não tem: adição e subtração com [saturação][saturation], que _limitam_ em vez de darem a volta.
Um resultado acima do intervalo da lane torna-se o maior valor que a lane pode conter; um resultado abaixo do intervalo torna-se o menor.

As formas com saturação inserem `s` (com sinal) ou `us` (sem sinal) antes do sufixo de tamanho:

| instrução | significado                                |
|-----------|--------------------------------------------|
| `paddsb`  | `add`, com saturação, lanes de 8 bits com sinal   |
| `paddusb` | `add`, com saturação, lanes de 8 bits sem sinal   |
| `psubsw`  | `sub`, com saturação, lanes de 16 bits com sinal  |
| `psubusw` | `sub`, com saturação, lanes de 16 bits sem sinal  |

O intervalo de limitação é o intervalo completo representável para um inteiro do tamanho e sinal correspondentes.
Para um byte:

- Os bytes sem sinal limitam-se a `[0, 255]`: um `paddusb` de `200 + 100` dá `255`, e um `psubusb` de `5 - 10` dá `0`.
- Os bytes com sinal limitam-se a `[-128, 127]`: um `paddsb` de `100 + 50` dá `127`.

A saturação é importante quando uma lane contém uma quantidade limitada, como um canal de pixel ou uma amostra de áudio.
Dar a volta tornaria um pixel demasiado brilhante escuro, enquanto a limitação o mantém no brilho máximo, que é o resultado que queres.

~~~~exercism/note
A adição e a subtração com saturação existem apenas para lanes de byte e de word, não para dword ou qword.
~~~~

## Multiplicação

Multiplicar dois valores de N bits pode produzir um produto de 2N bits, mas a lane de destino só tem N bits de largura.
As operações SIMD resolvem isto especificando qual metade do produto manter, ou os N bits mais baixos, ou os N bits mais altos.

Para lanes de 16 bits, usam-se três instruções:

| instrução | significado                                                   |
|-----------|---------------------------------------------------------------|
| `pmullw`  | `mul`, lanes de 16 bits, mantém os 16 bits mais baixos de cada produto     |
| `pmulhw`  | `mul`, lanes de 16 bits, mantém os 16 bits mais altos, operandos com sinal   |
| `pmulhuw` | `mul`, lanes de 16 bits, mantém os 16 bits mais altos, operandos sem sinal   |

Os 16 bits mais baixos de um produto são os mesmos quer os operandos sejam lidos como com sinal quer como sem sinal, por isso existe um único `pmullw`.

Os 16 bits mais altos, no entanto, variam conforme o sinal do resultado.
É por isso que a multiplicação da metade alta tem formas separadas para multiplicação com e sem sinal:

1. `pmulhw`, para multiplicação com sinal.
2. `pmulhuw`, com um `u` extra, para multiplicação sem sinal.

Repara na sintaxe:

1. Um `p`, para inteiro empacotado.
2. A operação realizada, `mul`.
3. Um `h`, para indicar que os bits de cima ("high") do resultado estão a ser selecionados.
4. Um `u` opcional se o resultado deve ser interpretado como sem sinal (ou seja, não é estendido com sinal).
5. Por fim, o sufixo de tamanho `w`, para indicar que é uma operação de word (16 bits).

A multiplicação empacotada para words segue exatamente a regra acima.
A multiplicação de dwords (32 bits) também segue a regra, mas só existe a variante que seleciona a metade baixa: `pmulld`.

Não existe nenhuma variante de multiplicação de dwords que selecione os bits mais altos.
No entanto, existem variantes que _alargam_ a multiplicação, guardando o produto completo de 64 bits das lanes de _índice par_ (ou seja, as lanes nas posições 0 e 2):

| instrução | significado                                                                      |
|-----------|----------------------------------------------------------------------------------|
| `pmuludq` | multiplica os elementos de 32 bits de índice par, sem sinal, em 2 produtos completos de 64 bits |
| `pmuldq`  | multiplica os elementos de 32 bits de índice par, com sinal, em 2 produtos completos de 64 bits |

Repara que a sintaxe usa `dq`, possivelmente com um `u` antes, para multiplicação sem sinal.
Isto acontece porque as instruções recebem lanes de `dword` e devolvem lanes de `qword`.

## Divisão

Não existe divisão de inteiros empacotada.
O código que precisa dela converte os valores para vírgula flutuante, divide-os e converte-os de novo.

## Alargamento de Inteiros

Existem equivalentes empacotados para `movsx` e `movzx`.
Seguem a mesma sintaxe que mencionámos para as instruções que recebem entradas com um tamanho de lane diferente do da sua saída:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Repara que o número de lanes é definido pela largura maior (a da saída).
A instrução lê esse número de lanes a partir da parte baixa da origem.
É a mesma semântica que já vimos para as instruções `cvt` empacotadas entre vírgula flutuante de precisão simples e dupla.

## Conversão entre Inteiros e Vírgula Flutuante

Existem instruções para converter entre inteiros de 32 bits com sinal e lanes de vírgula flutuante.
Seguem a sintaxe habitual das instruções `cvt` e `cvtt`, mas em vez de `si` um inteiro empacotado é representado por `dq`:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
As instruções que usam `pi` para representar inteiros empacotados escrevem em registos `mmx` antigos e estão efetivamente obsoletas no x86-64.
Prefere as formas com `dq`, que usam registos `xmm`.
~~~~

Os mesmos comentários feitos para a conversão escalar entre números de vírgula flutuante e inteiros são válidos aqui.
Os números de vírgula flutuante são arredondados de acordo com um registo especial chamado MXCSR, cujo modo não podes assumir à entrada de uma função.
Existe uma variante `cvtt` (com um `t` extra) que trunca sempre o resultado.

Também é possível usar `round` para ter valores de vírgula flutuante empacotados num estado conhecido antes de converter.
O valor de controlo do `round` é o mesmo que o do `round` escalar, e a sintaxe também é a mesma para valores de vírgula flutuante empacotados:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Encontras uma referência completa para todas as instruções mencionadas aqui na [referência de instruções x86][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
