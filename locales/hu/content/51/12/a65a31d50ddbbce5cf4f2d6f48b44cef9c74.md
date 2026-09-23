# Bevezetés

Az ABAP támogat egy objektumorientált programozási modellt, amely az ABAP Objects osztályaira és interfészeire épül.

## (Újra)értékadás

Az ABAP-ban többféleképpen is adhatsz értéket neveknek, például változókkal vagy konstansokkal. Az Exercism-ön a változókat mindig [snake-case][wiki-snake-case] írásmóddal írjuk. Nincs hivatalos útmutató, és a különböző cégeknek és szervezeteknek más-más stílusútmutatójuk van. _Nyugodtan írd a változókat úgy, ahogy szeretnéd._ Ha úgy írod őket, ahogy a feladatok elő vannak készítve, azzal az az előnyöd, hogy a webes felületen és a legtöbb IDE-ben másképp jelennek meg kiemelve.

Az ABAP-ban a változókat a [`constant`][constant] vagy a [`data`][data] kulcsszóval definiálhatod.

Egy változó az élettartama során több különböző értékre is hivatkozhat, ha `data`-t használsz. Például a `my_first_variable` sokszor definiálható és definiálható újra az [értékadás operátor `=`][assignment] használatával:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

A `data`-tól eltérően, ha egy változót `constant`-tal definiálsz, annak csak egyszer adhatsz értéket. Az ABAP-ban így definiálunk konstansokat.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Osztály- és metódusdeklarációk

Az ABAP-ban a funkcionalitás egységeit _metódusokba_ zárjuk, és ha összetartoznak, általában ugyanabban az [osztályban][classes] csoportosítjuk őket. Ezek a metódusok fogadhatnak paramétereket (argumentumokat), és a metódusdefinícióban a `returning` kulcsszóval _adhatnak vissza_ értéket. A metódusokat a `( )` szintaxissal hívjuk meg.

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