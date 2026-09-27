# 關於

[`Promise`][promise-docs]物件代表一個非同步操作最終的完成（或失敗），以及它所產生的值。

<!-- prettier-ignore -->
~~~exercism/note
對很多人來說，這是個艱深的主題，尤其是當你熟悉的程式語言是完全_同步_的時候。
如果你覺得難以招架，或者想進一步了解**並行**與**平行**，可以[觀看（透過 go.dev）][talk-blog]或[直接透過 vimeo 觀看][talk-video]，也可以[閱讀投影片][talk-slides]，這是場精彩的演講「Concurrency is not parallelism」。

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Promise 的生命週期

`Promise`有三種狀態：

1. 待處理
2. 已實現
3. 已拒絕

當它被建立時，Promise 處於待處理狀態。
在未來的某個時間點，它可能會_解決_或_拒絕_。
一旦 Promise 被解決或拒絕過一次，它就永遠無法再次被解決或拒絕，其狀態也無法改變。

換句話說：

1. 處於待處理狀態時，Promise：
   - 可以轉換為已實現或已拒絕狀態。
2. 處於已實現狀態時，Promise：
   - 不得轉換為任何其他狀態。
   - 必須有一個值，且該值不得改變。
3. 處於已拒絕狀態時，Promise：
   - 不得轉換為任何其他狀態。
   - 必須有一個原因，且該原因不得改變。

## 解決 Promise

Promise 可以用多種方式解決：

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

在上面的範例中，`value`可以是_任何東西_，包括錯誤、`undefined`、`null`或另一個 Promise。
通常你會想用一個不是錯誤的值來解決它。

## 拒絕 Promise

Promise 可以用多種方式拒絕：

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

在上面的範例中，`reason`可以是_任何東西_，包括錯誤、`undefined`或`null`。
通常你會想用一個錯誤來拒絕它。

## 串接 Promise

Promise 一旦解決或拒絕，就可以用後續的動作_延續_下去。

- [`promise.then()`][promise-then]會在`promise`解決後被呼叫
- [`promise.catch()`][promise-catch]會在`promise`拒絕後被呼叫
- [`promise.finally()`][promise-finally]會在`promise`解決或拒絕後被呼叫

### **then**

每個 Promise 都是「thenable」。
這表示會有一個`then`函式可以使用，它會在原始的 Promise 解決後被執行。
給定`promise.then(onResolved)`，回呼`onResolved`會收到原始 Promise 被解決時的值。
這永遠會回傳一個_新的_「串接」Promise。

從`then`回傳一個`value`會解決「串接」的 Promise。
在`then`中拋出一個`reason`會拒絕「串接」的 Promise。

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

這會在大約 1000 毫秒後記錄`"Success!"`。
`promise1`的狀態與值會是`resolved`和`"Success!"`。
`promise2`的狀態與值會是`resolved`和`true`。

還有第二個引數可以使用，它會在原始 Promise 拒絕時執行。
給定`promise.then(onResolved, onRejected)`，回呼`onResolved`會收到原始 Promise 被解決時的值，或者回呼`onRejected`會收到 Promise 被拒絕的原因。

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

- 在大約 1/2 的情況下，這會在大約 1000 毫秒後記錄`"Success!"`。
  - `promise1`的狀態與值會是`resolved`和`"Success!"`。
  - `promise2`的狀態與值會是`resolved`和`true`。
- 在大約 1/2 的情況下，這會立即記錄`"NOPE!"`。
  - `promise1`的狀態與值會是`rejected`和`Nope!`。
  - `promise2`的狀態與值會是`resolved`和`false`。

重要的是要了解，由於生命週期的規則，當它`reject`時，約 1000 毫秒後才傳進來的`resolve`會被默默忽略，因為內部狀態一旦被拒絕或解決就無法再改變。
重要的是要了解，從 Promise 回傳一個值會解決它，而拋出一個值則會拒絕它。
當`promise1`解決且有一個串接的`onResolved`：`then(onResolved)`時，那個後續動作就是一個新的 Promise，可以解決或拒絕。
當`promise1`拒絕但有一個串接的`onRejected`：`then(, onRejected)`時，那個後續動作就是一個新的 Promise，可以解決或拒絕。

### **catch**

有時候你會想捕捉錯誤，並只在原始 Promise `reject`時繼續。
給定`promise.catch(onCatch)`，回呼`onCatch`會收到原始 Promise 被拒絕的原因。
這永遠會回傳一個_新的_「串接」Promise。

從`catch`回傳一個`value`會解決「串接」的 Promise。
在`catch`中拋出一個`reason`會拒絕「串接」的 Promise。

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

在大約 1/2 的情況下，這會在大約 1000 毫秒後記錄`"Success!"`。
在另外 1/2 的情況下，這會立即記錄`42`。

- 如果`promise1`解決，`catch`會被略過，接著會到達`then`，並記錄該值。
  - `promise1`的狀態與值會是`resolved`和`"Success!"`。
  - `promise2`的狀態與值會是`resolved`和`"done"`；
- 如果`promise1`拒絕，`catch`會被執行，它會_回傳一個值_，因此整個串接鏈現在變成`resolved`，接著會到達`then`，並記錄該值。
  - `promise1`的狀態與值會是`rejected`和`"Nope!"`。
  - `promise2`的狀態與值會是`resolved`和`"done"`；

### **finally**

有時候你會想在 Promise 有結果之後執行程式碼，無論該 Promise 是解決還是拒絕。
給定`promise.finally(onSettled)`，回呼`onSettled`不會收到任何東西。
這永遠會回傳一個_新的_「串接」Promise。

從`finally`回傳一個`value`會複製原始 Promise 的狀態與值，並忽略該`value`。
在`finally`中拋出一個`reason`會拒絕「串接」的 Promise，並覆寫原始 Promise 的任何狀態與值或原因。

## 範例

把各種方法組合在一起：

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

- 在`randomNumber`為`0-3`的情況：
  - `myPromise`會以值`2, 4, 6, or 8`被解決
  - `finalPromise`會以值`'yay'`被解決
  - 會有兩筆記錄：
    - `Sampled data: ...`
    - `Promise completed`
- 在`randomNumber`為`4-5`的情況：
  - `myPromise`會以原因`'Sampling did not result in a sample'`被拒絕
  - `finalPromise`會以原因`Error('Sampling did not result in a sample')`被拒絕
  - 會有一筆記錄：
    - `Promise completed`
    - _在某些環境中_，這會產生一筆`"uncaught rejected promise: Error('Sampling did not result in a sample')"`記錄

如上所示，`reject`可以搭配字串運作，而 Promise 也可以用`Error`來拒絕。

<!-- prettier-ignore -->
~~~exercism/note
如果串接 Promise 或一般用法還不清楚，[MDN 上的教學][mdn-promises]是很好的參考資源。

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
