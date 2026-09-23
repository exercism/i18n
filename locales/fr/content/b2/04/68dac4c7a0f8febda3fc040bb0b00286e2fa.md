# Instructions

Dans cet exercice, tu vas écrire du code pour analyser la production d'une chaîne de montage dans une usine de voitures.
La vitesse de la chaîne de montage peut aller de `0` (arrêt) à `10` (maximum).

À sa vitesse la plus lente (`1`), `221` voitures sont produites chaque heure.
La production augmente linéairement avec la vitesse.
Ainsi, avec une vitesse réglée sur `4`, elle devrait produire `4 * 221 = 884` voitures par heure.
Cependant, des vitesses plus élevées augmentent la probabilité que des voitures défectueuses soient produites, et qu'il faille ensuite les écarter.
Le tableau suivant montre comment la vitesse influence le taux de réussite :

- `1` à `4` : 100 % de réussite.
- `5` à `8` : 90 % de réussite.
- `9` : 80 % de réussite.
- `10` : 77 % de réussite.

Tu as deux tâches.

## 1. Calculer le taux de production horaire

Calcule le taux de production horaire de la chaîne de montage, en tenant compte de son taux de réussite.

## 2. Calculer le nombre de voitures fonctionnelles produites par minute

Calcule combien de **voitures terminées et fonctionnelles** sont produites par minute.
