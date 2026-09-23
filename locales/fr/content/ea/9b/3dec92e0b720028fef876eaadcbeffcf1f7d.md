# Introduction

En Factor, un *flux* est tout objet depuis lequel on peut lire des octets ou vers lequel on peut en écrire. Les fichiers, les _sockets_, les tampons en mémoire et tes propres _wrappers_ personnalisés participent tous au même petit [protocole][stream-protocol] de [`io`][io].

Les deux moitiés du protocole sont des _mixins_ : `input-stream` pour ce depuis quoi on lit, `output-stream` pour ce vers quoi on écrit. Une classe en adopte l'un (ou les deux) avec `INSTANCE: <class> input-stream`.

## Lis et écris

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` renvoie l'octet suivant (ou `f` à la fin du flux) ; `stream-read` lit jusqu'à `n` octets. `stream-write1` et `stream-write` sont leurs pendants pour l'écriture. `stream-flush` force l'écriture des données mises en tampon. `stream-element-type` indique si le flux manipule des octets bruts (`+byte+`) ou des caractères (`+character+`).

## Nettoyage avec `disposable`

Les flux occupent des ressources système, c'est pourquoi le protocole va de pair avec le vocabulaire [`destructors`][destructors]. Un flux personnalisé étend la classe parente `disposable` :

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (dans `destructors`) est la fabrique : il alloue le tuple et l'enregistre auprès du _framework_ de destructeurs, afin qu'une exception ne puisse pas laisser fuir la ressource. `M: <class> dispose*` dit *comment* nettoyer ; le code utilisateur appelle `dispose` (le mot public), qui marque l'objet comme libéré puis exécute `dispose*`.

## Utilisation encadrée

`with-disposal`, `with-input-stream` et `with-output-stream` exécutent une _quotation_ avec la ressource ouverte et la libèrent en sortant :

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
