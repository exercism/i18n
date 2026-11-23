# Instruções

Implementa operações básicas com listas.

Em linguagens funcionais, operações sobre listas como `length`, `map` e `reduce` são muito comuns.
Implementa uma série de operações básicas com listas, sem usar as funções já existentes.

O número exato e os nomes das operações a implementar variam de track para track, para evitar conflitos com nomes já existentes, mas as operações gerais que vais implementar incluem:

- `append` (_dadas duas listas, acrescenta todos os itens da segunda lista ao fim da primeira lista_);
- `concatenate` (_dada uma série de listas, combina todos os itens de todas as listas numa única lista achatada_);
- `filter` (_dado um predicado e uma lista, devolve a lista de todos os itens para os quais `predicate(item)` é True_);
- `length` (_dada uma lista, devolve o número total de itens que ela contém_);
- `map` (_dada uma função e uma lista, devolve a lista dos resultados de aplicar `function(item)` a todos os itens_);
- `foldl` (_dada uma função, uma lista e um acumulador inicial, aplica fold (reduce) a cada item no acumulador, a partir da esquerda_);
- `foldr` (_dada uma função, uma lista e um acumulador inicial, aplica fold (reduce) a cada item no acumulador, a partir da direita_);
- `reverse` (_dada uma lista, devolve uma lista com todos os itens originais, mas pela ordem inversa_).

Repara que a ordem pela qual os argumentos são passados às funções de fold (`foldl`, `foldr`) é importante.
