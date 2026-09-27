# Voraussetzungen

Der Fortran-Track setzt voraus, dass du die folgende Software auf deinem System installiert hast:

- einen modernen Fortran-Compiler
- das plattformübergreifende Buildsystem CMake

## Voraussetzung: Ein moderner Fortran-Compiler

Dieser Track setzt einen Compiler mit Unterstützung für [Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) voraus. Alle wichtigen Compiler, die in den letzten Jahren erschienen sind, sollten kompatibel sein.

Im Folgenden wird die Installation von [GNU Fortran](https://gcc.gnu.org/fortran/) oder GFortran beschrieben. Andere Fortran-Compiler sind [hier](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers) aufgelistet. [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) ist eine beliebte proprietäre Wahl für hochperformante Anwendungen. Die meisten Übungen funktionieren mit Intel Fortran, werden aber nur mit GNU Fortran getestet, daher kann das Ergebnis abweichen.

## Voraussetzung: CMake

CMake ist ein plattformübergreifendes Open-Source-Buildsystem, das Buildskripte für dein natives Buildsystem erzeugt (`make`, Visual Studio, Xcode usw.). Der Fortran-Track von Exercism verwendet CMake, um dir einen fertigen Build zu liefern, der:

- die Tests kompiliert
- deine Lösung kompiliert
- die ausführbare Testdatei linkt
- die Tests bei jedem Build automatisch ausführt
- den Build fehlschlagen lässt, wenn Tests fehlschlagen

Mit CMake kann Exercism ein plattformübergreifendes Buildskript bereitstellen, das Projektdateien für integrierte Entwicklungsumgebungen wie Visual Studio und Xcode erzeugen kann. So kannst du dich auf das Problem konzentrieren und musst dir keine Gedanken über die Einrichtung eines Builds für jede Übung machen.

Ein portabler Build ist nicht einfach zu bekommen und erfordert Zugriff auf viele verschiedene Systeme. Wenn du Probleme mit dem mitgelieferten CMake-Rezept hast, [melde das Problem bitte](https://github.com/exercism/fortran/issues), damit wir die CMake-Unterstützung verbessern können.

[CMake 2.8.11 oder neuer](http://www.cmake.org/) ist erforderlich, um das bereitgestellte Buildrezept zu verwenden.

### Linux

Ubuntu 16.04 und neuer haben kompatible Compiler im Paketmanager, daher kannst du den nötigen Compiler so installieren:

```bash
sudo apt-get install gfortran cmake
```

Bei anderen Distributionen solltest du den Compiler über deinen Paketmanager beziehen können.

### MacOS

MacOS-Nutzer können GCC mit [Homebrew](http://brew.sh/) so installieren:

```bash
brew install gfortran cmake
```

### Windows

Unter Windows gibt es mehrere Möglichkeiten:

- [Windows Subsystem for Linux (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows mit MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows mit Visual Studio mit NMake und Intel Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 führt das [Windows Subsystem for Linux (WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) ein. Wenn du Ubuntu 16.04 oder neuer als Subsystem hast, öffne eine Ubuntu-Bash-Shell und folge den Anweisungen für [Linux](####-Linux).

#### Windows mit MingW GNU Fortran

Windows-Nutzer können GNU Fortran über [MingW](http://www.mingw.org/) bekommen. Am einfachsten installierst du zuerst [chocolatey](https://chocolatey.org), öffnest dann eine Administrator-CMD-Shell und führst Folgendes aus:

```Batchfile
choco install mingw cmake
```

Dadurch wird MingW (GFortran und GCC) nach `C:\tools\mingw64` installiert und CMake nach `C:\Program Files\CMake`. Füge dann die `bin`-Verzeichnisse dieser Installationen zum PATH hinzu, also:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows mit Visual Studio mit NMake und Intel Fortran

Siehe [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Für [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) musst du zuerst den Fortran-Compiler initialisieren. Unter Windows mit Intel Fortran 2019 und Visual Studio 2017 sollte die Kommandozeile so aussehen:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Dadurch werden die Pfade für Intel Fortran geladen, und CMake sollte sie korrekt erkennen. Außerdem solltest du unter Windows für einen Kommandozeilen-Build den CMake-Generator `NMake` angeben, z. B.:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Die obigen Befehle erstellen ein `build`-Verzeichnis (nicht notwendig, aber gute Praxis), bauen mit NMake die ausführbaren Dateien und testen sie (ctest).

Bei anderen Versionen von Intel Fortran suchst du in deiner Installation unter Windows nach `ifortvars.bat` und unter Linux/macOS nach `ifortvars.sh`. Führe das Skript in einer Shell ohne Optionen aus, dann erklärt dir eine Hilfe, welche Optionen es gibt. Unter Linux oder MacOS wären die Befehle:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
