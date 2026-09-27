# Über

Common Lisp hat, wie andere Sprachen auch, eine Reihe von Regeln, mit denen sich entscheiden lässt, ob zwei Objekte „dieselben“ sind.
Diese Regeln definieren vier Stufen, zu jeder gehört eine Funktion, die die Prüfung auf dieser Stufe durchführt.
Die Stufen sind von der strengsten bis zur lockersten geordnet.

## `eq`

Die erste Stufe ist die Objektidentität.
Diese Gleichheit wird mit der Funktion [`eq`][hyper-eq] geprüft.
Die beiden Objekte, die auf Gleichheit geprüft werden, müssen genau dasselbe Objekt sein:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

Die zweite Stufe ergänzt die Gleichheit von Zahlen und Zeichen.
Diese Gleichheit wird mit der Funktion [`eql`][hyper-eql] geprüft.
Wie geprüft wird, hängt von den Typen der Argumente ab:

- Zwei beliebige Objekte, die `eq` sind, sind auch `eql`
- Zahlen sind `eql`, wenn sie denselben Typ und denselben Wert haben
- Zeichen sind `eql`, wenn sie dasselbe Zeichen darstellen.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Man mag sich fragen, warum Zahlen und Zeichen nicht mit [`eq`][hyper-eq] auf Objektidentität geprüft werden.
Der Common Lisp Standard erlaubt es Implementierungen, Zahlen und Zeichen zu kopieren, wenn sie das möchten.
Daher sind `0` und `0` möglicherweise nicht [`eq`][hyper-eq], weil es sich um verschiedene Instanzen der Zahl `0` handeln kann.

## `equal`

Die dritte Stufe prüft auf strukturelle Ähnlichkeit.
Diese Gleichheit wird mit [`equal`][hyper-equal] geprüft.
Wie geprüft wird, hängt von den Typen der Argumente ab:

- Symbole werden verglichen, als ob man [`eq`][hyper-eq] verwendete
- Zeichen und Zahlen werden verglichen, als ob man `eql` verwendete
- Conses sind [`equal`][hyper-equal], wenn ihre Elemente [`equal`][hyper-equal] sind.
Das geschieht rekursiv.
- Strings und Bit-Vektoren sind [`equal`][hyper-equal], wenn ihre Elemente `eql` sind
- Arrays anderer Typen werden verglichen, als ob man [`eq`][hyper-eq] verwendete
- Pfadnamen sind [`equal`][hyper-equal], wenn sie funktional äquivalent sind.
(Hier gibt es Spielraum für implementierungsabhängiges Verhalten, was die Groß- und Kleinschreibung der Strings angeht, aus denen die Komponenten der Pfadnamen bestehen.)
- Objekte jedes anderen Typs werden verglichen, als ob man [`eq`][hyper-eq] verwendete

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

Die vierte und lockerste Stufe der Gleichheit wird mit [`equalp`][hyper-equalp] geprüft.
Wie geprüft wird, hängt von den Typen ab:

- sind die beiden Objekte [`equalp`][hyper-equalp], dann sind sie [`equalp`][hyper-equalp]
- Zahlen sind [`equalp`][hyper-equalp], wenn sie denselben Wert haben, auch wenn sie nicht denselben Typ haben
- Zeichen und Strings werden ohne Rücksicht auf Groß- und Kleinschreibung verglichen
- Conses sind [`equalp`][hyper-equalp], wenn ihre Elemente [`equalp`][hyper-equalp] sind.
Das geschieht rekursiv.
- Arrays sind [`equalp`][hyper-equalp], wenn sie dieselbe Anzahl Dimensionen haben, diese Dimensionen gleich sind und jedes Element [`equalp`][hyper-equalp] ist.
- Strukturen sind [`equalp`][hyper-equalp], wenn sie dieselbe Klasse und dieselben Slots haben und jeder dieser Slots zwischen den beiden Strukturen [`equalp`][hyper-equalp] ist.
- Hash-Tabellen sind [`equalp`][hyper-equalp], wenn sie beide dieselbe `:test`-Funktion haben, dieselben Schlüssel besitzen (verglichen mit dieser `:test`-Funktion) und diese Schlüssel dieselben Werte haben, verglichen mit [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Typspezifische Funktionen

Die oben genannten sind die „generischen“ Gleichheitsfunktionen.
Sie funktionieren, wie definiert, für jeden Typ.
Das kann nützlich sein, wenn man generischen Code schreibt, der die Typen der Objekte, die er vergleichen wird, erst zur Laufzeit kennt.
Allerdings gilt es allgemein als „besserer Stil“, typspezifische Gleichheitsfunktionen zu verwenden, wenn man die Typen kennt, die verglichen werden.
Zum Beispiel `string=` statt `equal`.
Diese Funktionen werden in den jeweiligen Konzepten vorgestellt und besprochen.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
