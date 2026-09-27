# نبذة

يمثّل كائن [`Promise`][promise-docs] الاكتمال النهائي (أو الفشل) لعملية غير متزامنة والقيمة الناتجة عنها.

<!-- prettier-ignore -->
~~~exercism/note
هذا موضوع صعب على كثيرين، لا سيما إن كنت تعرف البرمجة بلغة _متزامنة_ بالكامل.
إن شعرت بالإرهاق، أو أردت معرفة المزيد عن **التزامن** و**التوازي**، [شاهد (عبر go.dev)][talk-blog] أو [شاهد مباشرة عبر vimeo][talk-video] و[اقرأ الشرائح][talk-slides] من المحاضرة الرائعة «Concurrency is not parallelism».

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## دورة حياة الوعد

لكائن `Promise` ثلاث حالات:

1. قيد الانتظار
2. مُنجَز
3. مرفوض

عند إنشائه، يكون الوعد قيد الانتظار.
وفي وقتٍ ما في المستقبل قد _يُحلّ_ أو _يُرفض_.
وبمجرد أن يُحلّ الوعد أو يُرفض مرة واحدة، لا يمكن حلّه أو رفضه مرة أخرى، ولا يمكن أن تتغيّر حالته.

بعبارة أخرى:

1. عندما يكون قيد الانتظار، يمكن للوعد:
   - أن ينتقل إلى الحالة منجَز أو الحالة مرفوض.
2. عندما يكون منجَزًا، يجب عليه:
   - ألّا ينتقل إلى أي حالة أخرى.
   - أن تكون له قيمة، ويجب ألّا تتغيّر.
3. عندما يكون مرفوضًا، يجب عليه:
   - ألّا ينتقل إلى أي حالة أخرى.
   - أن يكون له سبب، ويجب ألّا يتغيّر.

## حلّ الوعد

يمكن حلّ الوعد بعدة أساليب:

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

في الأمثلة أعلاه، يمكن أن تكون `value` _أي شيء_، بما في ذلك خطأ، أو `undefined`، أو `null`، أو وعد آخر.
عادةً تريد حلّ الوعد بقيمة ليست خطأً.

## رفض الوعد

يمكن رفض الوعد بعدة أساليب:

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

في الأمثلة أعلاه، يمكن أن يكون `reason` _أي شيء_، بما في ذلك خطأ، أو `undefined`، أو `null`.
عادةً تريد رفض الوعد بخطأ.

## تسلسل الوعد

يمكن _متابعة_ الوعد بإجراء لاحق بمجرد أن يُحلّ أو يُرفض.

- يُستدعى [`promise.then()`][promise-then] بمجرد أن يُحلّ `promise`
- يُستدعى [`promise.catch()`][promise-catch] بمجرد أن يُرفض `promise`
- يُستدعى [`promise.finally()`][promise-finally] بمجرد أن يُحلّ `promise` أو يُرفض

### **then**

كل وعد هو «thenable».
ويعني ذلك أن هناك دالة `then` متاحة ستُنفَّذ بمجرد أن يُحلّ الوعد الأصلي.
بمعطى `promise.then(onResolved)`، تتلقّى دالة الاستدعاء الراجع `onResolved` القيمة التي حُلّ بها الوعد الأصلي.
وسيُرجع هذا دائمًا وعدًا جديدًا «متسلسلًا».

إرجاع `value` من `then` يحلّ الوعد «المتسلسل».
ورمي `reason` في `then` يرفض الوعد «المتسلسل».

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

سيسجّل هذا `"Success!"` بعد حوالي 1000 مللي ثانية.
ستكون حالة `promise1` وقيمته `resolved` و`"Success!"`.
وستكون حالة `promise2` وقيمته `resolved` و`true`.

يوجد وسيط ثانٍ متاح يُنفَّذ عندما يُرفض الوعد الأصلي.
بمعطى `promise.then(onResolved, onRejected)`، تتلقّى دالة الاستدعاء الراجع `onResolved` القيمة التي حُلّ بها الوعد الأصلي، أو تتلقّى دالة الاستدعاء الراجع `onRejected` سبب رفض الوعد.

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

- في نحو 1/2 من الحالات، سيسجّل هذا `"Success!"` بعد حوالي 1000 مللي ثانية.
  - ستكون حالة `promise1` وقيمته `resolved` و`"Success!"`.
  - وستكون حالة `promise2` وقيمته `resolved` و`true`.
- وفي نحو 1/2 من الحالات، سيسجّل هذا `"NOPE!"` فورًا.
  - ستكون حالة `promise1` وقيمته `rejected` و`Nope!`.
  - وستكون حالة `promise2` وقيمته `resolved` و`false`.

من المهم أن تفهم أنه بسبب قواعد دورة الحياة، عندما يُستدعى `reject`، فإن `resolve` الذي يأتي بعد نحو 1000 مللي ثانية يُتجاهل بصمت، لأن الحالة الداخلية لا يمكن أن تتغيّر بمجرد أن رُفض الوعد أو حُلّ.
ومن المهم أن تفهم أن إرجاع قيمة من وعد يحلّه، ورمي قيمة يرفضه.
عندما يُحلّ `promise1` وتوجد دالة `onResolved` متسلسلة: `then(onResolved)`، فإن الوعد الناتج عن ذلك وعد جديد يمكن أن يُحلّ أو يُرفض.
وعندما يُرفض `promise1` ولكن توجد دالة `onRejected` متسلسلة: `then(, onRejected)`، فإن الوعد الناتج عن ذلك وعد جديد يمكن أن يُحلّ أو يُرفض.

### **catch**

أحيانًا تريد التقاط الأخطاء والاستمرار فقط عندما يُرفض الوعد الأصلي.
بمعطى `promise.catch(onCatch)`، تتلقّى دالة الاستدعاء الراجع `onCatch` سبب رفض الوعد الأصلي.
وسيُرجع هذا دائمًا وعدًا جديدًا «متسلسلًا».

إرجاع `value` من `catch` يحلّ الوعد «المتسلسل».
ورمي `reason` في `catch` يرفض الوعد «المتسلسل».

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

في نحو 1/2 من الحالات، سيسجّل هذا `"Success!"` بعد حوالي 1000 مللي ثانية.
وفي 1/2 الأخرى من الحالات، سيسجّل هذا `42` فورًا.

- إذا حُلّ `promise1`، يُتخطّى `catch` ويصل التنفيذ إلى `then`، ويسجّل القيمة.
  - ستكون حالة `promise1` وقيمته `resolved` و`"Success!"`.
  - وستكون حالة `promise2` وقيمته `resolved` و`"done"`؛
- وإذا رُفض `promise1`، يُنفَّذ `catch`، الذي _يُرجع قيمة_، وبذلك يصبح التسلسل الآن `resolved`، ويصل التنفيذ إلى `then`، ويسجّل القيمة.
  - ستكون حالة `promise1` وقيمته `rejected` و`"Nope!"`.
  - وستكون حالة `promise2` وقيمته `resolved` و`"done"`؛

### **finally**

أحيانًا تريد تنفيذ كود بعد أن يستقرّ الوعد، بغض النظر عن كونه يُحلّ أو يُرفض.
بمعطى `promise.finally(onSettled)`، لا تتلقّى دالة الاستدعاء الراجع `onSettled` شيئًا.
وسيُرجع هذا دائمًا وعدًا جديدًا «متسلسلًا».

إرجاع `value` من `finally` ينسخ الحالة والقيمة من الوعد الأصلي، متجاهلًا `value`.
ورمي `reason` في `finally` يرفض الوعد «المتسلسل»، ويلغي أي حالة وقيمة أو سبب من الوعد الأصلي.

## مثال

بعض الطرق مجتمعة:

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

- في الحالات التي تكون فيها قيمة `randomNumber` هي `0-3`:
  - سيُحلّ `myPromise` بالقيمة `2, 4, 6, or 8`
  - سيُحلّ `finalPromise` بالقيمة `'yay'`
  - سيكون هناك سجلّان:
    - `Sampled data: ...`
    - `Promise completed`
- وفي الحالات التي تكون فيها قيمة `randomNumber` هي `4-5`:
  - سيُرفض `myPromise` بالسبب `'Sampling did not result in a sample'`
  - سيُرفض `finalPromise` بالسبب `Error('Sampling did not result in a sample')`
  - سيكون هناك سجلّ واحد:
    - `Promise completed`
    - وفي _بعض البيئات_ سينتج عن ذلك سجلّ `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

كما هو موضّح أعلاه، يعمل `reject` مع سلسلة نصية، ويمكن للوعد أيضًا أن يُرفض بـ`Error`.

<!-- prettier-ignore -->
~~~exercism/note
إن كان تسلسل الوعود أو الاستخدام العام غير واضح، فإن [الدرس التعليمي على MDN][mdn-promises] مصدر جيد للاطلاع عليه.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
