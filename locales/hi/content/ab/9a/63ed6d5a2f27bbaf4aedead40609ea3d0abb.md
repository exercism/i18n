# इसके बारे में

## _if-then_ स्टेटमेंट

Java में सबसे बुनियादी कंट्रोल फ्लो स्टेटमेंट [_if-then_ स्टेटमेंट][if-statement] है।
इस स्टेटमेंट का इस्तेमाल कोड के किसी हिस्से को सिर्फ तब चलाने के लिए किया जाता है, जब कोई खास शर्त `true` हो।
_if-then_ स्टेटमेंट को `if` क्लॉज़ की मदद से परिभाषित किया जाता है:

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

ऊपर के उदाहरण में, अगर कार में ईंधन नहीं बचा है, तो `Car.drive` मेथड को कॉल करने पर कुछ नहीं होगा।

## _if-then-else_ स्टेटमेंट

_if-then-else_ स्टेटमेंट तब चलने का वैकल्पिक रास्ता देता है, जब `if` क्लॉज़ की शर्त `false` होती है।
यह वैकल्पिक रास्ता एक `if` क्लॉज़ के बाद आता है और `else` क्लॉज़ की मदद से परिभाषित किया जाता है:

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

ऊपर के उदाहरण में, अगर कार में ईंधन नहीं बचा है, तो `Car.drive` मेथड को कॉल करने पर कार को रोकने के लिए एक और मेथड कॉल होगा।

_if-then-else_ स्टेटमेंट `else if` क्लॉज़ का इस्तेमाल करके कई शर्तों के साथ भी काम कर सकता है:

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

ऊपर के उदाहरण में, जब ईंधन `5` से कम या उसके बराबर हो, तो कार चलाने पर कार चलेगी, लेकिन ईंधन की लाइट जल जाएगी।
जब ईंधन `0` तक पहुँच जाएगा, तो कार चलना बंद कर देगी।

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
