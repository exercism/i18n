# Sobre

O objeto [`Promise`][promise-docs] representa a conclusão (ou o falhanço) eventual de uma operação assíncrona e o valor que daí resulta.

<!-- prettier-ignore -->
~~~exercism/note
Este é um tema difícil para muita gente, sobretudo se conheces programação numa linguagem que é completamente _síncrona_.
Se te sentires sobrecarregado, ou se quiseres saber mais sobre **concorrência** e **paralelismo**, [vê (no go.dev)][talk-blog] ou [vê diretamente no vimeo][talk-video] e [lê os slides][talk-slides] da brilhante palestra "Concurrency is not parallelism".

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Ciclo de vida de uma promessa

Uma `Promise` tem três estados:

1. pendente
2. cumprida
3. rejeitada

Quando é criada, uma promessa está pendente.
Em algum momento futuro, pode ser _resolvida_ ou _rejeitada_.
Depois de uma promessa ser resolvida ou rejeitada uma vez, nunca mais pode ser resolvida nem rejeitada de novo, e o seu estado também não pode mudar.

Por outras palavras:

1. Quando está pendente, uma promessa:
   - pode ser cumprida ou rejeitada.
2. Quando está cumprida, uma promessa:
   - não pode transitar para nenhum outro estado.
   - tem de ter um valor, que não pode mudar.
3. Quando está rejeitada, uma promessa:
   - não pode transitar para nenhum outro estado.
   - tem de ter um motivo, que não pode mudar.

## Resolver uma promessa

Uma promessa pode ser resolvida de várias formas:

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

Nos exemplos acima, `value` pode ser _qualquer coisa_, incluindo um erro, `undefined`, `null` ou outra promessa.
Normalmente, queres resolver com um valor que não seja um erro.

## Rejeitar uma promessa

Uma promessa pode ser rejeitada de várias formas:

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

Nos exemplos acima, `reason` pode ser _qualquer coisa_, incluindo um erro, `undefined` ou `null`.
Normalmente, queres rejeitar com um erro.

## Encadear uma promessa

Uma promessa pode ser _continuada_ com uma ação futura quando é resolvida ou rejeitada.

- [`promise.then()`][promise-then] é chamado quando a `promise` é resolvida
- [`promise.catch()`][promise-catch] é chamado quando a `promise` é rejeitada
- [`promise.finally()`][promise-finally] é chamado quando a `promise` é resolvida ou rejeitada

### **then**

Todas as promessas são "thenable".
Ou seja, existe uma função `then` disponível que será executada quando a promessa original for resolvida.
Dado `promise.then(onResolved)`, o callback `onResolved` recebe o valor com que a promessa original foi resolvida.
Isto devolve sempre uma _nova_ promessa "encadeada".

Devolver um `value` a partir de `then` resolve a promessa "encadeada".
Lançar um `reason` em `then` rejeita a promessa "encadeada".

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

Isto vai imprimir `"Success!"` na consola passados cerca de 1000 ms.
O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
O estado e o valor de `promise2` serão `resolved` e `true`.

Existe um segundo argumento disponível que é executado quando a promessa original é rejeitada.
Dado `promise.then(onResolved, onRejected)`, o callback `onResolved` recebe o valor com que a promessa original foi resolvida, ou o callback `onRejected` recebe o motivo pelo qual a promessa foi rejeitada.

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

- Em cerca de metade dos casos, isto vai imprimir `"Success!"` na consola passados cerca de 1000 ms.
  - O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
  - O estado e o valor de `promise2` serão `resolved` e `true`.
- Em cerca de metade dos casos, isto vai imprimir `"NOPE!"` de imediato.
  - O estado e o valor de `promise1` serão `rejected` e `Nope!`.
  - O estado e o valor de `promise2` serão `resolved` e `false`.

É importante perceberes que, por causa das regras do ciclo de vida, quando a promessa `reject`s, o `resolve` que chega cerca de 1000 ms depois é ignorado em silêncio, porque o estado interno não pode mudar depois de a promessa ter sido rejeitada ou resolvida.
É importante perceberes que devolver um valor de uma promessa a resolve, e que lançar um valor a rejeita.
Quando `promise1` é resolvida e existe um `onResolved` encadeado: `then(onResolved)`, essa continuação é uma nova promessa que pode ser resolvida ou rejeitada.
Quando `promise1` é rejeitada mas existe um `onRejected` encadeado: `then(, onRejected)`, essa continuação é uma nova promessa que pode ser resolvida ou rejeitada.

### **catch**

Às vezes queres capturar erros e só continuar quando a promessa original `reject`s.
Dado `promise.catch(onCatch)`, o callback `onCatch` recebe o motivo pelo qual a promessa original foi rejeitada.
Isto devolve sempre uma _nova_ promessa "encadeada".

Devolver um `value` a partir de `catch` resolve a promessa "encadeada".
Lançar um `reason` em `catch` rejeita a promessa "encadeada".

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

Em cerca de metade dos casos, isto vai imprimir `"Success!"` na consola passados cerca de 1000 ms.
Na outra metade dos casos, isto vai imprimir `42` de imediato.

- Se `promise1` for resolvida, o `catch` é ignorado, chega-se ao `then` e o valor é impresso na consola.
  - O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
  - O estado e o valor de `promise2` serão `resolved` e `"done"`;
- Se `promise1` for rejeitada, o `catch` é executado, o que _devolve um valor_, e por isso a cadeia fica agora `resolved` e chega ao `then`, que imprime o valor na consola.
  - O estado e o valor de `promise1` serão `rejected` e `"Nope!"`.
  - O estado e o valor de `promise2` serão `resolved` e `"done"`;

### **finally**

Às vezes queres executar código depois de uma promessa ficar concluída, independentemente de ela ser resolvida ou rejeitada.
Dado `promise.finally(onSettled)`, o callback `onSettled` não recebe nada.
Isto devolve sempre uma _nova_ promessa "encadeada".

Devolver um `value` a partir de `finally` copia o estado e o valor da promessa original, ignorando o `value`.
Lançar um `reason` em `finally` rejeita a promessa "encadeada", substituindo qualquer estado, valor ou motivo da promessa original.

## Exemplo

Vários dos métodos em conjunto:

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

- Nos casos em que `randomNumber` é `0-3`:
  - `myPromise` será resolvida com o valor `2, 4, 6, or 8`
  - `finalPromise` será resolvida com o valor `'yay'`
  - Serão impressas duas mensagens:
    - `Sampled data: ...`
    - `Promise completed`
- Nos casos em que `randomNumber` é `4-5`:
  - `myPromise` será rejeitada com o motivo `'Sampling did not result in a sample'`
  - `finalPromise` será rejeitada com o motivo `Error('Sampling did not result in a sample')`
  - Será impressa uma mensagem:
    - `Promise completed`
    - _em alguns ambientes_, isto vai originar um registo `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Como mostrado acima, o `reject` funciona com uma string, e uma promessa também pode ser rejeitada com um `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Se encadear promessas ou a utilização geral não for clara, o [tutorial da MDN][mdn-promises] é um bom recurso para consultar.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
