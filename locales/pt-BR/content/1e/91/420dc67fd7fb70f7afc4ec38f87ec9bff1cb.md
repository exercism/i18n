# Instalação

## Instalando o Groovy no Unix (Mac OSX, Linux, Solaris ou FreeBSD)

Além da CLI do exercism e do seu editor de texto favorito, praticar com os exercícios de Groovy no Exercism exige:

* o **Java Development Kit** (JDK). O Groovy compila para bytecodes Java, então você precisa instalar o JDK, que inclui tanto um Java Runtime *quanto* ferramentas de desenvolvimento (principalmente o compilador Java); e
* o **Gradle**, uma ferramenta de build específica para projetos baseados na JVM e com suporte a Groovy.

O método preferido para instalar o Java e o Gradle é com o [SDKman](http://sdkman.io/).

Você encontra instruções detalhadas [aqui](https://sdkman.io/install). Resumindo, abra um terminal e execute:

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

Observação: esse método também funciona no Cygwin e no WSL no Windows

## Instalando o Java e o Gradle no Windows

1. Você precisa ter o JDK instalado e a variável de ambiente `JAVA_HOME` configurada corretamente. 
Você pode testar isso executando o comando `javac -v`. 
Para instalar o JDK, siga [estas instruções](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. Você precisa ter o Gradle instalado. 
Você pode testar isso executando o comando `gradle -v`. 
Para instalar o Gradle, siga [estas instruções](https://gradle.org/install/#manually)