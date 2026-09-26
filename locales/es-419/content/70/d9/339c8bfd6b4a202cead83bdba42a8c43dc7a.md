# Instalación

El track de Idris usa [Pack][], un gestor de paquetes de Idris2.

### Preparación - Ubuntu 24.04 o posterior

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### Preparación - Otras distribuciones de Linux

Asegúrate de tener un git reciente, versión 2.35.1 o posterior.

Configura Chez Scheme con soporte para hilos.


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

### Preparación - MacOS

Quienes usan MacOS pueden instalar Chez Scheme con [Homebrew][]:

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

### Solución de problemas

Consulta las detalladas [instrucciones de instalación][installation instructions] de Pack.

### Imágenes de Docker

Stefan Höck ofrece [imágenes de Docker][Docker images] basadas en Ubuntu con Pack instalado.

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
