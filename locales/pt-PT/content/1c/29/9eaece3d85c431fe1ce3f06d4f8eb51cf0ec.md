# Anexo às instruções

## Implementação

Em Cairo, onde não há suporte nativo para números de vírgula flutuante, representamos os valores fracionários com números inteiros.

Esta abordagem é essencial no desenvolvimento de blockchain para manter a precisão nos cálculos.

Neste exercício, usamos **aritmética de vírgula fixa**, convertendo os períodos orbitais em microssegundos.

Por exemplo, o período orbital de Mercúrio, de `0.2408467` anos terrestres, passa a ser `240,846,700` microssegundos depois de multiplicar por `1,000,000`.

Para ter em conta a precisão decimal, os casos de teste assumem que a idade resultante tem **duas casas decimais**, representadas como números inteiros.

Isto significa que uma idade de `31.69` anos é armazenada como `3169` no código.

Para isso, multiplicamos por 100 antes de fazer a divisão.

Aqui está um exemplo:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Ao usar este método, garantes que os valores fracionários são representados com exatidão como números inteiros e manténs a precisão de duas casas decimais exigida, o que é crucial para que os testes passem.
