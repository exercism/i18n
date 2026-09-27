# Introduzione

Un *insieme disgiunto* (chiamato anche struttura union-find) mantiene una raccolta di valori suddivisa in gruppi che non si sovrappongono. Vive nel vocabolario [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` costruisce una struttura vuota. `add-atom` aggiunge un valore come gruppo a sé stante, e `add-atoms` aggiunge tutti i valori di una sequenza:

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

`equate` fonde i due gruppi che contengono i suoi atomi, che dopo la chiamata diventano un unico gruppo:

```
equate ( atom1 atom2 disjoint-set -- )
```

Ogni gruppo ha un unico membro canonico, il suo *rappresentante*. `representative` lo restituisce; due atomi sono nello stesso gruppo esattamente quando condividono un rappresentante. `equiv?` lo verifica direttamente:

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

`disjoint-set-members` restituisce ogni atomo che è stato aggiunto.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
