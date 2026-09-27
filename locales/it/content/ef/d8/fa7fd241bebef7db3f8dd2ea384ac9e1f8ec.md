# Prerequisiti

La traccia del linguaggio Fortran richiede che tu abbia installato sul tuo sistema il seguente software:

- un compilatore Fortran moderno
- il sistema di build multipiattaforma CMake

## Prerequisito: un compilatore Fortran moderno

Questa traccia richiede un compilatore con supporto a [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Tutti i
principali compilatori rilasciati negli ultimi anni dovrebbero essere
compatibili.

Di seguito descriviamo l'installazione di [GNU
Fortran](https://gcc.gnu.org/fortran/) o GFortran. Altri compilatori
Fortran sono elencati
[qui](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) è una
scelta proprietaria molto diffusa per le applicazioni ad alte prestazioni.
La maggior parte degli esercizi funzionerà con Intel Fortran, ma sono
testati solo con GNU Fortran, quindi i risultati possono variare.

## Prerequisito: CMake

CMake è un sistema di build multipiattaforma open source che genera
script di build per il tuo sistema di build nativo (`make`, Visual Studio, Xcode, ecc.).
La traccia Fortran di Exercism usa CMake per offrirti una build già pronta che:

- compila i test
- compila la soluzione
- collega l'eseguibile dei test
- esegue automaticamente i test a ogni build
- fa fallire la build se uno qualsiasi dei test fallisce

Usare CMake permette ad Exercism di fornire uno script di build
multipiattaforma in grado di generare i file di progetto per ambienti di
sviluppo integrati come Visual Studio e Xcode. Così puoi concentrarti sul
problema e non preoccuparti di configurare una build per ogni esercizio.

Ottenere una build portabile non è facile e richiede l'accesso a molti tipi di
sistemi. Se incontri problemi con la ricetta CMake fornita,
[segnala il problema](https://github.com/exercism/fortran/issues) così possiamo
migliorare il supporto a CMake.

Per usare la ricetta di build fornita serve [CMake 2.8.11 o successivo](http://www.cmake.org/).

### Linux

Ubuntu 16.04 e versioni successive hanno compilatori compatibili nel gestore
dei pacchetti, quindi per installare il compilatore necessario basta:

```bash
sudo apt-get install gfortran cmake
```

Per altre distribuzioni, dovresti poter ottenere il compilatore tramite il tuo
gestore dei pacchetti.

### MacOS

Gli utenti MacOS possono installare GCC con [Homebrew](http://brew.sh/) tramite

```bash
brew install gfortran cmake
```

### Windows

Con Windows ci sono diverse opzioni:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows con MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows con Visual Studio con NMake e Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 introduce il [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Se
hai Ubuntu 16.04 o successivo come sottosistema, apri una shell Bash di
Ubuntu e segui le istruzioni per [Linux](####-Linux).

#### Windows con MingW GNU Fortran

Gli utenti Windows possono ottenere GNU Fortran tramite
[MingW](http://www.mingw.org/).
Il modo più semplice è installare prima [chocolatey](https://chocolatey.org),
poi aprire una shell cmd come amministratore ed eseguire:

```Batchfile
choco install mingw cmake
```

Questo installerà MingW (GFortran e GCC) in `C:\tools\mingw64` e
CMake in `C:\Program Files\CMake`. Poi aggiungi le directory `bin` di
queste installazioni al PATH, cioè:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows con Visual Studio con NMake e Intel Fortran

Vedi [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Per [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
devi prima inizializzare il compilatore Fortran. Su Windows con Intel
Fortran 2019 e Visual Studio 2017 la riga di comando dovrebbe essere:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Questo carica i percorsi per Intel Fortran e cmake dovrebbe rilevarli
correttamente. Inoltre, su Windows dovresti specificare il generatore cmake
`NMake` per una build da riga di comando, ad esempio

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

I comandi qui sopra creeranno una directory `build` (non necessaria, ma è
buona pratica), compileranno (NMake) gli eseguibili e li testeranno (ctest).

Per altre versioni di Intel Fortran, conviene cercare `ifortvars.bat` nella
tua installazione su Windows e `ifortvars.sh` su Linux/macOS.
Esegui lo script in una shell senza opzioni e un messaggio di aiuto spiegherà
quali opzioni hai. Su Linux o MacOS i comandi sarebbero:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
