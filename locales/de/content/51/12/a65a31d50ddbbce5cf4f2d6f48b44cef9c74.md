# Einführung

ABAP unterstützt ein objektorientiertes Programmiermodell, das auf Klassen und Schnittstellen von ABAP Objects basiert.

## (Neu-)Zuweisung

In ABAP gibt es einige grundlegende Möglichkeiten, Namen Werte zuzuweisen: über Variablen oder Konstanten. Auf Exercism werden Variablen immer in [Snake Case][wiki-snake-case] geschrieben. Es gibt keine offizielle Richtlinie, an die du dich halten musst, und verschiedene Firmen und Organisationen haben unterschiedliche Styleguides. _Schreib Variablen einfach so, wie du möchtest_. Der Vorteil, wenn du sie so schreibst, wie die Übungen vorbereitet sind, ist, dass sie in der Weboberfläche und in den meisten IDEs anders hervorgehoben werden.

Variablen in ABAP kannst du mit den Schlüsselwörtern [`constant`][constant] oder [`data`][data] definieren.

Wenn du `data` verwendest, kann eine Variable im Laufe ihres Daseins auf verschiedene Werte verweisen. Zum Beispiel kannst du `my_first_variable` mit dem [Zuweisungsoperator `=`][assignment] beliebig oft definieren und neu zuweisen:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

Im Gegensatz zu `data` kannst du Variablen, die mit `constant` definiert werden, nur einmal zuweisen. So definierst du in ABAP Konstanten.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Klassen- und Methodendeklarationen

In ABAP werden Funktionseinheiten in _Methoden_ gekapselt, wobei Methoden, die zusammengehören, meist in derselben [Klasse][classes] zusammengefasst werden. Diese Methoden können Parameter (Argumente) annehmen und mit dem Schlüsselwort `returning` in der Methodendefinition einen Wert _zurückgeben_. Methoden rufst du mit der Syntax `( )` auf.

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