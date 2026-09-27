# Introduzione

ABAP supporta un modello di programmazione orientato agli oggetti basato su classi e interfacce di ABAP Objects.

## (Ri)assegnazione

Esistono alcuni modi principali per assegnare valori ai nomi in ABAP: usando variabili o costanti. Su Exercism, le variabili si scrivono sempre in [snake-case][wiki-snake-case]. Non c'è una guida ufficiale da seguire: aziende e organizzazioni diverse hanno guide di stile diverse. _Sentiti libero di scrivere le variabili come preferisci_. Il vantaggio di scriverle come sono preparati gli esercizi è che verranno evidenziate in modo diverso nell'interfaccia web e nella maggior parte degli IDE.

In ABAP le variabili si possono definire usando le parole chiave [`constant`][constant] o [`data`][data].

Una variabile definita con `data` può fare riferimento a valori diversi nel corso della sua vita. Per esempio, `my_first_variable` può essere definita e ridefinita più volte usando l'[operatore di assegnazione `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

A differenza di `data`, le variabili definite con `constant` possono essere assegnate una sola volta. Si usa per definire le costanti in ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Dichiarazioni di classi e metodi

In ABAP le unità di funzionalità sono incapsulate nei _metodi_, che di solito vengono raggruppati nella stessa [classe][classes] se appartengono insieme. Questi metodi possono accettare parametri (argomenti) e possono _restituire_ un valore usando la parola chiave `returning` nella definizione del metodo. I metodi si chiamano usando la sintassi `( )`.

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