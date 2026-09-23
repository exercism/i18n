# Instructions complémentaires

## Registres

| Registre | Utilisation | Type      | Description                                                     |
| -------- | ----------- | --------- | --------------------------------------------------------------- |
| `$a0`    | entrée      | adresse   | éléments du premier tableau                                     |
| `$a1`    | entrée      | entier    | taille du premier tableau, en mots                              |
| `$a2`    | entrée      | adresse   | éléments du deuxième tableau                                    |
| `$a3`    | entrée      | entier    | taille du deuxième tableau, en mots                             |
| `$v0`    | sortie      | entier    | `0` = égal, `1` = différent, `2` = sous-liste, `3` = sur-liste  |
| `$t0-9`  | temporaire  | quelconque | utilisé pour le stockage temporaire                             |
