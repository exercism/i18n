# 简介

*不相交集*（也叫并查集）把一组值划分成互不重叠的若干组。它位于[`disjoint-sets`][disjoint-sets]词汇表里。

`<disjoint-set>`会创建一个空的结构。`add-atom`把一个值作为单独的组加入，`add-atoms`则把序列中的每个值都加进去：

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

`equate`会把包含其两个原子的那两个组合并起来，合并之后它们就是一个组：

```
equate ( atom1 atom2 disjoint-set -- )
```

每个组都有一个唯一的规范成员，即它的*代表元*。`representative`返回它；两个原子属于同一个组，当且仅当它们共享同一个代表元。`equiv?`直接检查这一点：

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

`disjoint-set-members`返回所有已加入的原子。

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
