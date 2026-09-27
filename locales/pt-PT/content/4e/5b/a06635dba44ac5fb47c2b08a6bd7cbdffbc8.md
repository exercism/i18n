# Introdução

Quando trabalhas com arrays, por vezes queres executar código para cada valor do array. A isto chama-se iterar ou percorrer o array.

Aqui vamos ver o caso em que não queres modificar o array durante o processo. Para transformar arrays, consulta antes o conceito [Transformações de arrays][concept-array-transformations].

## O ciclo `for`

A forma mais básica de iterar sobre um array é usar um ciclo `for`, consulta o conceito [Ciclos `for`][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## O ciclo `for...of`

Quando queres trabalhar diretamente com o valor em cada iteração e não precisas do índice de todo, podes usar um ciclo `for...of`.

O `for...of` funciona como o ciclo `for` básico mostrado acima, mas em vez de teres de lidar com o _índice_ como variável do ciclo, recebes o _valor_ diretamente.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

Tal como nos ciclos `for` normais, podes usar `continue` para interromper a iteração atual e `break` para parar completamente a execução do ciclo.

## O método `forEach`

Todos os arrays incluem um método `forEach` que podes usar para percorrer os elementos do array.

O `forEach` aceita um [callback][concept-callbacks] como parâmetro.
A função de callback é chamada uma vez por cada elemento do array.
O elemento atual, o seu índice e o array completo são passados ao callback como argumentos.
Muitas vezes, só se usa o elemento atual ou o índice.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Não há forma de parar a iteração depois de o ciclo `forEach` começar.
As instruções `break` e `continue` não existem neste contexto.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
