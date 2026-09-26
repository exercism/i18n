# 前提条件

Fortran 语言轨道要求你的系统上安装以下软件：

- 现代的 Fortran 编译器
- CMake 跨平台构建系统

## 前提条件：现代的 Fortran 编译器

这个语言轨道需要支持 [Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) 的编译器。近几年发布的所有主流编译器都应该兼容。

下面将介绍 [GNU Fortran](https://gcc.gnu.org/fortran/) 或 GFortran 的安装。其他 Fortran 编译器列在[这里](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers)。[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) 是高性能应用中常用的专有编译器。大多数练习都能配合 Intel Fortran 使用，但它们只在 GNU Fortran 下经过测试，因此实际效果可能有所不同。

## 前提条件：CMake

CMake 是一个开源的跨平台构建系统，能为你的原生构建系统（`make`、Visual Studio、Xcode 等）生成构建脚本。Exercism 的 Fortran 语言轨道使用 CMake，为你提供一个现成的构建流程，它会：

- 编译测试
- 编译你的解答
- 链接测试可执行文件
- 在每次构建时自动运行测试
- 如果有任何测试失败，就让构建失败

使用 CMake 让 Exercism 能够提供一个跨平台的构建脚本，可以为 Visual Studio 和 Xcode 之类的集成开发环境生成项目文件。这样你就能专注于问题本身，而不必为每个练习操心构建配置。

要实现可移植的构建并不容易，需要接触到许多不同类型的系统。如果你在使用提供的 CMake 方案时遇到任何问题，请[报告该问题](https://github.com/exercism/fortran/issues)，以便我们改进 CMake 支持。

要使用提供的构建方案，需要 [CMake 2.8.11 或更高版本](http://www.cmake.org/)。

### Linux

Ubuntu 16.04 及更高版本的软件包管理器中已经有兼容的编译器，因此安装所需的编译器只需运行

```bash
sudo apt-get install gfortran cmake
```

对于其他发行版，你应该可以通过自己的软件包管理器获取编译器。

### MacOS

MacOS 用户可以通过 [Homebrew](http://brew.sh/) 安装 GCC：

```bash
brew install gfortran cmake
```

### Windows

在 Windows 上有多种选择：

- [Windows Subsystem for Linux (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [在 Windows 上使用 MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [在 Windows 上使用 Visual Studio、NMake 和 Intel Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 引入了 [Windows Subsystem for Linux (WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)。如果你的子系统是 Ubuntu 16.04 或更高版本，请打开 Ubuntu Bash shell，并按照 [Linux](####-Linux) 部分的说明操作。

#### 在 Windows 上使用 MingW GNU Fortran

Windows 用户可以通过 [MingW](http://www.mingw.org/) 获取 GNU Fortran。最简单的做法是先安装 [chocolatey](https://chocolatey.org)，然后打开管理员 cmd shell，再运行：

```Batchfile
choco install mingw cmake
```

这会把 MingW（GFortran 和 GCC）安装到 `C:\tools\mingw64`，把 CMake 安装到 `C:\Program Files\CMake`。然后把这些安装目录下的 `bin` 目录加入 PATH，即：

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### 在 Windows 上使用 Visual Studio、NMake 和 Intel Fortran

参见 [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

对于 [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)，你必须先初始化 Fortran 编译器。在 Windows 上使用 Intel Fortran 2019 和 Visual Studio 2017 时，命令行应该是：

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

这会加载 Intel Fortran 的路径，CMake 应该能正确识别。另外，在 Windows 上进行命令行构建时，应指定 CMake 生成器 `NMake`，例如：

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

上面的命令会创建一个 `build` 目录（并非必需，但这是个好习惯），构建（NMake）可执行文件并测试（ctest）它们。

对于其他版本的 Intel Fortran，你需要在 Windows 安装目录中查找 `ifortvars.bat`，在 Linux/macOS 中查找 `ifortvars.sh`。在不带任何选项的情况下于 shell 中执行该脚本，帮助信息会说明有哪些选项可用。在 Linux 或 MacOS 上，命令是：

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
