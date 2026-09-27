# Über

[Pony](http://www.ponylang.org) ist eine objektorientierte, auf dem Aktorenmodell basierende, capability-sichere Programmiersprache, bei der es darum geht, Dinge erledigt zu bekommen.

Sie ist objektorientiert, weil sie Klassen und Objekte hat, wie Python, Java, C++ und viele andere Sprachen. Sie basiert auf dem Aktorenmodell, weil sie Aktoren hat (ähnlich wie Erlang oder Akka). Diese verhalten sich wie Objekte, können aber auch Code asynchron ausführen. Aktoren machen Pony großartig.

Wenn wir sagen, Pony ist capability-sicher, meinen wir damit einige Dinge:

- Sie ist typsicher. Wirklich typsicher. Es gibt einen mathematischen Beweis und alles.
- Sie ist speichersicher. Okay, das ergibt sich aus der Typsicherheit, aber es ist trotzdem interessant. Es gibt keine hängenden Zeiger, keine Pufferüberläufe, und die Sprache kennt nicht einmal das Konzept null!
- Sie ist ausnahmesicher. Es gibt keine Laufzeitausnahmen. Alle Ausnahmen haben definierte Semantik und werden immer behandelt.
- Sie ist frei von Datenrennen. Pony hat keine Locks, keine atomaren Operationen oder so etwas. Stattdessen stellt das Typsystem zur Compile-Zeit sicher, dass dein nebenläufiges Programm niemals Datenrennen haben kann. So kannst du hochgradig nebenläufigen Code schreiben und dabei nie etwas falsch machen.
- Sie ist frei von Deadlocks. Das ist einfach, denn Pony hat überhaupt keine Locks! Also geraten sie definitiv nicht in einen Deadlock, weil es sie nicht gibt.

Wenn du neu bei Pony bist, starte mit dem [Tutorial](https://tutorial.ponylang.org/).
