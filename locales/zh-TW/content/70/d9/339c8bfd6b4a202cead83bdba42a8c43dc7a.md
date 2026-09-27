# 安裝

Idris 課程使用 [Pack][]，這是一套 Idris2 套件管理工具。

### 事前準備：Ubuntu 24.04 或更新版本

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### 事前準備：其他 Linux 發行版

請確認你的 git 版本夠新，至少為 2.35.1 或更新。

設定 Chez Scheme，讓它支援執行緒。

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

### 事前準備：macOS

macOS 使用者可以用 [Homebrew][] 安裝 Chez Scheme：

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

### 疑難排解

請參閱 Pack 詳細的[安裝說明][installation instructions]。

### Docker 映像檔

Stefan Höck 提供了以 Ubuntu 為基礎、已安裝 Pack 的 [Docker 映像檔][Docker images]。

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
