# Instructions

La troupe de danse prépare son spectacle de fin d'année : combien de façons de disposer les danseurs, et comment la durée du spectacle se répartit entre les actes.

Les cinq tâches se trouvent dans la classe `FORMATION_COUNT`.

## 1. Combien d'alignements ?

Avec `n` danseurs, il y a `n` factorielle façons de les aligner : `n` choix pour celui de devant, puis `n-1` pour le suivant, et ainsi de suite. Renvoie ce résultat sous la forme d'un `INTI`. Zéro danseur donne exactement un alignement, l'alignement vide.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Écris tous les chiffres

Le même nombre sous forme de _string_, avec chacun de ses chiffres.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Un `INT` ne peut pas contenir ce nombre, et c'est tout l'intérêt de la tâche.

## 3. La part d'un acte

Un spectacle de `acts` actes égaux donne à chaque acte `1/acts` de la durée du spectacle. Renvoie ce résultat sous la forme d'un `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Deux actes ensemble

Additionne deux parts et renvoie le total, exactement.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. Est-ce que ça remplit le spectacle ?

Indique si une part représente exactement le spectacle entier, c'est-à-dire exactement un.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
