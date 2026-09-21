# Telepítés

## Homebrew Mac OS X-hez

Frissítsd a Homebrew-t a legújabb verzióra:

```bash
$ brew update
```

Telepítsd az Erlangot és a Rebar3-at:

```bash
$ brew install erlang rebar@3
```

## Linuxon

* Fedora 17+ és Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Előfordulhat, hogy a fenti csomagok elavultak. Legalábbis Ubuntu 16.04-en még le kell tudni futtatni a teszteket. Ha a csomagod túl régi lesz (régebbi, mint az OTP 17.0), érdemes megfontolni a forrásból történő fordítást, vagy használhatod helyette a [`kerl`](https://github.com/kerl/kerl)-t, illetve az [`asdf-vm`](https://github.com/asdf-vm/asdf) és az [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) párost (kövesd a megfelelő tárolók telepítési útmutatóját).

Töltsd le a legújabb `rebar3`-at is a rebar3.org oldalról, tedd valahova a `$PATH`-ba, és tedd futtathatóvá. (Szívesen fogadunk olyan PR-eket, amelyek ezt jobban leírják, vagy csomagkezelőn keresztül intézik.)

* Arch Linux: [telepítsd](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) az AUR-csomagot: [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## Windowson

Feltéve, hogy a [`choco`](https://chocolatey.org/) elérhető (talán már ezzel telepítetted az `exercism` CLI-t).

```cmd
choco install erlang
choco install rebar3
```

## Telepítés forrásból

Tölts le [egy friss Erlang OTP-t](http://www.erlang.org/downloads), és kövesd a [fordítási útmutatójukat](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
