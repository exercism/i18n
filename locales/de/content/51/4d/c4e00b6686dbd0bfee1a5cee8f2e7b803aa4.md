# Einführung

Hashtabellen in Factor sind *assoziative Arrays*: Sammlungen von `key/value`-Paaren mit O(1)-Zugriff. Sie sind Teil der breiteren [`assocs`][assocs]-Familie.

## Hashtabellen-Literale

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` ist eine leere Hashtabelle. Hashtabellen sind *veränderbar*: Sie wachsen und schrumpfen, wenn du Schlüssel hinzufügst oder entfernst. Rufe zuerst `clone` auf, wenn du das Original unverändert lassen willst. Das Ausgeben einer Hashtabelle zeigt ihre Einträge, aber die Reihenfolge hängt nicht an der Einfügereihenfolge: Hashtabellen sind ungeordnet.

## Lesen

`at` (in [`assocs`][assocs]) liest einen Wert und gibt `f` zurück, wenn der Schlüssel fehlt:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Schreiben

`set-at` fügt hinzu oder überschreibt; `delete-at` entfernt; `change-at` führt eine Quotation über den aktuellen Wert aus. Alle drei *verändern* die Hashtabelle:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: die Abkürzung zum Hochzählen

`inc-at` (ebenfalls in [`assocs`][assocs]) addiert 1 auf den vorhandenen Wert eines Schlüssels und fügt ihn als 1 ein, wenn er fehlt. Perfekt zum Zählen:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteration und verzögertes Einfügen

`assoc-each` läuft über jedes `( key value -- )`-Paar; `cache` gibt den Wert für einen Schlüssel zurück und berechnet ihn einmal mit der übergebenen Quotation, wenn der Schlüssel fehlt.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` ist das Muster „Nachschlagen oder Anlegen“ in einem einzigen Wort. Praktisch, wenn du eine Hashtabelle aus einem Strom von Schlüsseln aufbaust und den Fall des fehlenden Eintrags nicht an jeder Aufrufstelle behandeln willst.

## Eine Hashtabellen-Aktualisierung auf eine Folge von Schlüsseln anwenden

Wenn die Eingabe eine Folge von Schlüsseln ist und du die Hashtabelle einmal pro Schlüssel aktualisieren willst, iteriere über die *Sequenz* mit `each` und nutze eine Fried-Quotation `'[ _ … ]` (aus [`fry`][fry]), um die Hashtabelle in den Schleifenblock einzubacken. Zum Beispiel, um eine Liste von Schlüsseln zu entfernen:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` erfasst die Hashtabelle, die darüber auf dem Stack liegt, sodass `each` bei jeder Iteration nur noch den Schlüssel liefern muss. `keep` führt die Quotation aus und bewahrt dabei die Hashtabelle für das abschließende `.` auf.

## Eine Hashtabelle aus einer Sequenz aufbauen

`map>assoc` (in [`assocs`][assocs]) bildet eine Quotation über eine Sequenz ab und sammelt die `( elt -- key value )`-Ergebnisse in einem Assoc vom Typ des Exemplars:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Schlüssel, Werte und Paare

`keys` und `values` (in [`assocs`][assocs]) geben nur die Schlüssel bzw. nur die Werte zurück; `>alist` gibt die Paare `{ key value }` zurück.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` und `values` passen zusammen: Der Wert an einer bestimmten Position gehört zum Schlüssel an derselben Position.

`sort-keys` (in [`sorting`][sorting]) gibt die Paare `{ key value }` sortiert nach Schlüssel zurück:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## Von Paaren zurück zur Hashtabelle

`>hashtable` (in [`hashtables`][hashtables]) ist die Umkehrung von `>alist`: Es verwandelt jedes Assoc (meist eine Alist aus `{ key value }`-Paaren) in eine Hashtabelle mit O(1)-Zugriff.

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Praktisch, wenn du eine Liste von Paaren zusammengestellt oder umgewandelt hast und sie zurück in eine Hashtabelle überführen willst, um Einträge über den Schlüssel nachzuschlagen.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
