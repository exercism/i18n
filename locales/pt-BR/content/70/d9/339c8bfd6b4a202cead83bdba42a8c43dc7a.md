# Instalação

O track de Idris usa o [Pack][], um gerenciador de pacotes do Idris2.

### Preparação - Ubuntu 24.04 ou mais recente

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Preparação - Outras distribuições Linux

Certifique-se de ter um git recente, versão 2.35.1 ou mais recente.

Configure o Chez Scheme com suporte a threads.


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

Usuários de MacOS podem instalar o Chez Scheme com o [Homebrew][]:

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

### Solução de problemas

Veja as [instruções de instalação][] detalhadas do Pack.

### Imagens Docker

Stefan Höck fornece [imagens Docker][] baseadas em Ubuntu com o Pack instalado.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
