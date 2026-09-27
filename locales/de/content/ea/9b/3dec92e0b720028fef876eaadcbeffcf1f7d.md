# Einführung

Ein *Stream* in Factor ist alles, woraus du Bytes lesen oder wohin du Bytes schreiben kannst. Dateien, Sockets, Puffer im Arbeitsspeicher und deine eigenen selbstgebauten Wrapper nehmen alle am selben kleinen [Protokoll][stream-protocol] aus [`io`][io] teil.

Die beiden Hälften des Protokolls sind Mixins: `input-stream` für Dinge, aus denen du liest, `output-stream` für Dinge, in die du schreibst. Eine Klasse tritt einem (oder beiden) mit `INSTANCE: <class> input-stream` bei.

## Lesen und Schreiben

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` gibt das nächste Byte zurück (oder `f` am Ende des Streams); `stream-read` liest bis zu `n` Bytes. `stream-write1` und `stream-write` machen dasselbe für die Ausgabe. `stream-flush` leert den Ausgabepuffer. `stream-element-type` verrät, ob der Stream mit rohen Bytes (`+byte+`) oder Zeichen (`+character+`) arbeitet.

## Aufräumen mit `disposable`

Streams halten Betriebssystem-Ressourcen, deshalb arbeitet das Protokoll mit dem Vokabular [`destructors`][destructors] zusammen. Ein eigener Stream erweitert die Elternklasse `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (in `destructors`) ist die Fabrikmethode: Sie legt das Tuple an und registriert es beim Destruktor-Framework, damit Ausnahmen die Ressource nicht durchsickern lassen. `M: <class> dispose*` sagt, *wie* aufgeräumt wird; Nutzercode ruft `dispose` auf (das öffentliche Wort), was das Objekt als entsorgt markiert und dann `dispose*` ausführt.

## Nutzung mit Gültigkeitsbereich

`with-disposal`, `with-input-stream` und `with-output-stream` führen ein Quotation aus, während die Ressource geöffnet ist, und entsorgen sie beim Verlassen:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
