# Dicas

## Geral

- É possível, embora não seja obrigatório, resolver todas as tarefas com uma única instrução dentro do corpo da função.


## 1. Determina se uma carta está presente

- A carta está [na][ref-match] pilha?

## 2. Encontra a posição de uma carta

- A carta está na pilha?
- Se estiver, em [que][ref-which] posição?
- É garantido que todas as cartas são diferentes, o que torna a tarefa mais simples.
- Devolve a posição ou `-1`.
  - Vê o [conceito de condicionais][concept-conditionals] para conhecer várias formas de ramificar se algo for `TRUE` ou `FALSE`.
  - Se usares [`if_else`][ref-if_else] (a abordagem mais moderna, mas que aqui não é propriamente necessária), tem em atenção que é rígida quanto ao facto de ambos os ramos devolverem o mesmo tipo de resultado. Pode ser preciso devolveres explicitamente um único elemento, em vez de um vetor que pode estar vazio.
  - Para obteres o primeiro elemento de um vetor, basta acrescentares `[1]`  a seguir a qualquer coisa que devolva um vetor.

## 3. Determina se cada carta é par

- O operador de resto é `%%`.
- `x` é par se `x %% 2 == 0`.
- Será que [todas][ref-all] as cartas cumprem este critério?

## 4. Verifica se a pilha contém uma carta ímpar

- Uma carta é ímpar se não for par, por isso vê a tarefa anterior.
- Será que [alguma][ref-any] carta cumpre este critério?

## 5. Obtém a primeira carta ímpar da pilha

- Há alguma carta ímpar na pilha?
- Se houver, devolve a primeira _carta_ (não a posição).

## 6. Determina a posição da primeira carta par

- Há alguma carta par na pilha?
- Se houver, devolve a _posição_ da primeira carta par.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
