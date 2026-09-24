# Підказки

## Загальне

- [Туторіал з дат і часу від csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Розібрати дату прийому

- Клас `DateTime` має кілька методів, щоб [розібрати][docs.microsoft.com_parsing-date] `string` на `DateTime`.

## 2. Перевірити, чи прийом уже минув

- Обʼєкти `DateTime` можна порівнювати за допомогою типових [операторів порівняння][docs.microsoft.com_datetime-operators].
- Є [властивість][docs.microsoft.com_datetime-properties], щоб отримати поточні дату й час.

## 3. Перевірити, чи прийом після обіду

- Отримати частину часу обʼєкта `DateTime` можна через одну з його [властивостей][docs.microsoft.com_datetime-properties].

## 4. Описати час і дату прийому

- Тести виконуються так, ніби вони запущені на машині у Сполучених Штатах, а це означає, що під час перетворення `DateTime` на `string` ми отримаємо дати й час у форматі США.
- Перетворюючи екземпляр `DateTime` на `string`, можна використати або [стандартний рядок формату][docs.microsoft.com_standard-date-and-time-format-strings], або [рядок власного формату][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Повернути дату річниці

- Скористаймося одним із різних [конструкторів][constructors] `DateTime`, щоб створити новий екземпляр `DateTime`.
- Можна скористатися однією з [властивостей][docs.microsoft.com_datetime-properties] поточних дати й часу, щоб отримати поточний рік.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
