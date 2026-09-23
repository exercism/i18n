# Instructions

Dans cet exercice, on va traiter des lignes de _log_.

Chaque ligne de _log_ est une _string_ au format suivant : `"[<LEVEL>]: <MESSAGE>"`.

Il existe trois niveaux de _log_ différents :

- `INFO`
- `WARNING`
- `ERROR`

Tu as trois tâches ; chacune d'elles prend une ligne de _log_ et te demande d'en faire quelque chose.

## 1. Récupère le message d'une ligne de log

Implémente la fonction `message` pour qu'elle renvoie le message d'une ligne de _log_ :

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Les espaces en début et en fin de ligne doivent être supprimés :

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Récupère le niveau de log d'une ligne de log

Implémente la fonction `log_level` pour qu'elle renvoie, en minuscules, le niveau de _log_ d'une ligne de _log_ :

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Reformate une ligne de log

Implémente la fonction `reformat` qui reformate la ligne de _log_ en plaçant le message en premier, suivi du niveau de _log_ entre parenthèses :

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Note :*** Toutes les _strings_ de cet exercice sont en anglais et se limitent au jeu de caractères ASCII. Les prochains concepts te donneront l'occasion de travailler avec des caractères Unicode.
