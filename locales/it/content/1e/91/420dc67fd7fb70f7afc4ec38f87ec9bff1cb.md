# Installazione

## Installare Groovy su Unix (Mac OSX, Linux, Solaris o FreeBSD)

Oltre alla CLI di Exercism e al tuo editor di testo preferito, per fare pratica con gli esercizi di Groovy di Exercism servono

* il **Java Development Kit** (JDK): Groovy compila in bytecode Java, quindi serve installare il JDK, che include sia un Java Runtime *sia* gli strumenti di sviluppo (in particolare, il compilatore Java); e
* **Gradle**: uno strumento di build pensato appositamente per i progetti basati sulla JVM e che supporta Groovy.

Il metodo preferito per installare sia Java sia Gradle è [SDKman](http://sdkman.io/).

Trovi istruzioni dettagliate [qui](https://sdkman.io/install). In breve, apri una shell ed esegui:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Nota a margine: questo metodo va bene anche per Cygwin e WSL su Windows

## Installare Java e Gradle su Windows

1. Dovresti avere il JDK installato e la variabile d'ambiente `JAVA_HOME` impostata correttamente. 
Puoi verificarlo eseguendo il comando `javac -v`. 
Per installare il JDK, segui [queste istruzioni](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Dovresti avere Gradle installato. 
Puoi verificarlo eseguendo il comando `gradle -v`. 
Per installare Gradle, segui [queste istruzioni](https://gradle.org/install/#manually)