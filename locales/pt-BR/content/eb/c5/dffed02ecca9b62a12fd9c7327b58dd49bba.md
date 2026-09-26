# Instruções

Implemente operações básicas com listas.

Em linguagens funcionais, operações com listas como `length`, `map` e `reduce` são muito comuns.
Implemente uma série de operações básicas com listas, sem usar funções já existentes.

O número e os nomes exatos das operações a serem implementadas vão depender da trilha, para evitar conflitos com nomes já existentes, mas as operações gerais que você vai implementar incluem:

- `append` (_dadas duas listas, adicione todos os itens da segunda lista ao final da primeira lista_);
- `concatenate` (_dada uma série de listas, combine todos os itens de todas as listas em uma única lista achatada_);
- `filter` (_dados um predicado e uma lista, retorne a lista de todos os itens para os quais `predicate(item)` é True_);
- `length` (_dada uma lista, retorne o número total de itens dentro dela_);
- `map` (_dadas uma função e uma lista, retorne a lista dos resultados de aplicar `function(item)` a todos os itens_);
- `foldl` (_dados uma função, uma lista e um acumulador inicial, faça o fold (reduza) de cada item no acumulador, a partir da esquerda_);
- `foldr` (_dados uma função, uma lista e um acumulador inicial, faça o fold (reduza) de cada item no acumulador, a partir da direita_);
- `reverse` (_dada uma lista, retorne uma lista com todos os itens originais, mas em ordem inversa_).

Observe que a ordem em que os argumentos são passados para as funções de fold (`foldl`, `foldr`) faz diferença.
