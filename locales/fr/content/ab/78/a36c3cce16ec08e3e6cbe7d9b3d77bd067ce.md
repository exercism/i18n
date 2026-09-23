# Les tests sur le parcours Pyret

## Installer les prérequis

Une fois que tu as téléchargé un exercice, tu dois installer les modules Node.js pour pouvoir exécuter les tests :

```sh
cd /path/to/exercise
npm install
```

Ajoute ensuite le répertoire qui contient l'outil en ligne de commande `pyret` à ton $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Pour commencer

Le répertoire de l'exercice contiendra plusieurs fichiers, mais les deux plus importants sont ton fichier de solution et ton fichier de test.
Dans l'exemple suivant, on a téléchargé l'exercice Leap.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Pour exécuter les tests, utilise `exercism test` si tu as téléchargé l'Exercism CLI officielle, ou bien lance `pyret leap-test.arr`.
Pyret exécutera la suite de tests, qui se compose d'une série de blocs `check` étiquetés, lesquels testent ton fichier de solution avec des entrées précises et des résultats attendus.
Un point essentiel de ce processus consiste à exporter explicitement certaines parties de ton code pour que la suite de tests puisse les voir.

## provide

Les tests de ce parcours importeront ton fichier, ce qui donne accès à tout ce qui est explicitement exporté depuis ton code.

Pour exporter des variables, tu dois ajouter une [instruction provide][provide-statement] au début de ton fichier.

Les extraits suivants présentent deux façons valides d'exporter `a`, `b` et `c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Une troisième méthode, `provide *`, est un raccourci pour exporter toutes les liaisons de premier niveau, sauf les types de données personnalisés.
Cependant, elle n'est généralement pas recommandée, car Pyret est strict et n'autorise pas le [masquage][shadowing].

## provide-types

Certains exercices demanderont d'exporter un [type de données personnalisé][data-definition] à des fins de test.
Dans ce cas, tu peux utiliser une [instruction provide-types][provide-types-statement].
Comme un type de données comporte des fonctions supplémentaires qui ne sont pas forcément exportées, il est conseillé d'utiliser `provide-types *` malgré le risque de masquage.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Tous les squelettes d'exercice comportent déjà une instruction `provide` ou `provide-types` prête à l'emploi.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
