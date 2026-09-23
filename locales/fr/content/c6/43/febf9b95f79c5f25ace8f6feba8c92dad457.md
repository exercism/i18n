# Ajout aux instructions

## Notes d'implémentation

Le programme de test crée des arbres par applications répétées de la fonction variadique `New`.
Par exemple, l'instruction suivante :

```go
tree := New("a",New("b"),New("c",New("d")))
```

construit l'arbre ci-dessous :

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

On peut supposer qu'il n'y aura pas de valeurs en double dans les arbres de test.

Les méthodes `Value` et `Children` seront utilisées par le programme de test pour déconstruire les arbres.

La construction et la déconstruction de base d'un arbre doivent fonctionner avant d'aborder la partie intéressante de l'exercice, c'est pourquoi elles sont testées séparément dans les trois premiers tests.

---

Les méthodes `FromPov` et `PathTo` constituent la partie intéressante de l'exercice.

La méthode `FromPov` prend un argument _string_ `from` qui désigne un nœud de l'arbre par sa valeur.
Elle doit renvoyer un arbre dont la racine porte la valeur `from`.
Tu peux modifier l'arbre d'origine et le renvoyer, ou créer un nouvel arbre et renvoyer celui-ci.
Si tu renvoies un nouvel arbre, tu es libre de consommer ou de détruire l'arbre d'origine.
Bien sûr, il est préférable de le laisser tel quel.

La méthode `PathTo` prend deux arguments _string_ `from` et `to` qui désignent deux nœuds de l'arbre par leurs valeurs.
Elle doit renvoyer le chemin le plus court dans l'arbre pour aller du premier nœud au second.
