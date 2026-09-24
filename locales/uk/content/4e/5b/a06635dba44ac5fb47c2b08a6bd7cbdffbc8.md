# Вступ

Коли ми працюємо з масивами, іноді потрібно виконати код для кожного значення в масиві. Це називається перебиранням масиву або циклом по ньому.

Тут ми розглянемо випадок, коли не потрібно змінювати масив у процесі перебирання. Якщо ж ідеться про перетворення масивів, натомість звернімося до [Перетворень масивів][concept-array-transformations].

## Цикл `for`

Найпростіший спосіб перебрати масив - скористатися циклом `for`. Докладніше про це в [Циклах for][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## Цикл `for...of`

Коли ми хочемо працювати зі значенням безпосередньо на кожній ітерації і нам зовсім не потрібен індекс, можна скористатися циклом `for...of`.

Цикл `for...of` працює так само, як показаний вище базовий цикл `for`, але замість того, щоб мати справу з _індексом_ як зі змінною в циклі, ми одразу отримуємо _значення_.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

Як і у звичайних циклах `for`, можна використати `continue`, щоб зупинити поточну ітерацію, і `break`, щоб повністю перервати виконання циклу.

## Метод `forEach`

Кожен масив має метод `forEach`, який можна використати, щоб перебрати елементи масиву.

`forEach` приймає [колбек][concept-callbacks] як параметр.
Функція-колбек викликається один раз для кожного елемента масиву.
Поточний елемент, його індекс і весь масив передаються колбеку як аргументи.
Часто використовуються лише поточний елемент або індекс.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Зупинити ітерацію після запуску циклу `forEach` неможливо.
Інструкції `break` і `continue` у цьому контексті не існують.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
