# Informazioni

L'oggetto [`Promise`][promise-docs] rappresenta il completamento (o il fallimento) eventuale di un'operazione asincrona e il valore che ne risulta.

<!-- prettier-ignore -->
~~~exercism/note
Questo è un argomento difficile per molte persone, soprattutto se conosci la programmazione in un linguaggio completamente _sincrono_.
Se ti senti sopraffatto, o se vuoi saperne di più su **concorrenza** e **parallelismo**, [guarda (su go.dev)][talk-blog] o [guarda direttamente su vimeo][talk-video] e [leggi le slide][talk-slides] del brillante intervento «Concurrency is not parallelism».

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Ciclo di vita di una promise

Una `Promise` ha tre stati:

1. pending
2. fulfilled
3. rejected

Quando viene creata, una promise è in stato pending.
A un certo punto, in futuro, potrà essere _risolta_ o _rifiutata_.
Una volta che una promise è stata risolta o rifiutata, non potrà mai più essere risolta o rifiutata, né il suo stato potrà cambiare.

In altre parole:

1. Quando è in stato pending, una promise:
   - può passare allo stato fulfilled o rejected.
2. Quando è in stato fulfilled, una promise:
   - non deve passare a nessun altro stato.
   - deve avere un valore, che non deve cambiare.
3. Quando è in stato rejected, una promise:
   - non deve passare a nessun altro stato.
   - deve avere un motivo, che non deve cambiare.

## Risolvere una promise

Una promise può essere risolta in vari modi:

```javascript
// Creates a promise that is immediately resolved
Promise.resolve(value);

// Creates a promise that is immediately resolved
new Promise((resolve) => {
  resolve(value);
});

// Chaining a promise leads to a resolved promise
somePromise.then(() => {
  // ...
  return value;
});
```

Negli esempi qui sopra `value` può essere _qualsiasi cosa_, incluso un errore, `undefined`, `null` o un'altra promise.
Di solito vuoi risolvere con un valore che non sia un errore.

## Rifiutare una promise

Una promise può essere rifiutata in vari modi:

```javascript
// Creates a promise that is immediately rejected
Promise.reject(reason)

// Creates a promise that is immediately rejected
new Promise((_, reject) {
  reject(reason)
})

// Chaining a promise with an error leads to a rejected promise
somePromise.then(() => {
  // ...
  throw reason
})
```

Negli esempi qui sopra `reason` può essere _qualsiasi cosa_, incluso un errore, `undefined` o `null`.
Di solito vuoi rifiutare con un errore.

## Concatenare una promise

Una promise può essere _proseguita_ con un'azione futura una volta che viene risolta o rifiutata.

- [`promise.then()`][promise-then] viene chiamata quando `promise` viene risolta
- [`promise.catch()`][promise-catch] viene chiamata quando `promise` viene rifiutata
- [`promise.finally()`][promise-finally] viene chiamata quando `promise` viene risolta o rifiutata

### **then**

Ogni promise è «thenable».
Questo significa che è disponibile una funzione `then` che verrà eseguita quando la promise originale viene risolta.
Data `promise.then(onResolved)`, la callback `onResolved` riceve il valore con cui la promise originale è stata risolta.
Il risultato è sempre una _nuova_ promise «concatenata».

Restituire un `value` da `then` risolve la promise «concatenata».
Lanciare un `reason` in `then` rifiuta la promise «concatenata».

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

const promise2 = promise1.then(function (value) {
  console.log(value);
  // expected output: "Success!"

  return true;
});
```

Questo stamperà `"Success!"` dopo circa 1000 ms.
Lo stato e il valore di `promise1` saranno `resolved` e `"Success!"`.
Lo stato e il valore di `promise2` saranno `resolved` e `true`.

C'è un secondo argomento disponibile che viene eseguito quando la promise originale viene rifiutata.
Data `promise.then(onResolved, onRejected)`, la callback `onResolved` riceve il valore con cui la promise originale è stata risolta, oppure la callback `onRejected` riceve il motivo per cui la promise è stata rifiutata.

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);

  if (Math.random() < 0.5) {
    reject('Nope!');
  }
});

function log(value) {
  console.log(value);
  return true;
}

function shout(reason) {
  console.error(reason.toUpperCase());
  return false;
}

const promise2 = promise1.then(log, shout);
```

- In circa metà dei casi, stamperà `"Success!"` dopo circa 1000 ms.
  - Lo stato e il valore di `promise1` saranno `resolved` e `"Success!"`.
  - Lo stato e il valore di `promise2` saranno `resolved` e `true`.
- In circa metà dei casi, stamperà immediatamente `"NOPE!"`.
  - Lo stato e il valore di `promise1` saranno `rejected` e `Nope!`.
  - Lo stato e il valore di `promise2` saranno `resolved` e `false`.

È importante capire che, per via delle regole del ciclo di vita, quando si chiama `reject`, la chiamata a `resolve` che arriva circa 1000 ms dopo viene ignorata silenziosamente, perché lo stato interno non può cambiare una volta che è stato rifiutato o risolto.
È importante capire che restituire un valore da una promise la risolve, e lanciare un valore la rifiuta.
Quando `promise1` viene risolta e c'è una `onResolved` concatenata: `then(onResolved)`, allora quel seguito è una nuova promise che può essere risolta o rifiutata.
Quando `promise1` viene rifiutata ma c'è una `onRejected` concatenata: `then(, onRejected)`, allora quel seguito è una nuova promise che può essere risolta o rifiutata.

### **catch**

A volte vuoi catturare gli errori e continuare solo quando la promise originale viene rifiutata, cioè quando si chiama `reject`.
Data `promise.catch(onCatch)`, la callback `onCatch` riceve il motivo per cui la promise originale è stata rifiutata.
Il risultato è sempre una _nuova_ promise «concatenata».

Restituire un `value` da `catch` risolve la promise «concatenata».
Lanciare un `reason` in `catch` rifiuta la promise «concatenata».

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);

  if (Math.random() < 0.5) {
    reject('Nope!');
  }
});

function log(value) {
  console.log(value);
  return 'done';
}

function recover(reason) {
  console.error(reason.toUpperCase());
  return 42;
}

const promise2 = promise1.catch(recover).then(log);
```

In circa metà dei casi, stamperà `"Success!"` dopo circa 1000 ms.
Nell'altra metà dei casi, stamperà immediatamente `42`.

- Se `promise1` viene risolta, `catch` viene saltata e si arriva a `then`, che stampa il valore.
  - Lo stato e il valore di `promise1` saranno `resolved` e `"Success!"`.
  - Lo stato e il valore di `promise2` saranno `resolved` e `"done"`;
- Se `promise1` viene rifiutata, `catch` viene eseguita, il che _restituisce un valore_, e quindi la catena ora è `resolved` e si arriva a `then`, che stampa il valore.
  - Lo stato e il valore di `promise1` saranno `rejected` e `"Nope!"`.
  - Lo stato e il valore di `promise2` saranno `resolved` e `"done"`;

### **finally**

A volte vuoi eseguire del codice dopo che una promise si è conclusa, indipendentemente dal fatto che venga risolta o rifiutata.
Data `promise.finally(onSettled)`, la callback `onSettled` non riceve nulla.
Il risultato è sempre una _nuova_ promise «concatenata».

Restituire un `value` da `finally` copia lo stato e il valore dalla promise originale, ignorando il `value`.
Lanciare un `reason` in `finally` rifiuta la promise «concatenata», sovrascrivendo lo stato, il valore o il motivo della promise originale.

## Esempio

Diversi metodi usati insieme:

```javascript
const myPromise = new Promise(function (resolve, reject) {
  const sampleData = [2, 4, 6, 8];
  const randomNumber = Math.round(Math.random() * 5);

  if (sampleData[randomNumber]) {
    resolve(sampleData[randomNumber]);
  } else {
    reject('Sampling did not result in a sample');
  }
});

const finalPromise = myPromise
  .then(function (sampled) {
    // If the random number was 0, 1, 2, or 3, this will be
    // reached and the number 2, 4, 6, or 8 will be logged.
    console.log(`Sampled data: ${sampled}`);
    return 'yay';
  })
  .catch(function (reason) {
    // If the random number was 4 or 5, this will be reached and
    // reason will be "An error occurred". The entire chain will
    // then reject with an Error with the reason as message.
    throw new Error(reason);
  })
  .finally(function () {
    // This will always log after either the sampled data is
    // logged or the error is raised.
    console.log('Promise completed');
  });
```

- Nei casi in cui `randomNumber` è `0-3`:
  - `myPromise` sarà risolta con il valore `2, 4, 6, or 8`
  - `finalPromise` sarà risolta con il valore `'yay'`
  - Ci saranno due stampe:
    - `Sampled data: ...`
    - `Promise completed`
- Nei casi in cui `randomNumber` è `4-5`:
  - `myPromise` sarà rifiutata con il motivo `'Sampling did not result in a sample'`
  - `finalPromise` sarà rifiutata con il motivo `Error('Sampling did not result in a sample')`
  - Ci sarà una stampa:
    - `Promise completed`
    - _in alcuni ambienti_ questo produrrà una stampa `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Come mostrato sopra, `reject` funziona con una stringa, e una promise può anche essere rifiutata con un `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Se il concatenamento delle promise o il loro uso generale non ti è chiaro, il [tutorial su MDN][mdn-promises] è una buona risorsa da consultare.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
