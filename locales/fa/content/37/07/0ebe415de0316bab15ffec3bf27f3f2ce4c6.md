# نصب

## Homebrew برای Mac OS X

Homebrew خود را به آخرین نسخه به‌روزرسانی کنید:

```bash
$ brew update
```

Erlang و Rebar3 را نصب کنید:

```bash
$ brew install erlang rebar@3
```

## روی Linux

* Fedora 17+ و Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

ممکن است بسته‌های بالا قدیمی باشند. حداقل برای Ubuntu 16.04 باید هنوز بتوانید تست‌ها را اجرا کنید. اگر بسته‌ی شما بیش از حد قدیمی شد (قدیمی‌تر از OTP 17.0)، لطفاً ساخت از سورس را در نظر بگیرید یا در عوض از [`kerl`](https://github.com/kerl/kerl) یا [`asdf-vm`](https://github.com/asdf-vm/asdf) و [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) استفاده کنید (دستورالعمل‌های نصب را در مخزن‌های مربوطه دنبال کنید).

همچنین آخرین نسخه‌ی `rebar3` را از rebar3.org دریافت کنید و آن را جایی در `$PATH` خود بگذارید و اجرایی کنید. (از PR‌هایی که این کار را بهتر یا از طریق مدیر بسته توضیح می‌دهند، استقبال می‌کنیم).

* Arch Linux: بسته‌ی AUR با نام [`rebar3`](https://aur.archlinux.org/packages/rebar3) را [نصب](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) کنید.

## روی Windows

با فرض اینکه [`choco`](https://chocolatey.org/) در دسترس است (شاید `exercism` CLI را از قبل با آن نصب کرده باشید).

```cmd
choco install erlang
choco install rebar3
```

## نصب از سورس

[یک نسخه‌ی جدید از Erlang OTP](http://www.erlang.org/downloads) را دریافت کنید و [دستورالعمل‌های ساخت](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md) آن را دنبال کنید.
