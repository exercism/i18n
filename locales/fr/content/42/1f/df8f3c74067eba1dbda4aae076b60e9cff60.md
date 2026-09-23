# Itérateurs

Parcourir un tableau avec un compteur demande quatre lignes de gestion avant même de commencer le moindre travail :

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

Le compteur, le test de fin et le pas n'ont rien à voir avec le fait d'additionner des nombres. Un **itérateur** s'occupe des trois.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` fournit un élément à chaque tour, et met fin à la boucle quand il n'y en a plus. Pas de compteur, rien qui puisse mal tourner, et aucun risque de dépasser la fin du tableau.

## Le point d'exclamation

Le `!` marque un itérateur. Tu en as déjà croisé trois (`until!`, `while!` et `break!`), et ils suivent la même règle : **un itérateur ne peut être appelé qu'à l'intérieur d'une boucle.** Écrire `counts.elt!` en dehors d'une boucle est une erreur.

Un itérateur appelé à l'intérieur d'une boucle est interrogé pour une valeur à chaque tour. Quand il n'en a plus, la boucle se termine immédiatement, où que se trouve l'appel dans le corps.

## Deux pour commencer

`elt!` donne les éléments d'un tableau ou d'une _string_, dans l'ordre.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` compte. `1.upto!(5)` donne 1, 2, 3, 4, 5 puis met fin à la boucle.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Ce sont deux routines ordinaires qui se terminent par un `!`, et on les appelle donc avec un point, sur un tableau comme sur un nombre.

## Garder le résultat

La boucle se termine toute seule, donc tout ce qui est calculé à l'intérieur doit être conservé dans une variable déclarée **à l'extérieur**. Sinon, la valeur disparaît en même temps que la boucle.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
