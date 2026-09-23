# Indices

## Généralités

- Un `include` se place à l'intérieur de la classe, généralement en première ligne.
- Seul ce que tu renommes ou omets change. Tout le reste est repris tel quel.

## 1. La routine de jazz

- Une seule ligne à l'intérieur de la classe : `include WARM_UP;`
- Rien d'autre. Le corps de la classe se limite à cette ligne, pas plus.

## 2. La routine de claquettes

- `include WARM_UP describe -> ;`
- Le `-> ;` avec rien après la flèche laisse `describe` de côté, ce qui fait de la place pour celle que tu écris.
- Sans cela, le compilateur se plaint que `describe` est défini deux fois. Cette erreur est voulue : Sather ne choisira pas une définition en silence.

## 3. Le final

- Deux entrées dans un même include, séparées par une virgule : `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Écris ensuite `counts` qui renvoie `warm_up_counts * 2`, puis `describe`.
- `describe` doit appeler `counts`, et non recalculer le nombre.
- Souviens-toi qu'on ne peut pas ajouter une _string_ à un nombre, donc une description qui commence par des mots convient parfaitement : `"Finale: " + counts + " counts"`.
