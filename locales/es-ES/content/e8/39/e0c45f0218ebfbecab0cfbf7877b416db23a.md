# Introducción

Un *conjunto disjunto* (también llamado estructura union-find) mantiene una colección de valores dividida en grupos que no se solapan. Se encuentra en el vocabulario [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` construye una estructura vacía. `add-atom` añade un valor como grupo propio, y `add-atoms` añade todos los valores de una secuencia:

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

`equate` fusiona los dos grupos que contienen sus átomos; después forman un solo grupo:

```
equate ( atom1 atom2 disjoint-set -- )
```

Cada grupo tiene un único miembro canónico, su *representante*. `representative` lo devuelve; dos átomos están en el mismo grupo exactamente cuando comparten representante. `equiv?` lo comprueba directamente:

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

`disjoint-set-members` devuelve todos los átomos que se han añadido.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
