# Instalação

## Homebrew para Mac OS X

Atualiza o teu Homebrew para a versão mais recente:

```bash
$ brew update
```

Instala o Erlang e o Rebar3:

```bash
$ brew install erlang rebar@3
```

## No Linux

* Fedora 17+ e Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Pode acontecer que os pacotes acima estejam desatualizados. Pelo menos para o Ubuntu 16.04, ainda deverá ser possível correr os testes. Se o teu pacote for demasiado antigo (anterior ao OTP 17.0), considera compilar a partir do código-fonte ou usar o [`kerl`](https://github.com/kerl/kerl) ou o [`asdf-vm`](https://github.com/asdf-vm/asdf) e o [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) em alternativa (segue as instruções de instalação nos repositórios correspondentes).

Obtém também o `rebar3` mais recente a partir de rebar3.org, coloca-o em algum lugar do teu `$PATH` e torna-o executável. (São bem-vindos PRs que o descrevam melhor ou que o instalem através de um gestor de pacotes).

* Arch Linux: [instala](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) o pacote AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## No Windows

Partindo do princípio de que o [`choco`](https://chocolatey.org/) está disponível (talvez já tenhas instalado a CLI do `exercism` com ele).

```cmd
choco install erlang
choco install rebar3
```

## Instalar a partir do código-fonte

Obtém [uma versão recente do Erlang OTP](http://www.erlang.org/downloads) e segue as [instruções de compilação](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
