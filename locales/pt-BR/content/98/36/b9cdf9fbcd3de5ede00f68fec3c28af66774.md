# Dicas

Lembre-se, tartarugas são animais de sangue frio, então verifique se elas estão aquecidas antes de dar a elas uma colcha ou um suéter.

## 1. Ordene a quantidade!

- A permutação de ordenação que você retorna precisa estar em ordem decrescente.
- Certifique-se de ordenar as quantidades em ordem decrescente no local.
- `sortperm` pode receber argumentos semelhantes aos de `sort`.
- A ordem em que você realiza as duas operações acima é muito importante!

## 2. Ordene o cliente

- Um novo array com os clientes ordenados deve ser retornado (ou seja, não ordene no local)
- Lembre-se, uma permutação de ordenação (ou seja, um array de índices) pode ser usada como índices.

## 3. Cronograma de produção!

- Você pode usar suas funções `sortquantity!()` e `sortcustomer()` aqui.
- Lembre-se de que uma permutação de ordenação é apenas uma permutação dos índices.
- Para uma [permutação de ordenação inversa][invperm]:
    - Pense em qual é a ordenação original dos índices para um `Vector` arbitrário.
    - O que pode ser feito com *qualquer* permutação de índices para levá-la de volta a esse ponto de partida?
    - Dica final... O que a permutação de ordenação de uma permutação de ordenação faz?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
