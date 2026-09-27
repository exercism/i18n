# Introduzione

Le tabelle hash in Factor sono *array associativi*: collezioni di coppie `key/value` con ricerca in tempo O(1). Fanno parte della più ampia famiglia di [`assocs`][assocs].

## Letterali di tabella hash

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` è una tabella hash vuota. Le tabelle hash sono *mutabili*: crescono e si riducono man mano che aggiungi e rimuovi chiavi. Se devi lasciare intatta quella originale, fai prima un `clone`. Stampare una tabella hash ne mostra le voci, ma l'ordine non segue quello di inserimento: le tabelle hash non sono ordinate.

## Lettura

`at` (in [`assocs`][assocs]) legge un valore e restituisce `f` se la chiave manca:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Scrittura

`set-at` aggiunge o sovrascrive; `delete-at` rimuove; `change-at` esegue una quotation sul valore corrente. Tutte e tre *mutano* la tabella:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: la scorciatoia per contare

`inc-at` (anch'essa in [`assocs`][assocs]) aggiunge 1 al valore esistente di una chiave e la inserisce con valore 1 se manca. Perfetta per contare:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iterazione e inserimento pigro

`assoc-each` percorre ogni coppia `( key value -- )`; `cache` restituisce il valore di una chiave e lo calcola una sola volta con la quotation fornita, se la chiave manca.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` è il pattern «cerca o crea» in una sola parola: comodo quando costruisci una tabella hash da un flusso di chiavi e non vuoi gestire il caso della voce mancante a ogni chiamata.

## Applicare un aggiornamento della tabella hash a una sequenza di chiavi

Quando l'input è una sequenza di chiavi e vuoi aggiornare la tabella hash una volta per chiave, itera sulla *sequenza* con `each` e usa una fried quotation `'[ _ … ]` (da [`fry`][fry]) per incorporare la tabella hash nel corpo del ciclo. Ad esempio, per rimuovere un array di chiavi:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` cattura la tabella hash che sta sopra di essa sullo stack, così a ogni iterazione `each` deve fornire solo la chiave. `keep` esegue la quotation preservando la tabella hash per il `.` finale.

## Costruire una tabella hash da una sequenza

`map>assoc` (in [`assocs`][assocs]) mappa una quotation su una sequenza e raccoglie i risultati `( elt -- key value )` in un assoc del tipo dell'esemplare:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Chiavi, valori e coppie

`keys` e `values` (in [`assocs`][assocs]) restituiscono solo le chiavi o solo i valori; `>alist` restituisce le coppie `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` e `values` sono allineati: il valore in una data posizione appartiene alla chiave nella stessa posizione.

`sort-keys` (in [`sorting`][sorting]) restituisce le coppie `{ key value }` ordinate per chiave:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## Dalle coppie di nuovo a una tabella hash

`>hashtable` (in [`hashtables`][hashtables]) è l'inverso di `>alist`: trasforma qualsiasi assoc (il più delle volte un alist di coppie `{ key value }`) in una tabella hash con ricerca O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Comodo quando hai assemblato o trasformato un array di coppie e vuoi ripiegarlo in una tabella hash per cercare le voci per chiave.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
