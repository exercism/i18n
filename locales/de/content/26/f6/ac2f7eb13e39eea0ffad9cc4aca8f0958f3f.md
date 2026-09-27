# Über

Das Objekt [`Promise`][promise-docs] repräsentiert den eventuellen Abschluss (oder das Scheitern) einer asynchronen Operation und den daraus resultierenden Wert.

<!-- prettier-ignore -->
~~~exercism/note
Dies ist ein schwieriges Thema für viele Menschen, besonders wenn du Programmieren in einer Sprache kennst, die vollständig _synchron_ ist.
Wenn du dich überfordert fühlst oder mehr über **Nebenläufigkeit** und **Parallelität** lernen möchtest, dann [schau dir (über go.dev)][talk-blog] oder [schau dir direkt über vimeo][talk-video] den brillanten Vortrag „Concurrency is not parallelism" an und [lies die Folien][talk-slides].

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Der Lebenszyklus eines Promise

Ein `Promise` hat drei Zustände:

1. ausstehend
2. erfüllt
3. abgelehnt

Wenn es erstellt wird, ist ein Promise ausstehend.
Irgendwann in der Zukunft kann es _aufgelöst_ oder _abgelehnt_ werden.
Sobald ein Promise einmal aufgelöst oder abgelehnt wurde, kann es nie wieder aufgelöst oder abgelehnt werden, und sein Zustand kann sich auch nicht mehr ändern.

Mit anderen Worten:

1. Wenn es ausstehend ist, kann ein Promise:
   - entweder in den Zustand „erfüllt" oder „abgelehnt" übergehen.
2. Wenn es erfüllt ist, darf ein Promise:
   - nicht in einen anderen Zustand übergehen.
   - muss einen Wert haben, der sich nicht ändern darf.
3. Wenn es abgelehnt ist, darf ein Promise:
   - nicht in einen anderen Zustand übergehen.
   - muss einen Grund haben, der sich nicht ändern darf.

## Ein Promise auflösen

Ein Promise kann auf verschiedene Arten aufgelöst werden:

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

In den Beispielen oben kann `value` _alles_ sein, einschließlich eines Fehlers, `undefined`, `null` oder eines weiteren Promise.
Normalerweise möchtest du mit einem Wert auflösen, der kein Fehler ist.

## Ein Promise ablehnen

Ein Promise kann auf verschiedene Arten abgelehnt werden:

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

In den Beispielen oben kann `reason` _alles_ sein, einschließlich eines Fehlers, `undefined` oder `null`.
Normalerweise möchtest du mit einem Fehler ablehnen.

## Ein Promise verketten

Ein Promise kann mit einer zukünftigen Aktion _fortgesetzt_ werden, sobald es aufgelöst oder abgelehnt wird.

- [`promise.then()`][promise-then] wird aufgerufen, sobald `promise` aufgelöst wird
- [`promise.catch()`][promise-catch] wird aufgerufen, sobald `promise` abgelehnt wird
- [`promise.finally()`][promise-finally] wird aufgerufen, sobald `promise` entweder aufgelöst oder abgelehnt wird

### **then**

Jedes Promise ist „thenable".
Das bedeutet, dass eine Funktion `then` verfügbar ist, die ausgeführt wird, sobald das ursprüngliche Promise aufgelöst wird.
Mit `promise.then(onResolved)` erhält der Callback `onResolved` den Wert, mit dem das ursprüngliche Promise aufgelöst wurde.
Dies gibt immer ein _neues_ „verkettetes" Promise zurück.

Wenn du einen `value` aus `then` zurückgibst, wird das „verkettete" Promise aufgelöst.
Wenn du einen `reason` in `then` wirfst, wird das „verkettete" Promise abgelehnt.

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

Dies gibt nach ungefähr 1000 ms `"Success!"` aus.
Der Status und Wert von `promise1` wird `resolved` und `"Success!"` sein.
Der Status und Wert von `promise2` wird `resolved` und `true` sein.

Es gibt ein zweites Argument, das ausgeführt wird, wenn das ursprüngliche Promise abgelehnt wird.
Mit `promise.then(onResolved, onRejected)` erhält der Callback `onResolved` den Wert, mit dem das ursprüngliche Promise aufgelöst wurde, oder der Callback `onRejected` erhält den Grund, aus dem das Promise abgelehnt wurde.

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

- In ungefähr der Hälfte der Fälle gibt dies nach ungefähr 1000 ms `"Success!"` aus.
  - Der Status und Wert von `promise1` wird `resolved` und `"Success!"` sein.
  - Der Status und Wert von `promise2` wird `resolved` und `true` sein.
- In ungefähr der Hälfte der Fälle gibt dies sofort `"NOPE!"` aus.
  - Der Status und Wert von `promise1` wird `rejected` und `Nope!` sein.
  - Der Status und Wert von `promise2` wird `resolved` und `false` sein.

Es ist wichtig zu verstehen, dass aufgrund der Regeln des Lebenszyklus das `resolve`, das etwa 1000 ms später kommt, stillschweigend ignoriert wird, wenn das Promise `reject` aufruft, da sich der interne Zustand nicht mehr ändern kann, sobald es abgelehnt oder aufgelöst wurde.
Es ist wichtig zu verstehen, dass das Zurückgeben eines Werts aus einem Promise es auflöst und das Werfen eines Werts es ablehnt.
Wenn `promise1` aufgelöst wird und ein verkettetes `onResolved` vorhanden ist: `then(onResolved)`, dann ist diese Fortsetzung ein neues Promise, das aufgelöst oder abgelehnt werden kann.
Wenn `promise1` abgelehnt wird, aber ein verkettetes `onRejected` vorhanden ist: `then(, onRejected)`, dann ist diese Fortsetzung ein neues Promise, das aufgelöst oder abgelehnt werden kann.

### **catch**

Manchmal möchtest du Fehler abfangen und nur weitermachen, wenn das ursprüngliche Promise `reject` aufruft.
Mit `promise.catch(onCatch)` erhält der Callback `onCatch` den Grund, aus dem das ursprüngliche Promise abgelehnt wurde.
Dies gibt immer ein _neues_ „verkettetes" Promise zurück.

Wenn du einen `value` aus `catch` zurückgibst, wird das „verkettete" Promise aufgelöst.
Wenn du einen `reason` in `catch` wirfst, wird das „verkettete" Promise abgelehnt.

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

In ungefähr der Hälfte der Fälle gibt dies nach ungefähr 1000 ms `"Success!"` aus.
In der anderen Hälfte der Fälle gibt dies sofort `42` aus.

- Wenn `promise1` aufgelöst wird, wird `catch` übersprungen und es erreicht `then` und gibt den Wert aus.
  - Der Status und Wert von `promise1` wird `resolved` und `"Success!"` sein.
  - Der Status und Wert von `promise2` wird `resolved` und `"done"` sein;
- Wenn `promise1` abgelehnt wird, wird `catch` ausgeführt, was _einen Wert zurückgibt_, und somit ist die Kette nun `resolved`, und sie erreicht `then` und gibt den Wert aus.
  - Der Status und Wert von `promise1` wird `rejected` und `"Nope!"` sein.
  - Der Status und Wert von `promise2` wird `resolved` und `"done"` sein;

### **finally**

Manchmal möchtest du Code ausführen, nachdem ein Promise abgeschlossen ist, unabhängig davon, ob das Promise aufgelöst oder abgelehnt wird.
Mit `promise.finally(onSettled)` erhält der Callback `onSettled` nichts.
Dies gibt immer ein _neues_ „verkettetes" Promise zurück.

Wenn du einen `value` aus `finally` zurückgibst, werden Status und Wert des ursprünglichen Promise übernommen, wobei der `value` ignoriert wird.
Wenn du einen `reason` in `finally` wirfst, wird das „verkettete" Promise abgelehnt, wodurch jeglicher Status und Wert oder Grund des ursprünglichen Promise überschrieben wird.

## Beispiel

Verschiedene der Methoden zusammen:

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

- In den Fällen, in denen `randomNumber` `0-3` ist:
  - `myPromise` wird mit dem Wert `2, 4, 6, or 8` aufgelöst
  - `finalPromise` wird mit dem Wert `'yay'` aufgelöst
  - Es wird zwei Logs geben:
    - `Sampled data: ...`
    - `Promise completed`
- In den Fällen, in denen `randomNumber` `4-5` ist:
  - `myPromise` wird mit dem Grund `'Sampling did not result in a sample'` abgelehnt
  - `finalPromise` wird mit dem Grund `Error('Sampling did not result in a sample')` abgelehnt
  - Es wird ein Log geben:
    - `Promise completed`
    - _in manchen Umgebungen_ ergibt dies ein Log `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Wie oben gezeigt, funktioniert `reject` mit einem String, und ein Promise kann auch mit einem `Error` abgelehnt werden.

<!-- prettier-ignore -->
~~~exercism/note
Wenn das Verketten von Promises oder die allgemeine Verwendung unklar ist, ist das [Tutorial auf MDN][mdn-promises] eine gute Ressource zum Durcharbeiten.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
