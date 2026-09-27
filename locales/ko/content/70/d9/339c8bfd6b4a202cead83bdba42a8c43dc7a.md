# 설치

Idris 트랙은 Idris2 패키지 관리자인 [Pack][]을 사용해요.

### 준비 - Ubuntu 24.04 이상

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### 준비 - 기타 Linux 배포판

최신 git(버전 2.35.1 이상)이 설치되어 있는지 확인해요.

스레드를 지원하도록 Chez Scheme을 구성해요.


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

### 준비 - MacOS

MacOS 사용자는 [Homebrew][]로 Chez Scheme을 설치할 수 있어요:

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

### 문제 해결

Pack의 자세한 [설치 안내][installation instructions]를 참고해요.

### Docker 이미지

Stefan Höck는 Pack이 설치된 Ubuntu 기반 [Docker 이미지][Docker images]를 제공해요.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
