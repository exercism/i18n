# Monitor-Ansturm

Du bist Mitarbeiter eines Softwareunternehmens namens ABC Corp mit 97 Mitarbeitern. Ein neu angemietetes Büro hat allerdings nur 65 Kabinen. Jeder Mitarbeiter möchte im neuen Büro arbeiten, weil jede Kabine mit modernsten Monitoren ausgestattet ist. Die Personalabteilung wird von solchen Anfragen überhäuft und hat mit Hilfe ihres Teams für digitale Prozesse ein System zur Kabinenzuteilung entwickelt.

Sie hat jeder Kabine eine Nummer von 1 bis 65 zugewiesen. Mitarbeiter, die im neuen Büro arbeiten wollen, müssen bis 7:30 Uhr an jedem Werktag eine Anfrage zur Kabinenzuteilung senden. Ein Mitarbeiter kann nur eine einzige Anfrage senden. Jede dieser Anfragen kann nur eine Kabinennummer enthalten.

## Problemstellung

Die Personalabteilung führt für jede Anfrage zur Kabinenzuteilung die folgenden Schritte aus:

- Ist die gewünschte Kabine frei, wird sie der anfragenden Person zugewiesen.
- Ist die gewünschte Kabine bereits vergeben, wird die Anfrage abgelehnt.

Du gehörst zum Team für digitale Prozesse und bist dafür verantwortlich, diesen Zuteilungsprozess zu automatisieren. Die Eingabe ist ein `int[]` namens request mit allen Anfragen, die bis 7:30 Uhr eingegangen sind. Jedes Element des Arrays steht für eine Kabinennummer. Deine Aufgabe ist es, ein `int[]` mit den zugewiesenen Nummern der vergebenen Kabinen zurückzugeben. Sortiere die Kabinennummern anschließend in aufsteigender Reihenfolge.

## Einschränkungen

- 0 <= Größe des Eingabe-Arrays <= 97
- Jedes Element des Eingabe-Arrays liegt zwischen 1 und 65 (einschließlich)

## Beispiel 1

- Eingabe: `65 1 56`
- Ausgabe: `1 56 65`

## Beispiel 2

- Eingabe: `5 6 18 56 18 8 1`
- Ausgabe: `1 5 6 8 18 56`
- Erklärung: Es gibt zwei Anfragen für die Kabinennummer 18
