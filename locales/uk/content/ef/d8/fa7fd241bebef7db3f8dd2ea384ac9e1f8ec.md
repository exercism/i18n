# Передумови

Трек мови Fortran вимагає, щоб у системі було встановлено таке програмне забезпечення:

- сучасний компілятор Fortran
- кросплатформну систему збирання CMake

## Передумова: сучасний компілятор Fortran

Цей трек мови потребує компілятора з підтримкою [Fortran 2003](https://en.wikipedia.org/wiki/Fortran#Fortran_2003). Усі основні компілятори, випущені за останні кілька років, мають бути сумісними.

Далі описано встановлення [GNU Fortran](https://gcc.gnu.org/fortran/) або GFortran. Інші компілятори Fortran перелічено [тут](https://en.wikipedia.org/wiki/List_of_compilers#Fortran_compilers). [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) - популярний пропрієтарний вибір для високопродуктивних застосунків. Більшість вправ будуть працювати з Intel Fortran, але тестуються вони лише з GNU Fortran, тож результат може відрізнятися.

## Передумова: CMake

CMake - це кросплатформна система збирання з відкритим кодом, яка генерує сценарії збирання для нативної системи збирання (`make`, Visual Studio, Xcode тощо). Трек Fortran від Exercism використовує CMake, щоб надати готове збирання, яке:

- компілює тести
- компілює рішення
- компонує виконуваний файл тестів
- автоматично запускає тести під час кожного збирання
- завершує збирання з помилкою, якщо якийсь із тестів не пройшов

Завдяки CMake Exercism надає кросплатформний сценарій збирання, який може генерувати файли проєктів для інтегрованих середовищ розробки, як-от Visual Studio і Xcode. Це дає змогу зосередитися на задачі й не перейматися налаштуванням збирання для кожної вправи.

Зробити збирання переносним непросто, і для цього потрібен доступ до багатьох різних систем. Якщо виникнуть проблеми з наданим рецептом CMake, [повідомте про проблему](https://github.com/exercism/fortran/issues), щоб ми могли покращити підтримку CMake.

Щоб скористатися наданим рецептом збирання, потрібен [CMake 2.8.11 або новіший](http://www.cmake.org/).

### Linux

В Ubuntu 16.04 і новіших версіях у менеджері пакунків є сумісні компілятори, тож потрібний компілятор можна встановити так:

```bash
sudo apt-get install gfortran cmake
```

В інших дистрибутивах компілятор можна отримати через менеджер пакунків.

### MacOS

Користувачі MacOS можуть встановити GCC через [Homebrew](http://brew.sh/):

```bash
brew install gfortran cmake
```

### Windows

У Windows є кілька варіантів:

- [Підсистема Windows для Linux (WSL)](<#####-Windows-Subsystem-for-Linux-(WSL)>)
- [Windows з MingW GNU Fortran](#####-Windows-with-MingW-GNU-Fortran)
- [Windows з Visual Studio, NMake та Intel Fortran](#####-Windows-with-Visual-Studio-with-NMake-and-Intel-Fortran)

#### Підсистема Windows для Linux (WSL)

У Windows 10 зʼявилася [підсистема Windows для Linux (WSL)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Якщо як підсистему встановлено Ubuntu 16.04 або новішу версію, відкрийте оболонку Bash в Ubuntu і виконайте інструкції з розділу [Linux](####-Linux).

#### Windows з MingW GNU Fortran

У Windows GNU Fortran можна отримати через [MingW](http://www.mingw.org/). Найпростіше спершу встановити [chocolatey](https://chocolatey.org), а потім відкрити командну оболонку cmd від імені адміністратора й виконати:

```Batchfile
choco install mingw cmake
```

Це встановить MingW (GFortran і GCC) у `C:\tools\mingw64`, а CMake - у `C:\Program Files\CMake`. Потім додайте каталоги `bin` цих інсталяцій до PATH, наприклад:

```Batchfile
set PATH=%PATH%;C:\tools\mingw64\bin;C:\Program Files\CMake\bin
```

#### Windows з Visual Studio, NMake та Intel Fortran

Дивіться [Intel Fortran](###-Intel-Fortran)

### Intel Fortran

Для [Intel Fortran](https://software.intel.com/en-us/fortran-compilers) спершу потрібно ініціалізувати компілятор Fortran. У Windows з Intel Fortran 2019 і Visual Studio 2017 команда має бути такою:

```Batchfile
"c:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2019\windows\bin\ifortvars.bat" intel64 vs2017
```

Це налаштовує шляхи для Intel Fortran, і cmake має підхопити їх правильно. Крім того, у Windows для збирання з командного рядка потрібно вказати генератор cmake `NMake`, наприклад:

```Batchfile
mkdir build
cd build
cmake -G"NMake Makefiles" ..
NMake
ctest -V
```

Наведені вище команди створять каталог `build` (не обовʼязково, але це хороша практика), зберуть (NMake) виконувані файли та протестують їх (ctest).

Для інших версій Intel Fortran варто пошукати в інсталяції `ifortvars.bat` у Windows, а в Linux/macOS - `ifortvars.sh`. Запустіть сценарій в оболонці без параметрів, і довідка пояснить, які параметри доступні. У Linux або MacOS команди будуть такими:

```bash
. /opt/intel/parallel_studio_xe_2016.1.056/compilers_and_libraries_2016/linux/bin/ifortvars.sh intel64
mkdir build
cd build
cmake ..
make
ctest -V
```
