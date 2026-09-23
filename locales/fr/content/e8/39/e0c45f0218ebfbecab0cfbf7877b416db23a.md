# Introduction

Un *ensemble disjoint* (aussi appelé structure union-find) regroupe une
collection de valeurs réparties en groupes qui ne se chevauchent pas. Il se
trouve dans le vocabulaire [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` construit une structure vide. `add-atom` ajoute une valeur
comme un groupe à part entière, et `add-atoms` ajoute toutes les valeurs d'une
séquence :

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

`equate` fusionne les deux groupes qui contiennent ses atomes, qui n'en
forment alors plus qu'un seul :

```
equate ( atom1 atom2 disjoint-set -- )
```

Chaque groupe possède un unique membre canonique, son *représentant*.
`representative` le renvoie ; deux atomes font partie du même groupe
exactement lorsqu'ils partagent un représentant. `equiv?` le vérifie
directement :

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

`disjoint-set-members` renvoie tous les atomes qui ont été ajoutés.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
