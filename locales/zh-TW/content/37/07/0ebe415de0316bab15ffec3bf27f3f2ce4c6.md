# 安裝

## 在 Mac OS X 上使用 Homebrew

將你的 Homebrew 更新到最新版本：

```bash
$ brew update
```

安裝 Erlang 和 Rebar3：

```bash
$ brew install erlang rebar@3
```

## 在 Linux 上

* Fedora 17+ 與 Fedora Rawhide：`sudo yum -y install erlang`
* Arch Linux：`sudo pacman -S erlang`
* Ubuntu/Debian：`sudo apt-get install erlang`

上面的套件有時可能已經過舊。至少在 ubuntu 16.04 上，應該還是能執行測試。如果你的套件太舊（比 OTP 17.0 還舊），請考慮從原始碼建置，或改用 [`kerl`](https://github.com/kerl/kerl)、[`asdf-vm`](https://github.com/asdf-vm/asdf) 和 [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)（請依照對應儲存庫中的安裝說明操作）。

另外，請從 rebar3.org 取得最新的 `rebar3`，將它放到`$PATH`中的某個位置，並讓它可執行。（歡迎提交 PR，把這段說明得更清楚，或說明如何透過套件管理器安裝）。

* Arch Linux：[安裝](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  AUR 套件 [`rebar3`](https://aur.archlinux.org/packages/rebar3)。

## 在 Windows 上

假設你已經有 [`choco`](https://chocolatey.org/)（也許你已經用它安裝了 `exercism` CLI）。

```cmd
choco install erlang
choco install rebar3
```

## 從原始碼安裝

取得[最新的 Erlang OTP](http://www.erlang.org/downloads)，並依照他們的[建置說明](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md)操作。
