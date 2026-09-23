# Instructions complémentaires

## Indices

Tu dois implémenter la fonction `diamond`, qui affiche un losange commençant à `A`, avec le caractère donné à ses points les plus larges. Tu peux utiliser la signature fournie si tu as un doute sur les types, mais ne la laisse pas restreindre ta créativité :

```haskell
diamond :: Char -> Maybe [String]
```

Cet exercice manipule des données textuelles. Pour des raisons historiques, le type `String` de Haskell est synonyme de `[Char]`, une liste de caractères. Pour manipuler plus efficacement des données textuelles, on peut utiliser le type `Text`.

Comme prolongement facultatif de cet exercice, tu peux

- Lire la page sur les [types de _string_](https://haskell-lang.org/tutorial/string-types) en Haskell.
- Ajouter `- text` à ta liste de dépendances dans package.yaml.
- Importer `Data.Text` de [la façon suivante](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c) :

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Tu peux maintenant écrire par exemple `diamond :: Char -> Maybe [Text]` et faire référence aux combinateurs de `Data.Text` comme par exemple `T.pack`,
- Consulter la documentation de [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Tu peux ensuite remplacer toutes les occurrences de `String` par `Text` dans Diamond.hs :

```haskell
diamond :: Char -> Maybe [Text]
```

Cette partie est entièrement facultative.
