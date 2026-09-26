# Instruções

Implemente as operações `keep` e `discard` em coleções.
Dada uma coleção e um predicado sobre os elementos dessa coleção, `keep` retorna uma nova coleção contendo os elementos para os quais o predicado é verdadeiro, enquanto `discard` retorna uma nova coleção contendo os elementos para os quais o predicado é falso.

Por exemplo, dada a coleção de números:

- 1, 2, 3, 4, 5

E o predicado:

- o número é par?

Então a sua operação keep deve produzir:

- 2, 4

Enquanto a sua operação discard deve produzir:

- 1, 3, 5

Repare que a união de keep e discard corresponde a todos os elementos.

As funções podem se chamar `keep` e `discard`, ou podem precisar de nomes diferentes para não entrar em conflito com funções ou conceitos já existentes na sua linguagem.

## Restrições

Não use aquela funcionalidade de filtro/rejeição/sei lá o quê que a sua biblioteca padrão oferece!
Resolva por conta própria usando outras ferramentas básicas.
