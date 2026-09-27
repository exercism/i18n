# 先決條件

Fortran 語言軌道要求你的系統上必須安裝下列軟體：

- 現代的 Fortran 編譯器
- CMake 跨平台建置系統

## 先決條件：現代 Fortran 編譯器

這個語言軌道需要支援 [Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) 的編譯器。過去幾年發布的所有主要編譯器應該都相容。

以下將說明 [GNU Fortran](https://gcc.gnu.org/fortran/)（即 GFortran）的安裝方式。其他 Fortran 編譯器列在[這裡](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers)。[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) 是高效能應用程式中熱門的專有選擇。多數練習都能搭配 Intel Fortran 運作，但我們只用 GNU Fortran 測試，因此實際情況可能會有所不同。

## 先決條件：CMake

CMake 是一套開源的跨平台建置系統，能為你原生環境的建置系統（`make`、Visual Studio、Xcode 等）產生建置指令碼。Exercism 的 Fortran 軌道使用 CMake，為你提供一套現成的建置流程，它會：

- 編譯測試
- 編譯你的解答
- 連結測試執行檔
- 在每次建置時自動執行測試
- 若任何測試失敗，就讓建置失敗

使用 CMake 讓 Exercism 能提供跨平台的建置指令碼，可為 Visual Studio、Xcode 等整合開發環境產生專案檔。這讓你能專注在問題本身，不必為每個練習煩惱該如何設定建置環境。

要做出可攜的建置並不容易，而且需要存取許多不同類型的系統。如果你在使用我們提供的 CMake 設定時遇到任何問題，請[回報問題](https://github.com/exercism/fortran/issues)，讓我們能改進 CMake 的支援。

使用提供的建置設定需要 [CMake 2.8.11 或更新版本](http://www.cmake.org/)。

### Linux

Ubuntu 16.04 及更新版本的套件管理員中已有相容的編譯器，因此只要執行下列指令即可安裝必要的編譯器：

```bash
sudo apt-get install gfortran cmake
```

至於其他發行版，你應該可以透過套件管理員取得編譯器。

### MacOS

MacOS 使用者可以透過 [Homebrew](http://brew.sh/) 安裝 GCC：

```bash
brew install gfortran cmake
```

### Windows

在 Windows 上有幾種選擇：

- [Windows Subsystem for Linux (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [在 Windows 上使用 MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [在 Windows 上使用 Visual Studio 搭配 NMake 與 Intel Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 導入了 [Windows Subsystem for Linux (WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)。如果你是以 Ubuntu 16.04 或更新版本作為子系統，請開啟 Ubuntu Bash shell，並依照 [Linux](####-Linux) 的指示操作。

#### 在 Windows 上使用 MingW GNU Fortran

Windows 使用者可以透過 [MingW](http://www.mingw.org/) 取得 GNU Fortran。最簡單的方式是先安裝 [chocolatey](https://chocolatey.org)，接著開啟以系統管理員身分執行的 cmd shell，然後執行：

```Batchfile
choco install mingw cmake
```

這會將 MingW（GFortran 與 GCC）安裝到`C:\tools\mingw64`，並將 CMake 安裝到`C:\Program Files\CMake`。接著把這些安裝的`bin`目錄加入 PATH，也就是：

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### 在 Windows 上使用 Visual Studio 搭配 NMake 與 Intel Fortran

請參閱 [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

使用 [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) 時，你必須先初始化 Fortran 編譯器。在 Windows 上搭配 Intel Fortran 2019 與 Visual Studio 2017 時，命令列應該如下：

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

這會設定 Intel Fortran 的路徑，cmake 應該就能正確找到它。另外，在 Windows 上進行命令列建置時，你應該指定 cmake 產生器`NMake`，例如：

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

上述指令會建立一個`build`目錄（非必要，但這是好習慣），並建置（NMake）執行檔、測試它們（ctest）。

至於其他版本的 Intel Fortran，你需要在 Windows 上的安裝目錄中尋找`ifortvars.bat`，在 Linux/macOS 上則尋找`ifortvars.sh`。在不加選項的情況下於 shell 中執行該指令碼，說明訊息會告訴你有哪些選項可用。在 Linux 或 MacOS 上，指令會是：

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
