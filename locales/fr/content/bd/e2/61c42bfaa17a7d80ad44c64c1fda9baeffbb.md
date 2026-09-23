# À propos

Un vocabulaire est l'unité d'organisation de Factor : une collection nommée de définitions de mots.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Organisation des fichiers et des répertoires

Les noms de vocabulaire utilisent le `.` comme séparateur. Le chemin suit les points :

| Vocabulaire            | Fichier                                    |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

Le chargeur de Factor recherche les vocabulaires en parcourant les *racines de vocabulaire*, c'est-à-dire la racine du projet et la bibliothèque basis incluse, jusqu'à ce qu'il trouve un répertoire dont le nom correspond à chaque segment du chemin. Le dernier segment est repris comme nom de fichier.

## `USING:` et `IN:`

`USING:` (ainsi que `USE:` pour un vocabulaire à la fois) fait entrer d'autres vocabulaires dans le chemin de recherche du fichier courant. `IN:` déclare à quel vocabulaire *appartiennent* les mots définis dans ce fichier : leurs noms pleinement qualifiés commencent par ce préfixe.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Ici, `greet-everyone` se trouve dans `greetings`, appelle `hello` de `greetings.formal` et `map` de `sequences`.

## Pourquoi répartir une solution entre plusieurs vocabulaires

Répartir le code entre plusieurs vocabulaires permet de :

- Regrouper les petits mots auxiliaires par responsabilité, à l'écart de la routine de haut niveau qui les compose.
- Réutiliser ces auxiliaires ailleurs sans embarquer la routine principale.
- Lire chaque fichier comme une seule couche d'abstraction cohérente.

Le chargeur de Factor est suffisamment rapide et paresseux pour que le découpage *vers le bas* en vocabulaires plus petits soit peu coûteux ; la convention, dans la bibliothèque standard, est de découper agressivement en petits mots.
