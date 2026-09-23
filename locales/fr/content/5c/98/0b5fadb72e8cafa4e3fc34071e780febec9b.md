# Introduction

Un nombre à virgule flottante est un nombre comportant zéro ou plusieurs chiffres après le séparateur décimal. Par exemple `-2.4`, `0.1`, `3.14`, `16.984025` et `1024.0`.

Les différents types de nombres à virgule flottante peuvent stocker un nombre différent de chiffres après la virgule, ce que l'on appelle leur précision.

C# propose trois types de nombres à virgule flottante :

- `float` : 4 octets (précision d'environ 6 à 9 chiffres). S'écrit `2.45f`.
- `double` : 8 octets (précision d'environ 15 à 17 chiffres). C'est le type le plus courant. S'écrit `2.45` ou `2.45d`.
- `decimal` : 16 octets (précision de 28 à 29 chiffres). Généralement utilisé pour les données monétaires, car sa précision entraîne moins d'erreurs d'arrondi. S'écrit `2.45m`.

Comme on peut le voir, chaque type peut stocker un nombre de chiffres différent. Cela signifie que si l'on essaie de stocker PI dans un `float`, seuls les 6 à 9 premiers chiffres seront conservés (le dernier chiffre étant arrondi).
