# Installation

## Homebrew pour Mac OS X

Mets à jour ton Homebrew vers la dernière version :

```bash
$ brew update
```

Installe Erlang et Rebar3 :

```bash
$ brew install erlang rebar@3
```

## Sous Linux

* Fedora 17+ et Fedora Rawhide : `sudo yum -y install erlang`
* Arch Linux : `sudo pacman -S erlang`
* Ubuntu/Debian : `sudo apt-get install erlang`

Il peut arriver que les paquets ci-dessus soient obsolètes. Au moins pour Ubuntu 16.04, ils devraient encore permettre d'exécuter les tests. Si ton paquet devient trop ancien (antérieur à OTP 17.0), envisage plutôt une compilation depuis les sources, ou bien l'utilisation de [`kerl`](https://github.com/kerl/kerl) ou de [`asdf-vm`](https://github.com/asdf-vm/asdf) et [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) (suis les instructions d'installation dans les dépôts correspondants).

Récupère aussi le dernier `rebar3` sur rebar3.org, place-le quelque part dans ton `$PATH` et rends-le exécutable. (Les PR qui décrivent cela plus clairement ou via un gestionnaire de paquets sont les bienvenues.)

* Arch Linux : [installe](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  le paquet AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## Sous Windows

En supposant que [`choco`](https://chocolatey.org/) soit disponible (tu as peut-être déjà installé la CLI `exercism` avec).

```cmd
choco install erlang
choco install rebar3
```

## Installer depuis les sources

Récupère [une version récente d'Erlang OTP](http://www.erlang.org/downloads) et suis leurs
[instructions de compilation](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
