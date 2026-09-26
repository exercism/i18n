# परिचय

## रैंडम वैल्यू बनाना

Java में रैंडम वैल्यू बनाने के कई तरीके हैं।

### `Random` का उपयोग

[`java.util.Random`][java-util-random-docs] क्लास में स्यूडो-रैंडम वैल्यू बनाने के कई मेथड हैं।

```java
Random random = new Random();

random.next(8); // Generates a random int with the given number of bits, in this case 8

random.nextInt(); // Generates a random int in the range Integer.MIN_VALUE through Integer.MAX_VALUE
random.nextInt(10); // Generates a random int in the range 0 to 10

random.nextFloat(); // Generates a random float in the range 0.0 to 1.0
random.nextDouble(); // Generates a random double in the range 0.0 to 1.0

random.nextBoolean(); // Generates a random boolean value
random.nextLong(); // Generates a random long value
```

अपने डिफॉल्ट कंस्ट्रक्टर के अलावा `Random` क्लास में एक और कंस्ट्रक्टर भी होता है, जिसमें अपना सीड दिया जा सकता है।
अगर `Random` की दो इंस्टेंस एक ही सीड के साथ बनाई जाएँ और दोनों के लिए मेथड कॉल का वही क्रम अपनाया जाए, तो दोनों एक जैसी संख्याओं का क्रम बनाएँगी और लौटाएँगी।

### `Math.random()` का उपयोग

[`Math.random()`][math-random-docs] मेथड एक यूटिलिटी मेथड है, जो `0.0` से `1.0` के बीच एक रैंडम `Double` बनाती है।

### `ThreadLocalRandom` का उपयोग

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] क्लास `java.util.Random` का एक विकल्प है और इसे थ्रेड-सुरक्षित बनाया गया है।
इस क्लास में कुछ अतिरिक्त यूटिलिटी मेथड हैं, जो निचली और ऊपरी दोनों सीमाएँ लेकर वैल्यू बनाती हैं। इससे इस क्लास के साथ काम करना थोड़ा आसान हो जाता है।

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## सुरक्षा

पासवर्ड जैसी संवेदनशील वैल्यू बनाने के लिए अक्सर रैंडम वैल्यू का इस्तेमाल किया जाता है।
लेकिन ऊपर बताए गए रैंडम वैल्यू बनाने वाले सभी मेथड क्रिप्टोग्राफिक रूप से सुरक्षित _नहीं_ माने जाते।

क्रिप्टोग्राफिक रूप से मज़बूत रैंडम संख्याएँ बनाने के लिए [`java.security.SecureRandom`][secure-random-docs] क्लास का उपयोग कीजिए।

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
