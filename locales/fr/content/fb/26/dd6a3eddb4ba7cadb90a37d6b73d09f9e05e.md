# Ajout aux instructions

## Instructions pour Arturo

Pour cet exercice, tu devras prendre en charge deux façons différentes d'appeler le mot `stringify` :

1. Avec l'attribut `roman` (par exemple `stringify.roman 3999`)
2. Sans l'attribut `roman` (par exemple `stringify 3999`)

Pour plus d'informations, consulte la documentation sur les [attributs][attributes] ainsi que la documentation sur [`attr`][attr].

~~~~exercism/caution
Outre `attr`, la fonction `attrs` est utile : elle renvoie tous les attributs de l'appel de fonction sous forme de dictionnaire.

Attention, ces deux fonctions sont destructrices !

L'implémentation d'Arturo utilise une [« table d'attributs »][createAttrsStack].

* `attrs` [vide explicitement la table][getAttrsDict] après avoir récupéré les attributs.
* `attr` [retire (« dépile ») l'attribut de la table][builtinAttr].

Un exemple :

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
affiche
```
6 * 9
[answer:42]
[]
```

À chaque étape, on voit le dictionnaire d'attributs rétrécir.

**Conclusion** : fais attention, tu ne peux récupérer les attributs qu'une seule fois.
Si tu as besoin de revenir sur les attributs, conserve-les au début de tes fonctions.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
