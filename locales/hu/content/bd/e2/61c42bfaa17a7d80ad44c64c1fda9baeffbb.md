# Tudnivalók

A vocabulary a szervezés alapegysége a Factorban: nevesített word-definíciók gyűjteménye.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Fájl- és könyvtárstruktúra

A vocabulary neveit `.` választja el egymástól. Az elérési út követi a pontokat:

| Vocabulary             | Fájl                                       |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

A Factor betöltője úgy keresi ki a vocabularyt, hogy sorra veszi a *vocab roots* könyvtárakat (a projekt gyökerét és a beépített basis könyvtárat), amíg nem talál egy olyan könyvtárat, amelynek a neve megegyezik az útvonal egy-egy szegmensével. Az utolsó szegmens fájlnévként megismétlődik.

## `USING:` és `IN:`

A `USING:` (mellette a `USE:`, amellyel egyszerre egy vocabot emelhetsz be) más vocabularyt is beemel az aktuális fájl keresési útvonalába. Az `IN:` megmondja, hogy az ebben a fájlban definiált wordök melyik vocabulary *részét* alkotják: a teljesen minősített nevük ezzel az előtaggal kezdődik.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Itt a `greet-everyone` a `greetings` vocabulary része, a `hello`-t a `greetings.formal`-ból, a `map`-et pedig a `sequences`-ből hívja.

## Miért bontsuk fel a megoldást több vocabra?

Ha a kódot több vocabularyre osztod, akkor:

- A kicsi segéd-wordöket felelősségi körök szerint csoportosíthatod, elkülönítve attól a magas szintű rutintól, amely összefogja őket.
- A segéd-wordöket máshonnan is újra felhasználhatod anélkül, hogy behúznád a fő rutint.
- Minden fájlt egyetlen, egységes absztrakciós rétegként olvashatsz.

A Factor betöltője elég gyors és lusta ahhoz, hogy a kisebb vocabokra való *lebontás* olcsó legyen; a standard könyvtárban az a szokás, hogy agresszíven bontjuk részekre a kódot.
