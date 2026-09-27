# Einführung

Eine *Disjoint-Set-Struktur* (auch Union-Find-Struktur genannt) verwaltet eine Sammlung von Werten, die in überschneidungsfreie Gruppen aufgeteilt ist. Sie gehört zum Vokabular [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` erzeugt eine leere Struktur. `add-atom` fügt einen einzelnen Wert als eigene Gruppe hinzu, und `add-atoms` fügt jeden Wert einer Sequenz hinzu:

```
<disjoint-set> ( -- disjoint-set )
add-atom       ( atom disjoint-set -- )
add-atoms      ( seq disjoint-set -- )
```

```factor
USING: disjoint-sets ;

<disjoint-set>            ! a new, empty disjoint set
{ 1 2 3 } over add-atoms  ! 1, 2 and 3 each start in their own group
```

`equate` führt die beiden Gruppen zusammen, die seine Atome enthalten. Danach sind sie eine einzige Gruppe:

```
equate ( atom1 atom2 disjoint-set -- )
```

Jede Gruppe hat ein einziges kanonisches Element, ihren *Repräsentanten*. `representative` gibt ihn zurück; zwei Atome sind genau dann in derselben Gruppe, wenn sie denselben Repräsentanten haben. `equiv?` prüft das direkt:

```
representative ( atom disjoint-set -- representative )
equiv?         ( atom1 atom2 disjoint-set -- ? )
```

```factor
USING: disjoint-sets ;

<disjoint-set>
{ 1 2 3 } over add-atoms
1 2 pick equate          ! merge the groups of 1 and 2
1 over representative .   ! => 1
2 over representative .   ! => 1  (same representative as 1)
1 2 pick equiv? .         ! => t
1 3 pick equiv? .         ! => f
```

`disjoint-set-members` gibt jedes Atom zurück, das hinzugefügt wurde.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
