# Comprendere la ricorsione in JavaScript

La ricorsione è un concetto potente della programmazione: prevede che una funzione chiami se stessa.
All'inizio può essere un po' complicata da afferrare, ma una volta capiti i fondamenti diventa uno strumento prezioso per risolvere problemi complessi.
Esploreremo la ricorsione in JavaScript con esempi facili da capire.

## Che cos'è la ricorsione?

La ricorsione si verifica quando una funzione chiama se stessa, direttamente o indirettamente.
È simile a un ciclo, ma può comportare la scomposizione di un problema in sotto-problemi più piccoli e più facili da gestire.

### Esempio 1: conto alla rovescia

Iniziamo con un semplice esempio: una funzione di conto alla rovescia.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

In questo esempio:

- **Caso base**: quando `num` diventa minore o uguale a 0, la funzione stampa «Blastoff!» e smette di chiamare se stessa.
- **Caso ricorsivo**: la funzione stampa il valore attuale di `num` e chiama se stessa con `num - 1`.

### Esempio 2: fattoriale

Ora vediamo un esempio classico di ricorsione: calcolare il fattoriale di un numero.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

In questo esempio:

- **Caso base**: quando `n` è 0 o 1, la funzione restituisce 1.
- **Caso ricorsivo**: la funzione moltiplica `n` per il fattoriale di `n - 1`.

## Concetti chiave

### Caso base

Ogni funzione ricorsiva dovrebbe avere almeno un caso base, cioè una condizione in cui la funzione smette di chiamare se stessa.
Senza un caso base, la ricorsione continuerebbe all'infinito e porterebbe a uno stack overflow.

### Caso ricorsivo

Il caso ricorsivo definisce come la funzione chiama se stessa con una versione più piccola o più semplice del problema.

## Vantaggi e svantaggi della ricorsione

**Vantaggi:**

- Una soluzione elegante per certi problemi.
- Riproduce il concetto di induzione matematica.

**Svantaggi:**

- Può essere meno efficiente delle soluzioni iterative.
- Può portare a uno stack overflow nelle ricorsioni profonde.

## Conclusione

La ricorsione è una tecnica preziosa che semplifica i problemi complessi scomponendoli in sotto-problemi più piccoli e più facili da gestire.
Capire i casi base ed i casi ricorsivi è fondamentale per implementare soluzioni ricorsive efficaci in JavaScript.

**Per saperne di più:**

- [MDN: la ricorsione in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: capitolo 3 - Funzioni](https://eloquentjavascript.net/03_functions.html)
