# 安装

Idris 赛道使用 [Pack][]，这是一个 Idris2 包管理器。

### 准备工作：Ubuntu 24.04 或更高版本

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### 准备工作：其他 Linux 发行版

确保你安装了较新的 git，版本 2.35.1 或更高。

配置 Chez Scheme，使其支持线程。


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

### 准备工作：MacOS

MacOS 用户可以用 [Homebrew][] 安装 Chez Scheme：

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

### 疑难解答

请参阅 Pack 提供的详细[安装说明][installation instructions]。

### Docker 镜像

Stefan Höck 提供了基于 Ubuntu 的 [Docker 镜像][Docker images]，其中已安装 Pack。

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
