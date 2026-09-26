# 安装

## Mac OS X 上的 Homebrew

把 Homebrew 更新到最新：

```bash
$ brew update
```

安装 Erlang 和 Rebar3：

```bash
$ brew install erlang rebar@3
```

## 在 Linux 上

* Fedora 17+ 和 Fedora Rawhide：`sudo yum -y install erlang`
* Arch Linux：`sudo pacman -S erlang`
* Ubuntu/Debian：`sudo apt-get install erlang`

上面的软件包可能已经过时。至少对于 Ubuntu 16.04，它们应该仍然能运行测试。如果你的软件包太旧（低于 OTP 17.0），请考虑改用从源码构建，或者使用 [`kerl`](https://github.com/kerl/kerl)、[`asdf-vm`](https://github.com/asdf-vm/asdf) 和 [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)（按照对应仓库中的安装说明操作）。

另外，请从 rebar3.org 获取最新的 `rebar3`，把它放到你的`$PATH`中的某个位置，并让它可执行。（欢迎提交能把这部分写得更清楚，或者通过包管理器安装的 PR。）

* Arch Linux：[安装](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) AUR 包 [`rebar3`](https://aur.archlinux.org/packages/rebar3)。

## 在 Windows 上

假设[`choco`](https://chocolatey.org/)可用（也许你已经用它安装了`exercism` CLI）。

```cmd
choco install erlang
choco install rebar3
```

## 从源码安装

获取[较新的 Erlang OTP](http://www.erlang.org/downloads)，并按照他们的[构建说明](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md)操作。
