# Hinweise

## Allgemein

- Alle Teile dieser Übung beruhen auf bitweisen Operationen.
  - Exercisms [Lernlehrplan][concept-bitwise-operations] bietet einen sanften Einstieg.
  - Die [bitweisen Operatoren][ref-bitwise-operators] sind im Julia-Handbuch aufgeführt.
  - `Base` enthält verschiedene nützliche Funktionen rund um Bits, darunter [count_ones()][count_ones] und [trailing_zeros()][trailing_zeros].
- Die Tests versuchen, keine Typen vorzuschreiben, aber in dieser Übung geht es um vorzeichenlose Bytes, und mit [`UInt8`][uint8]-Werten lässt sich relativ leicht arbeiten.
  - Argumente und Rückgabewerte sind `Vector{UInt8}`,
  - `UInt8`-Werte sind hilfreich für Bitmasken und Zwischenwerte.
- Dezimalzahlen wären nur eine Ablenkung, also verwende für `UInt8`-Literale lieber Hexadezimal (`0xFF`) oder Binär (`0b11111111`).
  - Die Funktion [`bitstring()`][bitstring] kann beim Debuggen nützlich sein, denn sie gibt ein menschenlesbares Binärformat aus.
- Eine Rohmeldung kommt als Vektor von 8-Bit-Blöcken und muss in 7-Bit-Blöcke in den höherwertigen Bits plus ein Paritätsbit als LSB umgewandelt werden.
  - Verwende Bitmasken mit `&` oder `|`, um die Bits zu isolieren, die du brauchst.
  - Die Operatoren für Linksverschiebung (`<<`) und logische Rechtsverschiebung (`>>>`) sind wichtig.
  - Plane eine Möglichkeit, überschüssige Bits in die nächste Verarbeitungsrunde mitzunehmen.
  - Wegen dieses Übertrags ist es schwierig, die Eingabebytes unabhängig voneinander zu behandeln, deshalb ist eine Schleife (oder vielleicht Rekursion) wahrscheinlich einfacher, als Funktionen höherer Ordnung zu verwenden.
  - Kodierte Meldungen sind normalerweise länger (mehr Bytes) als die Rohmeldung, um pro Byte ein Paritätsbit unterzubringen.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
