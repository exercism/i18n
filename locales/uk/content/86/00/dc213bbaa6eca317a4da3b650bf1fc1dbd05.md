# Підказки

## Загальне

Використовуйте лише f-рядки або метод `format()`, щоб створити листівку з основною інформацією про подію.

- [Вступ до форматування рядків у Python][str-f-strings-docs]
- [Стаття на realpython.com][realpython-article]

## 1. Зробіть заголовок з великої літери

- Зробіть заголовок з великої літери за допомогою рядкового методу `capitalize`.

## 2. Відформатуйте дату

- Відформатуйте `date` вручну за допомогою `f''` або `''.format()`.
- Використайте для `date` такий формат: 'Month day, year'.

## 3. Відобразіть символи юнікоду як значки

- Один зі способів відображення за допомогою `format` - це використати префікс юнікоду `u'{}'`.

## 4. Покажіть готову листівку

- Знайдіть потрібне [поле `format_spec`][formatspec-docs], щоб вирівняти зірочки та символи.
- Секція 1 - це `header` як рядок тексту (англ. string) з великої літери.
- Секція 2 - це `date`.
- Секція 3 - це масив виконавців, кожен виконавець повʼязаний з символом юнікоду з тим самим індексом.
- Кожен рядок має містити 20 символів.
- Напишіть лаконічний код, щоб додати потрібні порожні рядки між кожною секцією.
- Якщо дату не вказано, замініть її на порожній рядок.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
