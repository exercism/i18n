# সম্পর্কে

## _if-then_ স্টেটমেন্ট

Java-র সবচেয়ে মৌলিক কন্ট্রোল ফ্লো স্টেটমেন্ট হলো [_if-then_ স্টেটমেন্ট][if-statement]।
এই স্টেটমেন্টটি কেবল তখনই কোডের একটি অংশ রান করতে ব্যবহৃত হয়, যখন একটি নির্দিষ্ট শর্ত `true` হয়।
একটি _if-then_ স্টেটমেন্ট `if` ক্লজ দিয়ে ডিফাইন করা হয়:

```java
class Car {
    void drive() {
        // the "if" clause: the car needs to have fuel left to drive
        if (fuel > 0) {
            // the "then" clause: the car drives, consuming fuel
            fuel--;
        }
    }
}
```

উপরের উদাহরণে, গাড়ির জ্বালানি শেষ হলে `Car.drive` মেথডটি কল করলে কিছুই হবে না।

## _if-then-else_ স্টেটমেন্ট

_if-then-else_ স্টেটমেন্ট এমন একটি বিকল্প পথ দেয়, যা `if` ক্লজের শর্তটি `false` হয়ে গেলে রান করা হয়।
এই বিকল্প পথটি একটি `if` ক্লজের পরে আসে এবং `else` ক্লজ দিয়ে ডিফাইন করা হয়:

```java
class Car {
    void drive() {
        if (fuel > 0) {
            fuel--;
        } else {
            stop();
        }
    }
}
```

উপরের উদাহরণে, গাড়ির জ্বালানি শেষ হলে `Car.drive` মেথডটি কল করলে গাড়ি থামানোর জন্য আরেকটি মেথড কল হবে।

_if-then-else_ স্টেটমেন্ট `else if` ক্লজ ব্যবহার করে একাধিক শর্তও সমর্থন করে:

```java
class Car {
    void drive() {
        if (fuel > 5) {
            fuel--;
        } else if (fuel > 0) {
            turnOnFuelLight();
            fuel--;
        } else {
            stop();
        }
    }
}
```

উপরের উদাহরণে, জ্বালানি `5`-এর কম বা সমান হলে গাড়ি চালালে গাড়ি চলবে, তবে জ্বালানির লাইট জ্বলে উঠবে।
জ্বালানি `0`-এ পৌঁছালে গাড়ি আর চলবে না।

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
