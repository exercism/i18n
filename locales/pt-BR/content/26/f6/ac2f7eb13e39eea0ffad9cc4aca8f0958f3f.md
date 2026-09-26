# Sobre

O objeto [`Promise`][promise-docs] representa a conclusão (ou a falha) eventual de uma operação assíncrona e o valor que dela resulta.

<!-- prettier-ignore -->
~~~exercism/note
Este é um tópico difícil para muitas pessoas, especialmente se você programa em uma linguagem completamente _síncrona_.
Se isso parecer demais para você, ou se você quiser aprender mais sobre **concorrência** e **paralelismo**, [assista (via go.dev)][talk-blog] ou [assista direto pelo vimeo][talk-video] e [leia os slides][talk-slides] da brilhante palestra "Concurrency is not parallelism".

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Ciclo de vida de uma promise

Uma `Promise` tem três estados:

1. pendente
2. resolvida
3. rejeitada

Quando é criada, uma promise fica pendente.
Em algum momento no futuro, ela pode ser _resolvida_ ou _rejeitada_.
Depois que uma promise é resolvida ou rejeitada uma vez, ela nunca mais pode ser resolvida ou rejeitada de novo, e o estado dela não pode mudar.

Em outras palavras:

1. Quando pendente, uma promise:
   - pode se tornar resolvida ou rejeitada.
2. Quando resolvida, uma promise:
   - não pode passar para nenhum outro estado.
   - precisa ter um valor, que não pode mudar.
3. Quando rejeitada, uma promise:
   - não pode passar para nenhum outro estado.
   - precisa ter um motivo, que não pode mudar.

## Como resolver uma promise

Uma promise pode ser resolvida de várias formas:

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

Nos exemplos acima, `value` pode ser _qualquer coisa_, incluindo um erro, `undefined`, `null` ou outra promise.
Normalmente, você quer resolver com um valor que não seja um erro.

## Como rejeitar uma promise

Uma promise pode ser rejeitada de várias formas:

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
Normalmente, você quer rejeitar com um erro.

## Como encadear uma promise

Uma promise pode ser _continuada_ com uma ação futura assim que for resolvida ou rejeitada.

- [`promise.then()`][promise-then] é chamado assim que `promise` for resolvida
- [`promise.catch()`][promise-catch] é chamado assim que `promise` for rejeitada
- [`promise.finally()`][promise-finally] é chamado assim que `promise` for resolvida ou rejeitada

### **then**

Toda promise é "thenable".
Isso significa que há uma função `then` disponível que será executada assim que a promise original for resolvida.
Dado `promise.then(onResolved)`, o callback `onResolved` recebe o valor com o qual a promise original foi resolvida.
Isso sempre retorna uma _nova_ promise "encadeada".

Retornar um `value` de `then` resolve a promise "encadeada".
Lançar um `reason` em `then` rejeita a promise "encadeada".

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

Isso vai imprimir `"Success!"` depois de aproximadamente 1000 ms.
O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
O estado e o valor de `promise2` serão `resolved` e `true`.

Há um segundo argumento disponível que roda quando a promise original é rejeitada.
Dado `promise.then(onResolved, onRejected)`, o callback `onResolved` recebe o valor com o qual a promise original foi resolvida, ou o callback `onRejected` recebe o motivo pelo qual a promise foi rejeitada.

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

- Em cerca de metade dos casos, isso vai imprimir `"Success!"` depois de aproximadamente 1000 ms.
  - O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
  - O estado e o valor de `promise2` serão `resolved` e `true`.
- Em cerca de metade dos casos, isso vai imprimir `"NOPE!"` imediatamente.
  - O estado e o valor de `promise1` serão `rejected` e `Nope!`.
  - O estado e o valor de `promise2` serão `resolved` e `false`.

É importante entender que, por causa das regras do ciclo de vida, quando ela chama `reject`, o `resolve` que chega cerca de 1000 ms depois é silenciosamente ignorado, já que o estado interno não pode mudar depois que ela foi rejeitada ou resolvida.
É importante entender que retornar um valor de uma promise a resolve, e lançar um valor a rejeita.
Quando `promise1` é resolvida e há um `onResolved` encadeado: `then(onResolved)`, essa continuação é uma nova promise que pode ser resolvida ou rejeitada.
Quando `promise1` é rejeitada mas há um `onRejected` encadeado: `then(, onRejected)`, essa continuação é uma nova promise que pode ser resolvida ou rejeitada.

### **catch**

Às vezes você quer capturar erros e só continuar quando a promise original chama `reject`.
Dado `promise.catch(onCatch)`, o callback `onCatch` recebe o motivo pelo qual a promise original foi rejeitada.
Isso sempre retorna uma _nova_ promise "encadeada".

Retornar um `value` de `catch` resolve a promise "encadeada".
Lançar um `reason` em `catch` rejeita a promise "encadeada".

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

Em cerca de metade dos casos, isso vai imprimir `"Success!"` depois de aproximadamente 1000 ms.
Na outra metade dos casos, isso vai imprimir `42` imediatamente.

- Se `promise1` for resolvida, `catch` é pulado e a execução chega a `then`, que imprime o valor.
  - O estado e o valor de `promise1` serão `resolved` e `"Success!"`.
  - O estado e o valor de `promise2` serão `resolved` e `"done"`;
- Se `promise1` for rejeitada, `catch` é executado, o que _retorna um valor_, e assim a cadeia agora fica `resolved`, e a execução chega a `then`, que imprime o valor.
  - O estado e o valor de `promise1` serão `rejected` e `"Nope!"`;
  - O estado e o valor de `promise2` serão `resolved` e `"done"`;

### **finally**

Às vezes você quer executar código depois que uma promise é finalizada, independentemente de ela ser resolvida ou rejeitada.
Dado `promise.finally(onSettled)`, o callback `onSettled` não recebe nada.
Isso sempre retorna uma _nova_ promise "encadeada".

Retornar um `value` de `finally` copia o estado e o valor da promise original, ignorando o `value`.
Lançar um `reason` em `finally` rejeita a promise "encadeada", sobrescrevendo qualquer estado e valor ou motivo da promise original.

## Exemplo

Vários dos métodos juntos:

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
  - Haverá dois logs:
    - `Sampled data: ...`
    - `Promise completed`
- Nos casos em que `randomNumber` é `4-5`:
  - `myPromise` será rejeitada com o motivo `'Sampling did not result in a sample'`
  - `finalPromise` será rejeitada com o motivo `Error('Sampling did not result in a sample')`
  - Haverá um log:
    - `Promise completed`
    - _em alguns ambientes_ isso vai gerar um log `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Como mostrado acima, `reject` funciona com uma string, e uma promise também pode rejeitar com um `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Se encadear promises ou o uso geral não estiver claro, o [tutorial no MDN][mdn-promises] é um bom recurso para consultar.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
