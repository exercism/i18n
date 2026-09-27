# التثبيت

يستخدم مسار Idris أداة [Pack][]، وهي مدير حزم Idris2.

### التهيئة - Ubuntu 24.04 أو أحدث

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### التهيئة - توزيعات Linux الأخرى

تأكد من أن لديك إصدارًا حديثًا من `git`، الإصدار 2.35.1 أو أحدث.

اضبط Chez Scheme مع دعم الخيوط.


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

### التهيئة - MacOS

يمكن لمستخدمي MacOS تثبيت Chez Scheme باستخدام [Homebrew][]:

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

### حل المشكلات

راجع [تعليمات التثبيت][] المفصّلة الخاصة بـ Pack.

### صور Docker

يوفّر Stefan Höck [صور Docker][] مبنية على Ubuntu مع تثبيت Pack.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
