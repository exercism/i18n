# Anexo às instruções

## Instruções do Arturo

Neste exercício, você vai precisar dar suporte a duas formas diferentes de chamar a palavra `stringify`:

1. Com o atributo `roman` (por exemplo, `stringify.roman 3999`)
2. Sem o atributo `roman` (por exemplo, `stringify 3999`)

Para mais informações, consulte a documentação de [attributes][attributes] e também a documentação de [`attr`][attr].

~~~~exercism/caution
Além de `attr`, a função `attrs` é útil: ela retorna todos os atributos da chamada da função como um dicionário.

Cuidado: essas duas funções são destrutivas!

A implementação do Arturo usa uma ["tabela de atributos"][createAttrsStack].

* `attrs` [esvazia explicitamente a tabela][getAttrsDict] depois de recuperar os atributos.
* `attr` [remove ("desempilha") o atributo da tabela][builtinAttr].

Um exemplo:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
produz a saída
```
6 * 9
[answer:42]
[]
```

A cada passo, vemos o dicionário de atributos encolher.

**Conclusão**: lembre-se de que você só pode obter os atributos uma vez.
Se precisar consultar os atributos de novo, capture-os no início das suas funções.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
