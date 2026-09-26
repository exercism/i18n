# 概要

[`Promise`][promise-docs]オブジェクトは、非同期処理が最終的に完了すること（または失敗すること）と、その結果の値を表します。

<!-- prettier-ignore -->
~~~exercism/note
これは多くの人にとって難しいトピックです。特に、完全に_同期_の言語でプログラミングをしてきた人にとってはそうでしょう。
もし圧倒されてしまったり、**並行性**と**並列性**についてもっと学びたいと思ったら、素晴らしいトーク「Concurrency is not parallelism」を[観る（go.dev経由）][talk-blog]か[Vimeoで直接観る][talk-video]、そして[スライドを読む][talk-slides]のがおすすめです。

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## プロミスのライフサイクル

`Promise`には3つの状態があります:

1. pending
2. fulfilled
3. rejected

プロミスは、作成された時点ではpendingです。
将来のある時点で、_resolve_または_reject_されることがあります。
一度resolveまたはrejectされると、そのプロミスが再びresolveやrejectされることはなく、状態が変わることもありません。

言い換えると、次のようになります:

1. pendingのとき、プロミスは:
   - fulfilledまたはrejectedの状態に遷移することがあります。
2. fulfilledのとき、プロミスは:
   - 他のどの状態にも遷移してはいけません。
   - 値を持たなければならず、その値は変わってはいけません。
3. rejectedのとき、プロミスは:
   - 他のどの状態にも遷移してはいけません。
   - 理由を持たなければならず、その理由は変わってはいけません。

## プロミスをresolveする

プロミスは、さまざまな方法でresolveできます:

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

上の例で、`value`にはエラー、`undefined`、`null`、あるいは別のプロミスなど、_どんなもの_でも指定できます。
通常は、エラーではない値でresolveするのが望ましいでしょう。

## プロミスをrejectする

プロミスは、さまざまな方法でrejectできます:

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

上の例で、`reason`にはエラー、`undefined`、`null`など、_どんなもの_でも指定できます。
通常は、エラーでrejectするのが望ましいでしょう。

## プロミスをチェーンする

プロミスは、resolveまたはrejectしたあとに、後続のアクションへと_つなげる_ことができます。

- `promise`がresolveすると、[`promise.then()`][promise-then]が呼び出されます
- `promise`がrejectすると、[`promise.catch()`][promise-catch]が呼び出されます
- `promise`がresolveまたはrejectすると、[`promise.finally()`][promise-finally]が呼び出されます

### **then**

すべてのプロミスは「thenable」です。
つまり、元のプロミスがresolveされると実行される`then`という関数が利用できます。
`promise.then(onResolved)`の場合、コールバック`onResolved`は、元のプロミスがresolveされたときの値を受け取ります。
`then`は常に_新しい_「チェーンされた」プロミスを返します。

`then`から`value`を返すと、「チェーンされた」プロミスはresolveします。
`then`で`reason`をthrowすると、「チェーンされた」プロミスはrejectします。

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

これは約1000ミリ秒後に`"Success!"`をログに出力します。
`promise1`の状態と値は`resolved`と`"Success!"`になります。
`promise2`の状態と値は`resolved`と`true`になります。

2つ目の引数を渡すこともでき、これは元のプロミスがrejectしたときに実行されます。
`promise.then(onResolved, onRejected)`の場合、コールバック`onResolved`は元のプロミスがresolveされたときの値を受け取るか、コールバック`onRejected`はプロミスがrejectされた理由を受け取ります。

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

- 約半数のケースでは、約1000ミリ秒後に`"Success!"`をログに出力します。
  - `promise1`の状態と値は`resolved`と`"Success!"`になります。
  - `promise2`の状態と値は`resolved`と`true`になります。
- 約半数のケースでは、すぐに`"NOPE!"`をログに出力します。
  - `promise1`の状態と値は`rejected`と`Nope!`になります。
  - `promise2`の状態と値は`resolved`と`false`になります。

ライフサイクルのルール上、プロミスが`reject`すると、約1000ミリ秒後にやってくる`resolve`は黙って無視されることを理解しておくことが大切です。一度rejectまたはresolveしたあとは、内部状態を変えられないからです。
プロミスから値を返すとそのプロミスはresolveし、値をthrowするとrejectすることも理解しておきましょう。
`promise1`がresolveし、チェーンされた`onResolved`がある場合（`then(onResolved)`）、その続きの処理は新しいプロミスで、resolveもrejectもできます。
`promise1`がrejectし、チェーンされた`onRejected`がある場合（`then(, onRejected)`）、その続きの処理は新しいプロミスで、resolveもrejectもできます。

### **catch**

元のプロミスが`reject`したときだけエラーを捕捉して処理を続けたい、ということもあるでしょう。
`promise.catch(onCatch)`の場合、コールバック`onCatch`は元のプロミスがrejectされた理由を受け取ります。
`catch`は常に_新しい_「チェーンされた」プロミスを返します。

`catch`から`value`を返すと、「チェーンされた」プロミスはresolveします。
`catch`で`reason`をthrowすると、「チェーンされた」プロミスはrejectします。

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

約半数のケースでは、約1000ミリ秒後に`"Success!"`をログに出力します。
残り半数のケースでは、すぐに`42`をログに出力します。

- `promise1`がresolveすると、`catch`はスキップされ、`then`に進んで値がログに出力されます。
  - `promise1`の状態と値は`resolved`と`"Success!"`になります。
  - `promise2`の状態と値は`resolved`と`"done"`になります。
- `promise1`がrejectすると、`catch`が実行され、ここで_値が返される_ためチェーンは`resolved`になり、`then`に進んで値がログに出力されます。
  - `promise1`の状態と値は`rejected`と`"Nope!"`になります。
  - `promise2`の状態と値は`resolved`と`"done"`になります。

### **finally**

プロミスがresolveするかrejectするかに関わらず、確定したあとにコードを実行したいこともあるでしょう。
`promise.finally(onSettled)`の場合、コールバック`onSettled`は何も受け取りません。
`finally`は常に_新しい_「チェーンされた」プロミスを返します。

`finally`から`value`を返すと、元のプロミスの状態と値がコピーされ、`value`は無視されます。
`finally`で`reason`をthrowすると、「チェーンされた」プロミスはrejectし、元のプロミスの状態と値や理由は上書きされます。

## 例

いくつかのメソッドを組み合わせた例です:

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

- `randomNumber`が`0-3`の場合:
  - `myPromise`は値`2, 4, 6, or 8`でresolveされます
  - `finalPromise`は値`'yay'`でresolveされます
  - 2つのログが出力されます:
    - `Sampled data: ...`
    - `Promise completed`
- `randomNumber`が`4-5`の場合:
  - `myPromise`は理由`'Sampling did not result in a sample'`でrejectされます
  - `finalPromise`は理由`Error('Sampling did not result in a sample')`でrejectされます
  - 1つのログが出力されます:
    - `Promise completed`
    - _環境によっては_、`"uncaught rejected promise: Error('Sampling did not result in a sample')"`というログが出力されます

上の例でわかるように、`reject`は文字列を渡しても動作し、プロミスは`Error`でrejectすることもできます。

<!-- prettier-ignore -->
~~~exercism/note
プロミスのチェーンや一般的な使い方がよくわからない場合は、[MDNのチュートリアル][mdn-promises]が良い参考資料になります。

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
