# इंस्टॉलेशन

## Unix (Mac OSX, Linux, Solaris या FreeBSD) पर Groovy इंस्टॉल करना

exercism CLI और अपने पसंदीदा टेक्स्ट एडिटर के अलावा, Groovy में Exercism के अभ्यास करने के लिए इनकी ज़रूरत होती है:

* **Java Development Kit** (JDK), क्योंकि Groovy, Java बाइटकोड में कंपाइल होती है। यह JDK इंस्टॉल करना ज़रूरी है, और उसमें Java Runtime *और* डेवलपमेंट टूल्स, दोनों शामिल होते हैं (सबसे खास तौर पर Java कंपाइलर)।
* **Gradle**, यानी खास तौर पर JVM पर आधारित प्रोजेक्ट्स के लिए बना बिल्ड टूल, जो Groovy को भी सपोर्ट करता है।

Java और Gradle, दोनों को इंस्टॉल करने का पसंदीदा तरीका [SDKman](http://sdkman.io/) है।

विस्तृत निर्देश [यहाँ](https://sdkman.io/install) मिल जाएँगे। संक्षेप में, एक शेल खोलिए और ये कमांड चलाइए:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

एक छोटी बात: यह तरीका Windows पर Cygwin और WSL के लिए भी काम करता है।

## Windows पर Java और Gradle इंस्टॉल करना

1. आपके पास JDK इंस्टॉल होना चाहिए और `JAVA_HOME` एनवायरनमेंट वेरिएबल सही तरीके से सेट होना चाहिए।
`javac -v` कमांड चलाकर आप इसे जाँच सकते हैं।
JDK इंस्टॉल करने के लिए [इन निर्देशों](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm) का पालन कीजिए।
1. आपके पास Gradle इंस्टॉल होना चाहिए।
`gradle -v` कमांड चलाकर आप इसे जाँच सकते हैं।
Gradle इंस्टॉल करने के लिए [इन निर्देशों](https://gradle.org/install/#manually) का पालन कीजिए।