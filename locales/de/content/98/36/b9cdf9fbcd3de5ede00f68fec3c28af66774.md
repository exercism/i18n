# Hinweise

Denk daran, dass Schildkröten wechselwarme Tiere sind. Sorge also dafür, dass sie warm sind, bevor du ihnen eine Decke oder einen Pullover gibst.

## 1. Sortiere die Mengen!

- Deine zurückgegebene Sortierpermutation muss in absteigender Reihenfolge vorliegen.
- Achte darauf, die Mengen in absteigender Reihenfolge in-place zu sortieren.
- `sortperm` kann ähnliche Argumente wie `sort` annehmen.
- Die Reihenfolge, in der du die beiden obigen Operationen ausführst, ist sehr wichtig!

## 2. Sortiere die Kunden

- Es soll ein neues Array mit den geordneten Kunden zurückgegeben werden (d. h. nicht in-place sortieren).
- Denk daran, dass eine Sortierpermutation (d. h. ein Index-Array) wie Indizes verwendet werden kann.

## 3. Der Produktionsplan!

- Du kannst hier deine Funktionen `sortquantity!()` und `sortcustomer()` verwenden.
- Denk daran, dass eine Sortierpermutation nur eine Permutation der Indizes ist.
- Für eine [inverse Sortierpermutation][invperm]:
    - Überlege, wie die ursprüngliche Reihenfolge der Indizes für einen beliebigen `Vector` aussieht.
    - Was kann man mit *jeder* Permutation von Indizes machen, um sie zu diesem Ausgangspunkt zurückzubringen?
    - Letzter Hinweis ... Was bewirkt die Sortierpermutation einer Sortierpermutation?

[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
