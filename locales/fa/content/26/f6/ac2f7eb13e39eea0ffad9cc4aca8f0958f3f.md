# درباره

شیء [`Promise`][promise-docs] نشان‌دهنده‌ی تکمیل نهایی (یا شکست) یک عملیات ناهمگام و مقدار حاصل از آن است.

<!-- prettier-ignore -->
~~~exercism/note
این موضوع برای بسیاری از افراد دشوار است، به‌ویژه اگر برنامه‌نویسی را با زبانی بدانید که کاملاً _همگام_ است.
اگر احساس می‌کنید غرق شده‌اید، یا می‌خواهید درباره‌ی **هم‌روندی** و **موازی‌سازی** بیشتر یاد بگیرید، [تماشا کنید (از طریق go.dev)][talk-blog] یا [مستقیماً از طریق vimeo تماشا کنید][talk-video] و [اسلایدهای][talk-slides] سخنرانی درخشان «Concurrency is not parallelism» را بخوانید.

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## چرخه‌ی عمر یک Promise

یک `Promise` سه حالت دارد:

1. در انتظار
2. تحقق یافته
3. رد شده

وقتی ایجاد می‌شود، یک Promise در انتظار است.
در نقطه‌ای در آینده ممکن است _حل شود_ یا _رد شود_.
وقتی یک Promise یک بار حل یا رد شد، دیگر هرگز نمی‌تواند حل یا رد شود و حالتش هم نمی‌تواند تغییر کند.

به بیان دیگر:

1. وقتی در انتظار است، یک Promise:
   - ممکن است به حالت تحقق یافته یا رد شده منتقل شود.
2. وقتی تحقق یافته است، یک Promise:
   - نباید به هیچ حالت دیگری منتقل شود.
   - باید مقداری داشته باشد که نباید تغییر کند.
3. وقتی رد شده است، یک Promise:
   - نباید به هیچ حالت دیگری منتقل شود.
   - باید دلیلی داشته باشد که نباید تغییر کند.

## حل کردن یک Promise

یک Promise ممکن است به روش‌های گوناگونی حل شود:

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

در مثال‌های بالا، `value` می‌تواند _هرچه_ باشد، از جمله یک خطا، `undefined`، `null` یا یک Promise دیگر.
معمولاً می‌خواهید با مقداری حلش کنید که خطا نباشد.

## رد کردن یک Promise

یک Promise ممکن است به روش‌های گوناگونی رد شود:

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

در مثال‌های بالا، `reason` می‌تواند _هرچه_ باشد، از جمله یک خطا، `undefined` یا `null`.
معمولاً می‌خواهید با یک خطا ردش کنید.

## زنجیره کردن یک Promise

یک Promise ممکن است پس از حل یا رد شدن، با یک اقدام آینده _ادامه_ یابد.

- [`promise.then()`][promise-then] زمانی فراخوانی می‌شود که `promise` حل شود
- [`promise.catch()`][promise-catch] زمانی فراخوانی می‌شود که `promise` رد شود
- [`promise.finally()`][promise-finally] زمانی فراخوانی می‌شود که `promise` یا حل شود یا رد شود

### **then**

هر Promise «thenable» است.
یعنی یک تابع `then` در دسترس است که پس از حل شدن Promise اصلی اجرا می‌شود.
با `promise.then(onResolved)`، تابع بازگشتی `onResolved` مقداری را دریافت می‌کند که Promise اصلی با آن حل شده است.
این همیشه یک Promise «زنجیره‌ای» _جدید_ برمی‌گرداند.

برگرداندن یک `value` از `then`، Promise «زنجیره‌ای» را حل می‌کند.
پرتاب یک `reason` در `then`، Promise «زنجیره‌ای» را رد می‌کند.

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

این پس از حدود ۱۰۰۰ میلی‌ثانیه `"Success!"` را لاگ می‌کند.
حالت و مقدار `promise1` برابر `resolved` و `"Success!"` خواهد بود.
حالت و مقدار `promise2` برابر `resolved` و `true` خواهد بود.

آرگومان دومی هم در دسترس است که زمانی اجرا می‌شود که Promise اصلی رد شود.
با `promise.then(onResolved, onRejected)`، تابع بازگشتی `onResolved` مقداری را دریافت می‌کند که Promise اصلی با آن حل شده است، یا تابع بازگشتی `onRejected` دلیلی را دریافت می‌کند که Promise با آن رد شده است.

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

- در حدود ۱/۲ موارد، این پس از حدود ۱۰۰۰ میلی‌ثانیه `"Success!"` را لاگ می‌کند.
  - حالت و مقدار `promise1` برابر `resolved` و `"Success!"` خواهد بود.
  - حالت و مقدار `promise2` برابر `resolved` و `true` خواهد بود.
- در حدود ۱/۲ موارد، این بلافاصله `"NOPE!"` را لاگ می‌کند.
  - حالت و مقدار `promise1` برابر `rejected` و `Nope!` خواهد بود.
  - حالت و مقدار `promise2` برابر `resolved` و `false` خواهد بود.

درک این نکته مهم است که به دلیل قواعد چرخه‌ی عمر، وقتی `reject` می‌شود، `resolve`ی که حدود ۱۰۰۰ میلی‌ثانیه بعد می‌آید بی‌صدا نادیده گرفته می‌شود، چون حالت داخلی پس از رد یا حل شدن دیگر نمی‌تواند تغییر کند.
درک این نکته مهم است که برگرداندن یک مقدار از یک Promise آن را حل می‌کند و پرتاب یک مقدار آن را رد می‌کند.
وقتی `promise1` حل می‌شود و یک `onResolved` زنجیره‌شده وجود دارد: `then(onResolved)`، آن پیگیری یک Promise جدید است که می‌تواند حل یا رد شود.
وقتی `promise1` رد می‌شود ولی یک `onRejected` زنجیره‌شده وجود دارد: `then(, onRejected)`، آن پیگیری یک Promise جدید است که می‌تواند حل یا رد شود.

### **catch**

گاهی می‌خواهید خطاها را بگیرید و فقط زمانی ادامه دهید که Promise اصلی `reject` شود.
با `promise.catch(onCatch)`، تابع بازگشتی `onCatch` دلیلی را دریافت می‌کند که Promise اصلی با آن رد شده است.
این همیشه یک Promise «زنجیره‌ای» _جدید_ برمی‌گرداند.

برگرداندن یک `value` از `catch`، Promise «زنجیره‌ای» را حل می‌کند.
پرتاب یک `reason` در `catch`، Promise «زنجیره‌ای» را رد می‌کند.

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

در حدود ۱/۲ موارد، این پس از حدود ۱۰۰۰ میلی‌ثانیه `"Success!"` را لاگ می‌کند.
در ۱/۲ دیگر موارد، این بلافاصله `42` را لاگ می‌کند.

- اگر `promise1` حل شود، `catch` نادیده گرفته می‌شود و به `then` می‌رسد و مقدار را لاگ می‌کند.
  - حالت و مقدار `promise1` برابر `resolved` و `"Success!"` خواهد بود.
  - حالت و مقدار `promise2` برابر `resolved` و `"done"` خواهد بود؛
- اگر `promise1` رد شود، `catch` اجرا می‌شود که _یک مقدار برمی‌گرداند_، و بنابراین زنجیره اکنون `resolved` است و به `then` می‌رسد و مقدار را لاگ می‌کند.
  - حالت و مقدار `promise1` برابر `rejected` و `"Nope!"` خواهد بود.
  - حالت و مقدار `promise2` برابر `resolved` و `"done"` خواهد بود؛

### **finally**

گاهی می‌خواهید پس از تعیین تکلیف شدن یک Promise، بدون توجه به اینکه حل می‌شود یا رد، کدی اجرا کنید.
با `promise.finally(onSettled)`، تابع بازگشتی `onSettled` هیچ مقداری دریافت نمی‌کند.
این همیشه یک Promise «زنجیره‌ای» _جدید_ برمی‌گرداند.

برگرداندن یک `value` از `finally`، وضعیت و مقدار Promise اصلی را کپی می‌کند و `value` را نادیده می‌گیرد.
پرتاب یک `reason` در `finally`، Promise «زنجیره‌ای» را رد می‌کند و هر وضعیت و مقدار یا دلیلی را از Promise اصلی بازنویسی می‌کند.

## مثال

چند مورد از این متدها در کنار هم:

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

- در مواردی که `randomNumber` برابر `0-3` است:
  - `myPromise` با مقدار `2, 4, 6, or 8` حل می‌شود
  - `finalPromise` با مقدار `'yay'` حل می‌شود
  - دو لاگ وجود خواهد داشت:
    - `Sampled data: ...`
    - `Promise completed`
- در مواردی که `randomNumber` برابر `4-5` است:
  - `myPromise` با دلیل `'Sampling did not result in a sample'` رد می‌شود
  - `finalPromise` با دلیل `Error('Sampling did not result in a sample')` رد می‌شود
  - یک لاگ وجود خواهد داشت:
    - `Promise completed`
    - _در برخی محیط‌ها_ این یک لاگ `"uncaught rejected promise: Error('Sampling did not result in a sample')"` تولید می‌کند

همان‌طور که در بالا نشان داده شد، `reject` با یک رشته کار می‌کند و یک Promise می‌تواند با یک `Error` هم رد شود.

<!-- prettier-ignore -->
~~~exercism/note
اگر زنجیره کردن Promiseها یا استفاده‌ی کلی از آن روشن نیست، [آموزش MDN][mdn-promises] منبع خوبی برای مطالعه است.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
