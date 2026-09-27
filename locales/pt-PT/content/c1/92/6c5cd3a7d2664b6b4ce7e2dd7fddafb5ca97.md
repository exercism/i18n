# Números de vírgula flutuante

Os números de vírgula flutuante são números reais: podem ter uma parte fracionária. São representados na máquina como um padrão de bits binários, segundo a [especificação IEEE-754](https://en.wikipedia.org/wiki/IEEE_754).
As pessoas referem-se aos números de vírgula flutuante como *floats*.

Os números de vírgula flutuante têm sempre sinal. Ter sinal significa reservar um dos bits do número para indicar se esse número é negativo ou não.

Os números de vírgula flutuante têm uma **largura de bits**, que é apenas o número de bits que compõem esse número. Isto afeta o intervalo e a precisão dos valores que podem ser representados por esse tipo.

Rust tem 2 tipos primitivos de vírgula flutuante: `f32` e `f64`. O número depois do `f` indica a largura de bits. Noutras linguagens, `f32` é por vezes designado "precisão simples" e `f64` "precisão dupla".

## Qual devo usar?

Em geral, usa `f64`: é tão rápido como `f32` na maioria do hardware moderno de consumo e reduz consideravelmente a ocorrência de [imprecisões de vírgula flutuante](https://0.30000000000000004.com/).

Se precisares de números racionais de precisão infinita, podes usar a [crate `num-rational`](https://crates.io/crates/num-rational), que fornece um tipo `BigRational`. Se precisares de números decimais de precisão fixa, podes usar a [crate `rust_decimal`](https://crates.io/crates/rust_decimal), que fornece um tipo `Decimal`.

## Converter entre números de vírgula flutuante

Rust não tem conversões numéricas implícitas. Se precisares de converter entre tipos de vírgula flutuante, existem duas estratégias básicas: a palavra-chave `as` e os traits `From` e `TryFrom`.

Usar a palavra-chave `as` é simples: `expr as Type`. No entanto, há uma série de [pormenores e subtilezas](https://doc.rust-lang.org/nomicon/casts.html) que tens de ter em conta ao usar conversões com `as`.

A conversão baseada em traits é um pouco mais trabalhosa, mas mais segura: os traits de conversão só são implementados onde são seguros. Por exemplo, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementa `From<u8>`, `From<u16>`, `From<i8>` e `From<i16>`: qualquer valor representável por qualquer destes tipos é garantidamente representável num `f32`. Pode ser usado como `f32::from(expr)` ou `expr.into()`, em que `expr` corresponde a um destes tipos.

Ao converter valores de vírgula flutuante, a conversão com `as` é muitas vezes a preferida, simplesmente pela relativa escassez de implementações de conversão baseadas em traits. A partir de outubro de 2020, `TryFrom` não está implementado para números de vírgula flutuante. A conversão com `as` de `f32` para `f64` não perde informação. O inverso perde informação, mas tem um protocolo de conversão definido que procura minimizar essas perdas.
