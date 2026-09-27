# ইনস্টলেশন

## Mac OS X-এর জন্য Homebrew

আপনার Homebrew সর্বশেষ সংস্করণে আপডেট করুন:

```bash
$ brew update
```

Erlang এবং Rebar3 ইনস্টল করুন:

```bash
$ brew install erlang rebar@3
```

## লিনাক্সে

* Fedora 17+ এবং Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

এমনও হতে পারে যে উপরের প্যাকেজগুলো পুরোনো হয়ে গেছে। অন্তত ubuntu 16.04-এর ক্ষেত্রে এগুলো দিয়ে এখনও টেস্ট চালানো সম্ভব হওয়া উচিত। আপনার প্যাকেজ যদি খুব পুরোনো হয়ে যায় (OTP 17.0-এর চেয়ে পুরোনো), তাহলে এর বদলে সোর্স থেকে বিল্ড করার কথা ভাবুন, অথবা [`kerl`](https://github.com/kerl/kerl) বা [`asdf-vm`](https://github.com/asdf-vm/asdf) এবং [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) ব্যবহার করুন (সংশ্লিষ্ট রিপোজিটরিগুলোর ইনস্টলেশন নির্দেশনা অনুসরণ করুন)।

এছাড়াও rebar3.org থেকে সর্বশেষ `rebar3` নামিয়ে নিন, এটি আপনার `$PATH`-এর মধ্যে কোথাও রাখুন এবং এক্সিকিউটেবল করে দিন। (এটি আরও ভালোভাবে বর্ণনা করে, বা প্যাকেজ ম্যানেজারের মাধ্যমে করার পথ দেখায়, এমন PR স্বাগত)।

* Arch Linux: AUR প্যাকেজ [`rebar3`](https://aur.archlinux.org/packages/rebar3)
  [ইনস্টল করুন](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)।

## উইন্ডোজে

ধরে নিচ্ছি [`choco`](https://chocolatey.org/) পাওয়া যাচ্ছে (হয়তো আপনি এটি দিয়েই `exercism` CLI ইনস্টল করেছেন)।

```cmd
choco install erlang
choco install rebar3
```

## সোর্স থেকে ইনস্টল করা

[সাম্প্রতিক একটি Erlang OTP](http://www.erlang.org/downloads) নামিয়ে নিন এবং তাদের [বিল্ড-নির্দেশনা](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md) অনুসরণ করুন।
