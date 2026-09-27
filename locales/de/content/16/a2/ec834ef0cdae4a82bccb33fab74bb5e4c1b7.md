# Anleitung

**HINWEIS: Diese Übung ist veraltet.**

Weitere Hintergründe findest du in der Diskussion unter [https://github.com/exercism/problem-specifications/issues/80](https://github.com/exercism/problem-specifications/issues/80).

---

Entwirf eine Testsuite für ein Tool zum Zählen von Zeilen, Buchstaben und Zeichen.

Das ist eine besondere Übung. Statt Code zu schreiben, der mit einer vorhandenen Testsuite funktioniert, legst du die Testsuite selbst fest. Damit du dabei Unterstützung hast, wurden mehrere Varianten des zu testenden Codes bereitgestellt. Deine Testsuite sollte zumindest in der Lage sein, deren Probleme (oder das Fehlen solcher Probleme) zu erkennen.

Das System unter Test soll die Anzahl der Zeilen, der Buchstaben und der Zeichen insgesamt in übergebenen Strings zählen. Die Idee dahinter ist, dass du die Operation „add string" mehrmals ausführst und dabei Strings übergibst, um danach die Funktionen „lines", „letters" und „characters" aufzurufen und so die Gesamtsummen zu erhalten.
