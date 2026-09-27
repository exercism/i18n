# 소개

ABAP은 ABAP Objects의 클래스와 인터페이스를 기반으로 하는 객체 지향 프로그래밍 모델을 지원해요.

## (재)할당

ABAP에서 이름에 값을 할당하는 주요한 방법은 몇 가지가 있어요. 변수나 상수를 사용하는 것이죠. Exercism에서는 변수를 항상 [스네이크 케이스][wiki-snake-case]로 작성해요. 따라야 할 공식 가이드는 없고, 회사와 조직마다 스타일 가이드도 제각각이에요. _변수는 원하는 방식으로 마음껏 작성해도 괜찮아요._ 연습 문제에서 준비한 방식대로 작성하면, 웹 인터페이스와 대부분의 IDE에서 다르게 강조 표시된다는 장점이 있어요.

ABAP에서 변수는 [`constant`][constant] 또는 [`data`][data] 키워드로 정의할 수 있어요.

`data`를 사용하면 변수는 수명 주기 동안 서로 다른 값을 참조할 수 있어요. 예를 들어 `my_first_variable`은 [할당 연산자 `=`][assignment]로 여러 번 정의하고 다시 정의할 수 있어요.

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

`data`와 달리 `constant`로 정의한 변수는 한 번만 할당할 수 있어요. ABAP에서는 이렇게 상수를 정의해요.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## 클래스와 메서드 선언

ABAP에서는 기능 단위가 _메서드_로 캡슐화되는데, 서로 관련 있는 메서드들은 보통 같은 [클래스][classes]로 묶어요. 이 메서드는 매개변수(인자)를 받을 수 있고, 메서드 정의에서 `returning` 키워드를 사용해 값을 _반환_할 수 있어요. 메서드는 `( )` 구문으로 호출해요.

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