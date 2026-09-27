# Über

Coq ist gleichzeitig eine Programmiersprache und ein Logiksystem, das auf der [Curry-Howard-Korrespondenz](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence) basiert.
Damit es ein sinnvolles Logiksystem ist, wurde die Sprache so entworfen, dass jedes in Coq geschriebene Programm garantiert terminiert.
Deshalb wird Coq selten für allgemeine Zwecke verwendet; stattdessen ermöglicht es, *Theorien in der Mathematik* zu entwickeln und *zertifizierte Programme* zu schreiben.

Coq ist außerdem ein interaktiver Beweisassistent.
Er löst Theoreme nicht automatisch, sondern hilft dir, Beweise mithilfe von Taktiken zu erstellen.
Die Taktiksprache (Ltac) ist eine eigene Sprache, mit der sich Teile der Beweise automatisieren lassen.
Ein gut geschriebenes Beweisskript ähnelt einem informellen, in Prosa geschriebenen Beweis.

Zu den wichtigsten Anwendungs- und Forschungsbereichen von Coq gehören:

* Mathematik (Zahlentheorie, Mengenlehre, Logiktheorie, Berechenbarkeitstheorie, Algebra, Geometrie, ...)
* Programmiersprachen (Compiler, Ausführungsmodelle, Compiler-Optimierungen, Typsystem, ...)
* Zertifizierte Algorithmen (Korrektheit und Termination von Algorithmen) und Extraktion in eine Allzwecksprache (meist OCaml oder Haskell)

Bemerkenswerte Coq-Entwicklungen sind:

* Maschinell geprüfter Beweis des [Vierfarbenproblems](https://madiot.fr/coq100/#32)
* [CompCert](http://compcert.inria.fr/compcert-C.html), ein zertifizierter C-Compiler

Wenn du dich für Coq interessierst, es aber noch nicht gelernt hast, wird oft empfohlen, mit der Reihe [Software Foundations](https://softwarefoundations.cis.upenn.edu/) zu beginnen.
Vor allem die ersten Kapitel (bis „IndProp“) vermitteln dir die Grundlagen, die du brauchst, bevor du dich an interessantere Konzepte und Theorien machen kannst.
Vielleicht findest du auch [andere Ressourcen](https://coq.inria.fr/documentation) interessant.

Diskussionen über Coq und Entwicklungen mit Coq finden meist auf [Reddit /r/coq](https://www.reddit.com/r/Coq/) und [Discourse](https://coq.discourse.group/latest) statt.
Wenn du Fragen hast, bekommst du auch bei [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50) Hilfe; vergiss nicht, deine Frage mit „coq“ zu taggen.