# 简介

ABAP 支持一种面向对象的编程模型，它基于 ABAP Objects 的类和接口。

## （重新）赋值

在 ABAP 中，给名称赋值主要有几种方式，可以使用变量或常量。在 Exercism 上，变量一律写成 [snake-case][wiki-snake-case] 的形式。这里没有官方指南可循，各家公司和组织都有各自不同的风格指南。_你可以随意用任何方式命名变量_。按照练习准备的方式来写变量的好处是，它们会在网页界面和大多数 IDE 中以不同的方式高亮显示。

在 ABAP 中，可以使用 [`constant`][constant] 或 [`data`][data] 关键字来定义变量。

当使用 `data` 时，变量在其生命周期内可以引用不同的值。例如，可以使用 [赋值运算符 `=`][assignment] 多次定义和重新定义 `my_first_variable`：

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

与 `data` 相反，用 `constant` 定义的变量只能赋值一次。这正是 ABAP 中定义常量的方式。

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## 类和方法声明

在 ABAP 中，功能单元被封装在_方法_里；如果几个方法属于同一类，通常会把它们归到同一个[类][classes]中。这些方法可以接收形参（实参），并且可以在方法定义中使用 `returning` 关键字_返回_一个值。方法通过 `( )` 语法调用。

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