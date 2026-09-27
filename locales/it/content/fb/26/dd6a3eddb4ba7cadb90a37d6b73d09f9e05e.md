# Appendice alle istruzioni

## Istruzioni per Arturo

Per questo esercizio, dovrai supportare due modi diversi di chiamare la parola `stringify`:

1. Con l'attributo `roman` (ad esempio `stringify.roman 3999`)
2. Senza l'attributo `roman` (ad esempio `stringify 3999`)

Per maggiori informazioni, consulta la documentazione sugli [attributi][attributes] e quella su [`attr`][attr].

~~~~exercism/caution
Oltre a `attr`, è utile anche la funzione `attrs`: restituisce tutti gli attributi della chiamata di funzione sotto forma di dizionario.

Attenzione: queste due funzioni sono distruttive!

L'implementazione di Arturo usa una [«tabella degli attributi»][createAttrsStack].

* `attrs` [svuota esplicitamente la tabella][getAttrsDict] dopo aver recuperato gli attributi.
* `attr` [rimuove («estrae») l'attributo dalla tabella][builtinAttr].

Un esempio:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
produce
```
6 * 9
[answer:42]
[]
```

A ogni passo, vediamo che il dizionario degli attributi si riduce.

**Conclusione**: tieni presente che puoi recuperare gli attributi una sola volta.
Se ti serve riutilizzare gli attributi in un secondo momento, salvali all'inizio delle funzioni.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
