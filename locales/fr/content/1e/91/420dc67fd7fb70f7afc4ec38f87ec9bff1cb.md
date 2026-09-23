# Installation

## Installe Groovy sous Unix (Mac OSX, Linux, Solaris ou FreeBSD)

En plus de l'Exercism CLI et de ton éditeur de texte préféré, pour t'entraîner sur les exercices Groovy d'Exercism, il te faut :

* le **Java Development Kit** (JDK), car Groovy se compile en bytecode Java ; tu dois donc installer le JDK, qui inclut à la fois un environnement d'exécution Java *et* les outils de développement (notamment le compilateur Java) ; et
* **Gradle**, un outil de build conçu spécifiquement pour les projets basés sur la JVM et qui prend en charge Groovy.

La méthode recommandée pour installer Java et Gradle est d'utiliser [SDKman](http://sdkman.io/).

Tu trouveras des instructions détaillées [ici](https://sdkman.io/install). En bref, ouvre un shell et saisis :

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Remarque : cette méthode convient aussi à Cygwin et à WSL sous Windows

## Installe Java et Gradle sous Windows

1. Tu dois avoir installé le JDK et correctement défini la variable d'environnement `JAVA_HOME`. 
Tu peux le vérifier en exécutant la commande `javac -v`. 
Pour installer le JDK, suis [ces instructions](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Tu dois avoir installé Gradle. 
Tu peux le vérifier en exécutant la commande `gradle -v`. 
Pour installer Gradle, suis [ces instructions](https://gradle.org/install/#manually)