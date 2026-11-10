# Instructions

Une organisation de recherche a remarqué que certains de ses jeunes chercheurs utilisaient des méthodes peu optimales dans leurs analyses.
L'une de ces méthodes consiste à convertir immédiatement des probabilités discrètes en nombres décimaux (c'est-à-dire des nombres réels) avant de poursuivre les calculs.

Les chercheurs plus expérimentés préfèrent utiliser des nombres rationnels dans les calculs, ce qui peut offrir une meilleure précision, et ils aimeraient savoir si les mauvaises pratiques des jeunes chercheurs ont affecté les résultats des études.

Deux types d'études ont été menées :
- De nombreux tests ont été lancés, chacun renvoyant une probabilité discrète de succès, puis la moyenne de ces probabilités a été calculée.
- De nombreux événements indépendants ont été testés, et la probabilité totale que tous ces événements se produisent a été calculée en les multipliant entre eux.

Les chercheurs expérimentés te demandent d'écrire des fonctions qui peuvent les aider à déterminer si les analyses faites avec des nombres décimaux comportent des erreurs d'arrondi, et de leur fournir un nombre rationnel précis pour le résultat s'il y a des erreurs.

## 1. Donne le rapport entre les succès et les essais

La fonction `rationalize(successes, trials)` prend deux tableaux, `successes` et `trials`.
Pour un indice `i`, `successes[i]` correspond au nombre de succès obtenus sur `trials[i]` essais.
La fonction renvoie un tableau de nombres rationnels représentant le rapport des succès sur le nombre d'essais, dans le même ordre que les tableaux d'entrée.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Trouve les probabilités réelles associées aux succès et aux essais

De même, la fonction `probabilities(successes, trials)` prend deux tableaux, `successes` et `trials`.
Elle renvoie un tableau de nombres décimaux représentant le rapport des succès sur le nombre d'essais, dans le même ordre que les tableaux d'entrée.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Vérifie la moyenne des probabilités

La fonction `checkmean(successes, trials)` prend les deux tableaux, `successes` et `trials`.
Elle compare la moyenne des probabilités réelles à la moyenne des probabilités rationnelles.
- Si les deux probabilités sont égales, `checkmean` renvoie `true`
- Si les deux probabilités sont différentes, `checkmean` renvoie la probabilité rationnelle.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Vérifie la probabilité des événements indépendants

La fonction `checkprob(successes, trials)` prend les deux tableaux, `successes` et `trials`.
Elle compare la probabilité totale obtenue avec les probabilités décimales à la probabilité totale obtenue avec les probabilités rationnelles.
- Si les deux probabilités sont égales, `checkprob` renvoie `true`
- Si les deux probabilités sont différentes, `checkprob` renvoie la probabilité rationnelle.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
