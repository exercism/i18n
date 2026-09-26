# आवश्यकताएँ

इस Fortran भाषा ट्रैक के लिए आपके सिस्टम पर ये सॉफ्टवेयर इंस्टॉल होने चाहिए:

- एक आधुनिक Fortran कंपाइलर
- CMake क्रॉस-प्लेटफॉर्म बिल्ड सिस्टम

## आवश्यकता: आधुनिक Fortran कंपाइलर

इस भाषा ट्रैक के लिए ऐसा कंपाइलर चाहिए जो [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) का समर्थन करता हो। पिछले
कुछ सालों में जारी हुए सभी प्रमुख कंपाइलर इसके साथ काम करने चाहिए।

आगे बताया गया है कि [GNU
Fortran](https://gcc.gnu.org/fortran/) या GFortran कैसे इंस्टॉल करें। दूसरे
Fortran कंपाइलर
[यहाँ](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers) सूचीबद्ध हैं।
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) हाई परफॉर्मेंस
ऐप्लिकेशन के लिए एक लोकप्रिय प्रोप्राइटरी विकल्प है। अधिकतर अभ्यास Intel Fortran के
साथ काम करेंगे, लेकिन इनका परीक्षण सिर्फ़ GNU Fortran के साथ किया गया है, इसलिए
नतीजे हर सिस्टम पर अलग हो सकते हैं।

## आवश्यकता: CMake

CMake एक ओपन सोर्स क्रॉस-प्लेटफॉर्म बिल्ड सिस्टम है जो आपके नेटिव बिल्ड सिस्टम
(`make`, Visual Studio, Xcode, आदि) के लिए बिल्ड स्क्रिप्ट बनाता है। Exercism का
Fortran ट्रैक CMake का इस्तेमाल करके आपको एक तैयार बिल्ड देता है जो:

- टेस्ट कंपाइल करता है
- आपका हल कंपाइल करता है
- टेस्ट वाली एक्ज़ीक्यूटेबल फाइल को लिंक करता है
- हर बिल्ड के साथ अपने आप टेस्ट चलाता है
- अगर कोई भी टेस्ट फेल हो, तो बिल्ड फेल कर देता है

CMake की मदद से Exercism एक ऐसी क्रॉस-प्लेटफॉर्म बिल्ड स्क्रिप्ट दे पाता है जो
Visual Studio और Xcode जैसे इंटिग्रेटेड डेवलपमेंट एनवायरनमेंट के लिए प्रोजेक्ट
फाइलें बना सकती है। इससे आप समस्या पर ध्यान दे सकते हैं और हर अभ्यास के लिए बिल्ड
सेट करने की चिंता नहीं करनी पड़ती।

पोर्टेबल बिल्ड बनाना आसान नहीं है, और इसके लिए कई तरह के सिस्टम तक पहुँच चाहिए।
अगर दी गई CMake रेसिपी में आपको कोई समस्या आए, तो कृपया [समस्या
रिपोर्ट कीजिए](https://github.com/exercism/fortran/issues) ताकि हम CMake सपोर्ट
बेहतर बना सकें।

दी गई बिल्ड रेसिपी इस्तेमाल करने के लिए [CMake 2.8.11 या उससे
नया](http://www.cmake.org/) चाहिए।

### Linux

Ubuntu 16.04 और उसके बाद के वर्शन के पैकेज मैनेजर में काम करने वाले कंपाइलर मौजूद
हैं, इसलिए ज़रूरी कंपाइलर इस तरह इंस्टॉल कर सकते हैं:

```bash
sudo apt-get install gfortran cmake
```

दूसरे डिस्ट्रिब्यूशन के लिए आप अपने पैकेज मैनेजर से कंपाइलर ले सकते हैं।

### MacOS

MacOS पर आप [Homebrew](http://brew.sh/) की मदद से GCC इंस्टॉल कर सकते हैं:

```bash
brew install gfortran cmake
```

### Windows

Windows पर कई विकल्प हैं:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [MingW GNU Fortran के साथ Windows](#####-Windows-with-MingW-GNU-Fortran)
- [NMake और Intel Fortran के साथ Visual
  Studio वाला Windows](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 में [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) पेश किया गया है।
अगर सबसिस्टम के तौर पर आपके पास Ubuntu 16.04 या उससे नया वर्शन है, तो Ubuntu Bash
शेल खोलिए और [Linux](####-Linux) वाले निर्देश अपनाइए।

#### MingW GNU Fortran के साथ Windows

Windows पर GNU Fortran
[MingW](http://www.mingw.org/) के ज़रिए मिल सकता है।
सबसे आसान तरीका यह है कि पहले [chocolatey](https://chocolatey.org)
इंस्टॉल कीजिए, फिर एडमिनिस्ट्रेटर cmd शेल खोलिए और यह चलाइए:

```Batchfile
choco install mingw cmake
```

इससे MingW (GFortran और GCC) `C:\tools\mingw64` में और CMake
`C:\Program Files\CMake` में इंस्टॉल हो जाएगा। इसके बाद इन इंस्टॉलेशन की `bin`
डायरेक्टरियाँ PATH में जोड़िए, यानी:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### NMake और Intel Fortran के साथ Visual Studio वाला Windows

[Intel Fortran](###-Intel-Fortran) देखिए

### Intel Fortran

[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) के लिए सबसे पहले
Fortran कंपाइलर को इनिशियलाइज़ करना होगा। Intel Fortran 2019 और Visual Studio 2017
वाले Windows पर कमांड लाइन यह होनी चाहिए:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

इससे Intel Fortran के पाथ सेट हो जाते हैं और cmake उसे ठीक से पहचान लेना चाहिए।
साथ ही, Windows पर कमांड लाइन बिल्ड के लिए cmake जेनरेटर `NMake` बताना चाहिए, जैसे:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

ऊपर दिए कमांड एक `build` डायरेक्टरी बनाएँगे (ज़रूरी नहीं, लेकिन अच्छा अभ्यास है) और
एक्ज़ीक्यूटेबल बनाएँगे (NMake) और उनका परीक्षण करेंगे (ctest)।

Intel Fortran के दूसरे वर्शन के लिए आपको अपने इंस्टॉलेशन में Windows पर
`ifortvars.bat` और Linux/macOS पर `ifortvars.sh` ढूँढना होगा। स्क्रिप्ट को बिना किसी
ऑप्शन के शेल में चलाइए, फिर हेल्प बताएगी कि आपके पास कौन-कौन से ऑप्शन हैं। Linux या
MacOS पर कमांड ये होंगे:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
