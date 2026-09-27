# 개요

[`Promise`][promise-docs] 객체는 비동기 작업의 최종적인 완료(또는 실패)와 그 결과 값을 나타내요.

<!-- prettier-ignore -->
~~~exercism/note
이 주제는 많은 사람에게 어려워요. 특히 완전히 _동기적_인 언어로 프로그래밍을 해 본 경험이 있다면 더 그렇죠.
부담스럽게 느껴지거나 **동시성**과 **병렬성**에 대해 더 배우고 싶다면, 훌륭한 강연 "Concurrency is not parallelism"을 [go.dev를 통해 보거나][talk-blog], [vimeo에서 직접 보고][talk-video], [슬라이드도 읽어 보세요][talk-slides].

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## 프로미스의 생명 주기

`Promise`에는 세 가지 상태가 있어요:

1. 대기
2. 이행
3. 거부

프로미스는 만들어질 때 대기 상태예요.
나중에 어느 시점에 _이행_되거나 _거부_될 수 있어요.
프로미스가 한 번 이행되거나 거부되면, 다시는 이행되거나 거부될 수 없고 상태도 바뀌지 않아요.

다시 말해:

1. 대기 상태일 때 프로미스는:
   - 이행 또는 거부 상태로 전이할 수 있어요.
2. 이행 상태일 때 프로미스는:
   - 다른 어떤 상태로도 전이해서는 안 돼요.
   - 값을 가져야 하고, 그 값은 바뀌면 안 돼요.
3. 거부 상태일 때 프로미스는:
   - 다른 어떤 상태로도 전이해서는 안 돼요.
   - 이유를 가져야 하고, 그 이유는 바뀌면 안 돼요.

## 프로미스 이행하기

프로미스는 여러 가지 방법으로 이행될 수 있어요:

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

위 예시에서 `value`는 _무엇이든_ 될 수 있어요. 오류, `undefined`, `null`, 또는 다른 프로미스도 포함해서요.
보통은 오류가 아닌 값으로 이행하고 싶을 거예요.

## 프로미스 거부하기

프로미스는 여러 가지 방법으로 거부될 수 있어요:

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

위 예시에서 `reason`은 _무엇이든_ 될 수 있어요. 오류, `undefined`, `null`도 포함해서요.
보통은 오류로 거부하고 싶을 거예요.

## 프로미스 연결하기

프로미스는 이행되거나 거부되면, 그 뒤에 할 동작으로 _이어갈_ 수 있어요.

- [`promise.then()`][promise-then]은 `promise`가 이행되면 호출돼요
- [`promise.catch()`][promise-catch]는 `promise`가 거부되면 호출돼요
- [`promise.finally()`][promise-finally]는 `promise`가 이행되든 거부되든 호출돼요

### **then**

모든 프로미스는 "thenable"이에요.
즉, 원래 프로미스가 이행되면 실행될 `then` 함수가 있다는 뜻이에요.
`promise.then(onResolved)`처럼 쓰면, 콜백 `onResolved`는 원래 프로미스가 이행된 값을 받아요.
이것은 항상 _새로운_ "연결된" 프로미스를 반환해요.

`then`에서 `value`를 반환하면 "연결된" 프로미스가 이행돼요.
`then`에서 `reason`을 던지면 "연결된" 프로미스가 거부돼요.

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

이것은 약 1000ms 후에 `"Success!"`를 로그에 출력해요.
`promise1`의 상태와 값은 `resolved`와 `"Success!"`가 돼요.
`promise2`의 상태와 값은 `resolved`와 `true`가 돼요.

원래 프로미스가 거부될 때 실행되는 두 번째 인자도 사용할 수 있어요.
`promise.then(onResolved, onRejected)`처럼 쓰면, 콜백 `onResolved`는 원래 프로미스가 이행된 값을 받고, 콜백 `onRejected`는 프로미스가 거부된 이유를 받아요.

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

- 약 1/2의 경우, 약 1000ms 후에 `"Success!"`를 로그에 출력해요.
  - `promise1`의 상태와 값은 `resolved`와 `"Success!"`가 돼요.
  - `promise2`의 상태와 값은 `resolved`와 `true`가 돼요.
- 약 1/2의 경우, 즉시 `"NOPE!"`를 로그에 출력해요.
  - `promise1`의 상태와 값은 `rejected`와 `Nope!`가 돼요.
  - `promise2`의 상태와 값은 `resolved`와 `false`가 돼요.

생명 주기 규칙 때문에, 한 번 거부되거나 이행되면 내부 상태는 바뀔 수 없어서, `reject`되면 약 1000ms 뒤에 들어오는 `resolve`는 조용히 무시돼요. 이 점을 이해하는 게 중요해요.
프로미스에서 값을 반환하면 프로미스가 이행되고, 값을 던지면 거부된다는 점도 이해하는 게 중요해요.
`promise1`이 이행되고 연결된 `onResolved`: `then(onResolved)`가 있으면, 그 후속은 이행되거나 거부될 수 있는 새로운 프로미스예요.
`promise1`이 거부되지만 연결된 `onRejected`: `then(, onRejected)`가 있으면, 그 후속은 이행되거나 거부될 수 있는 새로운 프로미스예요.

### **catch**

때로는 오류를 잡아 두고 원래 프로미스가 `reject`될 때만 계속하고 싶을 때가 있어요.
`promise.catch(onCatch)`처럼 쓰면, 콜백 `onCatch`는 원래 프로미스가 거부된 이유를 받아요.
이것은 항상 _새로운_ "연결된" 프로미스를 반환해요.

`catch`에서 `value`를 반환하면 "연결된" 프로미스가 이행돼요.
`catch`에서 `reason`을 던지면 "연결된" 프로미스가 거부돼요.

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

약 1/2의 경우, 약 1000ms 후에 `"Success!"`를 로그에 출력해요.
나머지 1/2의 경우, 즉시 `42`를 로그에 출력해요.

- `promise1`이 이행되면 `catch`는 건너뛰고 `then`에 도달해서 값을 로그에 출력해요.
  - `promise1`의 상태와 값은 `resolved`와 `"Success!"`가 돼요.
  - `promise2`의 상태와 값은 `resolved`와 `"done"`이 돼요;
- `promise1`이 거부되면 `catch`가 실행되는데, 여기서 _값을 반환_하므로 체인이 이제 `resolved`가 되고, `then`에 도달해서 값을 로그에 출력해요.
  - `promise1`의 상태와 값은 `rejected`와 `"Nope!"`가 돼요.
  - `promise2`의 상태와 값은 `resolved`와 `"done"`이 돼요;

### **finally**

때로는 프로미스가 이행되든 거부되든 상관없이, 프로미스가 확정된 뒤에 코드를 실행하고 싶을 때가 있어요.
`promise.finally(onSettled)`처럼 쓰면, 콜백 `onSettled`는 아무것도 받지 않아요.
이것은 항상 _새로운_ "연결된" 프로미스를 반환해요.

`finally`에서 `value`를 반환하면 원래 프로미스의 상태와 값을 그대로 복사하고, 반환한 `value`는 무시해요.
`finally`에서 `reason`을 던지면 "연결된" 프로미스가 거부되고, 원래 프로미스의 상태와 값 또는 이유를 덮어써요.

## 예시

여러 메서드를 함께 사용하면 이렇게 돼요:

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

- `randomNumber`가 `0-3`인 경우:
  - `myPromise`는 `2, 4, 6, or 8` 값으로 이행돼요
  - `finalPromise`는 `'yay'` 값으로 이행돼요
  - 로그가 두 개 출력돼요:
    - `Sampled data: ...`
    - `Promise completed`
- `randomNumber`가 `4-5`인 경우:
  - `myPromise`는 `'Sampling did not result in a sample'` 이유로 거부돼요
  - `finalPromise`는 `Error('Sampling did not result in a sample')` 이유로 거부돼요
  - 로그가 하나 출력돼요:
    - `Promise completed`
    - _일부 환경에서는_ `"uncaught rejected promise: Error('Sampling did not result in a sample')"` 로그가 나와요

위에서 보았듯이, `reject`는 문자열과도 동작하고, 프로미스는 `Error`로 거부할 수도 있어요.

<!-- prettier-ignore -->
~~~exercism/note
프로미스 연결이나 일반적인 사용법이 명확하지 않다면, [MDN의 튜토리얼][mdn-promises]이 좋은 자료예요.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
