# Installation

Le parcours Idris utilise [Pack][], un gestionnaire de paquets pour Idris2.

### Préparation : Ubuntu 24.04 ou version ultérieure

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Préparation : autres distributions Linux

Assure-toi de disposer d'une version récente de git, 2.35.1 ou ultérieure.

Configure Chez Scheme avec la prise en charge des threads.


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

### Préparation : MacOS

Les utilisateurs de MacOS peuvent installer Chez Scheme avec [Homebrew][] :

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

### Résolution de problèmes

Consulte les [instructions d'installation][installation instructions] détaillées de Pack.

### Images Docker

Stefan Höck fournit des [images Docker][Docker images] basées sur Ubuntu, avec Pack installé.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
