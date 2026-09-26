# はじめに

ABAPは、ABAP Objectsのクラスとインターフェースに基づいたオブジェクト指向プログラミングモデルをサポートしています。

## （再）代入

ABAPで名前に値を代入する主な方法はいくつかあります。変数を使う方法と定数を使う方法です。Exercismでは、変数は常に[スネークケース][wiki-snake-case]で書きます。従うべき公式のガイドはなく、企業や組織によってさまざまなスタイルガイドがあります。_変数の書き方は自由に決めてかまいません_。演習で用意されているとおりに書くと、WebインターフェースやほとんどのIDEで、変数がほかとは違うふうに強調表示されるという利点があります。

ABAPでは、[`constant`][constant]キーワードまたは[`data`][data]キーワードを使って変数を定義できます。

`data`を使う場合、変数はその生存期間中にさまざまな値を参照できます。たとえば、`my_first_variable`は[代入演算子 `=`][assignment]を使って、何度でも定義し直すことができます。

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

`data`とは対照的に、`constant`で定義した変数に代入できるのは1回だけです。ABAPでは、これを使って定数を定義します。

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## クラスとメソッドの宣言

ABAPでは、機能の単位は_メソッド_にカプセル化されます。関連するメソッドは、通常は同じ[クラス][classes]にまとめます。メソッドは仮引数（引数）を受け取ることができ、メソッド定義で`returning`キーワードを使うと値を_返す_ことができます。メソッドは`( )`という構文で呼び出します。

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