# Részletesebben

A Common Lisp a többi nyelvhez hasonlóan szabályokkal rendelkezik arra vonatkozóan, hogyan döntse el, hogy két objektum ugyanaz-e.
Ezek a szabályok négy szintet határoznak meg, és mindegyik szinthez tartozik egy függvény, amely elvégzi az adott szintű ellenőrzést.
A szintek a legszigorúbbtól a legmegengedőbbig követik egymást.

## `eq`

Az első szint az objektumazonosság.
Ezt az egyenlőséget az [`eq`][hyper-eq] függvénnyel ellenőrizzük.
A két objektumnak, amelyet egyenlőség szempontjából vizsgálunk, pontosan ugyanaz az objektum kell lennie:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

A második szint kiegészül a számok és a karakterek egyenlőségével.
Ezt az egyenlőséget az [`eql`][hyper-eql] függvénnyel ellenőrizzük.
Az ellenőrzés módja az argumentumok típusától függ:

- Ha két objektum `eq`, akkor azok `eql` is
- A számok akkor `eql`, ha azonos típusúak és azonos értékűek
- A karakterek akkor `eql`, ha ugyanazt a karaktert reprezentálják.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Felmerülhet a kérdés, miért nem hasonlítjuk össze a számokat és a karaktereket objektumazonosság szempontjából az [`eq`][hyper-eq] függvénnyel.
A Common Lisp szabvány megengedi az implementációknak, hogy lemásolják a számokat és a karaktereket, ha úgy döntenek.
Így előfordulhat, hogy `0` és `0` nem [`eq`][hyper-eq], mert a `0` szám különböző példányai lehetnek.

## `equal`

A harmadik szint a szerkezeti hasonlóságot vizsgálja.
Ezt az egyenlőséget az [`equal`][hyper-equal] függvénnyel ellenőrizzük.
Az ellenőrzés módja az argumentumok típusától függ:

- A szimbólumokat úgy hasonlítjuk össze, mintha [`eq`][hyper-eq] függvényt használnánk
- A karaktereket és a számokat úgy hasonlítjuk össze, mintha `eql`-t használnánk
- A consok akkor [`equal`][hyper-equal], ha az elemeik is [`equal`][hyper-equal].
Ez rekurzívan történik.
- A stringek és a bitvektorok akkor [`equal`][hyper-equal], ha az elemeik `eql`
- A többi típusú tömböt úgy hasonlítjuk össze, mintha [`eq`][hyper-eq] lenne
- Az elérési útnevek akkor [`equal`][hyper-equal], ha funkcionálisan egyenértékűek.
(Itt helye van az implementációfüggő viselkedésnek, ami az elérési útnevek komponenseit alkotó stringek kis- és nagybetű-érzékenységét illeti.)
- Bármely más típusú objektumot úgy hasonlítjuk össze, mintha [`eq`][hyper-eq] lenne

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

A negyedik, legmegengedőbb egyenlőségi szintet az [`equalp`][hyper-equalp] függvénnyel ellenőrizzük.
Az ellenőrzés módja a típusoktól függ:

- ha két objektum [`equalp`][hyper-equalp], akkor azok [`equalp`][hyper-equalp]
- a számok akkor [`equalp`][hyper-equalp], ha azonos az értékük, még akkor is, ha nem azonos a típusuk
- a karaktereket és a stringeket a kis- és nagybetű megkülönböztetése nélkül hasonlítjuk össze
- a consok akkor [`equalp`][hyper-equalp], ha az elemeik is [`equalp`][hyper-equalp].
Ez rekurzívan történik.
- a tömbök akkor [`equalp`][hyper-equalp], ha ugyanannyi dimenziójuk van, ezek a dimenziók megegyeznek, és minden elemük [`equalp`][hyper-equalp].
- a struktúrák akkor [`equalp`][hyper-equalp], ha ugyanabba az osztályba tartoznak, ugyanazok a slotjaik, és ezek a slotok [`equalp`][hyper-equalp] a két struktúra között.
- a hash-táblák akkor [`equalp`][hyper-equalp], ha ugyanaz a `:test` függvényük, ugyanazok a kulcsaik (az adott `:test` függvénnyel összehasonlítva), és ezekhez a kulcsokhoz ugyanazok az értékek tartoznak [`equalp`][hyper-equalp] szerint összehasonlítva.

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Típusspecifikus függvények

A fentiek az „általános” egyenlőségfüggvények.
A definíciójuk szerint bármely típusra működnek.
Ez akkor lehet hasznos, ha olyan általános kódot írunk, amely futásidőig nem tudja, milyen típusú objektumokat fog összehasonlítani.
Azonban általában „szebb stílusnak” számít típusspecifikus egyenlőségfüggvényeket használni, ha ismerjük az összehasonlítandó típusokat.
Például a `string=`-t az `equal` helyett.
Ezeket a függvényeket a vonatkozó fogalmaknál mutatjuk be és tárgyaljuk.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
