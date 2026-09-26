# Introdução

O ABAP dá suporte a um modelo de programação orientada a objetos baseado em classes e interfaces do ABAP Objects.

## (Re-)Atribuição

Existem algumas maneiras principais de atribuir valores a nomes em ABAP: usando variáveis ou constantes. No Exercism, as variáveis são sempre escritas em [snake-case][wiki-snake-case]. Não existe um guia oficial a seguir, e empresas e organizações diferentes têm guias de estilo diferentes. _Sinta-se à vontade para escrever as variáveis do jeito que você quiser_. A vantagem de escrevê-las do jeito que os exercícios são preparados é que elas ficam destacadas de forma diferente na interface web e na maioria das IDEs.

Em ABAP, as variáveis podem ser definidas com as palavras-chave [`constant`][constant] ou [`data`][data].

Uma variável pode referenciar valores diferentes ao longo de sua existência quando você usa `data`. Por exemplo, `my_first_variable` pode ser definida e redefinida muitas vezes com o [operador de atribuição `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

Ao contrário de `data`, variáveis definidas com `constant` só podem receber um valor uma vez. É assim que se definem constantes em ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Declarações de classe e método

Em ABAP, as unidades de funcionalidade ficam encapsuladas em _métodos_, normalmente agrupando métodos que pertencem juntos na mesma [classe][classes]. Esses métodos podem receber parâmetros (argumentos) e podem _retornar_ um valor usando a palavra-chave `returning` na definição do método. Os métodos são chamados com a sintaxe `( )`.

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