# 安装

## 在 Unix（Mac OSX、Linux、Solaris 或 FreeBSD）上安装 Groovy

除了 exercism CLI 和你最喜欢的文本编辑器之外，要用 Groovy 完成 Exercism 的练习，还需要：

* **Java 开发工具包**（JDK），Groovy 会编译成 Java 字节码，你需要安装 JDK，它既包含 Java 运行时，也包含开发工具（尤其是 Java 编译器）；以及
* **Gradle**，一款专门面向基于 JVM 的项目的构建工具，支持 Groovy。

安装 Java 和 Gradle 的首选方法是使用 [SDKman](http://sdkman.io/)。

详细说明可以在[这里](https://sdkman.io/install)找到。简单来说，打开一个 shell 并执行：

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

附注：这个方法同样适用于 Windows 上的 Cygwin 和 WSL。

## 在 Windows 上安装 Java 和 Gradle

1. 你需要安装好 JDK，并正确设置环境变量`JAVA_HOME`。
你可以执行`javac -v`命令来测试。
要安装 JDK，请参考[这份说明](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)
1. 你需要安装好 Gradle。
你可以执行`gradle -v`命令来测试。
要安装 Gradle，请参考[这份说明](https://gradle.org/install/#manually)