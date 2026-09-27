# 소개

*서로소 집합*은(union-find 구조라고도 해요) 값들을 서로 겹치지 않는 그룹으로 나눠서 관리해요. 이 구조는 [`disjoint-sets`][disjoint-sets] 보캐뷸러리에 들어 있어요.

`<disjoint-set>`은 빈 구조를 만들어요. `add-atom`은 값을 하나 추가해서 그 값만 들어 있는 그룹을 만들고, `add-atoms`는 시퀀스에 있는 값을 모두 추가해요:

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

`equate`는 두 원자가 속한 그룹을 하나로 합쳐요. 그러고 나면 두 원자는 같은 그룹이 돼요:

```
equate ( atom1 atom2 disjoint-set -- )
```

그룹마다 그 그룹을 대표하는 구성원이 하나씩 있어요. 이걸 *대표*라고 해요. `representative`는 이 대표를 반환해요. 두 원자가 같은 그룹에 속해 있다는 건 두 원자의 대표가 같다는 뜻이에요. `equiv?`로 이걸 바로 확인할 수 있어요:

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

`disjoint-set-members`는 지금까지 추가된 원소를 모두 반환해요.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
