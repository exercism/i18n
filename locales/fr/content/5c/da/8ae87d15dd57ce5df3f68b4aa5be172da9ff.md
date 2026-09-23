# À propos

[Pony](http://www.ponylang.org) est un langage de programmation orienté objet, fondé sur le modèle d'acteurs et sécurisé par les _capabilities_, dont le but est de faire avancer les choses.

Il est orienté objet parce qu'il possède des classes et des objets, comme Python, Java, C++ et bien d'autres langages. Il repose sur le modèle d'acteurs parce qu'il a des acteurs (un peu comme Erlang ou Akka). Ceux-ci se comportent comme des objets, mais ils peuvent aussi exécuter du code de façon asynchrone. Les acteurs rendent Pony génial.

Quand on dit que Pony est sécurisé par les _capabilities_, cela veut dire plusieurs choses :

- Il est sûr au niveau des types. Vraiment sûr. Il y a même une preuve mathématique.
- Il est sûr au niveau de la mémoire. Bon, d'accord, cela découle de la sûreté des types, mais ça reste intéressant. Pas de pointeurs suspendus, pas de débordements de tampon, et même : le langage ne connaît pas le concept de `null` !
- Il est sûr au niveau des exceptions. Il n'y a pas d'exceptions à l'exécution. Toutes les exceptions ont une sémantique définie et sont toujours traitées.
- Il est exempt de courses de données. Pony n'a ni verrous, ni opérations atomiques, ni rien de tel. À la place, le système de types garantit à la compilation que ton programme concurrent ne pourra jamais avoir de course de données. Tu peux donc écrire du code hautement concurrent sans jamais te tromper.
- Il est exempt d'interblocages. Celui-là est facile, parce que Pony n'a aucun verrou ! Ils ne peuvent donc certainement pas provoquer d'interblocage, puisqu'ils n'existent pas.

Les débutants devraient commencer par le [tutoriel](https://tutorial.ponylang.org/).
