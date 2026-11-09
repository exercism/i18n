# Indices

Rappelle-toi : les tortues sont des animaux à sang froid, alors assure-toi qu'elles sont bien au chaud avant de leur donner une couverture ou un pull.

## 1. Trie la quantité !

- La permutation de tri que tu renvoies doit être en ordre décroissant.
- Veille à trier les quantités en ordre décroissant, sur place.
- `sortperm` peut prendre des arguments similaires à ceux de `sort`.
- L'ordre dans lequel tu effectues les deux opérations ci-dessus est très important !

## 2. Trie le client

- Un nouveau tableau contenant les clients triés doit être renvoyé (c'est-à-dire sans tri sur place).
- Rappelle-toi qu'une permutation de tri (c'est-à-dire un tableau d'indices) peut s'utiliser comme des indices.

## 3. Calendrier de production !

- Tu peux utiliser ici tes fonctions `sortquantity!()` et `sortcustomer()`.
- Rappelle-toi qu'une permutation de tri n'est qu'une permutation des indices.
- Pour une [permutation de tri inverse][invperm] :
    - Réfléchis à ce qu'est l'ordre initial des indices pour un `Vector` quelconque.
    - Que peut-on faire à *n'importe quelle* permutation d'indices pour la ramener à ce point de départ ?
    - Dernier indice... Que fait la permutation de tri d'une permutation de tri ?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
