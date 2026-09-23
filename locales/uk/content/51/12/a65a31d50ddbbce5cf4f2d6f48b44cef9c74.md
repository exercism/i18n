# Вступ

ABAP підтримує обʼєктно-орієнтовану модель програмування, що ґрунтується на класах та інтерфейсах ABAP Objects.

## (Пере)присвоєння

Існує кілька основних способів присвоїти значення іменам в ABAP: за допомогою змінних або констант. На Exercism змінні завжди записуються в [зміїному регістрі][wiki-snake-case]. Офіційного посібника, якого варто дотримуватися, немає, і різні компанії та організації мають різні стайлгайди. _Можна писати змінні так, як нам зручно_. Перевага запису їх так, як підготовлено у вправах, полягає в тому, що вони будуть підсвічуватися інакше у вебінтерфейсі та більшості IDE.

Змінні в ABAP можна визначати за допомогою ключових слів [`constant`][constant] або [`data`][data].

Змінна може посилатися на різні значення протягом свого життя, якщо використовувати `data`. Наприклад, `my_first_variable` можна визначати й перевизначати багато разів за допомогою [оператора присвоєння `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

На відміну від `data`, змінним, визначеним за допомогою `constant`, можна присвоїти значення лише один раз. Так в ABAP визначають константи.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Оголошення класів і методів

В ABAP одиниці функціональності інкапсульовані в _методах_, які зазвичай групуються в одному [класі][classes], якщо вони належать разом. Ці методи можуть приймати параметри (аргументи) і можуть _повертати_ значення за допомогою ключового слова `returning` у визначенні методу. Методи викликаються за допомогою синтаксису `( )`.

```abap
CLASS my_class DEFINITION.

  PUBLIC SECTION.

    METHODS add
      IMPORTING
        num1          TYPE i
        num2          TYPE i
      RETURNING
        VALUE(result) TYPE i.

ENDCLASS.

CLASS my_class IMPLEMENTATION.

  METHOD add.
    result = num1 + num2.
  ENDMETHOD.

ENDCLASS.

add( num1 = 1 num2 = 3 ).
// => 4
```

[constant]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapconstants.htm
[data]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapdata.htm
[assignment]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abenequals_operator.htm
[classes]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapclass.htm
[methods]: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abapmethods_functional.htm