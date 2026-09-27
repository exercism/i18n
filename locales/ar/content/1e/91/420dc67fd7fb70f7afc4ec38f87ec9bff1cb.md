# التثبيت

## تثبيت Groovy على Unix (Mac OSX، Linux، Solaris أو FreeBSD)

بالإضافة إلى واجهة سطر الأوامر الخاصة بـ Exercism ومحرر النصوص المفضّل لديك، يتطلب التمرن على تمارين Exercism بلغة Groovy ما يلي:

* **مجموعة تطوير Java** (JDK): يُصرَّف Groovy إلى كود البايت الخاص بـ Java، لذا تحتاج إلى تثبيت JDK الذي يشمل بيئة تشغيل Java *و* أدوات التطوير (وأبرزها مترجم Java).
* **Gradle**: أداة بناء مخصصة لمشاريع JVM وتدعم Groovy.

الطريقة المفضّلة لتثبيت كل من Java وGradle هي استخدام [SDKman](http://sdkman.io/).

تجد تعليمات مفصّلة [هنا](https://sdkman.io/install). وباختصار، افتح صدفة أوامر ونفّذ ما يلي:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

ملاحظة جانبية: تناسب هذه الطريقة أيضًا Cygwin وWSL على Windows

## تثبيت Java وGradle على Windows

1. ينبغي أن يكون JDK مثبّتًا لديك وأن يكون متغير البيئة `JAVA_HOME` مضبوطًا بشكل صحيح. 
يمكنك اختبار ذلك بتنفيذ الأمر `javac -v`. 
لتثبيت JDK، اتبع [هذه التعليمات](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. ينبغي أن يكون Gradle مثبّتًا لديك. 
يمكنك اختبار ذلك بتنفيذ الأمر `gradle -v`. 
لتثبيت Gradle، اتبع [هذه التعليمات](https://gradle.org/install/#manually)