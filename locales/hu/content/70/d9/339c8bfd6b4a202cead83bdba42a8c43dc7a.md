# Telepítés

Az Idris kurzus a [Pack][Pack] nevű Idris2 csomagkezelőt használja.

### Előkészítés - Ubuntu 24.04 vagy újabb

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Előkészítés - Egyéb Linux disztribúciók

Győződj meg róla, hogy a git legalább 2.35.1-es verzióval rendelkezik.

Konfiguráld a Chez Scheme-et szálak támogatásával.


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

### Előkészítés - MacOS

A MacOS felhasználók a [Homebrew][] segítségével telepíthetik a Chez Scheme-et:

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

### Hibaelhárítás

Lásd a Pack részletes [telepítési útmutatóját][installation instructions].

### Docker-lemezképek

Stefan Höck Ubuntu-alapú [Docker-lemezképeket][Docker images] biztosít, amelyeken a Pack telepítve van.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
