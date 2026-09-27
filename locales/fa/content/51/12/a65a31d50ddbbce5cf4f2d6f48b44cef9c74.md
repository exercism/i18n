# معرفی

ABAP از یک مدل برنامه‌نویسی شی‌گرا پشتیبانی می‌کند که بر پایه‌ی کلاس‌ها و رابط‌های ABAP Objects ساخته شده است.

## انتساب (و انتساب دوباره)

در ABAP چند راه اصلی برای انتساب مقدار به اسم‌ها وجود دارد: با استفاده از متغیرها یا ثابت‌ها. در Exercism، اسم متغیرها همیشه با [snake-case][wiki-snake-case] نوشته می‌شود. هیچ راهنمای رسمی‌ای برای پیروی وجود ندارد و شرکت‌ها و سازمان‌های مختلف راهنماهای سبک متفاوتی دارند. _هر طور که دوست دارید اسم متغیرها را بنویسید_. مزیت نوشتن آن‌ها به همان شکلی که تمرین‌ها آماده شده‌اند این است که در رابط وب و بیشتر IDEها به شکل متفاوتی برجسته می‌شوند.

متغیرها در ABAP را می‌توان با کلیدواژه‌های [`constant`][constant] یا [`data`][data] تعریف کرد.

وقتی از `data` استفاده می‌کنید، یک متغیر می‌تواند در طول عمرش به مقادیر مختلفی اشاره کند. برای مثال، `my_first_variable` را می‌توان با [عملگر انتساب `=`][assignment] بارها تعریف و دوباره تعریف کرد:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

برخلاف `data`، متغیرهایی که با `constant` تعریف می‌شوند فقط یک بار می‌توانند مقدار بگیرند. از این ویژگی برای تعریف ثابت‌ها در ABAP استفاده می‌شود.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## تعریف کلاس و متد

در ABAP، واحدهای عملکردی در _متدها_ کپسوله می‌شوند. اگر متدها به هم مربوط باشند، معمولاً در یک [کلاس][classes] کنار هم قرار می‌گیرند. این متدها می‌توانند پارامتر (آرگومان) بگیرند و با استفاده از کلیدواژه‌ی `returning` در تعریف متد، یک مقدار را _برگردانند_. متدها با نحوه‌ی نگارش `( )` فراخوانی می‌شوند.

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