# Встановлення

## Встановлення Groovy на Unix (Mac OSX, Linux, Solaris або FreeBSD)

Окрім Exercism CLI та улюбленого текстового редактора, для практики з вправами Exercism на Groovy потрібні:

* **Java Development Kit** (JDK): Groovy компілюється в байт-код Java, тож потрібно встановити JDK, який містить і Java Runtime, *і* інструменти розробки (зокрема компілятор Java); та
* **Gradle**: інструмент збірки, призначений спеціально для проєктів на основі JVM, який підтримує Groovy.

Найкращий спосіб встановити і Java, і Gradle - скористатися [SDKman](http://sdkman.io/).

Докладні інструкції можна знайти [тут](https://sdkman.io/install). Коротко: відкрийте оболонку та виконайте:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Примітка: цей спосіб також підходить для Cygwin і WSL у Windows.

## Встановлення Java і Gradle у Windows

1. JDK має бути встановлено, а змінну середовища `JAVA_HOME` правильно налаштовано. 
Перевірити це можна, виконавши команду `javac -v`. 
Щоб встановити JDK, скористайтеся [цією інструкцією](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Gradle має бути встановлено. 
Перевірити це можна, виконавши команду `gradle -v`. 
Щоб встановити Gradle, скористайтеся [цією інструкцією](https://gradle.org/install/#manually)