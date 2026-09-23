# Les boucles

Une **boucle** fait la même chose encore et encore.

```sather
   loop
      ...
   end;
```

À elle seule, elle ne s'arrête jamais, donc quelque chose à l'intérieur doit y mettre fin.

## Un endroit pour tenir le compte

Une boucle a presque toujours besoin d'une valeur qui évolue au fur et à mesure. C'est une **variable**, et `::=` en crée une :

```sather
   total ::= 0;
```

La variable s'appelle `total`, elle commence à `0`, et Sather déduit de ce `0` qu'elle contient un `INT`. Ensuite, `:=` y place une nouvelle valeur :

```sather
   total := total + 5;
```

Lis cela de droite à gauche : prends la valeur actuelle de `total`, ajoute 5, et remets le résultat dans `total`.

Une variable créée de cette façon vit jusqu'à la fin de la routine.

## until!

`until!` prend une question. Elle est posée à chaque tour, et quand la réponse est vraie, la boucle s'arrête sur-le-champ.

```sather
   sum_to(last : INT) : INT is
      total ::= 0;
      n ::= 1;
      loop
         until!(n > last);
         total := total + n;
         n := n + 1;
      end;
      return total;
   end;
```

`n` compte 1, 2, 3 ... et la boucle se termine la première fois que `n` dépasse `last`. Sans le `n := n + 1`, la question ne changerait jamais de réponse et la boucle tournerait indéfiniment.

`until!` n'a pas besoin d'être la première ligne. Place-le là où la question a du sens : en haut, la boucle peut ne pas s'exécuter du tout ; en bas, elle s'exécute toujours au moins une fois.

Le `!` fait partie du nom. Sather marque certaines choses ainsi ; ce que ce signe signifie viendra plus tard.

## break!

`break!` met fin à la boucle immédiatement, sans aucune question. Il est utile quand la raison de s'arrêter surgit au milieu du travail.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

`until!` et `break!` n'ont de sens qu'à l'intérieur d'une boucle `loop`. Aucun des deux ne peut s'utiliser tout seul.
