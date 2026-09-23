# Встановлення

## Homebrew для Mac OS X

Оновіть Homebrew до останньої версії:

```bash
$ brew update
```

Встановіть Erlang і Rebar3:

```bash
$ brew install erlang rebar@3
```

## У Linux

* Fedora 17+ і Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

Може статися, що наведені вище пакунки застаріли. Принаймні для ubuntu 16.04
тести все ще мають запускатися. Якщо ваш пакунок виявиться занадто старим
(старішим за OTP 17.0), спробуйте зібрати з вихідного коду або скористатися
[`kerl`](https://github.com/kerl/kerl) чи
[`asdf-vm`](https://github.com/asdf-vm/asdf) і
[`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)
(дотримуйтеся інструкцій зі встановлення у відповідних репозиторіях).

Також завантажте останній `rebar3` з rebar3.org, покладіть його кудись у свій
`$PATH` і зробіть виконуваним. (Вітаються PR, які описують це краще або через
менеджер пакунків).

* Arch Linux:
  [встановіть](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  пакунок AUR [`rebar3`](https://aur.archlinux.org/packages/rebar3).

## У Windows

Якщо [`choco`](https://chocolatey.org/) доступний (можливо, його вже
використано для встановлення CLI `exercism`).

```cmd
choco install erlang
choco install rebar3
```

## Встановлення з вихідного коду

Візьміть [свіжий Erlang OTP](http://www.erlang.org/downloads) і дотримуйтеся їхніх
[інструкцій зі збирання](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
