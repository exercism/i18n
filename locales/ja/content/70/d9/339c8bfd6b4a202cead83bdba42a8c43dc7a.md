# インストール

Idrisのトラックでは、Idris2のパッケージマネージャーである[Pack][]を使います。

### 準備：Ubuntu 24.04以降

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### 準備：その他のLinuxディストリビューション

新しいgit（バージョン2.35.1以降）がインストールされていることを確認してください。

スレッドをサポートするようにChez Schemeを設定します。


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

### 準備：MacOS

MacOSでは、[Homebrew][]でChez Schemeをインストールできます。

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

### トラブルシューティング

詳しくは、Packの[インストール手順][installation instructions]を参照してください。

### Dockerイメージ

Stefan Höckは、Packをインストール済みのUbuntuベースの[Dockerイメージ][Docker images]を提供しています。

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
