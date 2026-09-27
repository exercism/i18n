# Installation

## Groovy unter Unix installieren (Mac OSX, Linux, Solaris oder FreeBSD)

Neben der Exercism CLI und deinem Lieblings-Texteditor brauchst du für das Üben mit Exercism-Übungen in Groovy:

* das **Java Development Kit** (JDK): Groovy kompiliert zu Java-Bytecode. Du musst das JDK installieren, das sowohl eine Java-Laufzeitumgebung *als auch* Entwicklungswerkzeuge enthält (allen voran den Java-Compiler); und
* **Gradle**: ein Build-Tool speziell für JVM-basierte Projekte, das Groovy unterstützt.

Java und Gradle installierst du am besten mit [SDKman](http://sdkman.io/).

Eine ausführliche Anleitung findest du [hier](https://sdkman.io/install). Kurz gesagt: Öffne eine Shell und führe Folgendes aus:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Am Rande: Diese Methode eignet sich auch für Cygwin und WSL unter Windows.

## Java und Gradle unter Windows installieren

1. Das JDK sollte installiert und die Umgebungsvariable `JAVA_HOME` korrekt gesetzt sein. 
Du kannst das mit dem Befehl `javac -v` testen. 
Wie du das JDK installierst, steht in [dieser Anleitung](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm).
1. Gradle sollte installiert sein. 
Du kannst das mit dem Befehl `gradle -v` testen. 
Wie du Gradle installierst, steht in [dieser Anleitung](https://gradle.org/install/#manually).