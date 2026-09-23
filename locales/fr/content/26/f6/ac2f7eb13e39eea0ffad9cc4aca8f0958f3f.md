# À propos

L'objet [`Promise`][promise-docs] représente l'achèvement (ou l'échec) éventuel d'une opération asynchrone, ainsi que la valeur qui en résulte.

<!-- prettier-ignore -->
~~~exercism/note
C'est un sujet difficile pour beaucoup de gens, surtout si tu connais la programmation dans un langage complètement _synchrone_.
Si tu te sens dépassé, ou si tu veux en apprendre plus sur la **concurrence** et le **parallélisme**, regarde (via go.dev) ou regarde directement via vimeo et lis les diapositives de la brillante conférence « Concurrency is not parallelism ».

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Cycle de vie d'une promesse

Une `Promise` peut se trouver dans trois états :

1. en attente
2. résolue
3. rejetée

Quand elle est créée, une promesse est en attente.
À un moment donné dans le futur, elle peut être _résolue_ ou _rejetée_.
Une fois qu'une promesse a été résolue ou rejetée, elle ne peut plus jamais être résolue ou rejetée, et son état ne peut plus changer.

Autrement dit :

1. Lorsqu'elle est en attente, une promesse :
   - peut passer à l'état résolu ou à l'état rejeté.
2. Lorsqu'elle est résolue, une promesse :
   - ne doit pas passer à un autre état.
   - doit avoir une valeur, qui ne doit pas changer.
3. Lorsqu'elle est rejetée, une promesse :
   - ne doit pas passer à un autre état.
   - doit avoir une raison, qui ne doit pas changer.

## Résous une promesse

Une promesse peut être résolue de différentes façons :

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

Dans les exemples ci-dessus, `value` peut être _n'importe quoi_, y compris une erreur, `undefined`, `null` ou une autre promesse.
En général, on veut résoudre avec une valeur qui n'est pas une erreur.

## Rejette une promesse

Une promesse peut être rejetée de différentes façons :

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

Dans les exemples ci-dessus, `reason` peut être _n'importe quoi_, y compris une erreur, `undefined` ou `null`.
En général, on veut rejeter avec une erreur.

## Enchaîne une promesse

Une promesse peut être _poursuivie_ par une action ultérieure une fois qu'elle est résolue ou rejetée.

- [`promise.then()`][promise-then] est appelé dès que `promise` est résolue
- [`promise.catch()`][promise-catch] est appelé dès que `promise` est rejetée
- [`promise.finally()`][promise-finally] est appelé dès que `promise` est résolue ou rejetée

### **then**

Toute promesse est « thenable ».
Cela signifie qu'une fonction `then` est disponible et sera exécutée dès que la promesse d'origine est résolue.
Étant donné `promise.then(onResolved)`, la fonction de rappel `onResolved` reçoit la valeur avec laquelle la promesse d'origine a été résolue.
Cela renvoie toujours une _nouvelle_ promesse « chaînée ».

Renvoyer une `value` depuis `then` résout la promesse « chaînée ».
Lever une `reason` dans `then` rejette la promesse « chaînée ».

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

Cela affichera `"Success!"` après environ 1000 ms.
L'état et la valeur de `promise1` seront `resolved` et `"Success!"`.
L'état et la valeur de `promise2` seront `resolved` et `true`.

Un deuxième argument est disponible ; il s'exécute lorsque la promesse d'origine est rejetée.
Étant donné `promise.then(onResolved, onRejected)`, la fonction de rappel `onResolved` reçoit la valeur avec laquelle la promesse d'origine a été résolue, ou bien la fonction de rappel `onRejected` reçoit la raison pour laquelle la promesse a été rejetée.

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

- Dans environ la moitié des cas, cela affichera `"Success!"` après environ 1000 ms.
  - L'état et la valeur de `promise1` seront `resolved` et `"Success!"`.
  - L'état et la valeur de `promise2` seront `resolved` et `true`.
- Dans environ la moitié des cas, cela affichera immédiatement `"NOPE!"`.
  - L'état et la valeur de `promise1` seront `rejected` et `Nope!`.
  - L'état et la valeur de `promise2` seront `resolved` et `false`.

Il est important de comprendre qu'en raison des règles du cycle de vie, lorsque l'appel à `reject` a lieu, le `resolve` qui intervient environ 1000 ms plus tard est silencieusement ignoré, car l'état interne ne peut plus changer une fois que la promesse a été rejetée ou résolue.
Il est important de comprendre que renvoyer une valeur depuis une promesse la résout, et que lever une valeur la rejette.
Lorsque `promise1` est résolue et qu'un `onResolved` est enchaîné : `then(onResolved)`, alors la promesse qui suit est une nouvelle promesse qui peut être résolue ou rejetée.
Lorsque `promise1` est rejetée mais qu'un `onRejected` est enchaîné : `then(, onRejected)`, alors la promesse qui suit est une nouvelle promesse qui peut être résolue ou rejetée.

### **catch**

Parfois, tu veux capturer les erreurs et ne continuer que lorsque la promesse d'origine déclenche un `reject`.
Étant donné `promise.catch(onCatch)`, la fonction de rappel `onCatch` reçoit la raison pour laquelle la promesse d'origine a été rejetée.
Cela renvoie toujours une _nouvelle_ promesse « chaînée ».

Renvoyer une `value` depuis `catch` résout la promesse « chaînée ».
Lever une `reason` dans `catch` rejette la promesse « chaînée ».

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

Dans environ la moitié des cas, cela affichera `"Success!"` après environ 1000 ms.
Dans l'autre moitié des cas, cela affichera immédiatement `42`.

- Si `promise1` est résolue, `catch` est ignoré, on atteint `then` et la valeur est affichée.
  - L'état et la valeur de `promise1` seront `resolved` et `"Success!"`.
  - L'état et la valeur de `promise2` seront `resolved` et `"done"` ;
- Si `promise1` est rejetée, `catch` est exécuté, ce qui _renvoie une valeur_, la chaîne est donc maintenant `resolved`, on atteint `then` et la valeur est affichée.
  - L'état et la valeur de `promise1` seront `rejected` et `"Nope!"`.
  - L'état et la valeur de `promise2` seront `resolved` et `"done"` ;

### **finally**

Parfois, tu veux exécuter du code après qu'une promesse est arrivée à son terme, qu'elle soit résolue ou rejetée.
Étant donné `promise.finally(onSettled)`, la fonction de rappel `onSettled` ne reçoit rien.
Cela renvoie toujours une _nouvelle_ promesse « chaînée ».

Renvoyer une `value` depuis `finally` copie le statut et la valeur de la promesse d'origine, en ignorant la `value`.
Lever une `reason` dans `finally` rejette la promesse « chaînée », en écrasant le statut, la valeur ou la raison éventuels de la promesse d'origine.

## Exemple

Plusieurs de ces méthodes réunies :

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

- Dans les cas où `randomNumber` vaut `0-3` :
  - `myPromise` sera résolue avec la valeur `2, 4, 6, or 8`
  - `finalPromise` sera résolue avec la valeur `'yay'`
  - Il y aura deux messages :
    - `Sampled data: ...`
    - `Promise completed`
- Dans les cas où `randomNumber` vaut `4-5` :
  - `myPromise` sera rejetée avec la raison `'Sampling did not result in a sample'`
  - `finalPromise` sera rejetée avec la raison `Error('Sampling did not result in a sample')`
  - Il y aura un message :
    - `Promise completed`
    - _dans certains environnements_, cela produira un message `"uncaught rejected promise: Error('Sampling did not result in a sample')"`.

Comme montré ci-dessus, `reject` fonctionne avec une _string_, et une promesse peut aussi être rejetée avec une `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Si l'enchaînement des promesses ou leur usage général n'est pas clair, le [tutoriel sur MDN][mdn-promises] est une bonne ressource à consulter.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
