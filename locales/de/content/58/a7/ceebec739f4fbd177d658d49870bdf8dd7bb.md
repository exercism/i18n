# Anleitung

Berechne die Hamming-Distanz zwischen zwei DNA-Strängen.

Eine Mutation ist einfach ein Fehler, der bei der Entstehung oder Kopie einer Nukleinsäure, insbesondere der DNA, auftritt. Da Nukleinsäuren für die Funktionen der Zelle lebenswichtig sind, lösen Mutationen oft eine Kettenreaktion in der gesamten Zelle aus. Obwohl Mutationen technisch gesehen Fehler sind, kann eine sehr seltene Mutation die Zelle mit einer vorteilhaften Eigenschaft ausstatten. Tatsächlich sind die makroskopischen Effekte der Evolution auf das angesammelte Ergebnis vorteilhafter mikroskopischer Mutationen über viele Generationen zurückzuführen.

Die einfachste und häufigste Art der Nukleinsäuremutation ist die Punktmutation, bei der an einem einzelnen Nukleotid eine Base durch eine andere ersetzt wird.

Wenn wir die Anzahl der Unterschiede zwischen zwei homologen DNA-Strängen zählen, die aus verschiedenen Genomen mit einem gemeinsamen Vorfahren stammen, erhalten wir ein Maß für die Mindestanzahl von Punktmutationen, die auf dem evolutionären Weg zwischen den beiden Strängen aufgetreten sein könnten.

Das nennt man die „Hamming-Distanz“

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

Die Hamming-Distanz zwischen diesen beiden DNA-Strängen beträgt 7.

# Implementierungshinweise

Die Hamming-Distanz ist nur für Sequenzen gleicher Länge definiert. Du kannst daher davon ausgehen, dass deiner Funktion zur Berechnung der Hamming-Distanz nur Sequenzen gleicher Länge übergeben werden.

**Hinweis: Diese Übung ist veraltet und wurde durch die Übung `hamming` ersetzt.**
