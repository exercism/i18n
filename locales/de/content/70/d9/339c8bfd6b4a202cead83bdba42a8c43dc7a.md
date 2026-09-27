# Installation

Der Idris-Track verwendet [Pack][], einen Paketmanager für Idris2.

### Vorbereitung - Ubuntu 24.04 oder neuer

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Vorbereitung - Andere Linux-Distributionen

Stelle sicher, dass du ein aktuelles git hast, Version 2.35.1 oder neuer.

Konfiguriere Chez Scheme mit Unterstützung für Threads.


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

### Vorbereitung - MacOS

Wenn du MacOS verwendest, kannst du Chez Scheme mit [Homebrew][] installieren:

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

### Fehlerbehebung

Sieh dir Packs ausführliche [Installationsanleitung][installation instructions] an.

### Docker-Images

Stefan Höck stellt Ubuntu-basierte [Docker-Images][Docker images] mit installiertem Pack bereit.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
