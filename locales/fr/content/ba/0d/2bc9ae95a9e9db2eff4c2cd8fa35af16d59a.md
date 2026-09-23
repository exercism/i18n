# Indices

## Général

- Le type est `LIST{STR}` partout : une liste de _strings_. Écris-le en entier partout où un carnet est passé en argument ou renvoyé.

## 1. Ouvre une affaire

- `#LIST{STR}` permet d’en créer une vide. La routine ne prend aucun argument et renvoie `LIST{STR}`.

## 2. Note un indice

- `append` est la routine, et elle ne renvoie rien ; cette routine n’a donc pas non plus de type de retour : `add_clue(notes : LIST{STR}, clue : STR) is`.
- N’affecte jamais le résultat de `append`. Contrairement à `FMAP::insert`, il n’y a pas de résultat.

## 3. Combien d’indices ?

- `.size`.

## 4. Élimine un indice

- `remove_index` prend la position. Là encore, pas de type de retour.

## 5. Relis l’affaire

- Une boucle sur `notes.elt!` et un `FSTR`, comme dans `rehearsal-script`.
- Le `"; "` se place avant chaque indice sauf le premier, ce qui fait qu’un carnet vide ressort comme une _string_ vide, sans traitement particulier.
