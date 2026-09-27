# সম্পর্কে

[`Promise`][promise-docs] অবজেক্ট একটি অ্যাসিঙ্ক্রোনাস অপারেশনের চূড়ান্ত সমাপ্তি (বা ব্যর্থতা) এবং তার ফলে পাওয়া মানকে বোঝায়।

<!-- prettier-ignore -->
~~~exercism/note
এই বিষয়টি অনেকের কাছে কঠিন, বিশেষ করে যদি আপনি এমন একটি ভাষায় প্রোগ্রামিং জানেন যা পুরোপুরি _সিঙ্ক্রোনাস_।
যদি আপনি অভিভূত বোধ করেন, অথবা **কনকারেন্সি** ও **প্যারালেলিজম** সম্পর্কে আরও জানতে চান, তাহলে "Concurrency is not parallelism" নামের দুর্দান্ত টকটি [দেখুন (go.dev-এর মাধ্যমে)][talk-blog] বা [সরাসরি vimeo-তে দেখুন][talk-video] এবং এর [স্লাইডগুলো পড়ুন][talk-slides]।

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## একটি প্রমিসের জীবনচক্র

একটি `Promise`-এর তিনটি স্টেট থাকে:

1. পেন্ডিং
2. ফুলফিলড
3. রিজেক্টেড

তৈরি হওয়ার সময় একটি প্রমিস পেন্ডিং অবস্থায় থাকে।
ভবিষ্যতে কোনো এক সময়ে এটি _রিজলভ_ বা _রিজেক্ট_ হতে পারে।
একটি প্রমিস একবার রিজলভ বা রিজেক্ট হয়ে গেলে তা আর কখনোই রিজলভ বা রিজেক্ট হতে পারে না, আর তার স্টেটও বদলাতে পারে না।

অন্য কথায়:

1. প্রমিস পেন্ডিং থাকলে:
   - এটি ফুলফিলড বা রিজেক্টেড, যেকোনো একটি স্টেটে যেতে পারে।
2. প্রমিস ফুলফিলড থাকলে:
   - এটি আর কোনো স্টেটে যেতে পারবে না।
   - এর একটি মান থাকতে হবে, যা বদলাবে না।
3. প্রমিস রিজেক্টেড থাকলে:
   - এটি আর কোনো স্টেটে যেতে পারবে না।
   - এর একটি কারণ থাকতে হবে, যা বদলাবে না।

## একটি প্রমিস রিজলভ করা

একটি প্রমিস বিভিন্নভাবে রিজলভ করা যায়:

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

উপরের উদাহরণগুলোতে `value` _যেকোনো কিছু_ হতে পারে, এমনকি একটি এরর, `undefined`, `null` বা আরেকটি প্রমিসও।
সাধারণত আপনি এমন একটি মান দিয়ে রিজলভ করতে চান যা কোনো এরর নয়।

## একটি প্রমিস রিজেক্ট করা

একটি প্রমিস বিভিন্নভাবে রিজেক্ট করা যায়:

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

উপরের উদাহরণগুলোতে `reason` _যেকোনো কিছু_ হতে পারে, এমনকি একটি এরর, `undefined` বা `null`ও।
সাধারণত আপনি একটি এরর দিয়ে রিজেক্ট করতে চান।

## একটি প্রমিস চেইন করা

একটি প্রমিস রিজলভ বা রিজেক্ট হওয়ার পর ভবিষ্যতের কোনো কাজ দিয়ে এটিকে _চালিয়ে যাওয়া_ যায়।

- `promise` রিজলভ হলে [`promise.then()`][promise-then] কল করা হয়
- `promise` রিজেক্ট হলে [`promise.catch()`][promise-catch] কল করা হয়
- `promise` রিজলভ বা রিজেক্ট হলেই [`promise.finally()`][promise-finally] কল করা হয়

### **then**

প্রতিটি প্রমিসই "থেনেবল"।
এর মানে হলো, একটি ফাংশন `then` আছে যা মূল প্রমিসটি রিজলভ হওয়ার পর চালানো হবে।
`promise.then(onResolved)` দেওয়া হলে, `onResolved` কলব্যাকটি সেই মানটি পায় যা দিয়ে মূল প্রমিসটি রিজলভ হয়েছিল।
এটি সর্বদা একটি _নতুন_ "চেইনড" প্রমিস রিটার্ন করে।

`then` থেকে একটি `value` রিটার্ন করলে "চেইনড" প্রমিসটি রিজলভ হয়।
`then`-এ একটি `reason` থ্রো করলে "চেইনড" প্রমিসটি রিজেক্ট হয়।

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

এটি প্রায় ১০০০ ms পরে `"Success!"` লগ করবে।
`promise1`-এর স্টেট ও মান হবে `resolved` এবং `"Success!"`।
`promise2`-এর স্টেট ও মান হবে `resolved` এবং `true`।

এখানে একটি দ্বিতীয় আর্গুমেন্টও আছে, যা মূল প্রমিসটি রিজেক্ট হলে চলে।
`promise.then(onResolved, onRejected)` দেওয়া হলে, `onResolved` কলব্যাকটি সেই মানটি পায় যা দিয়ে মূল প্রমিসটি রিজলভ হয়েছিল, অথবা `onRejected` কলব্যাকটি সেই কারণটি পায় যা দিয়ে প্রমিসটি রিজেক্ট হয়েছিল।

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

- প্রায় অর্ধেক ক্ষেত্রে এটি প্রায় ১০০০ ms পরে `"Success!"` লগ করবে।
  - `promise1`-এর স্টেট ও মান হবে `resolved` এবং `"Success!"`।
  - `promise2`-এর স্টেট ও মান হবে `resolved` এবং `true`।
- প্রায় অর্ধেক ক্ষেত্রে এটি সঙ্গে সঙ্গে `"NOPE!"` লগ করবে।
  - `promise1`-এর স্টেট ও মান হবে `rejected` এবং `Nope!`।
  - `promise2`-এর স্টেট ও মান হবে `resolved` এবং `false`।

জীবনচক্রের নিয়ম অনুযায়ী এটা বোঝা জরুরি যে এটি `reject` করলে ~১০০০ ms পরে আসা `resolve` চুপচাপ উপেক্ষা করা হয়, কারণ একবার রিজেক্ট বা রিজলভ হয়ে গেলে ভেতরের স্টেট আর বদলাতে পারে না।
এটাও বোঝা জরুরি যে একটি প্রমিস থেকে মান রিটার্ন করলে সেটি রিজলভ হয়, আর মান থ্রো করলে সেটি রিজেক্ট হয়।
`promise1` রিজলভ হলে এবং একটি চেইনড `onResolved` থাকলে: `then(onResolved)`, তখন সেই পরবর্তী ধাপটি একটি নতুন প্রমিস, যা রিজলভ বা রিজেক্ট হতে পারে।
`promise1` রিজেক্ট হলে কিন্তু একটি চেইনড `onRejected` থাকলে: `then(, onRejected)`, তখন সেই পরবর্তী ধাপটিও একটি নতুন প্রমিস, যা রিজলভ বা রিজেক্ট হতে পারে।

### **catch**

কখনো কখনো আপনি এরর ধরে রাখতে চান এবং শুধু মূল প্রমিসটি `reject` করলেই এগিয়ে যেতে চান।
`promise.catch(onCatch)` দেওয়া হলে, `onCatch` কলব্যাকটি সেই কারণটি পায় যা দিয়ে মূল প্রমিসটি রিজেক্ট হয়েছিল।
এটি সর্বদা একটি _নতুন_ "চেইনড" প্রমিস রিটার্ন করে।

`catch` থেকে একটি `value` রিটার্ন করলে "চেইনড" প্রমিসটি রিজলভ হয়।
`catch`-এ একটি `reason` থ্রো করলে "চেইনড" প্রমিসটি রিজেক্ট হয়।

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

প্রায় অর্ধেক ক্ষেত্রে এটি প্রায় ১০০০ ms পরে `"Success!"` লগ করবে।
বাকি অর্ধেক ক্ষেত্রে এটি সঙ্গে সঙ্গে `42` লগ করবে।

- `promise1` রিজলভ হলে `catch` বাদ পড়ে যায় এবং এটি `then`-এ পৌঁছে মানটি লগ করে।
  - `promise1`-এর স্টেট ও মান হবে `resolved` এবং `"Success!"`।
  - `promise2`-এর স্টেট ও মান হবে `resolved` এবং `"done"`।
- `promise1` রিজেক্ট হলে `catch` চলে, যা _একটি মান রিটার্ন করে_, ফলে চেইনটি তখন `resolved` হয়ে যায় এবং এটি `then`-এ পৌঁছে মানটি লগ করে।
  - `promise1`-এর স্টেট ও মান হবে `rejected` এবং `"Nope!"`।
  - `promise2`-এর স্টেট ও মান হবে `resolved` এবং `"done"`।

### **finally**

কখনো কখনো আপনি প্রমিসটি সেটল হওয়ার পর কোড চালাতে চান, প্রমিসটি রিজলভ করুক বা রিজেক্ট করুক।
`promise.finally(onSettled)` দেওয়া হলে, `onSettled` কলব্যাকটি কিছুই পায় না।
এটি সর্বদা একটি _নতুন_ "চেইনড" প্রমিস রিটার্ন করে।

`finally` থেকে একটি `value` রিটার্ন করলে মূল প্রমিসের স্টেটাস ও মান কপি হয়, আর `value`-টি উপেক্ষিত থাকে।
`finally`-এ একটি `reason` থ্রো করলে "চেইনড" প্রমিসটি রিজেক্ট হয়, আর এতে মূল প্রমিসের যেকোনো স্টেটাস, মান বা কারণ ওভাররাইট হয়ে যায়।

## উদাহরণ

বিভিন্ন মেথড একসাথে:

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

- যেসব ক্ষেত্রে `randomNumber`-এর মান `0-3`:
  - `myPromise` মান `2, 4, 6, or 8` দিয়ে রিজলভ হবে
  - `finalPromise` মান `'yay'` দিয়ে রিজলভ হবে
  - দুটি লগ হবে:
    - `Sampled data: ...`
    - `Promise completed`
- যেসব ক্ষেত্রে `randomNumber`-এর মান `4-5`:
  - `myPromise` কারণ `'Sampling did not result in a sample'` দিয়ে রিজেক্ট হবে
  - `finalPromise` কারণ `Error('Sampling did not result in a sample')` দিয়ে রিজেক্ট হবে
  - একটি লগ হবে:
    - `Promise completed`
    - _কিছু পরিবেশে_ এটি একটি `"uncaught rejected promise: Error('Sampling did not result in a sample')"` লগ তৈরি করবে

উপরের উদাহরণে দেখা যাচ্ছে, `reject` একটি স্ট্রিং নিয়েও কাজ করে, আর একটি প্রমিস `Error` দিয়েও রিজেক্ট করতে পারে।

<!-- prettier-ignore -->
~~~exercism/note
প্রমিস চেইন করা বা সাধারণভাবে এর ব্যবহার স্পষ্ট না হলে, [MDN-এর টিউটোরিয়ালটি][mdn-promises] পড়ে দেখতে পারেন।

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
