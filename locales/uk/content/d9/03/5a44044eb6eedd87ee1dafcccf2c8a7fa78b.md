# Інструкції

Обʼєднання мешканців просить нас вести реєстрацію ділянок у саду. Стан зберігається у двох динамічних змінних:

- `registrations` зберігає вектор кортежів `plot`, наразі зареєстрованих за певною особою.
- `next-id` зберігає ціле число, яке треба використати для наступної реєстрації.

Кортеж `plot` має два поля:

| поле            | тип      |
| --------------- | -------- |
| `id`            | ціле число |
| `registered-to` | рядок тексту (англ. string) |

## 1. Відкриймо сад і виведімо список реєстрацій

Визначмо `open-garden`, щоб ініціалізувати динамічні змінні: порожній вектор для `registrations` і `1` для `next-id`. Потім визначмо `list-registrations`, яка повертає поточний вектор ділянок.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Зареєструймо ділянку

Визначмо `register`, щоб вона брала імʼя зі стека, створювала новий `plot` із наступним вільним id, додавала його до вектора `registrations`, збільшувала `next-id` на одиницю і повертала новий кортеж `plot`.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Ідентифікатори ділянок мають бути унікальними й зростати навіть після звільнення: `next-id` ніколи не повинен використовувати те саме значення вдруге.

## 3. Звільнімо ділянку

Визначмо `release`, щоб вона брала id і вилучала відповідний запис із `registrations`. Звільнення невідомого id не виконує жодних дій.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Отримаймо зареєстровану ділянку

Визначмо `get-registration`, щоб вона брала id і повертала відповідний кортеж `plot`, або символ `not-found`, якщо жодна ділянка не має такого id.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Знайдімо ділянки за іменем

Визначмо `find-by-name`, щоб вона брала імʼя і повертала вектор усіх ділянок, наразі зареєстрованих за цією особою.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
