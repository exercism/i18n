# इंस्टॉलेशन

## Mac OS X के लिए Homebrew

अपने Homebrew को नवीनतम संस्करण में अपडेट कीजिए:

```bash
$ brew update
```

Erlang और Rebar3 इंस्टॉल कीजिए:

```bash
$ brew install erlang rebar@3
```

## Linux पर

* Fedora 17+ और Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

ऐसा हो सकता है कि ऊपर दिए गए पैकेज पुराने हों। कम से कम Ubuntu 16.04 के लिए ये अब भी टेस्ट चलाने में सक्षम होने चाहिए। अगर आपका पैकेज बहुत पुराना हो जाए (OTP 17.0 से पुराना), तो कृपया सोर्स से बिल्ड करने पर विचार कीजिए, या इसके बजाय [`kerl`](https://github.com/kerl/kerl) या [`asdf-vm`](https://github.com/asdf-vm/asdf) और [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang) इस्तेमाल कीजिए (संबंधित रिपॉज़िटरी में दिए गए इंस्टॉलेशन निर्देशों का पालन कीजिए)।

साथ ही rebar3.org से नवीनतम `rebar3` लेकर उसे अपने `$PATH` में कहीं रखिए और उसे निष्पादन योग्य बनाइए। (ऐसे PR स्वागत योग्य हैं जो इसे बेहतर ढंग से, या पैकेज मैनेजर के ज़रिए बताते हों)।

* Arch Linux: AUR पैकेज [`rebar3`](https://aur.archlinux.org/packages/rebar3) को [इंस्टॉल](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages) कीजिए।

## Windows पर

मान लीजिए कि [`choco`](https://chocolatey.org/) उपलब्ध है (हो सकता है आपने उससे `exercism` CLI पहले ही इंस्टॉल कर लिया हो)।

```cmd
choco install erlang
choco install rebar3
```

## सोर्स से इंस्टॉल करना

[हाल का Erlang OTP](http://www.erlang.org/downloads) लीजिए और उनके [बिल्ड निर्देशों](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md) का पालन कीजिए।
