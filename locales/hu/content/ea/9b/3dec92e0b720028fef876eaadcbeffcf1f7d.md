# Bevezetés

A Factorban egy *folyam* bármi, amiből bájtokat olvashatsz, vagy amibe bájtokat írhatsz. A fájlok, a socketek, a memóriabeli pufferek és a saját egyedi wrappereid mind ugyanabban a kicsi, az [`io`][io] szótárból származó [protokollban][stream-protocol] vesznek részt.

A protokoll két fele egy-egy mixin: az `input-stream` azokhoz, amikből olvasol, az `output-stream` azokhoz, amikbe írsz. Egy osztály az `INSTANCE: <class> input-stream` sorral csatlakozik az egyikhez (vagy mindkettőhöz).

## Olvasás és írás

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

A `stream-read1` a következő bájtot adja vissza (vagy `f`-et a folyam végén); a `stream-read` legfeljebb `n` bájtot olvas. A `stream-write1` és a `stream-write` ezek kimeneti megfelelői. A `stream-flush` kiüríti a pufferelt kimenetet. A `stream-element-type` megmondja, hogy a folyam nyers bájtokkal (`+byte+`) vagy karakterekkel (`+character+`) dolgozik-e.

## Takarítás a `disposable` segítségével

Mivel a folyamok operációs rendszer erőforrásait használják, a protokoll együtt jár a [`destructors`][destructors] szótárral. Egy egyedi folyam a `disposable` szülőosztályt terjeszti ki:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

A `new-disposable` (a `destructors` szótárban) a gyártó függvény: lefoglalja a tuple-t, és regisztrálja a destruktor-keretrendszerben, hogy a kivételek ne szivárogtathassák ki az erőforrást. Az `M: <class> dispose*` azt mondja meg, *hogyan* kell takarítani; a felhasználói kód a `dispose`-t (a nyilvános szót) hívja meg, ami megjelöli az objektumot megsemmisítettként, majd lefuttatja a `dispose*`-ot.

## Hatókörhöz kötött használat

A `with-disposal`, a `with-input-stream` és a `with-output-stream` egy quotationt futtat úgy, hogy közben az erőforrás nyitva van, és kilépéskor megsemmisíti azt:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
