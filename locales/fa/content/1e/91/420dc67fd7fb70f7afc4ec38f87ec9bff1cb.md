# نصب

## نصب Groovy روی Unix (Mac OSX، Linux، Solaris یا FreeBSD)

علاوه بر exercism CLI و ویرایشگر متن محبوبتان، برای تمرین کردن با تمرین‌های Exercism به زبان Groovy به این موارد نیاز دارید:

* **کیت توسعه‌ی Java** (JDK): Groovy به بایت‌کدهای Java کامپایل می‌شود؛ پس باید JDK را نصب کنید، که هم محیط اجرای Java را در بر می‌گیرد و هم ابزارهای توسعه را (از همه مهم‌تر، کامپایلر Java)؛ و
* **Gradle**: ابزار ساخت مخصوص پروژه‌های مبتنی بر JVM که از Groovy پشتیبانی می‌کند.

روش ترجیحی برای نصب هر دو Java و Gradle، استفاده از [SDKman](http://sdkman.io/) است.

دستورالعمل‌های کامل را می‌توانید [اینجا](https://sdkman.io/install) ببینید. به‌طور خلاصه، یک شل باز کنید و این دستورها را اجرا کنید:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

نکته‌ی جانبی: این روش برای Cygwin و WSL روی Windows هم مناسب است.

## نصب Java و Gradle روی Windows

1. باید JDK نصب شده باشد و متغیر محیطی `JAVA_HOME` درست تنظیم شده باشد. 
می‌توانید آن را با اجرای دستور `javac -v` آزمایش کنید. 
برای نصب JDK از [این دستورالعمل‌ها](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm) پیروی کنید.
1. باید Gradle نصب شده باشد. 
می‌توانید آن را با اجرای دستور `gradle -v` آزمایش کنید. 
برای نصب Gradle از [این دستورالعمل‌ها](https://gradle.org/install/#manually) پیروی کنید.