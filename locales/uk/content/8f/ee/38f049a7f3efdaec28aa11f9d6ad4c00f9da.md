# Вступ

Файл - це потік з іменем на диску. Словник [`io.files`][io.files] читає й записує файли або цілком, одним викликом, або частинами через потік з обмеженою областю видимості. Кожне слово для роботи з файлами приймає **кодування**; для тексту це майже завжди [`utf8`][utf8] з `io.encodings.utf8`.

## Читання

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` повертає весь файл як один рядок тексту (англ. string). `file-lines` повертає рядки файлу як масив, прибравши розриви рядків.

## Запис

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Обидва замінюють файл (створюючи його за потреби). `set-file-lines` записує по одному елементу на рядок і сам додає символи нового рядка.

## Дописування та поступове введення-виведення

Комбінатори `with-…` відкривають файл як поточний потік для quotation і закривають його після цього. Це область видимості з деструктором, як комбінатори потоків у `channel-chatter`.

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
