# Тестування в треку Pyret

## Встановлення передумов

Після успішного завантаження вправи потрібно встановити модулі Node.js, щоб запускати тести:

```sh
cd /path/to/exercise
npm install
```

Потім додайте теку, що містить інструмент командного рядка `pyret`, до змінної $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Початок роботи

У теці вправи буде кілька файлів, але найважливіші два - це файл рішення та файл тестів.
У наведеному нижче прикладі ми завантажили вправу Leap.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Щоб запустити тести, можна скористатися командою `exercism test`, якщо завантажено офіційний інтерфейс командного рядка Exercism, або виконати `pyret leap-test.arr`.
Pyret запустить набір тестів, який складається з низки позначених блоків `check`, що перевіряють файл рішення на конкретних вхідних даних та очікуваних результатах.
Важлива частина цього процесу - явно експортувати частини коду, щоб набір тестів міг їх бачити.

## provide

Тести в цьому треку імпортують файл і отримують доступ до всього, що явно експортовано з коду.

Щоб експортувати змінні, потрібно додати [інструкцію provide][provide-statement] на початку файлу.

Наведені нижче фрагменти - це два способи експортувати `a`, `b` і `c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Третій метод, `provide *`, це скорочення для експорту всіх звʼязувань верхнього рівня, крім власних типів даних.
Однак його зазвичай не радять використовувати, бо Pyret суворо забороняє [затінення][shadowing].

## provide-types

Деякі вправи вимагають, щоб для тестування було експортовано [власний тип даних][data-definition].
У таких випадках можна скористатися [інструкцією `provide-types`][provide-types-statement].
Оскільки тип даних має додаткові функції, які можуть бути не експортовані, радимо використати `provide-types *`, попри застереження щодо затінення.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

У всіх заготовках вправ уже налаштовано інструкції `provide` або `provide-types`.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
