# Introdução

## Operadores aritméticos

O JavaScript oferece 6 operadores diferentes para realizar operações aritméticas básicas com números.

- `+`: O operador de adição serve para encontrar a soma de números.
- `-`: O operador de subtração serve para encontrar a diferença entre dois números
- `*`: O operador de multiplicação serve para encontrar o produto de dois números.
- `/`: O operador de divisão serve para dividir dois números.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: O operador de resto serve para encontrar o resto de uma divisão.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: O operador de exponenciação serve para elevar um número a uma potência.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## Ordem das operações

Ao usar vários operadores em uma linha, o JavaScript segue uma ordem de precedência, como mostra [esta tabela de precedência][mdn-operator-precedence].
Para simplificar no nosso contexto, o JavaScript usa a regra PEDMAS (parênteses, expoentes, divisão/multiplicação, adição/subtração) que aprendemos nas aulas de matemática do ensino fundamental.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Operadores de atribuição abreviados

Os operadores de atribuição abreviados são uma forma mais curta de escrever código que realiza operações aritméticas em uma variável e atribui o novo valor à mesma variável.
Por exemplo, considere duas variáveis `x` e `y`.
Assim, `x += y` é o mesmo que `x = x + y`.
Muitas vezes, isso é usado com um número em vez da variável `y`.
As outras 5 operações também podem ser feitas de forma parecida.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
