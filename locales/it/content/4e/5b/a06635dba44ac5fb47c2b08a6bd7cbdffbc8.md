# Introduzione

Quando lavori con gli array, a volte vuoi eseguire del codice per ogni valore dell'array.
Questa operazione si chiama iterazione o ciclo sull'array.

Qui vedremo il caso in cui non vuoi modificare l'array durante l'operazione.
Per trasformare gli array, vedi invece [Concetto trasformazioni di array][concept-array-transformations].

## Il ciclo `for`

Il modo più semplice per iterare su un array è usare un ciclo `for`: vedi [Concetto cicli for][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## Il ciclo `for...of`

Quando vuoi lavorare direttamente con il valore in ogni iterazione e non ti serve affatto l'indice, puoi usare un ciclo `for...of`.

`for...of` funziona come il ciclo `for` di base mostrato sopra, ma invece di dover gestire l'_indice_ come variabile nel ciclo, ricevi direttamente il _valore_.

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

Proprio come nei normali cicli `for`, puoi usare `continue` per interrompere l'iterazione corrente e `break` per interrompere del tutto l'esecuzione del ciclo.

## Il metodo `forEach`

Ogni array include un metodo `forEach` che può essere usato per iterare sugli elementi dell'array.

`forEach` accetta una [callback][concept-callbacks] come parametro.
La funzione di callback viene chiamata una volta per ogni elemento dell'array.
Alla callback vengono passati come argomenti l'elemento corrente, il suo indice e l'array completo.
Spesso vengono usati solo l'elemento corrente o l'indice.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Non c'è modo di interrompere l'iterazione una volta avviato il ciclo `forEach`.
Le istruzioni `break` e `continue` non esistono in questo contesto.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
