# Instructions

Si tu veux construire quelque chose avec un Raspberry Pi, tu utiliseras sans doute des _résistances_.
Pour cet exercice, tu n'as besoin de connaître que trois choses à leur sujet :

- Chaque résistance a une valeur de résistance.
- Les résistances sont petites. Si petites, en fait, qu'y imprimer leur valeur de résistance la rendrait difficile à lire.
  Pour contourner ce problème, les fabricants impriment sur les résistances des bandes de couleur codées pour indiquer leur valeur de résistance.
- Chaque bande représente un chiffre d'un nombre.
  Par exemple, si on imprimait une bande brown (valeur 1) suivie d'une bande green (valeur 5), cela donnerait le nombre 15.
  Dans cet exercice, tu vas créer un programme bien pratique pour ne plus avoir à retenir les valeurs des bandes.
  Le programme prend 3 couleurs en entrée et renvoie la valeur correcte, en ohms.
  Les bandes de couleur sont codées comme suit :

- black : 0
- brown : 1
- red : 2
- orange : 3
- yellow : 4
- green : 5
- blue : 6
- violet : 7
- grey : 8
- white : 9

Dans l'exercice Duo de couleurs de résistance, tu as décodé les deux premières couleurs.
Par exemple : orange-orange donnait la valeur principale `33`.
La troisième couleur indique combien de zéros il faut ajouter à la valeur principale.
La valeur principale à laquelle on ajoute les zéros donne une valeur en ohms.
Pour cet exercice, peu importe ce que sont vraiment les ohms.
Par exemple :

- orange-orange-black donnerait 33 sans zéro, soit 33 ohms.
- orange-orange-red donnerait 33 et 2 zéros, soit 3300 ohms.
- orange-orange-orange donnerait 33 et 3 zéros, soit 33000 ohms.

(Si les maths sont ton truc, tu peux voir les zéros comme des exposants de 10.
Si les maths ne sont pas ton truc, contente-toi des zéros.
C'est vraiment la même chose, juste en langage courant plutôt qu'en jargon mathématique.)

Cet exercice consiste à traduire les couleurs en une étiquette :

> « ... ohms »

Ainsi, une entrée de `"orange", "orange", "black"` doit renvoyer :

> « 33 ohms »

Pour des résistances plus grandes, on utilise un [préfixe du Système international][metric-prefix] pour indiquer un ordre de grandeur plus élevé en ohms, comme « kiloohms ».
C'est un peu comme dire « 2 kilomètres » au lieu de « 2000 mètres », ou « 2 kilogrammes » pour « 2000 grammes ».

Par exemple, une entrée de `"orange", "orange", "orange"` doit renvoyer :

> « 33 kiloohms »

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
