# Introduction

## Comportement Access

Elixir utilise des comportements pour fournir des interfaces génériques communes, tout en permettant des implémentations spécifiques pour chaque module qui l'implémente. Un exemple courant est le comportement Access.

Le comportement Access fournit une interface commune pour récupérer des données dans une structure de données basée sur des clés. Le comportement Access est implémenté pour les _maps_ et les listes de mots-clés, mais regardons son utilisation avec les _maps_ pour nous familiariser. Le comportement Access spécifie que lorsqu'on a une _map_, on peut la faire suivre de crochets, puis utiliser la clé pour récupérer la valeur associée à cette clé.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Si la clé n'existe pas dans la structure de données, `nil` est renvoyé. Cela peut être une source de comportement inattendu, car cela ne lève pas d'erreur. Note que `nil` implémente lui-même le comportement Access et renvoie toujours `nil` pour n'importe quelle clé.
