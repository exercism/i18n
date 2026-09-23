# Introduction

Les tables de hachage en Factor sont des *tableaux associatifs*, c'est-à-dire des collections de paires `key/value` avec une recherche en O(1). Elles font partie de la famille plus large des [`assocs`][assocs].

## Littéraux de tables de hachage

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` est une table de hachage vide. Les tables de hachage sont *mutables* : elles grandissent et rétrécissent quand on ajoute et retire des clés. Pense à `clone` d'abord si tu veux laisser la table d'origine intacte. Afficher une table de hachage montre ses entrées, mais leur ordre n'est pas lié à l'ordre d'insertion : les tables de hachage ne sont pas ordonnées.

## Lecture

`at` (dans [`assocs`][assocs]) lit une valeur et renvoie `f` si la clé est absente :

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Écriture

`set-at` ajoute ou écrase ; `delete-at` supprime ; `change-at` exécute une *quotation* sur la valeur courante. Toutes les trois *modifient* la table sur place :

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`, le raccourci pour compter

`inc-at` (également dans [`assocs`][assocs]) ajoute 1 à la valeur existante d'une clé, en l'insérant à 1 si elle est absente. Parfait pour tenir un décompte :

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Itération et insertion paresseuse

`assoc-each` parcourt chaque paire `( key value -- )` ; `cache` renvoie la valeur d'une clé, en la calculant une seule fois avec la *quotation* fournie si la clé est absente.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` est le motif « chercher ou créer » en un seul mot, pratique quand on construit une table de hachage à partir d'un flux de clés et qu'on ne veut pas gérer le cas de l'entrée manquante à chaque site d'appel.

## Applique une mise à jour de table de hachage sur une séquence de clés

Quand l'entrée est une séquence de clés et que tu veux mettre à jour la table de hachage une fois par clé, parcours la *séquence* avec `each` et utilise une *quotation* frite `'[ _ … ]` (issue de [`fry`][fry]) pour incorporer la table de hachage dans le corps de la boucle. Par exemple, pour supprimer une liste de clés :

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` capture la table de hachage située au-dessus d'elle sur la pile, de sorte qu'à chaque itération `each` n'a plus qu'à fournir la clé. `keep` exécute la *quotation* tout en préservant la table de hachage pour le `.` final.

## Construis une table de hachage à partir d'une séquence

`map>assoc` (dans [`assocs`][assocs]) applique une *quotation* à chaque élément d'une séquence et rassemble les résultats `( elt -- key value )` dans un assoc du type de l'exemplaire :

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Clés, valeurs et paires

`keys` et `values` (dans [`assocs`][assocs]) renvoient uniquement les clés ou uniquement les valeurs ; `>alist` renvoie les paires `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` et `values` se correspondent : la valeur à une position donnée appartient à la clé à la même position.

`sort-keys` (dans [`sorting`][sorting]) renvoie les paires `{ key value }` triées par clé :

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## Des paires à une table de hachage

`>hashtable` (dans [`hashtables`][hashtables]) est l'inverse de `>alist` : il transforme n'importe quel assoc, le plus souvent un alist de paires `{ key value }`, en une table de hachage avec une recherche en O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Pratique quand tu as assemblé ou transformé une liste de paires et que tu veux la replier dans une table de hachage pour retrouver des entrées par clé.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
