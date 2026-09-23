# Підказки

## 1. Визначте, чи знадобиться водійське посвідчення

- Скористайтеся [оператором суворої рівності][mdn-equality-operators], щоб перевірити, чи дорівнює вхідне значення певному рядку тексту (англ. string).
- Скористайтеся одним із двох [логічних операторів][mdn-logical-operators], про які ми дізналися з концепції про булеві значення (англ. Boolean), щоб поєднати обидві умови.
- Для розвʼязання цього завдання **не** потрібна умовна конструкція. Булевий вираз, який ми побудуємо, можна повернути безпосередньо.

## 2. Виберіть між двома автомобілями, які можна купити

- Скористайтеся [оператором порівняння][mdn-relational-operators], щоб визначити, який з варіантів стоїть першим за словниковим порядком.
- Потім за допомогою умовної конструкції `if-else` присвойте значення допоміжній змінній залежно від результату цього порівняння.
- Нарешті, складіть речення з рекомендацією. Для цього можна скористатися [оператором додавання][mdn-addition], щоб зʼєднати два рядки тексту.

## 3. Обчисліть приблизну ціну вживаного автомобіля

- Почніть із визначення відсотка на основі віку автомобіля. Збережіть його в допоміжній змінній. Скористайтеся конструкцією `if-else if-else`, як зазначено в інструкціях.
- У двох умовах конструкції `if` скористайтеся [операторами порівняння][mdn-relational-operators], щоб порівняти вік автомобіля з пороговими значеннями.
- Щоб обчислити результат, застосуйте відсоток до початкової ціни. Наприклад, `30% of x` можна обчислити, поділивши `30` на `100` і помноживши на `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
