# পরিচিতি

## র‍্যান্ডম মান তৈরি করা

Java-তে র‍্যান্ডম মান তৈরি করার একাধিক উপায় আছে।

### `Random` ব্যবহার করা

[`java.util.Random`][java-util-random-docs] ক্লাসটি সিউডো-র‍্যান্ডম মান তৈরি করার কয়েকটি মেথড দেয়।

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

ডিফল্ট কনস্ট্রাক্টর ছাড়াও `Random` ক্লাসটির আরেকটি কনস্ট্রাক্টর আছে, যেখানে নিজের ইচ্ছেমতো একটি সিড দেওয়া যায়।
একই সিড দিয়ে Random-এর দুটি ইনস্ট্যান্স তৈরি করা হলে এবং প্রতিটির জন্য একই ক্রমে মেথড কল করা হলে, তারা অভিন্ন সংখ্যাক্রম তৈরি করে রিটার্ন করবে।

### `Math.random()` ব্যবহার করা

[`Math.random()`][math-random-docs] মেথডটি `0.0` থেকে `1.0` রেঞ্জে একটি র‍্যান্ডম `Double` তৈরি করার একটি ইউটিলিটি মেথড।

### `ThreadLocalRandom` ব্যবহার করা

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] ক্লাসটি `java.util.Random`-এর একটি বিকল্প এবং এটি থ্রেড-সেফ হওয়ার জন্য ডিজাইন করা হয়েছে।
এই ক্লাসটিতে কিছু অতিরিক্ত ইউটিলিটি মেথড আছে, যেগুলো নিম্ন ও উচ্চ উভয় সীমা নিয়ে মান তৈরি করে, ফলে এটা নিয়ে কাজ করা একটু সহজ হয়।

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## নিরাপত্তা

পাসওয়ার্ডের মতো সংবেদনশীল মান তৈরি করতে প্রায়ই র‍্যান্ডম মান ব্যবহার করা হয়।
তবে উপরে বর্ণিত র‍্যান্ডম মান তৈরির সব মেথডই ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত বলে বিবেচিত হয় না।

ক্রিপ্টোগ্রাফিকভাবে শক্তিশালী র‍্যান্ডম সংখ্যা তৈরি করতে [`java.security.SecureRandom`][secure-random-docs] ক্লাসটি ব্যবহার করুন।

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
