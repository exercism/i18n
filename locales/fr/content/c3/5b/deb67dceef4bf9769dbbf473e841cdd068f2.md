# Introduction

Un soir, tu es tombé sur un vieux carnet rempli de gribouillages énigmatiques, comme si quelqu'un avait poursuivi une idée avec obsession.
Sur une page, une seule question attirait l'attention : **tout nombre peut-il trouver son chemin jusqu'à 1 ?**
Elle était liée à ce qu'on appelle la **conjecture de Collatz**, une énigme qui déroute les penseurs depuis des décennies.

Les règles étaient d'une simplicité trompeuse.
Choisis un entier positif quelconque.

- S'il est pair, divise-le par 2.
- S'il est impair, multiplie-le par 3 et ajoute 1.

Répète ensuite ces étapes avec le résultat, indéfiniment.

Curieux, tu as choisi le nombre 12 pour tester et tu as commencé le voyage :

12 ➜ 6 ➜ 3 ➜ 10 ➜ 5 ➜ 16 ➜ 8 ➜ 4 ➜ 2 ➜ 1

En partant du deuxième nombre (6), il a fallu 9 étapes pour atteindre 1, et à chaque fois que les règles se répétaient, le nombre changeait sans cesse.
Au début, la séquence semblait imprévisible : elle montait, descendait, partait dans tous les sens.
Pourtant, la conjecture affirme que quel que soit le nombre de départ, on finit toujours par arriver à 1.

C'était fascinant, mais aussi déroutant.
Pourquoi cela semble-t-il toujours fonctionner ?
Existe-t-il un nombre pour lequel le processus s'enraye, tournant en boucle pour toujours ou s'échappant vers l'infini ?
Le carnet laissait entendre que résoudre cette énigme pourrait révéler quelque chose de profond ; et la gloire, la [fortune][collatz-prize] et une place dans l'histoire attendent quiconque parviendrait à en percer les secrets.

[collatz-prize]: https://mathprize.net/posts/collatz-conjecture/
