# Introducción

ABAP admite un modelo de programación orientada a objetos que se basa en las clases y las interfaces de ABAP Objects.

## Asignación (y reasignación)

Hay varias formas principales de asignar valores a nombres en ABAP: mediante variables o constantes. En Exercism, las variables siempre se escriben en [snake-case][wiki-snake-case]. No hay una guía oficial que seguir, y cada empresa y organización tiene su propia guía de estilo. _Escribe las variables como quieras_. La ventaja de escribirlas como se preparan en los ejercicios es que se resaltarán de forma distinta en la interfaz web y en la mayoría de los IDE.

Las variables en ABAP se pueden definir con las palabras clave [`constant`][constant] o [`data`][data].

Una variable puede hacer referencia a distintos valores a lo largo de su vida cuando se usa `data`. Por ejemplo, `my_first_variable` se puede definir y redefinir muchas veces con el [operador de asignación `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

A diferencia de `data`, las variables definidas con `constant` solo se pueden asignar una vez. Así se definen las constantes en ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Declaración de clases y métodos

En ABAP, las unidades de funcionalidad se encapsulan en _métodos_, y lo habitual es agrupar los métodos en la misma [clase][classes] si van juntos. Estos métodos pueden recibir parámetros (argumentos) y pueden _devolver_ un valor con la palabra clave `returning` en la definición del método. Los métodos se invocan con la sintaxis `( )`.

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