# پیش‌نیازها

مسیر زبان Fortran نیاز دارد که نرم‌افزارهای زیر روی سیستم شما نصب باشند:

- یک کامپایلر مدرن Fortran
- سیستم ساخت چندسکویی CMake

## پیش‌نیاز: یک کامپایلر مدرن Fortran

این مسیر زبان به کامپایلری نیاز دارد که از [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003) پشتیبانی کند. همه‌ی
کامپایلرهای اصلی که در چند سال گذشته منتشر شده‌اند باید سازگار باشند.

در ادامه نصب [GNU
Fortran](https://gcc.gnu.org/fortran/) یا GFortran توضیح داده می‌شود. سایر
کامپایلرهای Fortran
[اینجا](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers) فهرست شده‌اند.
[Intel Fortran](https://software.intel.com/en-us/fortran-compilers) گزینه‌ای
اختصاصی و پرطرفدار برای برنامه‌های با کارایی بالا است. بیشتر
تمرین‌ها با Intel Fortran کار می‌کنند، اما فقط با GNU
Fortran آزمایش شده‌اند، بنابراین نتایج ممکن است متفاوت باشد.

## پیش‌نیاز: CMake

CMake یک سیستم ساخت متن‌باز و چندسکویی است که اسکریپت‌های ساخت را برای
سیستم ساخت بومی شما (`make`، Visual Studio، Xcode و غیره) تولید می‌کند.
مسیر Fortran در Exercism از CMake استفاده می‌کند تا ساخت آماده‌ای در اختیار شما
بگذارد که:

- تست‌ها را کامپایل می‌کند
- راه‌حل شما را کامپایل می‌کند
- فایل اجرایی تست را پیوند می‌دهد
- در هر ساخت، تست‌ها را به‌طور خودکار اجرا می‌کند
- اگر هر یک از تست‌ها شکست بخورد، ساخت را با شکست مواجه می‌کند

استفاده از CMake به Exercism اجازه می‌دهد اسکریپت ساخت چندسکویی ارائه دهد که
می‌تواند فایل‌های پروژه را برای محیط‌های توسعه‌ی یکپارچه مثل
Visual Studio و Xcode تولید کند. این کار به شما اجازه می‌دهد روی مسئله تمرکز
کنید و نگران راه‌اندازی ساخت برای هر تمرین نباشید.

ساختن یک ساخت قابل‌حمل آسان نیست و نیازمند دسترسی به انواع مختلفی از
سیستم‌هاست. اگر با دستورالعمل CMake ارائه‌شده به مشکلی برخوردید،
لطفاً [مشکل را گزارش دهید](https://github.com/exercism/fortran/issues) تا بتوانیم
پشتیبانی CMake را بهتر کنیم.

برای استفاده از دستورالعمل ساخت ارائه‌شده، [CMake 2.8.11 یا جدیدتر](http://www.cmake.org/) لازم است.

### Linux

Ubuntu 16.04 و نسخه‌های جدیدتر کامپایلرهای سازگار را در مدیر بسته دارند، پس
نصب کامپایلر لازم با این دستور انجام می‌شود:

```bash
sudo apt-get install gfortran cmake
```

برای سایر توزیع‌ها باید بتوانید کامپایلر را از طریق مدیر بسته‌ی خود تهیه کنید.

### MacOS

کاربران MacOS می‌توانند GCC را با [Homebrew](http://brew.sh/) از طریق این دستور نصب کنند:

```bash
brew install gfortran cmake
```

### Windows

در Windows چندین گزینه وجود دارد:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows با MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows با Visual Studio به همراه NMake و Intel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

Windows 10 زیرسیستم [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) را معرفی
می‌کند. اگر Ubuntu 16.04 یا نسخه‌ی جدیدتری را به‌عنوان این زیرسیستم دارید، یک
پوسته‌ی Bash اوبونتو باز کنید و دستورالعمل‌های [Linux](####-Linux) را دنبال کنید.

#### Windows با MingW GNU Fortran

کاربران Windows می‌توانند GNU Fortran را از طریق
[MingW](http://www.mingw.org/) تهیه کنند.
آسان‌ترین راه این است که ابتدا [chocolatey](https://chocolatey.org) را نصب کنید
و سپس یک پوسته‌ی cmd با دسترسی مدیر باز کنید و این دستور را اجرا کنید:

```Batchfile
choco install mingw cmake
```

این دستور MingW (شامل GFortran و GCC) را در `C:\tools\mingw64` و
CMake را در `C:\Program Files\CMake` نصب می‌کند. سپس پوشه‌های `bin` این نصب‌ها
را به PATH اضافه کنید، یعنی:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows با Visual Studio به همراه NMake و Intel Fortran

به [Intel Fortran](###-Intel-Fortran) مراجعه کنید.

### Intel Fortran

برای [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
باید ابتدا کامپایلر Fortran را مقداردهی اولیه کنید. در Windows با Intel
Fortran 2019 و Visual Studio 2017، خط فرمان باید این باشد:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

این دستور مسیرهای Intel Fortran را بارگذاری می‌کند و CMake باید آن‌ها را
به‌درستی تشخیص دهد. همچنین در Windows برای ساخت از خط فرمان باید مولد CMake را
`NMake` تعیین کنید، مثلاً:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

دستورهای بالا یک پوشه‌ی `build` می‌سازند (لازم نیست، اما کار خوبی است)،
فایل‌های اجرایی را می‌سازند (NMake) و آن‌ها را تست می‌کنند (ctest).

برای سایر نسخه‌های Intel Fortran باید در نصب خود دنبال `ifortvars.bat` در
Windows و `ifortvars.sh` در linux/macOS بگردید. اسکریپت را در یک پوسته بدون
گزینه اجرا کنید تا راهنما توضیح دهد چه گزینه‌هایی دارید. در Linux یا MacOS
دستورها این‌ها خواهند بود:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
