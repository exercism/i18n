# インストール

## Mac OS XでのHomebrew

Homebrewを最新の状態に更新しましょう：

```bash
$ brew update
```

ErlangとRebar3をインストールしましょう：

```bash
$ brew install erlang rebar@3
```

## Linuxの場合

* Fedora 17+とFedora Rawhide：`sudo yum -y install erlang`
* Arch Linux：`sudo pacman -S erlang`
* Ubuntu/Debian：`sudo apt-get install erlang`

上記のパッケージは古くなっていることがあります。少なくともUbuntu 16.04では、まだテストを実行できるはずです。お使いのパッケージが古くなりすぎている場合（OTP 17.0より古い場合）は、代わりにソースからビルドするか、[`kerl`](https://github.com/kerl/kerl)や[`asdf-vm`](https://github.com/asdf-vm/asdf)と[`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)を使うことを検討してください（それぞれのリポジトリのインストール手順に従ってください）。

また、rebar3.orgから最新の`rebar3`を取得し、`$PATH`の通った場所に置いて、実行可能にしておきましょう。（これをよりよく説明するPRや、パッケージマネージャー経由でインストールできるようにするPRは歓迎します）。

* Arch Linux：AURパッケージ[`rebar3`](https://aur.archlinux.org/packages/rebar3)を[インストール](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)します。

## Windowsの場合

[`choco`](https://chocolatey.org/)が使えることを前提としています（`exercism` CLIのインストールにすでに使ったかもしれません）。

```cmd
choco install erlang
choco install rebar3
```

## ソースからのインストール

[最近のErlang OTP](http://www.erlang.org/downloads)を入手し、[ビルド手順](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md)に従ってください。
