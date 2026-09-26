# Sobre

O conceito de [SIMD][SIMD] introduziu valores de ponto flutuante empacotados: vários números guardados em um único registrador `xmm`, operados em paralelo, via por via.
Os mesmos registradores `xmm` também podem guardar _inteiros_ empacotados.

## Sintaxe

A maior parte do modelo SIMD de ponto flutuante se mantém inalterada para inteiros empacotados:

- Um registrador de 128 bits é dividido em vias
- As instruções atuam em paralelo sobre as vias que estão na mesma posição
- Os operandos de memória seguem as mesmas regras de alinhamento de 16 bytes

No entanto, a sintaxe é um pouco diferente:

1. Um _prefixo_ `p` para indicar que a instrução opera sobre dados _empacotados_.
2. A operação realizada, com o mesmo nome da sua equivalente não-SIMD (também chamada _escalar_) (por exemplo, `add`, `mul` etc.).
3. Um sufixo para indicar o tamanho de cada via.

Os inteiros empacotados têm quatro tamanhos de via, e cada um tem seu próprio sufixo:

| largura da via | bytes | vias em 128 bits | sufixo |
|------------|-------|-------------------|--------|
| byte       | 1     | 16                | b      |
| word       | 2     | 8                 | w      |
| dword      | 4     | 4                 | d      |
| qword      | 8     | 2                 | q      |

Por exemplo:

| instrução   | significado                          |
|-------------|--------------------------------------|
| `paddb`     | `add` empacotado, vias de 8 bits (16 vias) |
| `paddw`     | `add` empacotado, vias de 16 bits (8 vias) |
| `paddd`     | `add` empacotado, vias de 32 bits (4 vias) |
| `paddq`     | `add` empacotado, vias de 64 bits (2 vias) |

Algumas instruções recebem vias de um tamanho como entrada, mas produzem outro tamanho como saída.
Elas seguem a mesma convenção geral, mas com _dois_ sufixos de tamanho.
O primeiro indica o tamanho da via de entrada, o segundo indica o tamanho da via de saída:

| instrução    | significado                                       |
|--------------|---------------------------------------------------|
| `pmovsxwd`   | `movsx` empacotado, de vias de 16 bits para vias de 32 bits |
| `pmuldq`     | `mul` empacotado, de vias de 32 bits para vias de 64 bits   |

## Movimentação de memória

Duas instruções com nomes de inteiros copiam 128 bits entre um registrador `xmm` e a memória:

| instrução   | descrição                                              |
|-------------|---------------------------------------------------------|
| `movdqa`    | copia inteiros empacotados de ou para um local _alinhado_   |
| `movdqu`    | copia inteiros empacotados de ou para um local _não alinhado_ |

Elas se comportam como `movaps` e `movups`: `movdqa` gera uma falha em um endereço desalinhado, enquanto `movdqu` aceita qualquer um.
Todas as quatro copiam 128 bits sem interpretá-los.
O par com nome de inteiro é usado com dados inteiros por convenção, não por exigência.

~~~~exercism/note
`dq` aqui significa `double-qword`, ou seja, 128 bits (16 bytes).
~~~~

## Adição/Subtração

A adição e a subtração seguem a regra de nomenclatura:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Não existe uma forma separada para com sinal e sem sinal.
Em complemento de dois, a adição e a subtração produzem os mesmos bits, seja qual for a leitura das vias, com ou sem sinal, então uma única instrução serve para os dois casos.
A interpretação fica por sua conta, exatamente como acontece com `add` e `sub` escalares.

Essas instruções **dão a volta** em caso de overflow, assim como suas equivalentes escalares.
Uma via de 8 bits guarda valores módulo 256, então um `paddb` de `200 + 100` produz `300 - 256 = 44`, descartando os bits que não cabem.

Observe que esses bits extras não são levados para a via seguinte.
Cada via é operada separadamente das outras, mesmo que compartilhem o mesmo registrador.

## Adição/Subtração com saturação

O SIMD de inteiros adiciona uma operação que o SIMD de ponto flutuante não tem: adição e subtração com [saturação][saturation], que _limitam_ em vez de dar a volta.
Um resultado acima do intervalo da via vira o maior valor que a via pode guardar; um resultado abaixo do intervalo vira o menor.

As formas com saturação inserem `s` (com sinal) ou `us` (sem sinal) antes do sufixo de tamanho:

| instrução | significado                                |
|-------------|--------------------------------------------|
| `paddsb`    | `add`, com saturação, vias de 8 bits com sinal     |
| `paddusb`   | `add`, com saturação, vias de 8 bits sem sinal   |
| `psubsw`    | `sub`, com saturação, vias de 16 bits com sinal    |
| `psubusw`   | `sub`, com saturação, vias de 16 bits sem sinal  |

O intervalo de saturação é todo o intervalo representável para um inteiro do tamanho e da sinalização correspondentes.
Para um byte:

- Bytes sem sinal saturam em `[0, 255]`: um `paddusb` de `200 + 100` dá `255`, e um `psubusb` de `5 - 10` dá `0`.
- Bytes com sinal saturam em `[-128, 127]`: um `paddsb` de `100 + 50` dá `127`.

A saturação importa quando uma via guarda uma grandeza limitada, como um canal de pixel ou uma amostra de áudio.
Dar a volta deixaria escuro um pixel claro demais, enquanto a saturação o mantém no brilho máximo, que é o resultado que você quer.

~~~~exercism/note
A adição e a subtração com saturação existem apenas para vias de byte e word, não para dword ou qword.
~~~~

## Multiplicação

Multiplicar dois valores de N bits pode produzir um produto de 2N bits, mas a via de destino tem apenas N bits de largura.
As operações SIMD resolvem isso especificando qual metade do produto manter: os N bits inferiores ou os N bits superiores.

Para vias de 16 bits, três instruções são usadas:

| instrução | significado                                                   |
|-------------|---------------------------------------------------------------|
| `pmullw`    | `mul`, vias de 16 bits, mantém os 16 bits inferiores de cada produto     |
| `pmulhw`    | `mul`, vias de 16 bits, mantém os 16 bits superiores, operandos com sinal   |
| `pmulhuw`   | `mul`, vias de 16 bits, mantém os 16 bits superiores, operandos sem sinal |

Os 16 bits inferiores de um produto são os mesmos, seja qual for a leitura dos operandos, com ou sem sinal, então existe um único `pmullw`.

Os 16 bits superiores, no entanto, variam de acordo com a sinalização do resultado.
É por isso que a multiplicação da metade superior tem formas separadas para multiplicação com e sem sinal:

1. `pmulhw`, para multiplicação com sinal.
2. `pmulhuw`, com um `u` extra, para multiplicação sem sinal.

Observe a sintaxe:

1. Um `p`, para inteiro empacotado.
2. A operação realizada, `mul`.
3. Um `h`, para indicar que os bits superiores ("high") do resultado estão sendo selecionados.
4. Um `u` opcional, caso o resultado deva ser interpretado como sem sinal (ou seja, não é estendido com sinal).
5. Por fim, o sufixo de tamanho `w`, para indicar que é uma operação de word (16 bits).

A multiplicação empacotada para words segue exatamente a regra acima.
A multiplicação para dword (32 bits) também segue a regra, mas só existe a variante que seleciona a metade inferior: `pmulld`.

Não há uma variante para a multiplicação de dword que selecione os bits superiores.
No entanto, existem variantes que _ampliam_ a multiplicação, armazenando o produto completo de 64 bits das vias de _índice par_ (ou seja, as vias nas posições 0 e 2):

| instrução | significado                                                                          |
|-------------|----------------------------------------------------------------------------------|
| `pmuludq`   | multiplica os elementos de 32 bits de índice par, sem sinal, em 2 produtos completos de 64 bits |
| `pmuldq`    | multiplica os elementos de 32 bits de índice par, com sinal, em 2 produtos completos de 64 bits   |

Observe que a sintaxe usa `dq`, possivelmente com um `u` antes, para multiplicação sem sinal.
Isso porque as instruções recebem vias de `dword` e produzem vias de `qword`.

## Divisão

Não existe divisão de inteiros empacotados.
Código que precisa dela converte os valores para ponto flutuante, divide e converte de volta.

## Ampliação de inteiros

Existem equivalentes empacotados para `movsx` e `movzx`.
Eles seguem a mesma sintaxe que mencionamos para as instruções que recebem entradas com um tamanho de via diferente do de sua saída:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Observe que o número de vias é definido pela largura maior (a de saída).
A instrução lê essa quantidade de vias da parte inferior da origem.
Essa é a mesma semântica que já vimos para as instruções `cvt` empacotadas entre números de ponto flutuante de precisão simples e dupla.

## Conversão entre inteiros e números de ponto flutuante

Existem instruções para converter entre inteiros de 32 bits com sinal e vias de ponto flutuante.
Elas seguem a sintaxe usual das instruções `cvt` e `cvtt`, mas em vez de `si`, um inteiro empacotado é representado por `dq`:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
As instruções que usam `pi` para representar inteiros empacotados escrevem em registradores `mmx` legados e estão efetivamente obsoletas no x86-64.
Prefira as formas `dq`, que usam registradores `xmm`.
~~~~

Os mesmos comentários feitos para a conversão escalar entre números de ponto flutuante e inteiros valem aqui.
Os números de ponto flutuante são arredondados de acordo com um registrador especial chamado MXCSR, cujo modo você não pode pressupor na entrada da função.
Existe uma variante `cvtt` (com um `t` extra) que sempre trunca o resultado.

Também é possível usar `round` para ter valores de ponto flutuante empacotados em um estado conhecido antes de converter.
O valor de controle de arredondamento é o mesmo do `round` escalar, e a sintaxe também é a mesma para valores de ponto flutuante empacotados:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Uma referência completa de todas as instruções mencionadas aqui está disponível na [referência de instruções x86][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
