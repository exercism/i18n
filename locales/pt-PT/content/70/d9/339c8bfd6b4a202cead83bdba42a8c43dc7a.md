# Instalação

O track Idris usa o [Pack][], um gestor de pacotes para Idris2.

### Preparação - Ubuntu 24.04 ou posterior

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Preparação - Outras distribuições Linux

Certifica-te de que tens um git recente, versão 2.35.1 ou posterior.

Configura o Chez Scheme com suporte para threads.


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

### Preparação - MacOS

Os utilizadores de MacOS podem instalar o Chez Scheme com o [Homebrew][]:

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

### Resolução de problemas

Consulta as [instruções de instalação][installation instructions] detalhadas do Pack.

### Imagens Docker

O Stefan Höck disponibiliza [imagens Docker][Docker images] baseadas em Ubuntu com o Pack instalado.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
