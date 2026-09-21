# Tesztelés a Pyret-kurzson

## Előfeltételek telepítése

Miután sikeresen letöltöttél egy feladatot, telepítened kell a Node.js modulokat a tesztek futtatásához:

```sh
cd /path/to/exercise
npm install
```

Ezután add hozzá a `pyret` parancssori eszközt tartalmazó könyvtárat a $PATH-hoz

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Első lépések

A feladat könyvtárában több fájl is lesz, de a két legfontosabb a megoldásod és a tesztfájljaid.
A következő példában a Leap feladatot töltöttük le.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

A tesztek futtatásához használd az `exercism test` parancsot, ha letöltötted a hivatalos Exercism CLI-t, vagy futtasd a `pyret leap-test.arr` parancsot.
A Pyret lefuttatja a tesztegyüttest, amely címkézett `check` blokkok sorozatából áll; ezek a megoldásfájlodat ellenőrzik adott bemenetekkel és elvárt eredményekkel.
A folyamat kritikus része, hogy kifejezetten exportáld a kódod egyes részeit, hogy a tesztegyüttes láthassa őket.

## provide

Ezen a kurzson a tesztek importálják a fájlodat, így hozzáférnek mindenhez, amit kifejezetten exportáltál a kódból.

A változók exportálásához egy [provide utasítást][provide-statement] kell hozzáadnod a fájlod elején.

A következő kódrészletek két érvényes módot mutatnak az `a`, `b` és `c` exportálására.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Egy harmadik módszer, a `provide *`, rövidítés arra, hogy az összes felső szintű kötést exportáld a saját adattípusok kivételével.
Általában azonban mégsem ajánlott, mert a Pyret szigorúan nem engedi a [változóárnyékolást][shadowing].

## provide-types

Egyes feladatokhoz szükség lesz arra, hogy egy [saját adattípust][data-definition] exportálj a teszteléshez.
Ilyen esetekben használhatsz [provide-types utasítást][provide-types-statement].
Mivel egy adattípushoz további függvények tartozhatnak, amelyek nincsenek exportálva, érdemes a `provide-types *`-ot használni az árnyékolási aggály ellenére.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Minden feladat vázában vagy `provide`, vagy `provide-types` utasítás lesz előkészítve a számodra.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
