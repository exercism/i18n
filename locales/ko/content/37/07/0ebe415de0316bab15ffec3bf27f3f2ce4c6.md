# 설치

## Mac OS X용 Homebrew

Homebrew를 최신 버전으로 업데이트해요:

```bash
$ brew update
```

Erlang과 Rebar3를 설치해요:

```bash
$ brew install erlang rebar@3
```

## Linux에서

* Fedora 17+ 및 Fedora Rawhide: `sudo yum -y install erlang`
* Arch Linux: `sudo pacman -S erlang`
* Ubuntu/Debian: `sudo apt-get install erlang`

위 패키지가 오래된 경우가 있을 수 있어요. 적어도 Ubuntu 16.04에서는 여전히 테스트를 실행할 수 있을 거예요. 패키지가 너무 오래되었다면(OTP 17.0보다 오래된 경우) 소스에서 빌드하거나 [`kerl`](https://github.com/kerl/kerl) 또는 [`asdf-vm`](https://github.com/asdf-vm/asdf)과 [`asdf-erlang`](https://github.com/asdf-vm/asdf-erlang)을 대신 사용하는 것을 고려해 봐요(해당 저장소의 설치 안내를 따라요).

또한 rebar3.org에서 최신 `rebar3`를 내려받아 `$PATH` 어딘가에 두고 실행 가능하게 만들어요. (이 내용을 더 잘 설명하거나 패키지 관리자를 통한 방법을 설명하는 PR은 환영해요).

* Arch Linux: AUR 패키지 [`rebar3`](https://aur.archlinux.org/packages/rebar3)를 [설치](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages)해요.

## Windows에서

[`choco`](https://chocolatey.org/)를 사용할 수 있다고 가정해요(아마 `exercism` CLI를 설치할 때 이미 사용했을 거예요).

```cmd
choco install erlang
choco install rebar3
```

## 소스에서 설치하기

[최신 Erlang OTP](http://www.erlang.org/downloads)를 내려받고 [빌드 안내](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md)를 따라요.
