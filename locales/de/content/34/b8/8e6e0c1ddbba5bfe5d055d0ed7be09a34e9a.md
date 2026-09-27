# Über

Beim Reduzieren wird eine Funktion wiederholt auf jedes Element einer Sequenz angewendet und die Ergebnisse werden auf irgendeine Weise angesammelt.
Die angewendete Funktion nimmt zwei Parameter: den aktuellen akkumulierten Wert und das zu verarbeitende Element.
Sie muss den neuen akkumulierten Wert ergeben.

In manchen Programmiersprachen heißt dieses Verfahren accumulate oder fold.

In Common Lisp erledigt die Funktion `reduce` diesen Vorgang.
In ihrer einfachsten Form sieht sie so aus:

`(reduce #'function-to-apply sequence :initial-value value)`

Beachte, dass ein Anfangswert angegeben wird. Dieser ist der „aktuelle akkumulierte Wert“, der an die Funktion übergeben wird, wenn das erste Element verarbeitet wird.

Hier ist ein Beispiel, das die Zahlen der Liste addiert und dabei mit einem Anfangswert von 10 beginnt:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Beachte, dass die Funktion nie aufgerufen wird, wenn die Sequenz leer ist, und die Form den Anfangswert ergibt.

## Den Anfangswert angeben oder nicht

Das Argument `:initial-value` ist nicht zwingend, und `reduce` verhält sich unterschiedlich, je nachdem, ob es angegeben wurde und ob die Sequenz Elemente enthält.

1. Wenn der Anfangswert nicht angegeben wird und die Sequenz mehr als ein Element hat, dann wird die Funktion beim ersten Aufruf mit den ersten beiden Elementen der Sequenz aufgerufen.
2. Wenn der Anfangswert nicht angegeben wird und die Sequenz ein Element hat, dann ergibt die Form dieses Element, und die Funktion wird nicht aufgerufen.
3. Wenn der Anfangswert angegeben wird und die Sequenz leer ist, dann ergibt die Form den Anfangswert, und die Funktion wird nicht aufgerufen.
4. Wenn der Anfangswert nicht angegeben wird und die Sequenz leer ist, dann wird die Funktion mit *null* Argumenten aufgerufen.

Der letzte Fall bringt leicht jemanden ins Stolpern.
Normalerweise ist es einfach, einen Anfangswert anzugeben, sodass das Programm nie in diesen seltsamen Fall gerät.

## Weitere Schlüsselwortargumente

`reduce` nimmt noch weitere Schlüsselwortargumente, die in manchen Fällen nützlich sein können.

* `:start` und `:end`: Diese geben Indizes in die Sequenz an, wodurch reduce auf einer Teilsequenz arbeitet. Sie sind standardmäßig `0` bzw. `nil`, was den Anfang und das Ende der Sequenz bedeutet.
* `:from-end`: Wenn dieser generalisierte boolesche Wert wahr ergibt, dann läuft die Reduktion von rechts nach links statt von links nach rechts.
* `:key`: Gibt eine Funktion an, die auf jedes Element aufgerufen wird, *bevor* es an die Reduktionsfunktion übergeben wird. Diese Funktion wird *nicht* auf den als `:initial-value` angegebenen Wert angewendet.

Ein paar Beispiele:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```
