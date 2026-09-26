# 关于

[`Promise`][promise-docs]对象表示一个异步操作的最终完成（或失败）及其结果值。

<!-- prettier-ignore -->
~~~exercism/note
对很多人来说，这是一个很难的主题，尤其是当你熟悉的编程语言完全是_同步_的时候。
如果你觉得吃不消，或者想进一步了解**并发**和**并行**，可以看看这个精彩的演讲“Concurrency is not parallelism”：[在 go.dev 上观看][talk-blog]，或者[直接在 vimeo 上观看][talk-video]，并[阅读幻灯片][talk-slides]。

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Promise 的生命周期

一个`Promise`有三种状态：

1. 待定
2. 已兑现
3. 已拒绝

Promise 刚创建时处于待定状态。
在将来的某个时刻，它可能会_兑现_或_拒绝_。
一旦一个 Promise 兑现或拒绝过一次，它就再也不能兑现或拒绝，状态也不会再改变。

换句话说：

1. 处于待定状态时，Promise：
   - 可以转变为已兑现或已拒绝状态。
2. 处于已兑现状态时，Promise：
   - 不得转变为其他任何状态。
   - 必须有一个值，且该值不得改变。
3. 处于已拒绝状态时，Promise：
   - 不得转变为其他任何状态。
   - 必须有一个原因，且该原因不得改变。

## 兑现一个 Promise

Promise 可以通过多种方式兑现：

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

在上面的示例中，`value`可以是_任何东西_，包括错误、`undefined`、`null`或另一个 Promise。
通常你会希望用一个不是错误的值来兑现。

## 拒绝一个 Promise

Promise 可以通过多种方式拒绝：

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

在上面的示例中，`reason`可以是_任何东西_，包括错误、`undefined`或`null`。
通常你会希望用一个错误来拒绝。

## Promise 的链式调用

当 Promise 兑现或拒绝后，可以用后续操作让它_继续_下去。

- 当`promise`兑现后，会调用[`promise.then()`][promise-then]
- 当`promise`拒绝后，会调用[`promise.catch()`][promise-catch]
- 当`promise`兑现或拒绝后（无论哪种情况），会调用[`promise.finally()`][promise-finally]

### **then**

每个 Promise 都是“thenable”的。
也就是说，有一个名为`then`的函数，当原始 Promise 兑现后它就会执行。
对于`promise.then(onResolved)`，回调`onResolved`会收到原始 Promise 兑现时所用的值。
它总是会返回一个_新的_“链式”Promise。

从`then`返回一个`value`会让这个“链式”Promise 兑现。
在`then`中抛出`reason`会让这个“链式”Promise 拒绝。

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

这会在大约 1000 毫秒后输出`"Success!"`。
`promise1`的状态和值将是`resolved`和`"Success!"`。
`promise2`的状态和值将是`resolved`和`true`。

`then`还可以接收第二个参数，当原始 Promise 拒绝时执行。
对于`promise.then(onResolved, onRejected)`，回调`onResolved`会收到原始 Promise 兑现时所用的值，或者回调`onRejected`会收到 Promise 被拒绝的原因。

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

- 大约有一半的情况，这会在约 1000 毫秒后输出`"Success!"`。
  - `promise1`的状态和值将是`resolved`和`"Success!"`。
  - `promise2`的状态和值将是`resolved`和`true`。
- 大约有一半的情况，这会立即输出`"NOPE!"`。
  - `promise1`的状态和值将是`rejected`和`Nope!`。
  - `promise2`的状态和值将是`resolved`和`false`。

有一点很重要：根据生命周期的规则，当它`reject`之后，约 1000 毫秒后才到来的`resolve`会被静默忽略，因为内部状态一旦拒绝或兑现就无法再改变。
同样重要的是：从 Promise 中返回一个值会让它兑现，抛出一个值会让它拒绝。
当`promise1`兑现且存在链式的`onResolved`时，也就是`then(onResolved)`，那么后续得到的还是一个 Promise，它可以兑现，也可以拒绝。
当`promise1`拒绝但存在链式的`onRejected`时，也就是`then(, onRejected)`，那么后续得到的还是一个 Promise，它可以兑现，也可以拒绝。

### **catch**

有时你想捕获错误，并且只在原始 Promise `reject`时才继续。
对于`promise.catch(onCatch)`，回调`onCatch`会收到原始 Promise 被拒绝的原因。
它总是会返回一个_新的_“链式”Promise。

从`catch`返回一个`value`会让这个“链式”Promise 兑现。
在`catch`中抛出`reason`会让这个“链式”Promise 拒绝。

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

大约有一半的情况，这会在约 1000 毫秒后输出`"Success!"`。
另外一半的情况，这会立即输出`42`。

- 如果`promise1`兑现，`catch`会被跳过，流程到达`then`，并输出该值。
  - `promise1`的状态和值将是`resolved`和`"Success!"`。
  - `promise2`的状态和值将是`resolved`和`"done"`；
- 如果`promise1`拒绝，`catch`会执行，它_返回一个值_，于是这条链现在处于`resolved`状态，流程到达`then`，并输出该值。
  - `promise1`的状态和值将是`rejected`和`"Nope!"`。
  - `promise2`的状态和值将是`resolved`和`"done"`；

### **finally**

有时你想在 Promise 落定之后执行代码，无论它是兑现还是拒绝。
对于`promise.finally(onSettled)`，回调`onSettled`不会收到任何内容。
它总是会返回一个_新的_“链式”Promise。

从`finally`返回一个`value`会复制原始 Promise 的状态和值，并忽略这个`value`。
在`finally`中抛出`reason`会让这个“链式”Promise 拒绝，并覆盖原始 Promise 的状态和值或原因。

## 示例

把多个方法组合在一起：

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

- 当`randomNumber`为`0-3`时：
  - `myPromise`将以值`2, 4, 6, or 8`兑现
  - `finalPromise`将以值`'yay'`兑现
  - 会有两条日志：
    - `Sampled data: ...`
    - `Promise completed`
- 当`randomNumber`为`4-5`时：
  - `myPromise`将以原因`'Sampling did not result in a sample'`拒绝
  - `finalPromise`将以原因`Error('Sampling did not result in a sample')`拒绝
  - 会有一条日志：
    - `Promise completed`
    - _在某些环境中_，这会输出一条`"uncaught rejected promise: Error('Sampling did not result in a sample')"`日志

如上所示，`reject`可以接受字符串，Promise 也可以用`Error`来拒绝。

<!-- prettier-ignore -->
~~~exercism/note
如果对 Promise 的链式调用或一般用法还不太清楚，MDN 上的[教程][mdn-promises]是一个不错的参考资料。

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
