# Indices

## 1. Oriente le robot
- L'ordre dans lequel on effectue les opérations est important.
- Il existe plusieurs façons de convertir un vecteur de vecteurs en une matrice.
- Quelques idées qui peuvent aider à construire la matrice : les compréhensions, les boucles `for`, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], etc...

## 2. Fais tourner le robot
- Regarde l'introduction pour savoir comment faire tourner une matrice.
- Une simple multiplication de matrices suffit.

## 3. Vérifie l'orientation
- Rappelle-toi, c'est la *deuxième* colonne de la matrice qui indique l'orientation.
- On peut le vérifier avec un produit scalaire.
- Il peut être utile de normaliser les vecteurs.
- En cas d'écarts liés à la virgule flottante, l'orientation doit seulement être [approximativement][isapprox-ref] égale à environ `~1e-7`.
- L'identité suivante pourrait être utile : `x⋅y = ||x||*||y||cos(θ)` où [`||x|| = norm(x)`][norm-ref]

## 4. Coordonnées du corps du robot
- C'est très simple, mais les opérations élément par élément sont importantes.
- Rappelle-toi que la matrice d'orientation peut se voir comme trois vecteurs de position qui partent de l'origine.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
