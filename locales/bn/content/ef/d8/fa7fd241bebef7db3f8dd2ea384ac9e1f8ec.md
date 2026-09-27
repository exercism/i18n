# পূর্বশর্ত

Fortran ভাষার ট্র্যাকের জন্য আপনার সিস্টেমে নিচের সফটওয়্যারগুলো ইনস্টল থাকা দরকার:

- একটি আধুনিক Fortran কম্পাইলার
- CMake ক্রস-প্ল্যাটফর্ম বিল্ড সিস্টেম

## পূর্বশর্ত: একটি আধুনিক Fortran কম্পাইলার

এই ভাষা ট্র্যাকের জন্য [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) সাপোর্টসহ একটি কম্পাইলার দরকার। গত কয়েক বছরে প্রকাশিত সব প্রধান কম্পাইলারই সামঞ্জস্যপূর্ণ হওয়ার কথা।

নিচে [GNU
Fortran](https://gcc.gnu.org/fortran/) বা GFortran ইনস্টল করার পদ্ধতি বর্ণনা করা হয়েছে। অন্য Fortran কম্পাইলারগুলোর তালিকা
[এখানে](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers) দেওয়া আছে।
উচ্চ-ক্ষমতাসম্পন্ন অ্যাপ্লিকেশনের জন্য [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) একটি জনপ্রিয় মালিকানাধীন বিকল্প। বেশির ভাগ অনুশীলনী Intel Fortran দিয়েও কাজ করবে, তবে সেগুলো শুধু GNU Fortran দিয়ে পরীক্ষা করা হয়, তাই ফলাফল সবসময় একরকম নাও হতে পারে।

## পূর্বশর্ত: CMake

CMake একটি ওপেন সোর্স ক্রস-প্ল্যাটফর্ম বিল্ড সিস্টেম, যা আপনার নিজের সিস্টেমের (`make`, Visual Studio, Xcode ইত্যাদি) জন্য বিল্ড স্ক্রিপ্ট তৈরি করে।
Exercism-এর Fortran ট্র্যাক CMake ব্যবহার করে আপনাকে একটি তৈরি বিল্ড দেয়, যা:

- টেস্ট কম্পাইল করে
- আপনার সমাধান কম্পাইল করে
- টেস্ট এক্সিকিউটেবল লিংক করে
- প্রতিটি বিল্ডের অংশ হিসেবে স্বয়ংক্রিয়ভাবে টেস্ট চালায়
- কোনো টেস্ট ব্যর্থ হলে বিল্ড ব্যর্থ করে দেয়

CMake ব্যবহারের ফলে Exercism Visual Studio ও Xcode-এর মতো ইন্টিগ্রেটেড ডেভেলপমেন্ট এনভায়রনমেন্টের জন্য প্রজেক্ট ফাইল তৈরি করতে পারে এমন একটি ক্রস-প্ল্যাটফর্ম বিল্ড স্ক্রিপ্ট দিতে পারে। এতে আপনি প্রতিটি অনুশীলনীর জন্য বিল্ড সেটআপের চিন্তা না করে মূল সমস্যাটিতে মন দিতে পারেন।

পোর্টেবল বিল্ড তৈরি করা সহজ নয় এবং এর জন্য নানা ধরনের সিস্টেমে অ্যাক্সেস দরকার। দেওয়া CMake রেসিপিতে কোনো সমস্যা হলে অনুগ্রহ করে [সমস্যাটি জানান](https://github.com/exercism/fortran/issues), যাতে আমরা CMake সাপোর্ট আরও ভালো করতে পারি।

দেওয়া বিল্ড রেসিপি ব্যবহার করতে [CMake 2.8.11 বা তার পরের সংস্করণ](http://www.cmake.org/) দরকার।

### Linux

Ubuntu 16.04 ও তার পরের সংস্করণগুলোতে প্যাকেজ ম্যানেজারে সামঞ্জস্যপূর্ণ কম্পাইলার থাকে, তাই প্রয়োজনীয় কম্পাইলারটি এভাবে ইনস্টল করা যায়

```bash
sudo apt-get install gfortran cmake
```

অন্য ডিস্ট্রিবিউশনের ক্ষেত্রে আপনার প্যাকেজ ম্যানেজার থেকেই কম্পাইলারটি জোগাড় করতে পারবেন।

### MacOS

MacOS ব্যবহারকারীরা [Homebrew](http://brew.sh/) দিয়ে GCC ইনস্টল করতে পারেন এভাবে

```bash
brew install gfortran cmake
```

### Windows

Windows-এর ক্ষেত্রে কয়েকটি বিকল্প আছে:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows with MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows with Visual Studio with NMake and Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10-এ [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) এসেছে। সাবসিস্টেম হিসেবে আপনার কাছে Ubuntu 16.04 বা তার পরের সংস্করণ থাকলে একটি Ubuntu Bash শেল খুলে [Linux](####-Linux) নির্দেশনাগুলো অনুসরণ করুন।

#### Windows with MingW GNU Fortran

Windows ব্যবহারকারীরা [MingW](http://www.mingw.org/) থেকে GNU Fortran পেতে পারেন।
সবচেয়ে সহজ উপায় হলো প্রথমে [chocolatey](https://chocolatey.org) ইনস্টল করা, তারপর একটি অ্যাডমিনিস্ট্রেটর cmd শেল খুলে চালানো:

```Batchfile
choco install mingw cmake
```

এতে MingW (GFortran ও GCC) `C:\tools\mingw64`-এ এবং CMake `C:\Program Files\CMake`-এ ইনস্টল হবে। তারপর এই ইনস্টলেশনগুলোর `bin` ডিরেক্টরি PATH-এ যোগ করুন, অর্থাৎ:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows with Visual Studio with NMake and Intel Fortran

দেখুন [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

[Intel Fortran](https://software.intel.com/en-us/fortran-compilers)-এর ক্ষেত্রে প্রথমে Fortran কম্পাইলারটি ইনিশিয়ালাইজ করতে হবে। Intel Fortran 2019 ও Visual Studio 2017-সহ Windows-এ কমান্ড লাইনটি হওয়া উচিত:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

এতে Intel Fortran-এর পাথগুলো সোর্স হয় এবং CMake সেটি ঠিকভাবে ধরে নিতে পারবে। এছাড়া Windows-এ কমান্ড লাইন বিল্ডের জন্য CMake জেনারেটর `NMake` উল্লেখ করা উচিত, যেমন

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

উপরের কমান্ডগুলো একটি `build` ডিরেক্টরি তৈরি করবে (এটি বাধ্যতামূলক নয়, তবে ভালো অভ্যাস) এবং এক্সিকিউটেবলগুলো বিল্ড (NMake) করে সেগুলো টেস্ট করবে (ctest)।

Intel Fortran-এর অন্য সংস্করণের ক্ষেত্রে Windows-এ আপনার ইনস্টলেশনে `ifortvars.bat` এবং Linux/macOS-এ `ifortvars.sh` খুঁজতে হবে। কোনো অপশন ছাড়া একটি শেলে স্ক্রিপ্টটি চালান, তাহলে একটি হেল্প বার্তা আপনার সামনে কী কী অপশন আছে তা ব্যাখ্যা করবে। Linux বা MacOS-এ কমান্ডগুলো হবে:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
