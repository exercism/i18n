# Докладніше

Обʼєкт [`Promise`][promise-docs] представляє майбутнє завершення (або провал) асинхронної операції та значення, яке вона в результаті дає.

<!-- prettier-ignore -->
~~~exercism/note
Це складна тема для багатьох, особливо якщо ми знайомі з програмуванням мовою, яка є цілком _синхронною_.
Якщо ми відчуваємо, що це занадто, або хочемо дізнатися більше про **конкурентність** і **паралелізм**, [подивімося (через go.dev)][talk-blog] або [подивімося напряму у vimeo][talk-video] і [почитаймо слайди][talk-slides] блискучої доповіді «Concurrency is not parallelism».

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Життєвий цикл проміса

`Promise` має три стани:

1. очікування
2. виконано
3. відхилено

Коли проміс створюється, він перебуває в стані очікування.
У якийсь момент у майбутньому він може _виконатися_ або _відхилитися_.
Щойно проміс виконано або відхилено, його вже ніколи не можна виконати чи відхилити знову, і його стан не може змінитися.

Іншими словами:

1. У стані очікування проміс:
   - може перейти або до стану «виконано», або до стану «відхилено».
2. У стані «виконано» проміс:
   - не повинен переходити в жодний інший стан.
   - повинен мати значення, яке не повинно змінюватися.
3. У стані «відхилено» проміс:
   - не повинен переходити в жодний інший стан.
   - повинен мати причину, яка не повинна змінюватися.

## Виконання проміса

Проміс можна виконати різними способами:

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

У наведених прикладах `value` може бути _чим завгодно_, зокрема помилкою, `undefined`, `null` або іншим промісом.
Зазвичай ми хочемо виконати проміс зі значенням, яке не є помилкою.

## Відхилення проміса

Проміс можна відхилити різними способами:

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

У наведених прикладах `reason` може бути _чим завгодно_, зокрема помилкою, `undefined` або `null`.
Зазвичай ми хочемо відхилити проміс з помилкою.

## Ланцюгування промісів

Проміс можна _продовжити_ майбутньою дією, коли він виконається або відхилиться.

- [`promise.then()`][promise-then] викликається, коли `promise` виконується
- [`promise.catch()`][promise-catch] викликається, коли `promise` відхиляється
- [`promise.finally()`][promise-finally] викликається, коли `promise` або виконується, або відхиляється

### **then**

Кожен проміс є «thenable».
Це означає, що в нього є доступна функція `then`, яка виконається, коли початковий проміс виконається.
Для `promise.then(onResolved)` колбек `onResolved` отримує значення, з яким було виконано початковий проміс.
Це завжди повертає _новий_ «ланцюговий» проміс.

Повернення `value` з `then` виконує «ланцюговий» проміс.
Кидання `reason` у `then` відхиляє «ланцюговий» проміс.

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

Це виведе `"Success!"` приблизно через 1000 мс.
Стан і значення `promise1` будуть `resolved` і `"Success!"`.
Стан і значення `promise2` будуть `resolved` і `true`.

Є другий аргумент, який виконується, коли початковий проміс відхиляється.
Для `promise.then(onResolved, onRejected)` колбек `onResolved` отримує значення, з яким було виконано початковий проміс, або колбек `onRejected` отримує причину, з якої проміс було відхилено.

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

- Приблизно у половині випадків це виведе `"Success!"` приблизно через 1000 мс.
  - Стан і значення `promise1` будуть `resolved` і `"Success!"`.
  - Стан і значення `promise2` будуть `resolved` і `true`.
- Приблизно у половині випадків це одразу виведе `"NOPE!"`.
  - Стан і значення `promise1` будуть `rejected` і `Nope!`.
  - Стан і значення `promise2` будуть `resolved` і `false`.

Важливо розуміти, що через правила життєвого циклу, коли проміс робить `reject`, той `resolve`, який надходить приблизно через 1000 мс, мовчки ігнорується, бо внутрішній стан не може змінитися після того, як проміс уже відхилено або виконано.
Важливо розуміти, що повернення значення з проміса виконує його, а кидання значення відхиляє його.
Коли `promise1` виконується і в ланцюжку є `onResolved`: `then(onResolved)`, то цей наступний крок - новий проміс, який може виконатися або відхилитися.
Коли `promise1` відхиляється, але в ланцюжку є `onRejected`: `then(, onRejected)`, то цей наступний крок - новий проміс, який може виконатися або відхилитися.

### **catch**

Іноді ми хочемо перехопити помилки й продовжити лише тоді, коли початковий проміс робить `reject`.
Для `promise.catch(onCatch)` колбек `onCatch` отримує причину, з якої початковий проміс було відхилено.
Це завжди повертає _новий_ «ланцюговий» проміс.

Повернення `value` з `catch` виконує «ланцюговий» проміс.
Кидання `reason` у `catch` відхиляє «ланцюговий» проміс.

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

Приблизно у половині випадків це виведе `"Success!"` приблизно через 1000 мс.
В іншій половині випадків це одразу виведе `42`.

- Якщо `promise1` виконується, `catch` пропускається, керування доходить до `then`, і значення виводиться.
  - Стан і значення `promise1` будуть `resolved` і `"Success!"`.
  - Стан і значення `promise2` будуть `resolved` і `"done"`;
- Якщо `promise1` відхиляється, `catch` виконується, він _повертає значення_, і тому ланцюжок тепер `resolved`, керування доходить до `then`, і значення виводиться.
  - Стан і значення `promise1` будуть `rejected` і `"Nope!"`.
  - Стан і значення `promise2` будуть `resolved` і `"done"`;

### **finally**

Іноді ми хочемо виконати код після того, як проміс завершиться, незалежно від того, виконався він чи відхилився.
Для `promise.finally(onSettled)` колбек `onSettled` не отримує нічого.
Це завжди повертає _новий_ «ланцюговий» проміс.

Повернення `value` з `finally` копіює статус і значення з початкового проміса, ігноруючи `value`.
Кидання `reason` у `finally` відхиляє «ланцюговий» проміс, перезаписуючи будь-який статус і значення чи причину з початкового проміса.

## Приклад

Кілька методів разом:

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

- У випадках, коли `randomNumber` дорівнює `0-3`:
  - `myPromise` буде виконано зі значенням `2, 4, 6, or 8`
  - `finalPromise` буде виконано зі значенням `'yay'`
  - Буде два записи в лог:
    - `Sampled data: ...`
    - `Promise completed`
- У випадках, коли `randomNumber` дорівнює `4-5`:
  - `myPromise` буде відхилено з причиною `'Sampling did not result in a sample'`
  - `finalPromise` буде відхилено з причиною `Error('Sampling did not result in a sample')`
  - Буде один запис у лог:
    - `Promise completed`
    - _у деяких середовищах_ це дасть у лог запис `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Як показано вище, `reject` працює з рядком тексту (англ. string), і проміс також може відхилятися з `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Якщо ланцюгування промісів або загальне використання залишається незрозумілим, варто опрацювати [туторіал на MDN][mdn-promises].

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
