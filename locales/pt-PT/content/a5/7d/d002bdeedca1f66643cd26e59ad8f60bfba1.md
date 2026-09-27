# Dicas

## 1. Determina se vais precisar de carta de condução

- Usa o [operador de igualdade estrita][mdn-equality-operators] para verificar se o teu valor de entrada é igual a uma determinada string.
- Usa um dos dois [operadores lógicos][mdn-logical-operators] que aprendeste no conceito Boolean para combinar os dois requisitos.
- **Não** precisas de uma condicional para resolver esta tarefa. Podes devolver diretamente a expressão Boolean que construíres.

## 2. Escolhe entre dois veículos potenciais para comprar

- Usa um [operador relacional][mdn-relational-operators] para determinar qual das opções vem primeiro na ordem do dicionário.
- Depois, define o valor de uma variável auxiliar consoante o resultado dessa comparação, com a ajuda de uma [condicional if-else][mdn-if-statement].
- Por fim, constrói a frase de recomendação. Para isso, podes usar o [operador de adição][mdn-addition] para concatenar as duas strings.

## 3. Calcula uma estimativa para o preço de um carro usado

- Começa por determinar a percentagem com base na idade do veículo. Guarda-a numa variável auxiliar. Usa uma [condicional if-else if-else][mdn-if-statement] como mencionado nas instruções.
- Nas duas condições if, usa [operadores relacionais][mdn-relational-operators] para comparar a idade do carro com os valores limite.
- Para calcular o resultado, aplica a percentagem ao preço original. Por exemplo, `30% of x` pode calcular-se dividindo `30` por `100` e multiplicando por `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
