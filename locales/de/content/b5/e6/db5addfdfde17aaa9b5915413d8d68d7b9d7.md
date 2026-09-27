# Hinweise

## 1. Berechne das Datum des Gigasekunden-Jubiläums

- Eine Universalzeit ist die Anzahl der Sekunden seit der Epoche.
- Common Lisp hat ein Paar von Funktionen, mit denen du eine Universalzeit kodieren oder dekodieren kannst.
- Mit dem passenden Makro kannst du mehrere Werte einer Funktion in einer Liste auffangen.
- Die Zeitzonen-Parameter von [`decode-universal-time`][hyperspec-decode-universal-time] und [`encode-universal-time`][hyperspec-encode-universla-time] sind zwar optional, aber wichtig. Welche Standardwerte haben sie?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
