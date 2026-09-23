# Доповнення до інструкцій

## Підказки

Реалізуйте функцію `diamond`, яка виводить ромб, що починається з `A`, а в
найширших його точках стоїть заданий символ. Скористайтеся наведеною
сигнатурою, якщо є сумніви щодо типів, але не дозволяйте їй обмежувати
творчий підхід:

```haskell
diamond :: Char -> Maybe [String]
```

У цій вправі ми працюємо з текстовими даними. З історичних причин тип
`String` у Haskell є синонімом `[Char]`, тобто масиву символів. Для
ефективнішої роботи з текстовими даними можна використати тип `Text`.

Як необовʼязкове доповнення до цієї вправи можна

- Прочитати про [типи рядків (англ. string)](https://haskell-lang.org/tutorial/string-types) у
  Haskell.
- Додати `- text` до списку залежностей у package.yaml.
- Імпортувати `Data.Text` [у такий
  спосіб](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Тепер можна написати, наприклад, `diamond :: Char -> Maybe [Text]` і
  звертатися до комбінаторів `Data.Text` як, наприклад, `T.pack`,
- Знайти документацію для
  [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Потім можна замінити всі входження `String` на `Text` у Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Ця частина цілком необовʼязкова.
