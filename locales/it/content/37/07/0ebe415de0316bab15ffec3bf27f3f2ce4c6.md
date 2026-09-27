# Installazione

## Homebrew per Mac OS X

Aggiorna Homebrew all'ultima versione:

```bash
$ brew update
```

Installa Erlang e Rebar3:

```bash
$ brew install erlang rebar@3
```

## Su Linux

* Fedora 17+ e Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Può capitare che i pacchetti qui sopra siano datati. Almeno per Ubuntu 16.04 dovrebbe comunque essere possibile eseguire i test. Se il tuo pacchetto diventa troppo vecchio (più vecchio di OTP 17.0), valuta invece una compilazione dai sorgenti oppure l'uso di [`kerl`](https://github.com/kerl/kerl) o [`asdf-vm`](https://github.com/asdf-vm/asdf) e [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) (segui le istruzioni di installazione nei repository corrispondenti).

Scarica anche l'ultima versione di `rebar3` da rebar3.org, collocala da qualche parte nel `$PATH` e rendila eseguibile. (Le PR che lo descrivono meglio o tramite package manager sono benvenute).

* Arch Linux: [installa](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  il pacchetto AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## Su Windows

Dando per scontato che [`choco`](https://chocolatey.org/) sia disponibile (magari hai già installato la CLI di `exercism` usandolo).

```cmd
choco install erlang
choco install rebar3
```

## Installazione dai sorgenti

Scarica [una versione recente di Erlang OTP](http://www.erlang.org/downloads) e segui le loro
[istruzioni di compilazione](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
