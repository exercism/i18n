# ইনস্টলেশন

Idris ট্র্যাকটি [Pack][] ব্যবহার করে, যা একটি Idris2 প্যাকেজ ম্যানেজার।

### প্রস্তুতি - Ubuntu 24.04 বা তার পরের সংস্করণ

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### প্রস্তুতি - অন্যান্য Linux ডিস্ট্রিবিউশন

নিশ্চিত করুন যে আপনার কাছে সাম্প্রতিক git আছে, ভার্সন 2.35.1 বা তার পরের।

থ্রেডের সমর্থনসহ Chez Scheme কনফিগার করুন।


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

### প্রস্তুতি - MacOS

MacOS ব্যবহারকারীরা [Homebrew][] দিয়ে Chez Scheme ইনস্টল করতে পারেন:

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

### সমস্যা সমাধান

Pack-এর বিস্তারিত [ইনস্টলেশনের নির্দেশাবলি][installation instructions] দেখুন।

### Docker ইমেজ

Stefan Höck Pack ইনস্টল করা Ubuntu-ভিত্তিক [Docker ইমেজ][Docker images] সরবরাহ করেন।

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
