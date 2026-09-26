# इंस्टॉलेशन

Idris ट्रैक [Pack][] का उपयोग करता है, जो Idris2 का पैकेज मैनेजर है।

### तैयारी - Ubuntu 24.04 या उसके बाद का संस्करण

```shell
sudo apt update
sudo apt install chezscheme curl gcc git libgmp-dev make
```

### तैयारी - अन्य Linux वितरण

सुनिश्चित कीजिए कि आपके पास git का नया संस्करण हो, 2.35.1 या उससे नया।

Chez Scheme को थ्रेड्स के समर्थन के साथ कॉन्फ़िगर कीजिए।


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

### तैयारी - MacOS

MacOS पर आप [Homebrew][] की मदद से Chez Scheme इंस्टॉल कर सकते हैं:

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

### समस्या निवारण

Pack के विस्तृत [इंस्टॉलेशन निर्देश][installation instructions] देखिए।

### Docker इमेज

Stefan Höck, Pack इंस्टॉल किए हुए Ubuntu आधारित [Docker इमेज][Docker images] उपलब्ध कराते हैं।

[Pack]: https://github.com/stefan-hoeck/idris2-pack
[Homebrew]: https://brew.sh
[installation instructions]: https://github.com/stefan-hoeck/idris2-pack/blob/main/INSTALL.md
[Docker images]: https://github.com/stefan-hoeck/idris2-pack/pkgs/container/idris2-pack
