# Вступ

*Потік* у Factor - це будь-що, з чого можна читати байти або куди можна записувати байти. Файли, сокети, буфери в памʼяті та власні обгортки - усі вони беруть участь у тому самому невеличкому [протоколі][stream-protocol] з [`io`][io].

Протокол поділено на два міксини: `input-stream` для того, звідки ми читаємо, і `output-stream` для того, куди ми пишемо. Клас долучається до одного з них (або до обох) за допомогою `INSTANCE: <class> input-stream`.

## Читання і запис

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` повертає наступний байт (або `f` у кінці потоку); `stream-read` читає до `n` байтів. `stream-write1` і `stream-write` роблять те саме для вихідних даних. `stream-flush` скидає буферизовані вихідні дані. `stream-element-type` повідомляє, з чим працює потік: з необробленими байтами (`+byte+`) чи із символами (`+character+`).

## Звільнення ресурсів за допомогою `disposable`

Потоки тримають ресурси операційної системи, тож протокол іде в парі з модулем [`destructors`][destructors]. Власний потік успадковує батьківський клас `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (з `destructors`) виконує роль фабрики: він виділяє кортеж і реєструє його у фреймворку деструкторів, щоб через винятки ресурс не втрачався. `M: <class> dispose*` визначає, *як* прибирати; код користувача викликає `dispose` (публічне слово), яке позначає обʼєкт як звільнений, а потім виконує `dispose*`.

## Обмежене використання

`with-disposal`, `with-input-stream` і `with-output-stream` виконують quotation, тримаючи ресурс відкритим, і звільняють його на виході:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
