# Pré-requisitos

O percurso de Fortran exige que tenhas o seguinte software instalado no teu sistema:

- um compilador de Fortran moderno
- o sistema de compilação multiplataforma CMake

## Pré-requisito: um compilador de Fortran moderno

Este percurso exige um compilador com suporte para [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Todos os
compiladores principais lançados nos últimos anos deverão ser compatíveis.

O texto seguinte descreve a instalação do [GNU
Fortran](https://gcc.gnu.org/fortran/) ou GFortran. Outros compiladores
de Fortran estão listados
[aqui](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
O [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) é uma
escolha proprietária popular para aplicações de alto desempenho. A maioria
dos exercícios funciona com o Intel Fortran, mas só são testados com o GNU
Fortran, por isso os resultados podem variar.

## Pré-requisito: CMake

O CMake é um sistema de compilação multiplataforma de código aberto que gera
scripts de compilação para o teu sistema de compilação nativo (`make`, Visual Studio, Xcode, etc.).
O percurso de Fortran do Exercism usa o CMake para te dar uma compilação já pronta que:

- compila os testes
- compila a tua solução
- liga o executável dos testes
- executa automaticamente os testes em cada compilação
- falha a compilação se algum teste falhar

Usar o CMake permite ao Exercism fornecer um script de compilação multiplataforma que
consegue gerar ficheiros de projeto para ambientes de desenvolvimento integrados como o
Visual Studio e o Xcode. Assim, podes concentrar-te no problema e não te
preocupares em configurar uma compilação para cada exercício.

Conseguir uma compilação portátil não é fácil e exige acesso a muitos tipos de
sistemas. Se tiveres algum problema com a receita de CMake fornecida,
[comunica o problema](https://github.com/exercism/fortran/issues) para que possamos
melhorar o suporte do CMake.

É necessário o [CMake 2.8.11 ou posterior](http://www.cmake.org/) para usar a receita de compilação fornecida.

### Linux

O Ubuntu 16.04 e versões posteriores têm compiladores compatíveis no gestor de
pacotes, por isso instalar o compilador necessário pode ser feito com

```bash
sudo apt-get install gfortran cmake
```

Noutras distribuições, deverás conseguir obter o compilador através do teu
gestor de pacotes.

### MacOS

Os utilizadores de MacOS podem instalar o GCC com o [Homebrew](http://brew.sh/) através de

```bash
brew install gfortran cmake
```

### Windows

No Windows há várias opções:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows com MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows com o Visual Studio, NMake e Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

O Windows 10 introduz o [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Se
tiveres o Ubuntu 16.04 ou posterior como subsistema, abre uma shell Bash
do Ubuntu e segue as instruções de [Linux](####-Linux).

#### Windows com MingW GNU Fortran

Os utilizadores de Windows podem obter o GNU Fortran através do
[MingW](http://www.mingw.org/).
A forma mais fácil é instalar primeiro o [chocolatey](https://chocolatey.org)
e depois abrir uma shell cmd de administrador e executar:

```Batchfile
choco install mingw cmake
```

Isto instala o MingW (GFortran e GCC) em `C:\tools\mingw64` e
o CMake em `C:\Program Files\CMake`. Depois adiciona os diretórios `bin`
destas instalações ao PATH, ou seja:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows com o Visual Studio, NMake e Intel Fortran

Consulta o [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Para o [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
tens primeiro de inicializar o compilador de Fortran. No Windows com o Intel
Fortran 2019 e o Visual Studio 2017, a linha de comandos deve ser:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Isto carrega os caminhos para o Intel Fortran e o CMake deverá detetá-lo
corretamente. Além disso, no Windows deves especificar o gerador do CMake
`NMake` para uma compilação a partir da linha de comandos, por exemplo:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Os comandos acima criam um diretório `build` (não é obrigatório, mas é
boa prática), compilam os executáveis com o NMake e testam-nos com o ctest.

Para outras versões do Intel Fortran, procura na tua instalação o
`ifortvars.bat` no Windows e o `ifortvars.sh` no Linux/macOS.
Executa o script numa shell sem opções e será apresentada uma ajuda que explica
as opções disponíveis. No Linux ou no MacOS, os comandos seriam:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
