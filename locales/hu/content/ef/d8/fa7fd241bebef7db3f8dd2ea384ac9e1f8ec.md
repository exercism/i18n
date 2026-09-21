# Előfeltételek

A Fortran nyelvi kurzushoz az alábbi szoftvereknek kell telepítve lenniük a rendszereden:

- egy modern Fortran-fordító
- a CMake platformfüggetlen build rendszer

## Előfeltétel: modern Fortran-fordító

Ez a nyelvi kurzus olyan fordítót igényel, amely támogatja a [Fortran
2003-at](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Az elmúlt
néhány évben kiadott összes nagyobb fordítónak kompatibilisnek kell lennie.

A következő rész a [GNU
Fortran](https://gcc.gnu.org/fortran/) vagy GFortran telepítését írja le. Más
Fortran-fordítók listája
[itt](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers)
található.
Az [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) népszerű,
zárt forrású választás nagy teljesítményű alkalmazásokhoz. A legtöbb feladat
működik az Intel Fortrannal is, de azokat csak GNU Fortrannal teszteljük, így
az eredmény változhat.

## Előfeltétel: CMake

A CMake egy nyílt forráskódú, platformfüggetlen build rendszer, amely build
szkripteket generál a saját natív build rendszeredhez (`make`, Visual Studio,
Xcode stb.). Az Exercism Fortran-kurzusa a CMake-et használja, hogy egy kész
buildet adjon neked, amely:

- lefordítja a teszteket
- lefordítja a megoldásodat
- linkeli a teszt futtatható fájlt
- minden build részeként automatikusan lefuttatja a teszteket
- sikertelenné teszi a buildet, ha bármelyik teszt megbukik

A CMake használatával az Exercism olyan platformfüggetlen build szkriptet tud
biztosítani, amely projektfájlokat generál olyan integrált fejlesztői
környezetekhez, mint a Visual Studio és az Xcode. Így arra összpontosíthatsz,
ami a probléma, és nem kell azzal törődnöd, hogy minden feladathoz beállítsd a
buildet.

Egy hordozható build összeállítása nem könnyű, és sokféle rendszerhez kell
hozzáférés. Ha bármilyen problémába ütközöl a mellékelt CMake-recepttel, kérünk,
[jelentsd a hibát](https://github.com/exercism/fortran/issues), hogy javíthassuk
a CMake támogatását.

A megadott build-recept használatához a [CMake 2.8.11 vagy
újabb](http://www.cmake.org/) verziója szükséges.

### Linux

Az Ubuntu 16.04 és újabb verzióiban a csomagkezelőben kompatibilis fordítók
vannak, így a szükséges fordító telepítése ezzel elvégezhető:

```bash
sudo apt-get install gfortran cmake
```

Más disztribúciók esetén a fordítót a csomagkezelődből tudod beszerezni.

### MacOS

A MacOS felhasználói a GCC-t a [Homebrew](http://brew.sh/) segítségével
telepíthetik így:

```bash
brew install gfortran cmake
```

### Windows

Windows esetén több lehetőség is van:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows MingW GNU Fortrannal](#####-Windows-with-MingW-GNU-Fortran)
- [Windows Visual Studio-val, NMake-mal és Intel
  Fortrannal](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

A Windows 10 bevezeti a [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) alrendszert. Ha
az alrendszerként Ubuntu 16.04-et vagy újabbat használsz, nyiss egy Ubuntu Bash
shellt, és kövesd a [Linux](####-Linux) utasításait.

#### Windows MingW GNU Fortrannal

A Windows-felhasználók a GNU Fortrant a
[MingW](http://www.mingw.org/) segítségével szerezhetik be.
A legegyszerűbb, ha először telepíted a [chocolatey](https://chocolatey.org)-t,
majd megnyitsz egy rendszergazdai cmd shellt, és lefuttatod:

```Batchfile
choco install mingw cmake
```

Ez a MingW-t (GFortrant és GCC-t) a `C:\tools\mingw64`, a CMake-et pedig a
`C:\Program Files\CMake` könyvtárba telepíti. Ezután add hozzá ezen telepítések
`bin` könyvtárait a PATH-hoz, azaz:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows Visual Studio-val, NMake-mal és Intel Fortrannal

Lásd: [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Az [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) esetén
először inicializálnod kell a Fortran-fordítót. Windows alatt Intel Fortran
2019-cel és Visual Studio 2017-tel a parancssor így néz ki:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Ez betölti az Intel Fortran útvonalait, és a cmake-nek ezt helyesen fel kell
ismernie. Windows alatt a parancssori buildhez meg kell adnod az `NMake`
cmake-generátort is, például:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

A fenti parancsok létrehoznak egy `build` könyvtárat (nem kötelező, de jó
gyakorlat), felépítik (NMake) a futtatható fájlokat, majd tesztelik őket (ctest).

Az Intel Fortran más verzióinál a telepítésedben a Windowson az `ifortvars.bat`,
Linuxon/macOS-en pedig az `ifortvars.sh` fájlt keresd. Futtasd a szkriptet egy
shellben kapcsolók nélkül, és a súgó elmagyarázza, milyen lehetőségeid vannak.
Linuxon vagy MacOS-en a parancsok így néznek ki:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
