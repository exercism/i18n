# Instruções

A tua tarefa é implementar um algoritmo de pesquisa binária.

Um algoritmo de pesquisa binária encontra um item numa lista dividindo-a repetidamente ao meio e mantendo apenas a metade que contém o item que procuramos.
Permite-nos reduzir rapidamente as possíveis localizações do nosso item até o encontrarmos, ou até termos eliminado todas as localizações possíveis.

~~~~exercism/caution
A pesquisa binária só funciona quando a lista está ordenada.
~~~~

O algoritmo funciona assim:

- Encontra o elemento do meio de uma lista *ordenada* e compara-o com o item que procuramos.
- Se o elemento do meio for o nosso item, está feito!
- Se o elemento do meio for maior do que o nosso item, podemos eliminar esse elemento e todos os elementos **a seguir** a ele.
- Se o elemento do meio for menor do que o nosso item, podemos eliminar esse elemento e todos os elementos **antes** dele.
- Se todos os elementos da lista tiverem sido eliminados, então o item não está na lista.
- Caso contrário, repete o processo na parte da lista que ainda não foi eliminada.

Aqui está um exemplo:

Digamos que procuramos o número 23 na seguinte lista ordenada: `[4, 8, 12, 16, 23, 28, 32]`.

- Começamos por comparar 23 com o elemento do meio, 16.
- Como 23 é maior do que 16, podemos eliminar a metade esquerda da lista, ficando com `[23, 28, 32]`.
- Comparamos depois 23 com o novo elemento do meio, 28.
- Como 23 é menor do que 28, podemos eliminar a metade direita da lista: `[23]`.
- Encontrámos o nosso item.
