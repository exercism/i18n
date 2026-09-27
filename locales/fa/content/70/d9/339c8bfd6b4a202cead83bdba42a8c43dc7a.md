# نصب

در مسیر Idris از [Pack][] استفاده می‌شود که یک مدیر بسته‌ی Idris2 است.

### آماده‌سازی: Ubuntu ۲۴.۰۴ یا جدیدتر

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### آماده‌سازی: سایر توزیع‌های Linux

مطمئن شوید که نسخه‌ی تازه‌ی git را دارید، نسخه‌ی ۲.۳۵.۱ یا جدیدتر.

Chez Scheme را با پشتیبانی از ترد پیکربندی کنید.


```shell
git version
sudo apt update
sudo apt install curl gcc libgmp-dev libncurses5-dev libx11-dev make

git clone https://github.com/cisco/ChezScheme.git
cd ChezScheme
./configure --threads
make
sudo make install
cd ..
which scheme
```

### آماده‌سازی: MacOS

کاربران MacOS می‌توانند Chez Scheme را با [Homebrew][] نصب کنند:

```
brew update
brew install chezscheme
```

### Pack

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/stefan-hoeck/idris2-pack/main/install.bash)"
export PATH="$HOME/.pack/bin:$PATH"
pack info
```

### رفع اشکال

[دستورالعمل‌های نصب][installation instructions] دقیق Pack را ببینید.

### تصاویر Docker

استفان هوک [تصاویر Docker][Docker images] مبتنی بر Ubuntu را همراه با Pack نصب‌شده ارائه می‌دهد.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
