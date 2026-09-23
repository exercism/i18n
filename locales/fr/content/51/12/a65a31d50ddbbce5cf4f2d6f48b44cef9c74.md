# Introduction

ABAP prend en charge un modèle de programmation orientée objet qui repose sur les classes et les interfaces d'ABAP Objects.

## (Ré)affectation

Il existe quelques façons principales d'affecter des valeurs à des noms en ABAP, à l'aide de variables ou de constantes. Sur Exercism, les variables s'écrivent toujours en [`snake_case`][wiki-snake-case]. Il n'existe pas de guide officiel à suivre, et diverses entreprises et organisations ont divers guides de style. _Tu peux écrire les variables comme tu veux_. L'avantage d'écrire les variables comme les exercices les préparent, c'est qu'elles seront mises en évidence différemment dans l'interface web et dans la plupart des IDE.

En ABAP, les variables peuvent être définies à l'aide des mots-clés [`constant`][constant] ou [`data`][data].

Une variable peut référencer différentes valeurs au cours de son cycle de vie lorsqu'on utilise `data`. Par exemple, `my_first_variable` peut être définie et redéfinie de nombreuses fois à l'aide de l'[opérateur d'affectation `=`][assignment] :

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

Contrairement à `data`, les variables définies avec `constant` ne peuvent être affectées qu'une seule fois. C'est ainsi que l'on définit des constantes en ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Déclarations de classes et de méthodes

En ABAP, les unités de fonctionnalité sont encapsulées dans des _méthodes_, que l'on regroupe généralement dans une même [classe][classes] lorsqu'elles vont de pair. Ces méthodes peuvent prendre des paramètres (arguments) et peuvent _renvoyer_ une valeur à l'aide du mot-clé `returning` dans la définition de la méthode. On appelle les méthodes à l'aide de la syntaxe `( )`.

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