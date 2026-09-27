# Installation

## Homebrew für Mac OS X

Aktualisiere dein Homebrew auf die neueste Version:

```bash
$ brew update
```

Installiere Erlang und Rebar3:

```bash
$ brew install erlang rebar@3
```

## Unter Linux

* Fedora 17+ und Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Es kann vorkommen, dass die oben genannten Pakete veraltet sind. Zumindest für Ubuntu 16.04 sollten die Tests damit noch laufen. Wenn dein Paket zu alt wird (älter als OTP 17.0), solltest du einen Build aus dem Quellcode in Betracht ziehen oder stattdessen [`kerl`](https://github.com/kerl/kerl) oder [`asdf-vm`](https://github.com/asdf-vm/asdf) und [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) verwenden (folge den Installationsanweisungen in den entsprechenden Repositories).

Hol dir außerdem das neueste `rebar3` von rebar3.org, leg es irgendwo in deinen `$PATH` und mach es ausführbar. (PRs, die das besser oder über einen Paketmanager beschreiben, sind willkommen.)

* Arch Linux: [installiere](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) das AUR-Paket [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## Unter Windows

Angenommen, [`choco`](https://chocolatey.org/) ist verfügbar (vielleicht hast du damit bereits die `exercism` CLI installiert).

```cmd
choco install erlang
choco install rebar3
```

## Aus dem Quellcode installieren

Hole dir [ein aktuelles Erlang OTP](http://www.erlang.org/downloads) und folge den [Build-Anweisungen](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
