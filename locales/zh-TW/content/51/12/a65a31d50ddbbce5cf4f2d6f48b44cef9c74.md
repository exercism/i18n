# 簡介

ABAP 支援物件導向的程式設計模型，這個模型以 ABAP Objects 的類別與介面為基礎。

## （重新）賦值

在 ABAP 中，要把值指定給名稱，主要有幾種方式：使用變數或常數。在 Exercism 上，變數一律以 [snake-case][wiki-snake-case] 撰寫。這並沒有官方指南可循，各家公司和組織也各有不同的風格指南。_變數想怎麼寫都可以_。依照練習準備的方式來寫，好處是它們在網頁介面和多數 IDE 中會有不同的標示方式。

ABAP 中的變數可以用 [`constant`][constant] 或 [`data`][data] 關鍵字來定義。

使用 `data` 時，變數在其生命週期內可以參照不同的值。例如，`my_first_variable` 可以用[賦值運算子 `=`][assignment]定義並重新定義許多次：

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

和 `data` 不同的是，用 `constant` 定義的變數只能賦值一次。ABAP 就是用這個方式來定義常數。

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## 類別與方法宣告

在 ABAP 中，功能單位會封裝在_方法_裡，如果方法屬於同一個[類別][classes]，通常會把它們群組在一起。這些方法可以接受參數（引數），並且可以在方法定義中使用 `returning` 關鍵字來_回傳_值。方法是透過 `( )` 語法來呼叫的。

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