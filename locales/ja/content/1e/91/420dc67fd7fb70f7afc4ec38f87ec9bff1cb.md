# インストール

## Unix（Mac OSX、Linux、Solaris、FreeBSD）へのGroovyのインストール

exercism CLIとお気に入りのテキストエディターに加えて、GroovyでExercismの演習に取り組むには次のものが必要です。

* **Java Development Kit**（JDK）：GroovyはJavaのバイトコードにコンパイルされます。Java Runtime*と*開発ツール（とりわけJavaコンパイラー）の両方を含むJDKをインストールする必要があります。
* **Gradle**：JVMベースのプロジェクト専用のビルドツールで、Groovyをサポートしています。

JavaとGradleの両方をインストールするのに好ましい方法は、[SDKman](http://sdkman.io/)を使うことです。

詳細な手順は[こちら](https://sdkman.io/install)にあります。手短に言うと、シェルを開いて次のコマンドを実行します。

1. `curl -s "https://get.sdkman.io" | bash`
1. `source "~/.sdkman/bin/sdkman-init.sh"`
1. `sdk install java`
1. `sdk install gradle`

補足：この方法はWindowsのCygwinやWSLでも利用できます。

## WindowsへのJavaとGradleのインストール

1. JDKがインストールされ、`JAVA_HOME`環境変数が正しく設定されている必要があります。
`javac -v`コマンドを実行して確認できます。
JDKをインストールするには、[この手順](https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-microsoft-windows-platforms.htm)に従ってください。
1. Gradleがインストールされている必要があります。
`gradle -v`コマンドを実行して確認できます。
Gradleをインストールするには、[この手順](https://gradle.org/install/#manually)に従ってください。