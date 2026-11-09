# Dicas

## Geral

- É possível, mas não é obrigatório, resolver cada tarefa com uma única instrução dentro do corpo da função.


## 1. Determine se uma carta está presente

- A carta está [na][ref-match] pilha?

## 2. Encontre a posição de uma carta

- A carta está na pilha?
- Se sim, em [qual][ref-which] posição?
- É garantido que todas as cartas são diferentes, o que simplifica a tarefa.
- Retorne a posição ou `-1`.
  - Veja o [Conceito de Condicionais][concept-conditionals] para conhecer várias formas de ramificar se algo é `TRUE` ou `FALSE`.
  - Se você usar [`if_else`][ref-if_else] (a abordagem mais moderna, mas não exatamente necessária aqui), saiba que ele exige que os dois ramos retornem o mesmo tipo de resultado. Talvez você precise retornar explicitamente um único elemento, em vez de um vetor que pode estar vazio.
  - Para obter o primeiro elemento de um vetor, basta adicionar `[1]` depois de qualquer coisa que retorne um vetor.

## 3. Determine se cada carta é par

- O operador de resto é `%%`.
- `x` é par se `x %% 2 == 0`.
- [Todas][ref-all] as cartas atendem a esse critério?

## 4. Verifique se a pilha contém uma carta de valor ímpar

- Uma carta é ímpar se não for par, então veja a tarefa anterior.
- [Alguma][ref-any] carta atende a esse critério?

## 5. Obtenha a primeira carta ímpar da pilha

- Existe alguma carta ímpar na pilha?
- Se sim, retorne a primeira _carta_ (não a posição).

## 6. Determine a posição da primeira carta par

- Existe alguma carta par na pilha?
- Se sim, retorne a _posição_ da primeira carta par.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
