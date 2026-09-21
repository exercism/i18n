# Részletesen

A [`Promise`][promise-docs] objektum egy aszinkron művelet későbbi befejeződését (vagy sikertelenségét) és annak eredményértékét reprezentálja.

<!-- prettier-ignore -->
~~~exercism/note
Ez sokaknak nehéz téma, különösen, ha olyan nyelven programozol, amely teljesen _szinkron_.
Ha úgy érzed, hogy ez túl sok, vagy többet szeretnél megtudni a **konkurenciáról** és a **párhuzamosságról**, [nézd meg (a go.dev-en)][talk-blog] vagy [nézd meg közvetlenül a Vimeón][talk-video], és [olvasd el a diákat][talk-slides] a zseniális „Concurrency is not parallelism” előadáshoz.

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## A Promise életciklusa

A `Promise`-nak három állapota van:

1. függőben lévő
2. teljesült
3. elutasított

Amikor létrejön, a Promise függőben van.
Valamikor a jövőben _teljesülhet_ vagy _elutasításra kerülhet_.
Ha egy Promise egyszer már teljesült vagy elutasításra került, soha többé nem teljesülhet és nem utasítható el újra, és az állapota sem változhat meg.

Más szóval:

1. Amikor függőben van, egy Promise:
   - átkerülhet a teljesült vagy az elutasított állapotba.
2. Amikor teljesült, egy Promise:
   - nem kerülhet át más állapotba.
   - rendelkeznie kell egy értékkel, amely nem változhat.
3. Amikor elutasított, egy Promise:
   - nem kerülhet át más állapotba.
   - rendelkeznie kell egy indokkal, amely nem változhat.

## A Promise teljesítése

Egy Promise többféleképpen teljesíthető:

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

A fenti példákban a `value` _bármi_ lehet, például egy hiba, `undefined`, `null` vagy egy másik Promise.
Általában olyan értékkel érdemes teljesíteni, amely nem hiba.

## A Promise elutasítása

Egy Promise többféleképpen utasítható el:

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

A fenti példákban a `reason` _bármi_ lehet, például egy hiba, `undefined` vagy `null`.
Általában hibával érdemes elutasítani.

## A Promise láncolása

Egy Promise _folytatható_ egy további művelettel, amint teljesül vagy elutasításra kerül.

- a [`promise.then()`][promise-then] akkor hívódik meg, amikor a `promise` teljesül
- a [`promise.catch()`][promise-catch] akkor hívódik meg, amikor a `promise` elutasításra kerül
- a [`promise.finally()`][promise-finally] akkor hívódik meg, amikor a `promise` vagy teljesül, vagy elutasításra kerül

### **then**

Minden Promise „thenable”.
Ez azt jelenti, hogy van egy `then` függvény, amely akkor fut le, amikor az eredeti Promise teljesül.
A `promise.then(onResolved)` hívásnál az `onResolved` callback megkapja azt az értéket, amellyel az eredeti Promise teljesült.
Ez mindig egy _új_, „láncolt” Promise-t ad vissza.

Ha egy `value`-t adsz vissza a `then`-ből, az teljesíti a „láncolt” Promise-t.
Ha egy `reason`-t dob a `then`, az elutasítja a „láncolt” Promise-t.

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

Ez körülbelül 1000 ms után kiírja a `"Success!"` értéket.
A `promise1` állapota és értéke `resolved` és `"Success!"` lesz.
A `promise2` állapota és értéke `resolved` és `true` lesz.

Van egy második argumentum is, amely akkor fut le, amikor az eredeti Promise elutasításra kerül.
A `promise.then(onResolved, onRejected)` hívásnál az `onResolved` callback megkapja azt az értéket, amellyel az eredeti Promise teljesült, vagy az `onRejected` callback megkapja azt az indokot, amellyel a Promise elutasításra került.

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

- Az esetek körülbelül felében ez körülbelül 1000 ms után kiírja a `"Success!"` értéket.
  - A `promise1` állapota és értéke `resolved` és `"Success!"` lesz.
  - A `promise2` állapota és értéke `resolved` és `true` lesz.
- Az esetek körülbelül felében ez azonnal kiírja a `"NOPE!"` értéket.
  - A `promise1` állapota és értéke `rejected` és `Nope!` lesz.
  - A `promise2` állapota és értéke `resolved` és `false` lesz.

Fontos megérteni, hogy az életciklus szabályai miatt, amikor egy Promise `reject`s, a nagyjából 1000 ms-mal később érkező `resolve` csendben figyelmen kívül marad, mivel a belső állapot az elutasítás vagy a teljesülés után nem változhat meg.
Fontos megérteni azt is, hogy ha egy Promise-ből visszaadunk egy értéket, az teljesíti azt, ha pedig dobunk egy értéket, az elutasítja azt.
Amikor a `promise1` teljesül, és van egy láncolt `onResolved`: `then(onResolved)`, akkor az a folytatás egy új Promise, amely teljesülhet vagy elutasításra kerülhet.
Amikor a `promise1` elutasításra kerül, de van egy láncolt `onRejected`: `then(, onRejected)`, akkor az a folytatás egy új Promise, amely teljesülhet vagy elutasításra kerülhet.

### **catch**

Néha szeretnéd elkapni a hibákat, és csak akkor folytatni, amikor az eredeti Promise `reject`s.
A `promise.catch(onCatch)` hívásnál az `onCatch` callback megkapja azt az indokot, amellyel az eredeti Promise elutasításra került.
Ez mindig egy _új_, „láncolt” Promise-t ad vissza.

Ha egy `value`-t adsz vissza a `catch`-ből, az teljesíti a „láncolt” Promise-t.
Ha egy `reason`-t dob a `catch`, az elutasítja a „láncolt” Promise-t.

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

Az esetek körülbelül felében ez körülbelül 1000 ms után kiírja a `"Success!"` értéket.
Az esetek másik felében ez azonnal kiírja a `42` értéket.

- Ha a `promise1` teljesül, a `catch` kimarad, eljut a `then`-ig, és kiírja az értéket.
  - A `promise1` állapota és értéke `resolved` és `"Success!"` lesz.
  - A `promise2` állapota és értéke `resolved` és `"done"` lesz;

- Ha a `promise1` elutasításra kerül, a `catch` lefut, amely _visszaad egy értéket_, így a lánc most már `resolved`, eljut a `then`-ig, és kiírja az értéket.
  - A `promise1` állapota és értéke `rejected` és `"Nope!"` lesz.
  - A `promise2` állapota és értéke `resolved` és `"done"` lesz;

### **finally**

Néha szeretnél kódot futtatni, miután egy Promise lezárult, függetlenül attól, hogy a Promise teljesül vagy elutasításra kerül.
A `promise.finally(onSettled)` hívásnál az `onSettled` callback semmit sem kap.
Ez mindig egy _új_, „láncolt” Promise-t ad vissza.

Ha egy `value`-t adsz vissza a `finally`-ből, az átmásolja az eredeti Promise állapotát és értékét, figyelmen kívül hagyva a `value`-t.
Ha egy `reason`-t dob a `finally`, az elutasítja a „láncolt” Promise-t, felülírva az eredeti Promise bármely állapotát és értékét vagy indokát.

## Példa

Néhány metódus együtt:

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

- Ha a `randomNumber` értéke `0-3`:
  - a `myPromise` a `2, 4, 6, or 8` értékkel teljesül
  - a `finalPromise` a `'yay'` értékkel teljesül
  - Két naplóbejegyzés lesz:
    - `Sampled data: ...`
    - `Promise completed`
- Ha a `randomNumber` értéke `4-5`:
  - a `myPromise` a `'Sampling did not result in a sample'` indokkal kerül elutasításra
  - a `finalPromise` az `Error('Sampling did not result in a sample')` indokkal kerül elutasításra
  - Egy naplóbejegyzés lesz:
    - `Promise completed`
    - _néhány környezetben_ ez egy `"uncaught rejected promise: Error('Sampling did not result in a sample')"` naplóbejegyzést eredményez

Ahogy fentebb látható, a `reject` stringgel is működik, és egy Promise `Error`-ral is elutasítható.

<!-- prettier-ignore -->
~~~exercism/note
Ha a Promise-ok láncolása vagy az általános használat nem világos, érdemes elolvasni az [MDN oktatóanyagát][mdn-promises].

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
