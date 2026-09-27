# Informazioni

Common Lisp, come altri linguaggi, ha una serie di regole per decidere se due oggetti sono lo «stesso».
Queste regole definiscono quattro livelli, ognuno con una funzione che esegue quel livello di controllo.
I livelli sono ordinati dal più rigoroso al più permissivo.

## `eq`

Il primo livello è l'identità dell'oggetto.
Questa uguaglianza si verifica con la funzione [`eq`][hyper-eq].
I due oggetti di cui si verifica l'uguaglianza devono essere esattamente lo stesso oggetto:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

Il secondo livello aggiunge l'uguaglianza di numeri e caratteri.
Questa uguaglianza si verifica con la funzione [`eql`][hyper-eql].
Il modo in cui viene eseguito il controllo dipende dai tipi degli argomenti:

- Due oggetti qualsiasi che sono `eq` sono anche `eql`
- I numeri sono `eql` se hanno lo stesso tipo e lo stesso valore
- I caratteri sono `eql` se rappresentano lo stesso carattere.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Ci si potrebbe chiedere perché numeri e caratteri non vengano confrontati per identità dell'oggetto con [`eq`][hyper-eq].
Lo standard Common Lisp consente alle implementazioni di copiare numeri e caratteri, se scelgono di farlo.
Quindi `0` e `0` potrebbero non essere [`eq`][hyper-eq], dato che possono essere istanze diverse del numero `0`.

## `equal`

Il terzo livello verifica la somiglianza strutturale.
Questa uguaglianza si verifica con [`equal`][hyper-equal].
Il modo in cui viene eseguito il controllo dipende dai tipi degli argomenti:

- i simboli vengono confrontati come se si usasse [`eq`][hyper-eq]
- i caratteri e i numeri vengono confrontati come se si usasse `eql`
- i cons sono [`equal`][hyper-equal] se i loro elementi sono [`equal`][hyper-equal].
Questo viene fatto in modo ricorsivo.
- le stringhe e i bit vector sono [`equal`][hyper-equal] se i loro elementi sono `eql`
- gli array di altri tipi vengono confrontati come se si usasse [`eq`][hyper-eq]
- i pathname sono [`equal`][hyper-equal] se sono funzionalmente equivalenti.
(Qui c'è spazio per un comportamento dipendente dall'implementazione per quanto riguarda la sensibilità alle maiuscole delle stringhe che compongono i componenti dei pathname.)
- gli oggetti di qualsiasi altro tipo vengono confrontati come se si usasse [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

Il quarto livello di uguaglianza, il più permissivo, si verifica con [`equalp`][hyper-equalp].
Il modo in cui viene eseguito il controllo dipende dai tipi:

- se i due oggetti sono [`equalp`][hyper-equalp], allora sono [`equalp`][hyper-equalp]
- i numeri sono [`equalp`][hyper-equalp] se hanno lo stesso valore, anche se non sono dello stesso tipo
- i caratteri e le stringhe vengono confrontati senza distinguere maiuscole e minuscole
- i cons sono [`equalp`][hyper-equalp] se i loro elementi sono [`equalp`][hyper-equalp].
Questo viene fatto in modo ricorsivo.
- gli array sono [`equalp`][hyper-equalp] se hanno lo stesso numero di dimensioni, quelle dimensioni sono le stesse e ogni elemento è [`equalp`][hyper-equalp].
- le strutture sono [`equalp`][hyper-equalp] se hanno la stessa classe e gli stessi slot, e ognuno di quegli slot è [`equalp`][hyper-equalp] tra le due strutture.
- le tabelle hash sono [`equalp`][hyper-equalp] se entrambe hanno la stessa funzione `:test`, hanno le stesse chiavi (confrontate con quella funzione `:test`) e quelle chiavi hanno gli stessi valori, confrontati con [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Funzioni specifiche per tipo

Quelle sopra sono le funzioni di uguaglianza «generiche».
Funzionano, come definito, per qualsiasi tipo.
Questo può essere utile quando si scrive codice generico che non conosce i tipi degli oggetti che confronterà fino al momento dell'esecuzione.
Tuttavia, è generalmente considerato «migliore stile» usare funzioni di uguaglianza specifiche per tipo quando si conoscono i tipi confrontati.
Per esempio `string=` invece di `equal`.
Queste funzioni saranno presentate e discusse nei concetti pertinenti.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
