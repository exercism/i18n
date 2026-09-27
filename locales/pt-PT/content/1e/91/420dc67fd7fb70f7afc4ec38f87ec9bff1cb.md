# Instalação

## Instalar o Groovy no Unix (Mac OSX, Linux, Solaris ou FreeBSD)

Além da CLI do Exercism e do teu editor de texto preferido, praticar exercícios de Groovy no Exercism exige:

* o **Java Development Kit** (JDK): o Groovy compila para bytecodes Java; é preciso instalar o JDK, que inclui tanto um Java Runtime *e* ferramentas de desenvolvimento (sobretudo o compilador Java); e
* o **Gradle**: uma ferramenta de compilação especificamente para projetos baseados na JVM e que suporta Groovy.

A forma preferida de instalar tanto o Java como o Gradle é com o [SDKman](http://sdkman.io/).

Encontras instruções detalhadas [aqui](https://sdkman.io/install). Em resumo, abre uma shell e executa:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Nota à parte: este método também serve para Cygwin e WSL no Windows

## Instalar o Java e o Gradle no Windows

1. Deves ter o JDK instalado e a variável de ambiente `JAVA_HOME` definida corretamente. 
Podes testar executando o comando `javac -v`. 
Para instalar o JDK, segue [estas instruções](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Deves ter o Gradle instalado. 
Podes testar executando o comando `gradle -v`. 
Para instalar o Gradle, segue [estas instruções](https://gradle.org/install/#manually)