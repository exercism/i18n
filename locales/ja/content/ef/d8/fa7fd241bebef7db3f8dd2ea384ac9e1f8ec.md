# 前提条件

Fortranのトラックでは、次のソフトウェアがシステムにインストールされている必要があります。

- モダンなFortranコンパイラー
- クロスプラットフォームビルドシステムのCMake

## 前提条件：モダンなFortranコンパイラー

このトラックには、[Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003)をサポートするコンパイラーが必要です。ここ数年でリリースされた主要なコンパイラーなら、どれも対応しているはずです。

以下では、[GNU Fortran](https://gcc.gnu.org/fortran/)またはGFortranのインストール方法を説明します。その他のFortranコンパイラーは[こちら](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers)にまとめられています。[Intel Fortran](https://software.intel.com/en-us/fortran-compilers)は、高性能アプリケーション向けのプロプライエタリな選択肢としてよく使われています。ほとんどの演習はIntel Fortranでも動きますが、テストはGNU Fortranでしか行われていないため、すべてが同じように動くとは限りません。

## 前提条件：CMake

CMakeは、ネイティブなビルドシステム（`make`、Visual Studio、Xcodeなど）向けのビルドスクリプトを生成する、オープンソースのクロスプラットフォームビルドシステムです。ExercismのFortranトラックではCMakeを使い、すぐに使えるビルド環境を用意しています。このビルド環境は次のことを行います。

- テストをコンパイルします
- 解答をコンパイルします
- テストの実行ファイルをリンクします
- ビルドのたびに自動でテストを実行します
- テストが1つでも失敗するとビルドを失敗させます

CMakeを使うことで、Exercismはクロスプラットフォームなビルドスクリプトを提供できます。このスクリプトは、Visual StudioやXcodeのような統合開発環境向けのプロジェクトファイルも生成できます。これにより、演習ごとにビルドを設定する手間をかけずに、問題に集中できます。

移植性の高いビルドを用意するのは簡単ではなく、さまざまな種類のシステムへのアクセスが必要です。提供されているCMakeのレシピで問題が起きた場合は、[issueを報告](https://github.com/exercism/fortran/issues)してください。CMakeのサポートを改善していきます。

提供されているビルドレシピを使うには、[CMake 2.8.11以降](http://www.cmake.org/)が必要です。

### Linux

Ubuntu 16.04以降には対応するコンパイラーがパッケージマネージャーに入っているので、必要なコンパイラーは次のコマンドでインストールできます。

```bash
sudo apt-get install gfortran cmake
```

その他のディストリビューションでは、パッケージマネージャーからコンパイラーを入手できるはずです。

### MacOS

MacOSでは、[Homebrew](http://brew.sh/)を使ってGCCをインストールできます。

```bash
brew install gfortran cmake
```

### Windows

Windowsにはいくつか選択肢があります。

- [Windows Subsystem for Linux (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [MingWのGNU Fortranを使うWindows](#####-Windows-with-MingW-GNU-Fortran)
- [Visual StudioとNMake、Intel Fortranを使うWindows](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10では、[Windows Subsystem for Linux (WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)が導入されました。サブシステムとしてUbuntu 16.04以降を使っている場合は、UbuntuのBashシェルを開き、[Linux](####-Linux)の手順に従ってください。

#### Windows with MingW GNU Fortran

Windowsでは、[MingW](http://www.mingw.org/)を通してGNU Fortranを入手できます。一番簡単なのは、まず[chocolatey](https://chocolatey.org)をインストールし、管理者としてcmdシェルを開いて、次を実行する方法です。

```Batchfile
choco install mingw cmake
```

これでMingW（GFortranとGCC）が`C:\tools\mingw64`に、CMakeが`C:\Program Files\CMake`にインストールされます。次に、それぞれのインストール先の`bin`ディレクトリをPATHに追加します。

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows with Visual Studio with NMake and Intel Fortran

[Intel Fortran](###-Intel-Fortran)を参照してください。

### Intel Fortran

[Intel Fortran](https://software.intel.com/en-us/fortran-compilers)を使うには、まずFortranコンパイラーを初期化する必要があります。WindowsでIntel Fortran 2019とVisual Studio 2017を使う場合、コマンドラインは次のようになります。

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

これでIntel Fortranのパスが読み込まれ、CMakeが正しく認識するはずです。また、Windowsでコマンドラインビルドを行う場合は、CMakeのジェネレーターに`NMake`を指定します。

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

上記のコマンドは、`build`ディレクトリを作成し（必須ではありませんが、良い習慣です）、実行ファイルをビルド（NMake）してテスト（ctest）を実行します。

他のバージョンのIntel Fortranでは、Windowsなら`ifortvars.bat`、LinuxやmacOSなら`ifortvars.sh`をインストール先から探してください。オプションを付けずにシェルでスクリプトを実行すると、ヘルプに利用できるオプションが表示されます。LinuxやMacOSでは、コマンドは次のようになります。

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
