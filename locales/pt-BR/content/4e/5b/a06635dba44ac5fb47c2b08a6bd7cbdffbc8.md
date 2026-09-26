# Introdução

Ao trabalhar com arrays, às vezes você quer executar um código para cada valor do array.
Isso se chama iterar sobre o array, ou fazer um laço sobre ele.

Aqui vamos ver o caso em que você não quer modificar o array no processo.
Para transformar arrays, veja o [conceito Transformações de Array][concept-array-transformations].

## O laço `for`

A forma mais básica de iterar sobre um array é usar um laço `for`, veja o [conceito Laços for][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## O laço `for...of`

Quando você quer trabalhar com o valor diretamente em cada iteração e não precisa do índice, pode usar um laço `for...of`.

O `for...of` funciona como o laço `for` básico mostrado acima, mas em vez de você ter que lidar com o _índice_ como uma variável no laço, o _valor_ é fornecido diretamente.

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

Assim como nos laços `for` comuns, você pode usar `continue` para interromper a iteração atual e `break` para encerrar a execução do laço por completo.

## O método `forEach`

Todo array inclui um método `forEach` que pode ser usado para iterar sobre os elementos do array.

O `forEach` aceita um [callback][concept-callbacks] como parâmetro.
A função de callback é chamada uma vez para cada elemento do array.
O elemento atual, o índice dele e o array completo são passados ao callback como argumentos.
Muitas vezes, só o elemento atual ou o índice são usados.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Não há como interromper a iteração depois que o laço `forEach` começou.
As instruções `break` e `continue` não existem nesse contexto.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
