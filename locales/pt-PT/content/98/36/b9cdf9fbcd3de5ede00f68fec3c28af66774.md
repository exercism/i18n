# Dicas

Lembra-te de que as tartarugas são animais de sangue frio, por isso certifica-te de que estão quentes antes de lhes dares uma colcha ou uma camisola.

## 1. Ordena a quantidade!

- A permutação de ordenação que devolves tem de estar por ordem decrescente.
- Certifica-te de que ordenas as quantidades por ordem decrescente no próprio array.
- A `sortperm` pode receber argumentos semelhantes aos da `sort`.
- A ordem pela qual fazes as duas operações acima é muito importante!

## 2. Ordena o cliente

- Deve ser devolvido um novo array com os clientes ordenados (ou seja, não ordenes no próprio array).
- Lembra-te de que uma permutação de ordenação (ou seja, um array de índices) pode ser usada como índices.

## 3. Plano de produção!

- Podes usar aqui as tuas funções `sortquantity!()` e `sortcustomer()`.
- Lembra-te de que uma permutação de ordenação é apenas uma permutação dos índices.
- Para uma [permutação de ordenação inversa][invperm]:
    - Pensa em qual é a ordem original dos índices para um `Vector` arbitrário.
    - O que se pode fazer a *qualquer* permutação de índices para a devolver a este ponto de partida?
    - Última dica... O que faz a permutação de ordenação de uma permutação de ordenação?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
