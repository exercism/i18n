# はじめに

*素集合*（union-find構造とも呼ばれます）は、値の集まりを、互いに重ならないグループに分割して保持します。これは[`disjoint-sets`][disjoint-sets]ボキャブラリーに含まれています。

`<disjoint-set>`は空の構造を作ります。`add-atom`は1つの値を、それだけのグループとして追加し、`add-atoms`はシーケンスに含まれるすべての値を追加します。

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

`equate`は、引数の2つの値が属するグループ同士を統合します。統合後、それらは1つのグループになります。

```
equate ( atom1 atom2 disjoint-set -- )
```

各グループには、正規のメンバーが1つだけあります。それが*代表*です。`representative`はその代表を返します。2つの値が同じグループにあるのは、それらが同じ代表を共有しているとき、ちょうどそのときに限られます。`equiv?`はそれを直接判定します。

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

`disjoint-set-members`は、追加されたすべての値を返します。

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
