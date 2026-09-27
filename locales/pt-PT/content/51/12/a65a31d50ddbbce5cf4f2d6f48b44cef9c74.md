# Introdução

O ABAP suporta um modelo de programação orientada a objetos baseado em classes e interfaces do ABAP Objects.

## (Re)Atribuição

Há algumas formas principais de atribuir valores a nomes em ABAP, usando variáveis ou constantes. No Exercism, as variáveis são sempre escritas em [snake-case][wiki-snake-case]. Não há um guia oficial a seguir e várias empresas e organizações têm guias de estilo diferentes. _Escreve as variáveis como quiseres_. A vantagem de as escrever da forma como os exercícios estão preparados é que ficarão realçadas de forma diferente na interface web e na maioria das IDEs.

As variáveis em ABAP podem ser definidas com as palavras-chave [`constant`][constant] ou [`data`][data].

Uma variável pode referenciar valores diferentes ao longo da sua vida útil quando se usa `data`. Por exemplo, `my_first_variable` pode ser definida e redefinida muitas vezes com o [operador de atribuição `=`][assignment]:

```abap
DATA my_first_variable TYPE i. " integer

my_first_variable = 1.
my_first_variable = 4711 * 3.
my_first_variable = some_complex_calculation( ).
```

Em contraste com `data`, as variáveis definidas com `constant` só podem ser atribuídas uma vez. É desta forma que se definem constantes em ABAP.

```abap
CONSTANT my_first_constant TYPE i VALUE 10.

" Can not be re-assigned
my_first_constant = 20.
// => SyntaxError: Assignment to constant variable.
```

## Declarações de classes e métodos

Em ABAP, as unidades de funcionalidade estão encapsuladas em _métodos_, normalmente agrupados na mesma [classe][classes] quando estão relacionados. Estes métodos podem receber parâmetros (argumentos) e podem _devolver_ um valor usando a palavra-chave `returning` na definição do método. Os métodos são invocados com a sintaxe `( )`.

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