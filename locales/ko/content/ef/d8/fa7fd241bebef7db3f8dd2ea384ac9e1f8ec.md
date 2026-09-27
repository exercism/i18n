# 사전 준비 사항

Fortran 트랙을 사용하려면 시스템에 다음 소프트웨어가 설치되어 있어야 해요:

- 최신 Fortran 컴파일러
- CMake 크로스 플랫폼 빌드 시스템

## 사전 준비: 최신 Fortran 컴파일러

이 트랙에는 [Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003)을 지원하는 컴파일러가 필요해요. 최근 몇 년 사이에 출시된 주요 컴파일러는 모두 호환될 거예요.

다음 내용은 [GNU Fortran](https://gcc.gnu.org/fortran/) 또는 GFortran의 설치 방법을 설명해요. 다른 Fortran 컴파일러는 [여기](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers)에 나와 있어요. [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)은 고성능 애플리케이션에서 널리 쓰이는 상용 컴파일러예요. 대부분의 연습 문제는 Intel Fortran에서도 동작하지만, 테스트는 GNU Fortran으로만 이루어지므로 결과가 다를 수 있어요.

## 사전 준비: CMake

CMake는 오픈 소스 크로스 플랫폼 빌드 시스템으로, 사용하는 네이티브 빌드 시스템(`make`, Visual Studio, Xcode 등)에 맞는 빌드 스크립트를 생성해요. Exercism의 Fortran 트랙은 CMake를 사용해서 바로 쓸 수 있는 빌드 환경을 제공해요. 이 빌드는:

- 테스트를 컴파일하고
- 풀이를 컴파일하고
- 테스트 실행 파일을 링크하고
- 빌드할 때마다 자동으로 테스트를 실행하고
- 테스트가 하나라도 실패하면 빌드를 실패로 처리해요

CMake를 사용하면 Exercism이 Visual Studio나 Xcode 같은 통합 개발 환경용 프로젝트 파일을 생성할 수 있는 크로스 플랫폼 빌드 스크립트를 제공할 수 있어요. 덕분에 연습 문제마다 빌드 환경을 설정할 걱정 없이 문제 해결에 집중할 수 있어요.

이식성 있는 빌드를 만드는 일은 쉽지 않고, 다양한 종류의 시스템에 접근해야 해요. 제공된 CMake 레시피에 문제가 있다면 [이슈를 알려주세요](https://github.com/exercism/fortran/issues). 그러면 CMake 지원을 개선할 수 있어요.

제공된 빌드 레시피를 사용하려면 [CMake 2.8.11 이상](http://www.cmake.org/)이 필요해요.

### Linux

Ubuntu 16.04 이상에는 패키지 관리자에 호환되는 컴파일러가 있어서, 필요한 컴파일러를 다음 명령으로 설치할 수 있어요.

```bash
sudo apt-get install gfortran cmake
```

다른 배포판에서는 패키지 관리자를 통해 컴파일러를 구할 수 있을 거예요.

### MacOS

MacOS에서는 [Homebrew](http://brew.sh/)로 GCC를 설치할 수 있어요.

```bash
brew install gfortran cmake
```

### Windows

Windows에서는 여러 가지 방법이 있어요:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows with MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows with Visual Studio with NMake and Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10에는 [Linux용 Windows 하위 시스템(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)이 도입되었어요. 하위 시스템으로 Ubuntu 16.04 이상을 사용한다면, Ubuntu Bash 셸을 열고 [Linux](####-Linux) 안내를 따라 해봐요.

#### Windows with MingW GNU Fortran

Windows에서는 [MingW](http://www.mingw.org/)를 통해 GNU Fortran을 설치할 수 있어요. 가장 쉬운 방법은 먼저 [chocolatey](https://chocolatey.org)를 설치한 다음, 관리자 권한으로 cmd 셸을 열고 다음을 실행하는 거예요:

```Batchfile
choco install mingw cmake
```

이 명령은 MingW(GFortran과 GCC)를 `C:\tools\mingw64`에, CMake를 `C:\Program Files\CMake`에 설치해요. 그런 다음 이 설치들의 `bin` 디렉터리를 PATH에 추가해요. 즉:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows with Visual Studio with NMake and Intel Fortran

[Intel Fortran](###-Intel-Fortran)을 참고해요.

### Intel Fortran

[Intel Fortran](https://software.intel.com/en-us/fortran-compilers)을 사용하려면 먼저 Fortran 컴파일러를 초기화해야 해요. Windows에서 Intel Fortran 2019와 Visual Studio 2017을 사용한다면 명령줄은 다음과 같아요:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

이 명령은 Intel Fortran의 경로를 설정하고, cmake가 이를 올바르게 인식할 거예요. 또한 Windows에서 명령줄 빌드를 하려면 cmake 생성기로 `NMake`를 지정해야 해요. 예를 들어:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

위 명령은 `build` 디렉터리를 만들고(필수는 아니지만 좋은 관행이에요), 실행 파일을 빌드(NMake)한 뒤 테스트(ctest)해요.

다른 버전의 Intel Fortran을 사용한다면, Windows에서는 설치 경로에서 `ifortvars.bat`을, Linux/macOS에서는 `ifortvars.sh`를 찾아봐요. 옵션 없이 셸에서 이 스크립트를 실행하면 어떤 옵션을 사용할 수 있는지 도움말로 알려줘요. Linux나 MacOS에서는 명령이 다음과 같아요:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
