# Форматування файлів JSON

У репозиторії треку Exercism є багато файлів JSON, зокрема:

- Файл `config.json` треку.
- Файл `.meta/config.json` і файл `links.json` для кожного концепту.
- Файл `.meta/config.json` для кожної концептуальної чи практичної вправи.

Ці файли читаються краще, якщо мають однакове форматування в усьому Exercism, тож у configlet є команда `fmt`, яка переписує JSON-файли треку в канонічну форму.

Команда `fmt` форматує такі файли:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Використання

Команда `fmt` форматує файли «meta/config.json» вправ.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Команда `configlet fmt` без додаткових опцій нічого не змінює в треку, а лише перевіряє форматування файлу `.meta/config.json` для кожної концептуальної та практичної вправи і форматування файлу `config.json` треку.

Щоб вивести список шляхів, для яких ще немає відформатованого файлу `.meta/config.json` вправи (з ненульовим кодом виходу, якщо хоча б в одній вправі немає відформатованого файлу конфігурації):

```shell
configlet fmt
```

Щоб отримати запит на запис відформатованих файлів конфігурації, додайте опцію `--update` (або `-u` для стислості):

```shell
configlet fmt --update
```

Щоб записати відформатовані файли конфігурації без взаємодії, додайте опцію `--yes` (або `-y` для стислості):

```shell
configlet fmt --update --yes
```

Щоб працювати з однією вправою, використайте опцію `--exercise` (або `-e` для стислості).
Наприклад, щоб без взаємодії записати відформатований файл конфігурації для вправи `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Коли `configlet fmt` записує файли JSON, він:

- Записує пари ключ-значення в канонічному порядку.

- Використовує два пробіли для відступів.

- Використовує окремий рядок для кожного елемента масиву JSON і кожного ключа в обʼєкті JSON.

- Видаляє пари ключ-значення для ключів, які є необовʼязковими і мають порожні значення.
  Наприклад, `"source": ""` видаляється.

- Видаляє `"test_runner": true` з файлів конфігурації практичних вправ.
  Це необовʼязковий ключ: специфікація каже, що пропущений ключ `test_runner` означає значення `true`.

- Коли обʼєкт JSON має більше ніж одну пару ключ-значення з однаковою назвою ключа, залишає лише останню.

Канонічний порядок ключів для файлу `.meta/config.json` вправи такий:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

де квадратні дужки означають, що ключ усередині них необовʼязковий.

Варто зауважити, що `configlet fmt` працює лише з вправами, які є у файлі `config.json` на рівні треку.
Тож якщо ми додаємо нову вправу до треку й хочемо відформатувати її файл `.meta/config.json`, спершу додайте цю вправу до файлу `config.json` на рівні треку.
Якщо вправа ще не готова бути доступною користувачам, установіть значення її поля `status` у `wip`.

Код виходу дорівнює 0, якщо на момент завершення configlet кожен із переглянутих файлів конфігурації відформатовано, і 1 в іншому разі.
