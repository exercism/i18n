# Installazione

Il track Idris usa [Pack][], un gestore di pacchetti per Idris2.

### Preparazione: Ubuntu 24.04 o versioni successive

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Preparazione: altre distribuzioni Linux

Assicurati di avere una versione recente di git, la 2.35.1 o successiva.

Configura Chez Scheme con il supporto per i thread.


```shell
git version
sudo apt update
sudo apt install curl gcc libgmp-dev libncurses5-dev libx11-dev make

git clone https://github.com/cisco/ChezScheme.git
cd ChezScheme
./configure --threads
make
sudo make install
cd ..
which scheme
```

### Preparazione: MacOS

Gli utenti MacOS possono installare Chez Scheme con [Homebrew][]:

```
brew update
brew install chezscheme
```

### Pack

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/stefan-hoeck/idris2-pack/main/install.bash)"
export PATH="$HOME/.pack/bin:$PATH"
pack info
```

### Risoluzione dei problemi

Consulta le dettagliate [istruzioni di installazione][installation instructions] di Pack.

### Immagini Docker

Stefan Höck fornisce [immagini Docker][] basate su Ubuntu con Pack installato.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
