# Dicas

## Geral

- A pilha da calculadora é apenas um array de Factor. Uma *operação* é
  uma quotation `( stack -- new-stack )`.
- `head*` de [`sequences`][sequences] devolve tudo menos os últimos
  `n` elementos; `last2` devolve os dois últimos.

## 1. Implementa a adição

- Usa `bi` de [`kernel`][kernel] para dividir o que está na pilha em
  dois cálculos: «o array menos os seus dois últimos elementos» e «a
  soma dos dois últimos elementos». Depois, `suffix` junta-os.

## 2. Implementa a multiplicação

- A mesma estrutura da tarefa 1, com `*` no lugar de `+`.

## 3. Aplica uma única operação

- O efeito da quotation é `( stack -- new-stack )`. Declara isso em
  `call` para que o compilador possa verificar os tipos: `call( stack -- new-stack )`.

## 4. Avalia um programa

- `each` (em [`sequences`][sequences]) itera uma quotation sobre uma
  sequência. Cada iteração vê a pilha em execução, retira do programa a
  operação seguinte e aplica essa operação.

## 5. Avalia por nome

- Procura cada nome no assoc com `at` (em [`assocs`][assocs]) para
  obter a sua operação e depois reutiliza `evaluate`.
- Uma quotation fry `'[ _ at ]` de [`curry-compose-fry`][fry]
  captura o assoc, para que `map` possa trocar cada nome pela sua
  operação numa única passagem.

## 6. Divide com segurança

- `throw` (em [`kernel`][kernel]) lança um erro. O
  `zero-divisor-error` já está declarado, por isso a chamada é
  `zero-divisor-error throw`.
- Protege o caminho da divisão com um `if` que verifica se o
  divisor mais abaixo na pilha é `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
