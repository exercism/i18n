# Bevezetés

A *diszjunkt halmaz* (más néven union-find szerkezet) értékek egy gyűjteményét tartja egymással nem átfedő csoportokra osztva. A [`disjoint-sets`][disjoint-sets] szótárban található.

A `<disjoint-set>` egy üres szerkezetet hoz létre. Az `add-atom` egyetlen értéket ad hozzá önálló csoportként, az `add-atoms` pedig egy sorozat minden értékét hozzáadja:

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

Az `equate` egyesíti azt a két csoportot, amelyek tartalmazzák a két atomot; ezek utána egyetlen csoportot alkotnak:

```
equate ( atom1 atom2 disjoint-set -- )
```

Minden csoportnak egyetlen kanonikus tagja van, a *reprezentánsa*. A `representative` ezt adja vissza; két atom pontosan akkor van ugyanabban a csoportban, ha ugyanaz a reprezentánsuk. Az `equiv?` ezt közvetlenül ellenőrzi:

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

A `disjoint-set-members` minden hozzáadott atomot visszaad.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
