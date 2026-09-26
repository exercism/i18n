# Instalação

## Homebrew para Mac OS X

Atualize seu Homebrew para a versão mais recente:

```bash
$ brew update
```

Instale Erlang e Rebar3:

```bash
$ brew install erlang rebar@3
```

## No Linux

* Fedora 17+ e Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Pode acontecer de os pacotes acima estarem desatualizados. Pelo menos para o Ubuntu 16.04, ainda deve ser possível rodar os testes. Se o seu pacote ficar muito antigo (mais antigo que o OTP 17.0), considere compilar a partir do código-fonte ou usar [`kerl`](https://github.com/kerl/kerl) ou [`asdf-vm`](https://github.com/asdf-vm/asdf) e [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) em vez disso (siga as instruções de instalação nos repositórios correspondentes).

Além disso, baixe o `rebar3` mais recente em rebar3.org, coloque-o em algum lugar do seu `$PATH` e torne-o executável. (PRs que descrevam isso melhor ou que o façam por meio de um gerenciador de pacotes são bem-vindos).

* Arch Linux: [instale](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  o pacote AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## No Windows

Supondo que o [`choco`](https://chocolatey.org/) esteja disponível (talvez você já tenha instalado a CLI do `exercism` usando ele).

```cmd
choco install erlang
choco install rebar3
```

## Instalando a partir do código-fonte

Obtenha [um Erlang OTP recente](http://www.erlang.org/downloads) e siga as [instruções de compilação](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md) deles.
