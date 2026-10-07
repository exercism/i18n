# Instructions supplémentaires

Compte les lettres, en ignorant la casse et les caractères non alphabétiques, puis renvoie un dictionnaire qui associe chaque lettre minuscule à son nombre d'occurrences.

Utilise `pf.Parallel.map!(items, { workers, task })` de la [plateforme roc-parallel](https://github.com/ageron/roc-parallel) pour traiter les `items` donnés à l'aide d'une fonction `task` pure, en parallèle sur plusieurs threads (indiqués par `workers`). Les résultats sont renvoyés dans l'ordre d'entrée une fois que tous les items ont été traités. Tu n'as besoin de modifier que `ParallelLetterFrequency.roc`.

Indice : on te recommande d'utiliser la [bibliothèque Unicode](https://github.com/roc-lang/unicode) pour la conversion de casse et la détection des lettres. En particulier, jette un œil à `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` et `unicode.Scalar.to_str`. Considère les lettres comme des valeurs scalaires Unicode ; la normalisation Unicode n'est pas nécessaire.

Remarque : contrairement à la plupart des autres exercices, cet exercice utilise des fonctions à effets. Pour l'instant, l'instruction `expect` de Roc ne peut pas appeler de fonctions à effets, donc dans cet exercice les tests n'utilisent ni `expect` ni `roc test`. À la place, les tests sont exécutés avec `roc --opt=speed` et toute erreur renvoyée par le code Roc est signalée par la plateforme, dans un format différent de d'habitude.

Tu peux aussi jeter un œil à l'exercice `bank-account`, qui explore un autre aspect de la concurrence : appliquer des mises à jour à un état partagé en toute sécurité.
