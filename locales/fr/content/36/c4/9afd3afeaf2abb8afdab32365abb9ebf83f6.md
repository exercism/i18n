# Itérateurs

Un itérateur est une routine dont le nom se termine par `!` et qui ne s'appelle qu'à l'intérieur d'une boucle `loop`. À chaque tour de boucle, il produit sa valeur suivante ; lorsqu'il est épuisé, la boucle se termine aussitôt.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather n'a pas d'instruction `for`. C'est ce qui la remplace, et c'est la fonctionnalité pour laquelle ce langage est connu.

## Ceux à connaître dès le début

| Itérateur | Ce qu'il donne |
| --- | --- |
| `a.elt!` | chaque élément de `a`, dans l'ordre |
| `a.ind!` | chaque position de `a` : 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | s'exécute `n` fois, sans rien produire |
| `n.up!` | `n`, `n+1`, … et ne s'arrête jamais |
| `s.elt!` | chaque caractère d'une _string_ |

`until!`, `while!` et `break!` sont eux aussi des itérateurs. C'est pourquoi leur nom se termine par `!` et pourquoi ils ne fonctionnent qu'à l'intérieur d'une boucle.

## Où placer l'appel

Un appel d'itérateur peut apparaître partout où une expression peut apparaître, y compris au milieu d'une condition :

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Chaque *endroit* du programme où un itérateur est écrit conserve sa propre position. Écrire `counts.elt!` deux fois dans le corps d'une même boucle crée deux parcours indépendants du tableau, ce qui n'est presque jamais ce que l'on veut :

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Demande-la une seule fois et range la valeur dans une variable.

## Terminer la boucle

La boucle se termine dès que *l'un* des itérateurs qu'elle contient est épuisé, et non pas quand ils le sont tous. Avec un seul itérateur, c'est évident. Avec plusieurs, c'est la règle qui prend tout le monde en défaut, et c'est le sujet du prochain exercice.

## Lequel choisir

Préfère `elt!` quand ce sont les valeurs que l'on veut, et `ind!` quand ce sont les positions. N'aie recours à `upto!` sur `0 .. a.size - 1` que lorsque les deux sont nécessaires en même temps, ou lorsque la réponse est une position plutôt qu'une valeur.
