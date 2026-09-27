# 설치

## Unix에서 Groovy 설치하기 (Mac OSX, Linux, Solaris 또는 FreeBSD)

Exercism CLI와 즐겨 쓰는 텍스트 에디터 외에도, Exercism에서 Groovy 연습 문제를 풀려면 다음이 필요해요.

* **Java Development Kit**(JDK): Groovy는 Java 바이트코드로 컴파일돼요. 따라서 Java Runtime*과* 개발 도구(특히 Java 컴파일러)를 모두 포함하는 JDK를 설치해야 해요.
* **Gradle**: JVM 기반 프로젝트를 위한 빌드 도구이며 Groovy를 지원해요.

Java와 Gradle을 설치하는 가장 좋은 방법은 [SDKman](http://sdkman.io/)을 사용하는 거예요.

자세한 설명은 [여기](https://sdkman.io/install)에서 볼 수 있어요. 간단히 말해, 셸을 열고 다음을 실행해요.

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

참고로, 이 방법은 Windows의 Cygwin과 WSL에서도 사용할 수 있어요.

## Windows에서 Java와 Gradle 설치하기

1. JDK가 설치되어 있고 `JAVA_HOME` 환경 변수가 올바르게 설정되어 있어야 해요. 
`javac -v` 명령으로 확인할 수 있어요. 
JDK를 설치하려면 [이 지침](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)을 따라요.
1. Gradle이 설치되어 있어야 해요. 
`gradle -v` 명령으로 확인할 수 있어요. 
Gradle을 설치하려면 [이 지침](https://gradle.org/install/#manually)을 따라요.