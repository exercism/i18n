# Anexo às instruções

## Instruções de Arturo

Neste exercício, vais precisar de suportar duas formas diferentes de chamar a palavra `stringify`:

1. Com o atributo `roman` (por exemplo, `stringify.roman 3999`)
2. Sem o atributo `roman` (por exemplo, `stringify 3999`)

Para mais informações, consulta a documentação de [atributos][attributes] e também a documentação de [`attr`][attr].

~~~~exercism/caution
Além de `attr`, a função `attrs` é útil: devolve todos os atributos da chamada da função como um dicionário.

Tem cuidado: estas duas funções são destrutivas!

A implementação do Arturo usa uma ["tabela de atributos"][createAttrsStack].

* `attrs` [esvazia explicitamente a tabela][getAttrsDict] depois de obter os atributos.
* `attr` [remove ("pops") o atributo da tabela][builtinAttr].

Um exemplo:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
produz
```
6 * 9
[answer:42]
[]
```

A cada passo, vemos o dicionário de atributos a encolher.

**Conclusão**: tem em atenção que só podes obter os atributos uma vez.
Se precisares de voltar a consultar os atributos, captura-os no início das tuas funções.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
