# Pré-requisitos

A trilha de Fortran exige que você tenha os seguintes softwares instalados no seu sistema:

- um compilador Fortran moderno
- o sistema de build multiplataforma CMake

## Pré-requisito: um compilador Fortran moderno

Esta trilha exige um compilador com suporte a [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Todos os
principais compiladores lançados nos últimos anos devem ser compatíveis.

O texto a seguir descreve a instalação do [GNU
Fortran](https://gcc.gnu.org/fortran/) ou GFortran. Outros compiladores
Fortran estão listados
[aqui](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
O [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) é uma
escolha proprietária popular para aplicações de alto desempenho. A maioria
dos exercícios funciona com o Intel Fortran, mas eles são testados apenas com o
GNU Fortran, então os resultados podem variar.

## Pré-requisito: CMake

O CMake é um sistema de build multiplataforma de código aberto que gera scripts
de build para o seu sistema de build nativo (`make`, Visual Studio, Xcode, etc.).
A trilha de Fortran do Exercism usa o CMake para oferecer a você um build pronto que:

- compila os testes
- compila a sua solução
- faz a linkagem do executável de testes
- executa os testes automaticamente como parte de cada build
- falha o build se algum teste falhar

Usar o CMake permite que o Exercism forneça um script de build multiplataforma que
consegue gerar arquivos de projeto para ambientes de desenvolvimento integrados como
Visual Studio e Xcode. Assim você pode focar no problema e
não se preocupar em configurar um build para cada exercício.

Conseguir um build portável não é fácil e exige acesso a muitos tipos de
sistemas. Se você tiver qualquer problema com a receita de CMake fornecida,
por favor [reporte o problema](https://github.com/exercism/fortran/issues) para que possamos
melhorar o suporte ao CMake.

É necessário o [CMake 2.8.11 ou posterior](http://www.cmake.org/) para usar a receita de build fornecida.

### Linux

O Ubuntu 16.04 e posteriores têm compiladores compatíveis no gerenciador de pacotes, então
instalar o compilador necessário pode ser feito com

```bash
sudo apt-get install gfortran cmake
```

Para outras distribuições, você deve conseguir obter o compilador pelo seu
gerenciador de pacotes.

### MacOS

Usuários de MacOS podem instalar o GCC com o [Homebrew](http://brew.sh/) via

```bash
brew install gfortran cmake
```

### Windows

No Windows há várias opções:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows with MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows with Visual Studio with NMake and Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

O Windows 10 introduz o [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Se
você tiver o Ubuntu 16.04 ou posterior como subsistema, abra um shell Bash
do Ubuntu e siga as instruções para [Linux](####-Linux).

#### Windows com MingW GNU Fortran

Usuários de Windows podem obter o GNU Fortran por meio do
[MingW](http://www.mingw.org/).
O jeito mais fácil é primeiro instalar o [chocolatey](https://chocolatey.org)
e depois abrir um shell cmd como administrador e executar:

```Batchfile
choco install mingw cmake
```

Isso instala o MingW (GFortran e GCC) em `C:\tools\mingw64` e o
CMake em `C:\Program Files\CMake`. Depois adicione os diretórios `bin`
dessas instalações ao PATH, ou seja:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows com Visual Studio, NMake e Intel Fortran

Veja [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Para o [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
você precisa primeiro inicializar o compilador Fortran. No Windows com o Intel
Fortran 2019 e o Visual Studio 2017, a linha de comando deve ser:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Isso carrega os caminhos do Intel Fortran, e o cmake deve encontrá-lo
corretamente. Além disso, no Windows você deve especificar o gerador do cmake
`NMake` para um build de linha de comando, por exemplo:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Os comandos acima criam um diretório `build` (não é necessário, mas
é uma boa prática), compilam (NMake) os executáveis e os testam (ctest).

Para outras versões do Intel Fortran, procure na sua instalação por
`ifortvars.bat` no Windows e por `ifortvars.sh` no Linux/macOS.
Execute o script em um shell sem opções e uma mensagem de ajuda vai explicar
quais opções você tem. No Linux ou MacOS os comandos seriam:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
