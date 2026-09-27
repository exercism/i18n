# 安裝

## 在 Unix（Mac OSX、Linux、Solaris 或 FreeBSD）上安裝 Groovy

想在 Exercism 上用 Groovy 練習時，除了 exercism CLI 和你慣用的文字編輯器之外，還需要：

* **Java Development Kit**（JDK）：Groovy 會編譯成 Java bytecode；你需要安裝 JDK，其中同時包含 Java Runtime *和*開發工具（最重要的是 Java 編譯器）；以及
* **Gradle**：一套專為 JVM 專案打造的建置工具，也支援 Groovy。

安裝 Java 和 Gradle 的首選方法是使用 [SDKman](http://sdkman.io/)。

詳細的安裝說明請見[這裡](https://sdkman.io/install)。簡單來說，開啟一個 shell 並執行：

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

附帶一提：這個方法也適用於 Windows 上的 Cygwin 和 WSL。

## 在 Windows 上安裝 Java 和 Gradle

1. 你應該已安裝 JDK，並正確設定`JAVA_HOME`環境變數。
你可以用`javac -v`指令來測試。
安裝 JDK 請依照[這份說明](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. 你應該已安裝 Gradle。
你可以用`gradle -v`指令來測試。
安裝 Gradle 請依照[這份說明](https://gradle.org/install/#manually)