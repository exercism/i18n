# Introdução

O JavaScript tem um operador `...` embutido que facilita trabalhar com um número indefinido de elementos. Dependendo do contexto, ele é chamado de _operador rest_ ou _operador spread_.

## Operador rest

### Elementos rest

Quando `...` aparece do lado esquerdo de uma atribuição, esses três pontos são conhecidos como o operador `rest`. Os três pontos junto com um nome de variável formam o que chamamos de elemento rest. Ele coleta zero ou mais valores e os armazena em um único array.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

Repare que no JavaScript, diferente de algumas outras linguagens, um elemento `rest` não pode ter vírgula final. Ele _precisa_ ser o último elemento de uma atribuição por desestruturação. O exemplo abaixo lança um `SyntaxError`:

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### Propriedades rest

Assim como acontece com os arrays, o operador rest também pode ser usado para coletar uma ou mais propriedades de um objeto e armazená-las em um único objeto.

```javascript
const { street, ...address } = {
  street: 'Platz der Republik 1',
  postalCode: '11011',
  city: 'Berlin',
};
street;
// => 'Platz der Republik 1'
address;
// => {postalCode: '11011', city: 'Berlin'}
```

## Parâmetros rest

Quando `...` aparece na definição de uma função ao lado do último argumento dela, esse parâmetro é chamado de _parâmetro rest_. Ele permite que a função aceite um número indefinido de argumentos como um array.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## Spread

### Elementos spread

Quando `...` aparece do lado direito de uma atribuição, ele é conhecido como o operador `spread`. Ele expande um array em uma lista de elementos. Diferente do elemento rest, ele pode aparecer em qualquer posição de uma expressão literal de array, e pode haver mais de um.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### Propriedades spread

Assim como acontece com os arrays, o operador spread também pode ser usado para copiar propriedades de um objeto para outro.

```javascript
let address = {
  postalCode: '11011',
  city: 'Berlin',
};
address = { ...address, country: 'Germany' };
// => {
//   postalCode: '11011',
//   city: 'Berlin',
//   country: 'Germany',
// }
```
