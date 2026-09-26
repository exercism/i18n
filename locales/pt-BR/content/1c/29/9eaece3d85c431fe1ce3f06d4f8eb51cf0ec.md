# Apêndice das instruções

## Implementação

Em Cairo, onde não há suporte nativo a números de ponto flutuante, representamos valores fracionários usando inteiros.

Essa abordagem é essencial no desenvolvimento de blockchain para manter a precisão nos cálculos.

Neste exercício, usamos **aritmética de ponto fixo**, convertendo os períodos orbitais em microssegundos.

Por exemplo, o período orbital de Mercúrio, de `0.2408467` anos terrestres, se torna `240,846,700` microssegundos ao multiplicar por `1,000,000`.

Para levar em conta a precisão decimal, os casos de teste assumem que a idade resultante tem **duas casas decimais**, representadas como inteiros.

Isso significa que uma idade de `31.69` anos é armazenada como `3169` no código.

Para isso, multiplicamos por 100 antes de fazer a divisão.

Veja um exemplo:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Usando esse método, você garante que os valores fracionários sejam representados com precisão como inteiros, mantendo a precisão de duas casas decimais exigida, o que é crucial para que os testes passem.
