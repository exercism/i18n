# Requisitos previos

El track de lenguaje Fortran requiere que tengas instalado en tu sistema el siguiente software:

- un compilador de Fortran moderno
- el sistema de compilación multiplataforma CMake

## Requisito previo: un compilador de Fortran moderno

Este track de lenguaje requiere un compilador compatible con [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Todos los
compiladores principales publicados en los últimos años deberían ser
compatibles.

A continuación se describe la instalación de [GNU
Fortran](https://gcc.gnu.org/fortran/) o GFortran. Puedes consultar otros
compiladores de Fortran
[aquí](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) es una
opción propietaria popular para aplicaciones de alto rendimiento. La mayoría
de los ejercicios funcionarán con Intel Fortran, pero solo se prueban con GNU
Fortran, así que los resultados pueden variar.

## Requisito previo: CMake

CMake es un sistema de compilación multiplataforma de código abierto que genera
scripts de compilación para tu sistema de compilación nativo (`make`, Visual Studio, Xcode, etc.).
El track de Fortran de Exercism usa CMake para ofrecerte una compilación ya preparada que:

- compila las pruebas
- compila tu solución
- enlaza el ejecutable de las pruebas
- ejecuta automáticamente las pruebas como parte de cada compilación
- hace que la compilación falle si alguna prueba falla

Usar CMake permite a Exercism ofrecer un script de compilación multiplataforma que
puede generar archivos de proyecto para entornos de desarrollo integrados como
Visual Studio y Xcode. Esto te permite centrarte en el problema y
no preocuparte por configurar una compilación para cada ejercicio.

Conseguir una compilación portátil no es fácil y requiere acceso a muchos tipos de
sistemas. Si tienes algún problema con la receta de CMake que te proporcionamos,
[informa del problema](https://github.com/exercism/fortran/issues) para que podamos
mejorar la compatibilidad con CMake.

Se requiere [CMake 2.8.11 o posterior](http://www.cmake.org/) para usar la receta de compilación que se proporciona.

### Linux

Ubuntu 16.04 y posteriores incluyen compiladores compatibles en el gestor de paquetes, así que
puedes instalar el compilador necesario con

```bash
sudo apt-get install gfortran cmake
```

En otras distribuciones, deberías poder obtener el compilador a través de tu
gestor de paquetes.

### MacOS

Los usuarios de MacOS pueden instalar GCC con [Homebrew](http://brew.sh/) mediante

```bash
brew install gfortran cmake
```

### Windows

En Windows tienes varias opciones:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows con MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows con Visual Studio con NMake e Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 incorpora el [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Si
tienes Ubuntu 16.04 o posterior como subsistema, abre un shell de Bash de Ubuntu
y sigue las instrucciones de [Linux](####-Linux).

#### Windows con MingW GNU Fortran

Los usuarios de Windows pueden obtener GNU Fortran a través de
[MingW](http://www.mingw.org/).
La forma más sencilla es instalar primero [chocolatey](https://chocolatey.org)
y después abrir un shell de cmd como administrador y ejecutar:

```Batchfile
choco install mingw cmake
```

Esto instalará MingW (GFortran y GCC) en `C:\tools\mingw64` y
CMake en `C:\Program Files\CMake`. Después añade los directorios `bin` de
estas instalaciones al PATH, es decir:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows con Visual Studio con NMake e Intel Fortran

Consulta [Intel Fortran](###-Intel-Fortran).

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

Los comandos anteriores crearán un directorio `build` (no es necesario, pero es
una buena práctica), compilarán (con NMake) los ejecutables y los probarán (con ctest).

Para otras versiones de Intel Fortran, busca en tu instalación
`ifortvars.bat` en Windows y `ifortvars.sh` en Linux/macOS.
Ejecuta el script en un shell sin opciones y una ayuda te explicará
qué opciones tienes. En Linux o MacOS, los comandos serían:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
