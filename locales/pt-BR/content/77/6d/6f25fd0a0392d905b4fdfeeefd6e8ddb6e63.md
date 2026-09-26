# Dicas

## Geral

- A pilha da calculadora é apenas um array de Factor. Uma *operação* é uma
  quotation `( stack -- new-stack )`.
- O `head*` de [`sequences`][sequences] retorna tudo, exceto
  os últimos `n` elementos; o `last2` retorna os dois últimos.

## 1. Implemente a adição

- Use o `bi` de [`kernel`][kernel] para dividir a entrada em dois
  cálculos: "o array sem os seus dois últimos elementos" e "a
  soma dos dois últimos elementos". Depois, o `suffix` junta os dois.

## 2. Implemente a multiplicação

- A mesma estrutura da tarefa 1, com `*` no lugar de `+`.

## 3. Aplique uma única operação

- O efeito da quotation é `( stack -- new-stack )`. Declare isso no
  `call` para que o compilador consiga verificar os tipos: `call( stack -- new-stack )`.

## 4. Avalie um programa

- O `each` (em [`sequences`][sequences]) itera uma quotation sobre uma
  sequência. A cada iteração, ele enxerga a pilha em execução, retira a próxima
  operação do programa e a aplica.

## 5. Avalie por nome

- Procure cada nome no assoc com o `at` (em [`assocs`][assocs])
  para obter a sua operação e, em seguida, reutilize o `evaluate`.
- Uma quotation fry `'[ _ at ]` de [`curry-compose-fry`][fry]
  captura o assoc, para que o `map` troque cada nome pela sua
  operação em uma única passagem.

## 6. Divida com segurança

- O `throw` (em [`kernel`][kernel]) gera um erro. O `zero-divisor-error`
  já está declarado, então a chamada é `zero-divisor-error throw`.
- Proteja o caminho da divisão com um `if` que verifica se o
  divisor mais abaixo é `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
