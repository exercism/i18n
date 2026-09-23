# Introduction

Les `Complex numbers` ne sont pas compliqués.
Ils ont juste besoin d'un nom moins alarmant.

Ils sont si utiles, en particulier en ingénierie et en science, que Julia inclut les nombres complexes parmi les types numériques standard, aux côtés des entiers et des nombres à virgule flottante.

## Les bases

Une valeur `complex` en Julia est essentiellement une paire de nombres : le plus souvent des nombres à virgule flottante, mais pas toujours.
On les appelle les parties « réelle » et « imaginaire », pour de malheureuses raisons historiques.
Là encore, mieux vaut se concentrer sur la simplicité sous-jacente que sur les noms étranges.

Pour créer un nombre complexe à partir de deux nombres réels, il suffit d'ajouter le suffixe `im` à la partie imaginaire.

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> typeof(z)
ComplexF64 (alias for Complex{Float64})

julia> zi = 1 + 2im
1 + 2im

julia> typeof(zi)
Complex{Int64}
```

Il existe donc divers types `Complex`, dérivés du type entier ou à virgule flottante correspondant.

Pour créer un nombre complexe à partir de variables réelles, la syntaxe ci-dessus ne fonctionne pas.
Écrire `a + bim` induit l'analyseur syntaxique en erreur : il croit que `bim` est un nom de variable (inexistant).

Écrire `b*im` est possible, mais la méthode privilégiée utilise la fonction `complex()`, qui évite les opérations de multiplication et d'addition.

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

Pour accéder aux parties d'un nombre complexe individuellement :

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> real(z)
1.2

julia> imag(z)
3.4
```

Ou bien ensemble :

```julia-repl
julia> reim(z)
(1.2, 3.4)
```

L'une ou l'autre partie peut être nulle, et les mathématiciens parlent alors d'un nombre « purement réel » ou « purement imaginaire ».
Cependant, il reste un nombre complexe en Julia.

```julia-repl
julia> zr = 1.2 + 0im
1.2 + 0.0im

julia> typeof(zr)
ComplexF64 (alias for Complex{Float64})

julia> zi = 3.4im
0.0 + 3.4im

julia> typeof(zi)
ComplexF64 (alias for Complex{Float64})
```

Tu as peut-être entendu dire que « `i` (ou `j`) est la racine carrée de -1 ».

Pour l'instant, tout ce que cela signifie, c'est que la partie imaginaire _par définition_ vérifie l'égalité suivante :

```julia-repl
julia> 1im * 1im == -1
true
```

C'est une idée simple, mais elle mène à des conséquences intéressantes.

## Arithmétique

Tous les `operators` mathématiques standard et les fonctions élémentaires que l'on utilise avec les flottants et les entiers fonctionnent également avec les nombres complexes. Un petit échantillon :

```julia-repl
julia> z1 = 1.5 + 2im
1.5 + 2.0im

julia> z2 = 2 + 1.5im
2.0 + 1.5im

julia> z1 + z2  # addition
3.5 + 3.5im

julia> z1 * z2  # multiplication
0.0 + 6.25im

julia> z1 / z2  # division
0.96 + 0.28im

julia> z1^2  # exponentiation
-1.75 + 6.0im

julia> 2^z1  # another exponentiation
0.5188946835878313 + 2.7804223253571183im
```

## Fonctions

Il existe plusieurs fonctions, en plus de `real()` et `imag()`, particulièrement utiles pour les nombres complexes.

- `conj()` inverse simplement le signe de la partie imaginaire d'un nombre complexe (_de + à - ou inversement_).
    - À cause de la façon dont fonctionne la multiplication complexe, c'est plus utile qu'on ne pourrait le penser.
- `abs(<complex number>)` renvoie toujours un nombre réel sans partie imaginaire.
- `abs2(<complex number>)` renvoie le carré de `abs(<complex number>)` : plus rapide à calculer que `abs()`, et souvent ce dont un calcul a besoin.
- `angle(<complex number>)` renvoie l'angle de phase en radians.

```julia-repl
julia> z1
1.5 + 2.0im

julia> conj(z1)
1.5 - 2.0im

julia> abs(z1)
2.5

julia> abs2(z1)
6.25

julia> angle(z1)
0.9272952180016122
```
Une explication partielle, pour les esprits mathématiques :

- La représentation `(real, imag)` de `z1` utilise en pratique des coordonnées cartésiennes dans le plan complexe.
- Le même nombre complexe peut se représenter en notation `(r, θ)`, à l'aide de coordonnées polaires.
- Ici, `r` et `θ` sont donnés respectivement par `abs(z1)` et `angle(z1)`.

Voici un exemple utilisant quelques constantes :

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

La notation polaire `(r, θ)` est si utile qu'il existe des fonctions intégrées `cis` (abréviation de `cos(x) + isin(x)`) et `cispi` (abréviation de `cos(πx) + isin(πx)`) qui aident à la construire plus efficacement.

L'utilité de la notation polaire se révèle dans la formule élégante d'Euler, `ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`, où `|x + iy| = 1`.
Avec `|x + iy| = r`, on obtient la forme polaire plus générale `r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`.
Remarque que la forme exponentielle, en particulier, est compacte et facile à manipuler.

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

L'égalité approximative ci-dessus vient du fait que les fonctions `cis` et `cispi` peuvent donner de meilleurs résultats numériques, en particulier `cispi` lorsqu'on travaille avec des arguments qui sont des multiples arbitraires de π (par exemple, des radians !).

```julia-repl
julia> cis(π)
-1.0 + 0.0im

julia> cispi(1)
-1.0 + 0.0im

julia> θ = π/2;
julia> exp(im*θ)
6.123233995736766e-17 + 1.0im

julia> cis(θ)
6.123233995736766e-17 + 1.0im

julia> cispi(θ / π)  # θ/π == 1/2
0.0 + 1.0im
```

Soit dit en passant, cela rend les nombres complexes très utiles pour effectuer des rotations et des déplacements radiaux en 2D.

Pour les rotations, le nombre complexe `z = x + iy` peut être tourné d'un angle `θ` autour de l'origine par une simple multiplication : `z * ℯ^(iθ)`.
Remarque que les `x` et `y` ici ne sont que les coordonnées habituelles dans le plan cartésien 2D réel, et qu'un angle positif donne une rotation *dans le sens inverse des aiguilles d'une montre*, tandis qu'un angle négatif donne une rotation *dans le sens des aiguilles d'une montre*.

De même, il est simple d'effectuer un déplacement radial `Δr` en l'ajoutant au module `r` d'un nombre complexe sous forme polaire (par ex. `z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`).
Remarque que la partie angulaire reste la même et que seul le module, `r`, varie, comme prévu.
