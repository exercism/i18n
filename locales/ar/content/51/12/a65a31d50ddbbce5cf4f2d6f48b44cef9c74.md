# مقدمة

يدعم ABAP نموذج برمجة كائنية التوجه يقوم على أصناف ABAP Objects وواجهاته.

## الإسناد (وإعادة الإسناد)

هناك بضعة أساليب أساسية لإسناد القيم إلى الأسماء في ABAP، وذلك باستخدام المتغيرات أو الثوابت. في Exercism، تُكتب المتغيرات دائمًا بنمط [snake-case][wiki-snake-case]. لا يوجد دليل رسمي يجب اتباعه، ولكل شركة أو مؤسسة دليل أسلوب خاص بها. _لا تتردد في كتابة المتغيرات بالشكل الذي تريده_. وميزة كتابتها بالشكل الذي أُعدّت به التمارين أنها ستُميَّز بشكل مختلف في واجهة الويب وفي معظم بيئات التطوير المتكاملة.

يمكن تعريف المتغيرات في ABAP باستخدام الكلمتين المفتاحيتين [`constant`][constant] أو [`data`][data].

يمكن للمتغير أن يحمل قيمًا مختلفة على مدار عمره عند استخدام `data`. على سبيل المثال، يمكن تعريف `my_first_variable` وإعادة تعريفه مرات عديدة باستخدام [عامل الإسناد `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

وعلى عكس `data`، فإن المتغيرات المعرّفة باستخدام `constant` لا يمكن إسناد قيمة لها إلا مرة واحدة. ويُستخدم هذا لتعريف الثوابت في ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## تعريف الأصناف والطرق

في ABAP، تُغلَّف الوحدات الوظيفية في _طرق_، حيث تُجمَّع الطرق عادةً معًا في [الصنف][classes] نفسه إذا كانت تنتمي إلى بعضها. يمكن لهذه الطرق أن تتلقى معاملات (وسائط)، وأن _تُرجع_ قيمة باستخدام الكلمة المفتاحية `returning` في تعريف الطريقة. وتُستدعى الطرق باستخدام الصيغة `( )`.

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