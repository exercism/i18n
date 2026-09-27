# Introduzione

## Operatori aritmetici

JavaScript mette a disposizione 6 operatori diversi per eseguire le operazioni aritmetiche di base sui numeri.

- `+`: l'operatore di addizione serve a trovare la somma di due numeri.
- `-`: l'operatore di sottrazione serve a trovare la differenza tra due numeri.
- `*`: l'operatore di moltiplicazione serve a trovare il prodotto di due numeri.
- `/`: l'operatore di divisione serve a dividere due numeri.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: l'operatore modulo serve a trovare il resto di una divisione.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: l'operatore di esponenziazione serve a elevare un numero a una potenza.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## Ordine delle operazioni

Quando in una riga si usano più operatori, JavaScript segue un ordine di precedenza, come mostrato in [questa tabella di precedenza][mdn-operator-precedence].
Per semplificare nel nostro contesto, JavaScript usa la regola PEDMAS (Parentesi, Esponenti, Divisione/Moltiplicazione, Addizione/Sottrazione) che abbiamo imparato alle elementari.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Operatori di assegnazione abbreviati

Gli operatori di assegnazione abbreviati sono un modo più breve per scrivere codice che esegue operazioni aritmetiche su una variabile e assegna il nuovo valore alla stessa variabile.
Per esempio, considera due variabili `x` e `y`.
Allora `x += y` equivale a `x = x + y`.
Spesso si usa un numero al posto della variabile `y`.
Le altre 5 operazioni si possono svolgere in modo simile.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
