# Prérequis

Le parcours Fortran exige que les logiciels suivants soient installés sur ton système :

- un compilateur Fortran moderne
- le système de compilation multiplateforme CMake

## Prérequis : un compilateur Fortran moderne

Ce parcours exige un compilateur compatible avec [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Tous les grands compilateurs sortis ces dernières années devraient convenir.

Ce qui suit décrit l'installation de [GNU
Fortran](https://gcc.gnu.org/fortran/), ou GFortran. D'autres compilateurs Fortran sont listés
[ici](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) est un choix propriétaire populaire pour les applications hautes performances. La plupart des exercices fonctionneront avec Intel Fortran, mais ils ne sont testés qu'avec GNU Fortran, donc les résultats peuvent varier.

## Prérequis : CMake

CMake est un système de compilation multiplateforme open source qui génère des scripts de compilation pour ton système de compilation natif (`make`, Visual Studio, Xcode, etc.). Le parcours Fortran d'Exercism utilise CMake pour te fournir une compilation prête à l'emploi qui :

- compile les tests
- compile ta solution
- lie l'exécutable de test
- exécute automatiquement les tests à chaque compilation
- fait échouer la compilation si un test échoue

Utiliser CMake permet à Exercism de fournir un script de compilation multiplateforme capable de générer des fichiers de projet pour des environnements de développement intégrés comme Visual Studio et Xcode. Tu peux ainsi te concentrer sur le problème sans te soucier de la configuration d'une compilation pour chaque exercice.

Obtenir une compilation portable n'est pas chose facile et demande d'avoir accès à de nombreux types de systèmes. Si tu rencontres le moindre problème avec la recette CMake fournie, [signale-le](https://github.com/exercism/fortran/issues) pour que nous puissions améliorer la prise en charge de CMake.

[CMake 2.8.11 ou une version ultérieure](http://www.cmake.org/) est nécessaire pour utiliser la recette de compilation fournie.

### Linux

Ubuntu 16.04 et les versions ultérieures disposent de compilateurs compatibles dans leur gestionnaire de paquets, donc tu peux installer le compilateur nécessaire avec

```bash
sudo apt-get install gfortran cmake
```

Pour les autres distributions, tu devrais pouvoir obtenir le compilateur via ton gestionnaire de paquets.

### MacOS

Sous MacOS, tu peux installer GCC avec [Homebrew](http://brew.sh/) via

```bash
brew install gfortran cmake
```

### Windows

Sous Windows, plusieurs options s'offrent à toi :

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows with MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows with Visual Studio with NMake and Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 introduit le [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Si tu disposes d'Ubuntu 16.04 ou d'une version ultérieure comme sous-système, ouvre un shell Bash Ubuntu et suis les instructions pour [Linux](####-Linux).

#### Windows with MingW GNU Fortran

Sous Windows, tu peux obtenir GNU Fortran via
[MingW](http://www.mingw.org/).
Le plus simple est d'installer d'abord [chocolatey](https://chocolatey.org), puis d'ouvrir un shell cmd en administrateur et d'exécuter :

```Batchfile
choco install mingw cmake
```

Cela installe MingW (GFortran et GCC) dans `C:\tools\mingw64` et CMake dans `C:\Program Files\CMake`. Ajoute ensuite les répertoires `bin` de ces installations au PATH, c'est-à-dire :

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows with Visual Studio with NMake and Intel Fortran

Voir [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Pour [Intel Fortran](https://software.intel.com/en-us/fortran-compilers), tu dois d'abord initialiser le compilateur Fortran. Sous Windows, avec Intel Fortran 2019 et Visual Studio 2017, la ligne de commande devrait être :

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Cela initialise les chemins pour Intel Fortran, et cmake devrait les récupérer correctement. De plus, sous Windows, tu devrais préciser le générateur cmake `NMake` pour une compilation en ligne de commande, par exemple :

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Les commandes ci-dessus créent un répertoire `build` (pas indispensable, mais c'est une bonne pratique), compilent les exécutables avec NMake et les testent avec ctest.

Pour d'autres versions d'Intel Fortran, cherche `ifortvars.bat` dans ton installation sous Windows, et `ifortvars.sh` sous Linux ou MacOS. Exécute le script dans un shell sans option et une aide t'expliquera quelles options s'offrent à toi. Sous Linux ou MacOS, les commandes seraient :

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
