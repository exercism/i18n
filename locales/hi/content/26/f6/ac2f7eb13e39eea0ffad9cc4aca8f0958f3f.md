# परिचय

[`Promise`][promise-docs] ऑब्जेक्ट किसी असिंक्रोनस ऑपरेशन के अंत में पूरा होने (या विफल होने) और उससे मिलने वाली वैल्यू को दर्शाता है।

<!-- prettier-ignore -->
~~~exercism/note
यह विषय बहुत लोगों के लिए कठिन है, खासकर तब जब आप ऐसी भाषा में प्रोग्रामिंग जानते हों जो पूरी तरह _सिंक्रोनस_ हो।
अगर आपको यह बहुत भारी लगे, या आप **कंकरेंसी** और **पैरेललिज़्म** के बारे में और जानना चाहें, तो "Concurrency is not parallelism" नाम की शानदार टॉक को [देखिए (go.dev के ज़रिए)][talk-blog] या [सीधे vimeo पर देखिए][talk-video], और उसकी [स्लाइड्स पढ़िए][talk-slides]।

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## प्रॉमिस का लाइफसाइकिल

एक `Promise` की तीन स्थितियाँ होती हैं:

1. पेंडिंग
2. फुलफिल्ड
3. रिजेक्टेड

जब यह बनाया जाता है, तब प्रॉमिस पेंडिंग होता है।
भविष्य में किसी समय यह _पूरा_ हो सकता है या _अस्वीकृत_ हो सकता है।
एक बार प्रॉमिस पूरा या अस्वीकृत हो जाने के बाद वह दोबारा कभी पूरा या अस्वीकृत नहीं हो सकता, और न ही उसकी स्थिति बदल सकती है।

दूसरे शब्दों में:

1. पेंडिंग होने पर प्रॉमिस:
   - फुलफिल्ड या रिजेक्टेड में से किसी भी स्थिति में जा सकता है।
2. फुलफिल्ड होने पर प्रॉमिस:
   - किसी दूसरी स्थिति में नहीं जा सकता।
   - उसके पास एक वैल्यू होनी चाहिए, जो नहीं बदलनी चाहिए।
3. रिजेक्टेड होने पर प्रॉमिस:
   - किसी दूसरी स्थिति में नहीं जा सकता।
   - उसके पास एक कारण होना चाहिए, जो नहीं बदलना चाहिए।

## प्रॉमिस को पूरा करना

प्रॉमिस को कई तरीकों से पूरा किया जा सकता है:

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

ऊपर के उदाहरणों में `value` कुछ भी हो सकती है, यहाँ तक कि एक एरर, `undefined`, `null` या कोई दूसरा प्रॉमिस भी।
आम तौर पर आप ऐसी वैल्यू के साथ पूरा करना चाहते हैं जो एरर न हो।

## प्रॉमिस को अस्वीकार करना

प्रॉमिस को कई तरीकों से अस्वीकार किया जा सकता है:

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

ऊपर के उदाहरणों में `reason` कुछ भी हो सकता है, जिसमें एक एरर, `undefined` या `null` भी शामिल है।
आम तौर पर आप एरर के साथ अस्वीकार करना चाहते हैं।

## प्रॉमिस की चेन बनाना

प्रॉमिस के पूरा या अस्वीकृत होने पर उसे किसी आगे की कार्रवाई के साथ _जारी_ रखा जा सकता है।

- [`promise.then()`][promise-then] तब कॉल होता है जब `promise` पूरा हो जाता है
- [`promise.catch()`][promise-catch] तब कॉल होता है जब `promise` अस्वीकृत हो जाता है
- [`promise.finally()`][promise-finally] तब कॉल होता है जब `promise` पूरा या अस्वीकृत हो जाता है

### **then**

हर प्रॉमिस "थनेबल" होता है।
इसका मतलब है कि एक `then` फंक्शन मौजूद होता है, जो मूल प्रॉमिस के पूरा होने पर चलाया जाएगा।
`promise.then(onResolved)` दिए जाने पर `onResolved` कॉलबैक को वह वैल्यू मिलती है जिसके साथ मूल प्रॉमिस पूरा हुआ था।
यह हमेशा एक _नया_ "चेन्ड" प्रॉमिस लौटाता है।

`then` से कोई `value` लौटाने पर "चेन्ड" प्रॉमिस पूरा हो जाता है।
`then` में कोई `reason` फेंकने पर "चेन्ड" प्रॉमिस अस्वीकृत हो जाता है।

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

यह करीब 1000 ms के बाद `"Success!"` लॉग करेगा।
`promise1` की स्थिति और वैल्यू `resolved` और `"Success!"` होंगी।
`promise2` की स्थिति और वैल्यू `resolved` और `true` होंगी।

एक दूसरा आर्गुमेंट भी उपलब्ध होता है, जो मूल प्रॉमिस के अस्वीकृत होने पर चलता है।
`promise.then(onResolved, onRejected)` दिए जाने पर `onResolved` कॉलबैक को वह वैल्यू मिलती है जिसके साथ मूल प्रॉमिस पूरा हुआ था, या `onRejected` कॉलबैक को वह कारण मिलता है जिसके कारण प्रॉमिस अस्वीकृत हुआ था।

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

- करीब आधे मामलों में यह लगभग 1000 ms के बाद `"Success!"` लॉग करेगा।
  - `promise1` की स्थिति और वैल्यू `resolved` और `"Success!"` होंगी।
  - `promise2` की स्थिति और वैल्यू `resolved` और `true` होंगी।
- करीब आधे मामलों में यह तुरंत `"NOPE!"` लॉग करेगा।
  - `promise1` की स्थिति और वैल्यू `rejected` और `Nope!` होंगी।
  - `promise2` की स्थिति और वैल्यू `resolved` और `false` होंगी।

यह समझना ज़रूरी है कि लाइफसाइकिल के नियमों के कारण, जब यह `reject` करता है, तो करीब 1000ms बाद आने वाला `resolve` चुपचाप नज़रअंदाज़ कर दिया जाता है, क्योंकि एक बार अस्वीकृत या पूरा हो जाने के बाद आंतरिक स्थिति बदल नहीं सकती।
यह भी समझना ज़रूरी है कि प्रॉमिस से कोई वैल्यू लौटाने पर वह पूरा हो जाता है, और कोई वैल्यू फेंकने पर वह अस्वीकृत हो जाता है।
जब `promise1` पूरा होता है और उसके साथ एक चेन्ड `onResolved` मौजूद हो, यानी `then(onResolved)`, तो वह आगे वाला प्रॉमिस एक नया प्रॉमिस होता है जो पूरा या अस्वीकृत हो सकता है।
जब `promise1` अस्वीकृत होता है लेकिन उसके साथ एक चेन्ड `onRejected` मौजूद हो, यानी `then(, onRejected)`, तो वह आगे वाला प्रॉमिस एक नया प्रॉमिस होता है जो पूरा या अस्वीकृत हो सकता है।

### **catch**

कभी-कभी आप एरर पकड़ना चाहते हैं और तभी आगे बढ़ना चाहते हैं जब मूल प्रॉमिस `reject` करे।
`promise.catch(onCatch)` दिए जाने पर `onCatch` कॉलबैक को वह कारण मिलता है जिसके कारण मूल प्रॉमिस अस्वीकृत हुआ था।
यह हमेशा एक _नया_ "चेन्ड" प्रॉमिस लौटाता है।

`catch` से कोई `value` लौटाने पर "चेन्ड" प्रॉमिस पूरा हो जाता है।
`catch` में कोई `reason` फेंकने पर "चेन्ड" प्रॉमिस अस्वीकृत हो जाता है।

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

करीब आधे मामलों में यह लगभग 1000 ms के बाद `"Success!"` लॉग करेगा।
बाकी आधे मामलों में यह तुरंत `42` लॉग करेगा।

- अगर `promise1` पूरा होता है, तो `catch` छोड़ दिया जाता है और यह `then` तक पहुँचता है, और वैल्यू लॉग करता है।
  - `promise1` की स्थिति और वैल्यू `resolved` और `"Success!"` होंगी।
  - `promise2` की स्थिति और वैल्यू `resolved` और `"done"` होंगी;
- अगर `promise1` अस्वीकृत होता है, तो `catch` चलाया जाता है, जो _एक वैल्यू लौटाता है_, और इस तरह चेन अब `resolved` हो जाती है, और यह `then` तक पहुँचता है, और वैल्यू लॉग करता है।
  - `promise1` की स्थिति और वैल्यू `rejected` और `"Nope!"` होंगी।
  - `promise2` की स्थिति और वैल्यू `resolved` और `"done"` होंगी;

### **finally**

कभी-कभी आप प्रॉमिस के अपनी अंतिम स्थिति में पहुँच जाने के बाद कोड चलाना चाहते हैं, चाहे वह पूरा हो या अस्वीकृत।
`promise.finally(onSettled)` दिए जाने पर `onSettled` कॉलबैक को कुछ नहीं मिलता।
यह हमेशा एक _नया_ "चेन्ड" प्रॉमिस लौटाता है।

`finally` से कोई `value` लौटाने पर मूल प्रॉमिस की स्थिति और वैल्यू की नकल हो जाती है, और `value` को नज़रअंदाज़ कर दिया जाता है।
`finally` में कोई `reason` फेंकने पर "चेन्ड" प्रॉमिस अस्वीकृत हो जाता है, और मूल प्रॉमिस की स्थिति, वैल्यू या कारण बदल दिया जाता है।

## उदाहरण

यहाँ कई मेथड एक साथ इस्तेमाल किए गए हैं:

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

- जिन मामलों में `randomNumber` `0-3` होता है:
  - `myPromise` वैल्यू `2, 4, 6, or 8` के साथ पूरा होगा
  - `finalPromise` वैल्यू `'yay'` के साथ पूरा होगा
  - दो लॉग होंगे:
    - `Sampled data: ...`
    - `Promise completed`
- जिन मामलों में `randomNumber` `4-5` होता है:
  - `myPromise` कारण `'Sampling did not result in a sample'` के साथ अस्वीकृत होगा
  - `finalPromise` कारण `Error('Sampling did not result in a sample')` के साथ अस्वीकृत होगा
  - एक लॉग होगा:
    - `Promise completed`
    - _कुछ वातावरणों में_ यह `"uncaught rejected promise: Error('Sampling did not result in a sample')"` लॉग देगा

जैसा ऊपर दिखाया गया है, `reject` एक स्ट्रिंग के साथ भी काम करता है, और एक प्रॉमिस `Error` के साथ भी अस्वीकृत हो सकता है।

<!-- prettier-ignore -->
~~~exercism/note
अगर प्रॉमिस की चेन बनाना या सामान्य इस्तेमाल साफ़ नहीं हो रहा, तो [MDN पर मौजूद ट्यूटोरियल][mdn-promises] पढ़ने लायक अच्छा संसाधन है।

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
