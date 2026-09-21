# Kiegészítés az utasításokhoz

## Arturo-útmutató

Ehhez a feladathoz a `stringify` szó két különböző meghívási módját kell támogatnod:

1. A `roman` attribútummal (pl. `stringify.roman 3999`)
2. A `roman` attribútum nélkül (pl. `stringify 3999`)

További információért nézd meg az [attribútumok][attributes] dokumentációt, valamint az [`attr`][attr] dokumentációt.

~~~~exercism/caution
Az `attr` mellett hasznos lehet az `attrs` függvény is: a függvényhívás összes attribútumát szótárként adja vissza.

Vigyázz, ez a két függvény destruktív hatású!

Az Arturo megvalósítása egy [„attribútumtáblát”][createAttrsStack] használ.

* Az `attrs` [kifejezetten kiüríti a táblát][getAttrsDict], miután lekérte az attribútumokat.
* Az `attr` [eltávolítja („kiveszi”) az attribútumot a táblából][builtinAttr].

Egy példa:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
kimenete
```
6 * 9
[answer:42]
[]
```

Mindegyik lépésnél látjuk, ahogy zsugorodik az attribútumszótár.

**Következtetés**: tartsd észben, hogy az attribútumokat csak egyszer tudod lekérni.
Ha később hivatkozni szeretnél rájuk, a függvényeid elején mentsd el őket.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
