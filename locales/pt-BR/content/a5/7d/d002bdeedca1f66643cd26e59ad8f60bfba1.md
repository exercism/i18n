# Dicas

## 1. Determine se você vai precisar de carteira de motorista

- Use o [operador de igualdade estrita][mdn-equality-operators] para verificar se sua entrada é igual a uma determinada string.
- Use um dos dois [operadores lógicos][mdn-logical-operators] que você aprendeu no conceito de Boolean para combinar os dois requisitos.
- Você **não** precisa de uma condicional para resolver esta tarefa. Você pode retornar diretamente a expressão booleana que montar.

## 2. Escolha entre dois veículos em potencial para comprar

- Use um [operador relacional][mdn-relational-operators] para determinar qual opção vem primeiro na ordem alfabética.
- Depois, defina o valor de uma variável auxiliar de acordo com o resultado dessa comparação, com a ajuda de uma [condicional if-else][mdn-if-statement].
- Por fim, monte a frase de recomendação. Para isso, você pode usar o [operador de adição][mdn-addition] para concatenar as duas strings.

## 3. Calcule uma estimativa para o preço de um veículo usado

- Comece determinando a porcentagem com base na idade do veículo. Guarde-a em uma variável auxiliar. Use uma [condicional if-else if-else][mdn-if-statement], como mencionado nas instruções.
- Nas duas condições if, use [operadores relacionais][mdn-relational-operators] para comparar a idade do carro com os valores limite.
- Para calcular o resultado, aplique a porcentagem ao preço original. Por exemplo, `30% of x` pode ser calculado dividindo `30` por `100` e multiplicando por `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
