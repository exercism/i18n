# Telepítés

## A Groovy telepítése Unixon (Mac OSX, Linux, Solaris vagy FreeBSD)

Az Exercism CLI-n és a kedvenc szövegszerkesztődön kívül ahhoz, hogy az Exercism Groovy-feladataival gyakorolj, a következőkre van szükséged:

* a **Java Development Kit** (JDK): a Groovy Java-bájtkódra fordul, ezért telepítened kell a JDK-t, amely egyszerre tartalmaz Java Runtime-ot *és* fejlesztőeszközöket (köztük legfőképp a Java-fordítót); valamint
* a **Gradle**: kifejezetten JVM-alapú projektekhez készült buildeszköz, amely támogatja a Groovy-t.

A Java és a Gradle telepítésének leginkább javasolt módja a [SDKman](http://sdkman.io/) használata.

Részletes útmutatót [itt](https://sdkman.io/install) találsz. Röviden: nyiss meg egy shellt, és add ki a következő parancsokat:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Megjegyzés: ez a módszer Windows alatt Cygwinhez és WSL-hez is használható.

## A Java és a Gradle telepítése Windowson

1. Telepítve kell lennie a JDK-nak, és helyesen be kell állítanod a `JAVA_HOME` környezeti változót.
Ezt úgy ellenőrizheted, hogy kiadod a `javac -v` parancsot.
A JDK telepítéséhez kövesd [ezt az útmutatót](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Telepítve kell lennie a Gradle-nek.
Ezt úgy ellenőrizheted, hogy kiadod a `gradle -v` parancsot.
A Gradle telepítéséhez kövesd [ezt az útmutatót](https://gradle.org/install/#manually)