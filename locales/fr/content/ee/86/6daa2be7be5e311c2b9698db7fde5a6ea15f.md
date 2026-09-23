# méthode trop longue

Envisage de décomposer la ou les méthodes suivantes en appels à d'autres méthodes qui ont un sens : `%{methodNames}`

Cette méthode prend plus de lignes de code que ce que cet exercice demande généralement.
C'est parfois acceptable, mais cela peut aussi indiquer que la méthode fait directement trop de travail et qu'elle devrait en déléguer une partie à d'autres méthodes.
Essaie de garder tout ce qui se trouve à l'intérieur d'une méthode au même niveau d'abstraction.
Par exemple, le parcours des éléments d'une boucle peut se faire dans une méthode, tandis que la manipulation de chaque élément individuel peut se faire dans une autre.
