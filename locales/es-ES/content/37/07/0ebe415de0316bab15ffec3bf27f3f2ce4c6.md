# Instalación

## Homebrew para Mac OS X

Actualiza tu Homebrew a la última versión:

```bash
$ brew update
```

Instala Erlang y Rebar3:

```bash
$ brew install erlang rebar@3
```

## En Linux

* Fedora 17+ y Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Puede ocurrir que los paquetes anteriores estén desactualizados. Al menos para Ubuntu 16.04
todavía debería poder ejecutar los tests. Si tu paquete se queda demasiado obsoleto (más
antiguo que OTP 17.0), considera compilar desde el código fuente o usar [`kerl`](https://github.com/kerl/kerl)
o [`asdf-vm`](https://github.com/asdf-vm/asdf) y [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)
en su lugar (sigue las instrucciones de instalación de los repositorios correspondientes).

Descarga también el `rebar3` más reciente desde rebar3.org, colócalo en algún lugar de
tu `$PATH` y hazlo ejecutable. (Se agradecen PRs que describan esto mejor o que lo hagan
mediante un gestor de paquetes).

* Arch Linux: [instala](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  el paquete de AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## En Windows

Suponiendo que [`choco`](https://chocolatey.org/) esté disponible (quizá ya hayas
instalado la CLI de `exercism` con él).

```cmd
choco install erlang
choco install rebar3
```

## Instalar desde el código fuente

Consigue [un Erlang OTP reciente](http://www.erlang.org/downloads) y sigue sus
[instrucciones de compilación](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
