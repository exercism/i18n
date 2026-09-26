# Requisitos previos

La pista de lenguaje Fortran requiere que tengas el siguiente software instalado en tu sistema:

- un compilador de Fortran moderno
- el sistema de compilación multiplataforma CMake

## Requisito previo: un compilador de Fortran moderno

Esta pista de lenguaje requiere un compilador con compatibilidad con [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Todos los
compiladores importantes publicados en los últimos años deberían ser
compatibles.

A continuación se describe la instalación de [GNU
Fortran](https://gcc.gnu.org/fortran/) o GFortran. Otros compiladores de
Fortran están listados
[aquí](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) es una
opción privativa popular para aplicaciones de alto rendimiento. La mayoría
de los ejercicios funcionarán con Intel Fortran, pero solo están probados con GNU
Fortran, así que tu experiencia puede variar.

## Requisito previo: CMake

CMake es un sistema de compilación multiplataforma de código abierto que genera
scripts de compilación para tu sistema de compilación nativo (`make`, Visual Studio, Xcode, etc.).
La pista de Fortran de Exercism usa CMake para darte una compilación ya lista que:

- compila las pruebas
- compila tu solución
- enlaza el ejecutable de las pruebas
- ejecuta las pruebas automáticamente como parte de cada compilación
- hace fallar la compilación si alguna de las pruebas falla

Usar CMake le permite a Exercism ofrecer un script de compilación multiplataforma que
puede generar archivos de proyecto para entornos de desarrollo integrados como
Visual Studio y Xcode. Esto te permite concentrarte en el problema y
no preocuparte por configurar una compilación para cada ejercicio.

Conseguir una compilación portátil no es fácil y requiere acceso a muchos tipos de
sistemas. Si tienes algún problema con la receta de CMake que te
proporcionamos, [reporta el problema](https://github.com/exercism/fortran/issues) para que podamos
mejorar el soporte de CMake.

Se requiere [CMake 2.8.11 o posterior](http://www.cmake.org/) para usar la receta de compilación que te proporcionamos.

### Linux

Ubuntu 16.04 y posteriores tienen compiladores compatibles en el gestor de paquetes, así que
instalar el compilador necesario se puede hacer con

```bash
sudo apt-get install gfortran cmake
```

Para otras distribuciones, deberías poder obtener el compilador a través de tu
gestor de paquetes.

### MacOS

Quienes usan MacOS pueden instalar GCC con [Homebrew](http://brew.sh/) mediante

```bash
brew install gfortran cmake
```

### Windows

Con Windows hay varias opciones:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows con MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows con Visual Studio, NMake e Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 incorpora el [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Si
tienes Ubuntu 16.04 o posterior como subsistema, abre una shell de Bash de Ubuntu
y sigue las instrucciones de [Linux](####-Linux).

#### Windows con MingW GNU Fortran

Quienes usan Windows pueden obtener GNU Fortran a través de
[MingW](http://www.mingw.org/).
La forma más fácil es instalar primero [chocolatey](https://chocolatey.org)
y luego abrir una shell de cmd como administrador y ejecutar:

```Batchfile
choco install mingw cmake
```

Esto instalará MingW (GFortran y GCC) en `C:\tools\mingw64` y
CMake en `C:\Program Files\CMake`. Luego agrega los directorios `bin` de
estas instalaciones al PATH, es decir:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows con Visual Studio, NMake e Intel Fortran

Consulta [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Para [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
primero tienes que inicializar el compilador de Fortran. En Windows con Intel
Fortran 2019 y Visual Studio 2017, la línea de comandos debería ser:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Esto carga las rutas de Intel Fortran y CMake debería detectarlo
correctamente. Además, en Windows deberías especificar el generador de CMake
`NMake` para una compilación desde la línea de comandos, por ejemplo:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Los comandos de arriba crearán un directorio `build` (no es necesario, pero
es una buena práctica), compilarán los ejecutables (con NMake) y los probarán (con ctest).

Para otras versiones de Intel Fortran, busca en tu instalación
`ifortvars.bat` en Windows y `ifortvars.sh` en Linux/macOS.
Ejecuta el script en una shell sin opciones y la ayuda te explicará
qué opciones tienes. En Linux o MacOS, los comandos serían:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
