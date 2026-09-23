# Встановлення

Трек Idris використовує [Pack][], менеджер пакетів для Idris2.

### Підготовка: Ubuntu 24.04 або новіша

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Підготовка: інші дистрибутиви Linux

Переконаймося, що в нас є свіжий git, версії 2.35.1 або новішої.

Налаштуймо Chez Scheme з підтримкою потоків.


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

### Підготовка: MacOS

Користувачі MacOS можуть встановити Chez Scheme за допомогою [Homebrew][]:

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

### Розвʼязання проблем

Дивіться докладні [інструкції зі встановлення][installation instructions] Pack.

### Образи Docker

Stefan Höck надає [образи Docker][Docker images] на базі Ubuntu зі встановленим Pack.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
