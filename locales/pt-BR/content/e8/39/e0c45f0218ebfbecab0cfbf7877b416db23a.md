# Introdução

Um *conjunto disjunto* (também chamado de estrutura union-find) mantém uma coleção de valores dividida em grupos que não se sobrepõem. Ele fica no vocabulário [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` cria uma estrutura vazia. `add-atom` adiciona um valor como um grupo só dele, e `add-atoms` adiciona todos os valores de uma sequência:

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

`equate` funde os dois grupos que contêm os seus átomos. Depois disso, eles passam a ser um único grupo:

```
equate ( atom1 atom2 disjoint-set -- )
```

Cada grupo tem um único membro canônico, o seu *representante*. `representative` retorna esse membro; dois átomos estão no mesmo grupo exatamente quando compartilham um representante. `equiv?` verifica isso diretamente:

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

`disjoint-set-members` retorna todos os átomos que foram adicionados.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
