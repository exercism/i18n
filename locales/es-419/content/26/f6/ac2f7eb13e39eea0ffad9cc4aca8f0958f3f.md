# Acerca de

El objeto [`Promise`][promise-docs] representa la eventual finalización (o el fallo) de una operación asíncrona y su valor resultante.

<!-- prettier-ignore -->
~~~exercism/note
Este es un tema difícil para muchas personas, sobre todo si sabes programar en un lenguaje que es completamente _sincrónico_.
Si esto te abruma, o si quieres aprender más sobre la **concurrencia** y el **paralelismo**, [mira (en go.dev)][talk-blog] o [mira directamente en vimeo][talk-video] y [lee las diapositivas][talk-slides] de la brillante charla «Concurrency is not parallelism».

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Ciclo de vida de una promesa

Una `Promise` tiene tres estados:

1. pendiente
2. cumplida
3. rechazada

Cuando se crea, una promesa está pendiente.
En algún momento futuro, puede _resolverse_ o _rechazarse_.
Una vez que una promesa se resuelve o se rechaza, nunca puede volver a resolverse ni rechazarse, ni puede cambiar su estado.

En otras palabras:

1. Cuando está pendiente, una promesa:
   - puede pasar al estado cumplida o al estado rechazada.
2. Cuando está cumplida, una promesa:
   - no debe pasar a ningún otro estado.
   - debe tener un valor, que no debe cambiar.
3. Cuando está rechazada, una promesa:
   - no debe pasar a ningún otro estado.
   - debe tener una razón, que no debe cambiar.

## Resolver una promesa

Una promesa se puede resolver de varias maneras:

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

En los ejemplos anteriores, `value` puede ser _cualquier cosa_, incluso un error, `undefined`, `null` u otra promesa.
Por lo general, querrás resolver con un valor que no sea un error.

## Rechazar una promesa

Una promesa se puede rechazar de varias maneras:

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

En los ejemplos anteriores, `reason` puede ser _cualquier cosa_, incluso un error, `undefined` o `null`.
Por lo general, querrás rechazar con un error.

## Encadenar una promesa

Una promesa se puede _continuar_ con una acción futura una vez que se resuelve o se rechaza.

- [`promise.then()`][promise-then] se llama una vez que `promise` se resuelve
- [`promise.catch()`][promise-catch] se llama una vez que `promise` se rechaza
- [`promise.finally()`][promise-finally] se llama una vez que `promise` se resuelve o se rechaza

### **then**

Toda promesa es «thenable».
Eso significa que hay una función `then` disponible que se ejecutará una vez que la promesa original se resuelve.
Dado `promise.then(onResolved)`, el callback `onResolved` recibe el valor con el que se resolvió la promesa original.
Esto siempre devolverá una _nueva_ promesa «encadenada».

Devolver un `value` desde `then` resuelve la promesa «encadenada».
Lanzar un `reason` en `then` rechaza la promesa «encadenada».

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

Esto imprimirá `"Success!"` después de aproximadamente 1000 ms.
El estado y el valor de `promise1` serán `resolved` y `"Success!"`.
El estado y el valor de `promise2` serán `resolved` y `true`.

Hay un segundo argumento disponible que se ejecuta cuando la promesa original se rechaza.
Dado `promise.then(onResolved, onRejected)`, el callback `onResolved` recibe el valor con el que se resolvió la promesa original, o el callback `onRejected` recibe la razón por la que se rechazó la promesa.

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

- En aproximadamente 1/2 de los casos, esto imprimirá `"Success!"` después de aproximadamente 1000 ms.
  - El estado y el valor de `promise1` serán `resolved` y `"Success!"`.
  - El estado y el valor de `promise2` serán `resolved` y `true`.
- En aproximadamente 1/2 de los casos, esto imprimirá inmediatamente `"NOPE!"`.
  - El estado y el valor de `promise1` serán `rejected` y `Nope!`.
  - El estado y el valor de `promise2` serán `resolved` y `false`.

Es importante entender que, debido a las reglas del ciclo de vida, cuando la promesa llama a `reject`, el `resolve` que llega ~1000 ms después se ignora en silencio, ya que el estado interno no puede cambiar una vez que se ha rechazado o resuelto.
Es importante entender que devolver un valor desde una promesa la resuelve, y lanzar un valor la rechaza.
Cuando `promise1` se resuelve y hay un `onResolved` encadenado, es decir `then(onResolved)`, esa continuación es una nueva promesa que puede resolverse o rechazarse.
Cuando `promise1` se rechaza pero hay un `onRejected` encadenado, es decir `then(, onRejected)`, esa continuación es una nueva promesa que puede resolverse o rechazarse.

### **catch**

A veces quieres capturar errores y continuar solo cuando la promesa original llama a `reject`.
Dado `promise.catch(onCatch)`, el callback `onCatch` recibe la razón por la que se rechazó la promesa original.
Esto siempre devolverá una _nueva_ promesa «encadenada».

Devolver un `value` desde `catch` resuelve la promesa «encadenada».
Lanzar un `reason` en `catch` rechaza la promesa «encadenada».

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

En aproximadamente 1/2 de los casos, esto imprimirá `"Success!"` después de aproximadamente 1000 ms.
En la otra 1/2 de los casos, esto imprimirá inmediatamente `42`.

- Si `promise1` se resuelve, se omite `catch` y se llega a `then`, que imprime el valor.
  - El estado y el valor de `promise1` serán `resolved` y `"Success!"`.
  - El estado y el valor de `promise2` serán `resolved` y `"done"`;
- Si `promise1` se rechaza, se ejecuta `catch`, que _devuelve un valor_, y por lo tanto la cadena ahora está `resolved`, y se llega a `then`, que imprime el valor.
  - El estado y el valor de `promise1` serán `rejected` y `"Nope!"`.
  - El estado y el valor de `promise2` serán `resolved` y `"done"`;

### **finally**

A veces quieres ejecutar código después de que una promesa termine, sin importar si se resuelve o se rechaza.
Dado `promise.finally(onSettled)`, el callback `onSettled` no recibe nada.
Esto siempre devolverá una _nueva_ promesa «encadenada».

Devolver un `value` desde `finally` copia el estado y el valor de la promesa original, ignorando el `value`.
Lanzar un `reason` en `finally` rechaza la promesa «encadenada», sobrescribiendo cualquier estado y valor o razón de la promesa original.

## Ejemplo

Varios de los métodos juntos:

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

- En los casos en que `randomNumber` es `0-3`:
  - `myPromise` se resolverá con el valor `2, 4, 6, or 8`
  - `finalPromise` se resolverá con el valor `'yay'`
  - Habrá dos mensajes en la consola:
    - `Sampled data: ...`
    - `Promise completed`
- En los casos en que `randomNumber` es `4-5`:
  - `myPromise` se rechazará con la razón `'Sampling did not result in a sample'`
  - `finalPromise` se rechazará con la razón `Error('Sampling did not result in a sample')`
  - Habrá un mensaje en la consola:
    - `Promise completed`
    - _en algunos entornos_, esto producirá además un mensaje `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Como se muestra arriba, `reject` funciona con un string, y una promesa también puede rechazarse con un `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Si el encadenamiento de promesas o el uso general no te queda claro, el [tutorial de MDN][mdn-promises] es un buen recurso para consultar.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
