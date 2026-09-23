# Підказки

## Загальне

- Кількість птахів за день зберігається в [полі][fields] з назвою `birdsPerDay`.
- Кількість птахів за день - це масив, який містить рівно 7 цілих чисел.

## 1. Перевірте, якою була кількість птахів минулого тижня

- Оскільки цей метод _не_ залежить від кількості за поточний тиждень, його визначено як [`static` метод][static-members].
- Існує [кілька способів визначити масив][single-dimensional-arrays].

## 2. Перевірте, скільки птахів прилетіло сьогодні

- Памʼятаймо, що кількість птахів упорядковано за днями від найдавнішого до найновішого, а останній елемент відповідає сьогоднішньому дню.
- Доступ до останнього елемента можна отримати або за його (фіксованим) індексом (памʼятаймо, що відлік починається з нуля), або обчисливши його індекс за допомогою [розміру масиву][array-length].

## 3. Збільште сьогоднішню кількість на одиницю

- Присвойте елементу, який відповідає сьогоднішній кількості, значення, що дорівнює сьогоднішній кількості плюс 1.

## 4. Перевірте, чи був день, коли не прилетів жоден птах

- Клас `Array` має [вбудований метод][array-indexof], який повертає перший індекс, за яким знайдено елемент, або -1, якщо відповідного елемента не знайдено.

## 5. Обчисліть кількість птахів, що прилетіли, за перші дні

- Для зберігання кількості птахів, що прилетіли, можна використати змінну.
- Масив можна перебрати за допомогою [циклу `for`][for-statement].
- Змінну можна оновлювати всередині циклу.
- Памʼятаймо: індексація масивів починається з `0`.

## 6. Обчисліть кількість насичених днів

- Для зберігання кількості насичених днів можна використати змінну.
- Масив можна перебрати за допомогою [циклу `foreach`][array-foreach].
- Змінну можна оновлювати всередині циклу.
- Усередині циклу можна використати [умовну конструкцію][if-statement].

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
