# Números de ponto flutuante

Números de ponto flutuante são números reais: podem ter uma parte fracionária. Eles são representados na máquina como um padrão de bits binários, seguindo a [especificação IEEE-754](https://en.wikipedia.org/wiki/IEEE_754).
As pessoas costumam chamar os números de ponto flutuante de floats.

Números de ponto flutuante sempre têm sinal. Ter sinal significa reservar um dos bits do número para indicar
se esse número é negativo ou não.

Números de ponto flutuante têm uma **largura de bits**, que é simplesmente a quantidade de bits que compõem esse número. Isso afeta
o intervalo e a precisão dos valores que esse tipo consegue representar.

Rust tem 2 tipos primitivos de ponto flutuante: `f32` e `f64`. O número depois do `f` indica a largura de bits. Em outras linguagens, `f32` às vezes é chamado de "precisão simples", e `f64` de "precisão dupla".

## Qual devo usar?

Em geral, use `f64`: ele é tão rápido quanto o `f32` na maioria dos hardwares de consumo modernos, e reduz bastante a incidência de [imprecisão de ponto flutuante](https://0.30000000000000004.com/).

Se você precisar de números racionais de precisão infinita, pode usar o [crate `num-rational`](https://crates.io/crates/num-rational), que fornece um tipo `BigRational`. Se precisar de números decimais de precisão fixa, pode usar o [crate `rust_decimal`](https://crates.io/crates/rust_decimal), que fornece um tipo `Decimal`.

## Conversão entre números de ponto flutuante

Rust não tem conversões numéricas implícitas. Se você precisar converter entre tipos de ponto flutuante, existem duas estratégias básicas: a palavra-chave `as` e os traits `From` e `TryFrom`.

Usar a palavra-chave `as` é simples: `expr as Type`. Porém, existem várias [ressalvas e sutilezas](https://doc.rust-lang.org/nomicon/casts.html) que você precisa ter em mente ao usar conversões com `as`.

A conversão baseada em traits é um pouco mais trabalhosa, mas mais segura: os traits de conversão só são implementados onde são seguros. Por exemplo, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementa `From<u8>`, `From<u16>`, `From<i8>` e `From<i16>`: qualquer valor representável por qualquer um desses tipos tem garantia de ser representável em um `f32`. Ele pode ser usado como `f32::from(expr)`, ou `expr.into()`, em que `expr` corresponde a um desses tipos.

Ao converter valores de ponto flutuante, a conversão com `as` costuma ser preferida, simplesmente pela relativa escassez de implementações de conversão baseadas em traits. Em outubro de 2020, `TryFrom` não estava implementado para números de ponto flutuante. A conversão com `as` de `f32` para `f64` é sem perdas. O inverso tem perdas, mas segue um protocolo de conversão definido, que busca minimizar a perda.
