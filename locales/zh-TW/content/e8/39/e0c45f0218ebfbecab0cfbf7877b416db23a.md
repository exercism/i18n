# 簡介

*不相交集合*（又稱併查集結構）會把一群值分成互不重疊的組別。它位於[`disjoint-sets`][disjoint-sets]詞彙表中。

`<disjoint-set>`會建立一個空結構。`add-atom`會把單一的值加成自己獨立的一組，而`add-atoms`則會加入序列中的每一個值：

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

`equate`會合併包含其元素的兩個組別，合併之後它們就是同一組：

```
equate ( atom1 atom2 disjoint-set -- )
```

每個組別都有一個具代表性的成員，也就是它的*代表*。`representative`會回傳這個成員；兩個元素若且唯若共用同一個代表，就屬於同一組。`equiv?`則直接檢查這一點：

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

`disjoint-set-members`會回傳所有已加入的元素。

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
