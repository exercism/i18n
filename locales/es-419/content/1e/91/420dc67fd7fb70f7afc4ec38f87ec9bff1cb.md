# Instalación

## Instalar Groovy en Unix (Mac OSX, Linux, Solaris o FreeBSD)

Además de la CLI de Exercism y tu editor de texto favorito, para practicar con los ejercicios de Exercism en Groovy necesitas

* el **Java Development Kit** (JDK): Groovy compila a bytecode de Java, así que necesitas instalar el JDK, que incluye tanto un Java Runtime *como* herramientas de desarrollo (en particular, el compilador de Java); y
* **Gradle**, una herramienta de compilación específica para proyectos basados en la JVM y que admite Groovy.

El método preferido para instalar tanto Java como Gradle es con [SDKman](http://sdkman.io/).

Puedes encontrar instrucciones detalladas [aquí](https://sdkman.io/install). En resumen, abre una terminal y ejecuta:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Nota aparte: este método también sirve para Cygwin y WSL en Windows

## Instalar Java y Gradle en Windows

1. Debes tener el JDK instalado y la variable de entorno `JAVA_HOME` configurada correctamente. 
Puedes comprobarlo con el comando `javac -v`. 
Para instalar el JDK, sigue [estas instrucciones](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Debes tener Gradle instalado. 
Puedes comprobarlo con el comando `gradle -v`. 
Para instalar Gradle, sigue [estas instrucciones](https://gradle.org/install/#manually)