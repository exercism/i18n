# Einführung

In Cairo sind Arrays grundlegende Datenstrukturen, mit denen du Sammlungen von Elementen desselben Typs geordnet speicherst.
Ähnlich wie Listen in anderen Programmiersprachen wird auf jedes Element in einem Array über seinen Index zugegriffen, was ein effizientes Abrufen und Bearbeiten ermöglicht.

Cairo-Arrays sind unveränderliche Datenstrukturen.
Elemente können nur am Ende angehängt oder am Anfang entfernt werden.
Dieses Design sorgt für Datenintegrität und Stabilität und passt zu Cairos Ansatz der Speicherverwaltung.
Arrays werden mit `ArrayTrait::new()` initialisiert und unterstützen typspezifische Deklarationen für die Speicherung von Elementen.
Auf Elemente kannst du mit den Methoden `get()` oder `at()` zugreifen, ebenso mit dem Indexoperator `arr[index]`.
Elemente lassen sich nur mit der Funktion `pop_front()` vom Anfang eines Arrays entfernen.
Diese Eigenschaften machen Cairo-Arrays für Aufgaben zur strukturierten Speicherung und zum Abrufen von Daten geeignet.
