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

Puede ocurrir que los paquetes anteriores estén desactualizados. Al menos para Ubuntu 16.04,
todavía debería poder ejecutar las pruebas. Si tu paquete se vuelve demasiado
antiguo (más antiguo que OTP 17.0), considera compilar desde el código fuente o usar [`kerl`](https://github.com/kerl/kerl)
o [`asdf-vm`](https://github.com/asdf-vm/asdf) y [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)
en su lugar (sigue las instrucciones de instalación en los repositorios correspondientes).

También descarga la última versión de `rebar3` desde rebar3.org y colócala en algún lugar de
tu `$PATH` y hazla ejecutable. (Los PR que describan esto mejor o mediante un
gestor de paquetes son bienvenidos).

* Arch Linux: [instala](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  el paquete AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## En Windows

Suponiendo que [`choco`](https://chocolatey.org/) esté disponible (tal vez ya
instalaste la CLI de `exercism` con él).

```cmd
choco install erlang
choco install rebar3
```

## Instalar desde el código fuente

Consigue [una versión reciente de Erlang OTP](http://www.erlang.org/downloads) y sigue sus
[instrucciones de compilación](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
