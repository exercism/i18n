# ইনস্টলেশন

## ইউনিক্সে Groovy ইনস্টল করা (Mac OSX, Linux, Solaris বা FreeBSD)

exercism CLI আর আপনার প্রিয় টেক্সট এডিটর ছাড়াও, Groovy-তে Exercism-এর অনুশীলনী করার জন্য দরকার:

* **Java Development Kit** (JDK)। Groovy কম্পাইল হয় Java বাইটকোডে, তাই আপনার JDK ইনস্টল করা দরকার, যাতে একটি Java Runtime *এবং* ডেভেলপমেন্ট টুল থাকে, বিশেষ করে Java কম্পাইলার; আর
* **Gradle**, যা বিশেষভাবে JVM-ভিত্তিক প্রজেক্টের জন্য একটি বিল্ড টুল এবং Groovy সমর্থন করে।

Java আর Gradle দুটোই ইনস্টল করার সবচেয়ে পছন্দের উপায় হলো [SDKman](http://sdkman.io/)।

বিস্তারিত নির্দেশনা [এখানে](https://sdkman.io/install) পাওয়া যাবে। সংক্ষেপে, একটি শেল খুলে লিখুন:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

পার্শ্ব টীকা: এই পদ্ধতিটি Windows-এর Cygwin আর WSL-এর জন্যও উপযুক্ত

## Windows-এ Java আর Gradle ইনস্টল করা

1. আপনার JDK ইনস্টল করা থাকা উচিত এবং `JAVA_HOME` এনভায়রনমেন্ট ভ্যারিয়েবলটি সঠিকভাবে সেট করা থাকা উচিত। 
`javac -v` কমান্ড দিয়ে আপনি এটি পরীক্ষা করতে পারেন। 
JDK ইনস্টল করতে [এই নির্দেশনাটি](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm) অনুসরণ করুন
1. আপনার Gradle ইনস্টল করা থাকা উচিত। 
`gradle -v` কমান্ড দিয়ে আপনি এটি পরীক্ষা করতে পারেন। 
Gradle ইনস্টল করতে [এই নির্দেশনাটি](https://gradle.org/install/#manually) অনুসরণ করুন