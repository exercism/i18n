# المتطلبات الأساسية

يتطلب مسار لغة Fortran تثبيت البرامج التالية على نظامك:

- مترجم Fortran حديث
- نظام البناء متعدد المنصات CMake

## المتطلب: مترجم Fortran حديث

يتطلب مسار اللغة هذا مترجمًا يدعم [Fortran
2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). وينبغي أن تكون جميع
المترجمات الرئيسية الصادرة في السنوات القليلة الماضية متوافقة معه.

يصف ما يلي كيفية تثبيت [GNU
Fortran](https://gcc.gnu.org/fortran/) أو GFortran. والمترجمات الأخرى الخاصة
بـ Fortran مدرجة
[هنا](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers).
ويُعد [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) خيارًا
تجاريًا شائعًا للتطبيقات عالية الأداء. ستعمل معظم
التمارين مع Intel Fortran، لكنها مُختبرة مع GNU
Fortran فقط، لذا قد تختلف النتائج لديك.

## المتطلب: CMake

CMake هو نظام بناء مفتوح المصدر ومتعدد المنصات يولّد نصوص بناء
لنظام البناء الأصلي لديك (`make`، Visual Studio، Xcode، وما إلى ذلك).
ويستخدم مسار Fortran في Exercism نظام CMake ليمنحك بناءً جاهزًا يقوم بما يلي:

- يترجم الاختبارات
- يترجم حلّك
- يربط الملف التنفيذي للاختبارات
- يشغّل الاختبارات تلقائيًا ضمن كل عملية بناء
- يُفشل البناء إذا فشل أي اختبار

يتيح استخدام CMake لـ Exercism توفير نص بناء متعدد المنصات
يمكنه توليد ملفات مشاريع لبيئات التطوير المتكاملة مثل
Visual Studio وXcode. وهذا يتيح لك التركيز على المسألة وعدم
القلق بشأن إعداد بناء لكل تمرين.

الحصول على بناء قابل للنقل ليس بالأمر السهل، وهو يتطلب الوصول إلى أنواع كثيرة من
الأنظمة. إذا واجهت أي مشكلات في وصفة CMake المرفقة،
فيرجى [الإبلاغ عن المشكلة](https://github.com/exercism/fortran/issues) حتى نتمكن من
تحسين دعم CMake.

يلزم [CMake 2.8.11 أو أحدث](http://www.cmake.org/) لاستخدام وصفة البناء المرفقة.

### Linux

يتوفر في مدير الحزم في Ubuntu 16.04 والإصدارات الأحدث مترجمات متوافقة، لذا
يمكن تثبيت المترجم اللازم بالأمر التالي

```bash
sudo apt-get install gfortran cmake
```

أما التوزيعات الأخرى، فينبغي أن تتمكن من الحصول على المترجم عبر
مدير الحزم لديك.

### MacOS

يمكن لمستخدمي MacOS تثبيت GCC بواسطة [Homebrew](http://brew.sh/) بالأمر
التالي

```bash
brew install gfortran cmake
```

### Windows

مع Windows هناك عدد من الخيارات:

- [Windows Subsystem for Linux
  (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows مع MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows مع Visual Studio مع NMake وIntel
  Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Windows Subsystem for Linux (WSL)

يقدّم Windows 10 نظام [Windows Subsystem for Linux
(WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). إذا
كان لديك Ubuntu 16.04 أو أحدث كنظام فرعي، فافتح
صدفة Bash في Ubuntu واتبع تعليمات [Linux](####-Linux).

#### Windows مع MingW GNU Fortran

يمكن لمستخدمي Windows الحصول على GNU Fortran عبر
[MingW](http://www.mingw.org/).
وأسهل طريقة هي تثبيت [chocolatey](https://chocolatey.org) أولًا،
ثم فتح صدفة cmd بصلاحيات المسؤول، ثم تشغيل:

```Batchfile
choco install mingw cmake
```

سيؤدي هذا إلى تثبيت MingW (أي GFortran وGCC) في `C:\tools\mingw64`
وCMake في `C:\Program Files\CMake`. ثم أضف مجلدات `bin` الخاصة
بهذين التثبيتين إلى PATH، أي:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows مع Visual Studio مع NMake وIntel Fortran

راجع [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

بالنسبة إلى [Intel Fortran](https://software.intel.com/en-us/fortran-compilers)
عليك أولًا تهيئة مترجم Fortran. على Windows مع Intel
Fortran 2019 وVisual Studio 2017، ينبغي أن يكون سطر الأوامر كالتالي:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

يقوم هذا بتحميل المسارات الخاصة بـ Intel Fortran، وينبغي أن يلتقطها cmake
بشكل صحيح. كذلك، على Windows عليك تحديد مولّد cmake باسم
`NMake` لبناء من سطر الأوامر، مثل:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

ستنشئ الأوامر أعلاه مجلد `build` (وهو غير ضروري، لكنه
ممارسة جيدة)، وتبني الملفات التنفيذية (عبر NMake) ثم تختبرها (عبر ctest).

أما الإصدارات الأخرى من Intel Fortran، فابحث في التثبيت لديك
عن `ifortvars.bat` على Windows وعن `ifortvars.sh` على Linux/MacOS.
نفّذ النص في صدفة دون خيارات، وستشرح لك المساعدة
الخيارات المتاحة لديك. على Linux أو MacOS ستكون الأوامر كالتالي:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
