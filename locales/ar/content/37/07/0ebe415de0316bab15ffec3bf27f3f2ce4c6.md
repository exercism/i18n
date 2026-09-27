# التثبيت

## Homebrew على Mac OS X

حدّث Homebrew إلى أحدث إصدار:

```bash
$ brew update
```

ثبّت Erlang و Rebar3:

```bash
$ brew install erlang rebar@3
```

## على Linux

* Fedora 17+ وFedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

قد يحدث أن تكون الحزم المذكورة أعلاه قديمة. على الأقل بالنسبة إلى Ubuntu 16.04، ينبغي أن يظل تشغيل الاختبارات ممكنًا. إذا أصبحت حزمتك قديمة جدًا (أقدم من OTP 17.0)، ففكّر في البناء من المصدر أو في استخدام [`kerl`](https://github.com/kerl/kerl)
أو [`asdf-vm`](https://github.com/asdf-vm/asdf) و[`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)
بدلًا من ذلك (اتبع تعليمات التثبيت في المستودعات المقابلة).

كذلك اجلب أحدث إصدار من `rebar3` من rebar3.org وضعه في مكان ما داخل `$PATH` واجعله قابلًا للتنفيذ. (طلبات الدمج التي تصف هذا بشكل أفضل أو عبر مدير الحزم مرحّب بها).

* Arch Linux: [ثبّت](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)
  حزمة AUR ‏[`rebar3`](https://aur.archlinux.org/packages/rebar3).

## على Windows

بافتراض أن [`choco`](https://chocolatey.org/) متاح (ربما تكون قد ثبّت واجهة سطر الأوامر `exercism` باستخدامه بالفعل).

```cmd
choco install erlang
choco install rebar3
```

## التثبيت من المصدر

احصل على [إصدار حديث من Erlang OTP](http://www.erlang.org/downloads) واتبع
[تعليمات البناء](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
