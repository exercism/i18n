# Вступ

Хеш-таблиці у Factor - це *асоціативні масиви*, тобто колекції пар
`key/value` з доступом за O(1). Вони належать до ширшої родини
[`assocs`][assocs].

## Літерали хеш-таблиць

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` позначає порожню хеш-таблицю. Хеш-таблиці *змінювані*: вони
ростуть і скорочуються, коли ми додаємо та видаляємо ключі. Якщо
потрібно залишити оригінал без змін, спершу варто викликати `clone`.
Друк хеш-таблиці показує її записи, але порядок не повʼязаний із
порядком додавання. Хеш-таблиці невпорядковані.

## Читання

`at` (з [`assocs`][assocs]) читає значення й повертає `f`, якщо ключа
немає:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Запис

`set-at` додає або перезаписує; `delete-at` видаляє; `change-at`
виконує quotation над поточним значенням. Усі три *змінюють*
хеш-таблицю на місці:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at` як скорочення для підрахунку

`inc-at` (також із [`assocs`][assocs]) додає 1 до наявного значення для
ключа, а якщо ключа немає, вставляє його зі значенням 1. Ідеально для
підрахунку:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Ітерація та ліниве додавання

`assoc-each` проходить кожну пару `( key value -- )`; `cache`
повертає значення для ключа, обчислюючи його один раз наданим
quotation, якщо ключа немає.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` втілює шаблон «знайти або створити» в одному слові. Це зручно,
коли ми будуємо хеш-таблицю з потоку ключів і не хочемо обробляти
випадок відсутнього запису в кожному місці виклику.

## Застосування оновлення хеш-таблиці до послідовності ключів

Коли вхідні дані - це послідовність ключів і ми хочемо оновити
хеш-таблицю по одному разу на кожен ключ, перебираємо *послідовність*
за допомогою `each` і використовуємо fried quotation `'[ _ … ]`
(з [`fry`][fry]), щоб вбудувати хеш-таблицю в тіло циклу. Наприклад,
видалення списку ключів:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` захоплює хеш-таблицю, що лежить над ним у стеку,
тож на кожній ітерації `each` має надати лише ключ. `keep` виконує
quotation, зберігаючи хеш-таблицю для фінальної `.`.

## Побудова хеш-таблиці з послідовності

`map>assoc` (з [`assocs`][assocs]) відображає quotation на послідовність
і збирає результати `( elt -- key value )` в assoc типу зразка:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Ключі, значення та пари

`keys` і `values` (з [`assocs`][assocs]) повертають лише ключі або
лише значення; `>alist` повертає пари `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` і `values` відповідають одне одному: значення на певній позиції
належить ключу на тій самій позиції.

`sort-keys` (з [`sorting`][sorting]) повертає пари `{ key value }`,
відсортовані за ключем:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## З пар назад до хеш-таблиці

`>hashtable` (з [`hashtables`][hashtables]) виконує перетворення,
обернене до `>alist`: він перетворює будь-який assoc (найчастіше alist
із пар `{ key value }`) у хеш-таблицю з доступом за O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Зручно, коли ми зібрали або перетворили список пар і хочемо згорнути
його назад у хеш-таблицю, щоб шукати записи за ключем.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
