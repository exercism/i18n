# Introduction

Les `Complex numbers` ne sont pas compliqués.
Ils ont juste besoin d'un nom moins alarmant.

Ils sont si utiles, en particulier en ingénierie et en science, que R inclut les [nombres complexes][web-complex] parmi ses [types atomiques][ref-atomic] standard, aux côtés de integer, double, logical, character et raw.

## Les bases

En R, un nombre `complex` est une valeur unique.
À l'usage, cependant, on peut le voir comme une paire de nombres.
On les appelle les parties « réelle » et « imaginaire », pour de malheureuses raisons historiques.
Là encore, mieux vaut se concentrer sur la simplicité sous-jacente plutôt que sur ces noms étranges.

Pour créer un nombre complexe à partir de deux nombres réels, il suffit d'ajouter le suffixe `i` à la partie imaginaire.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Pour créer un nombre complexe à partir de variables réelles, la syntaxe ci-dessus ne fonctionne pas.
Écrire `r + imi` fait croire au parseur que `imi` est un nom de variable (qui n'existe pas).

Soit tu multiplies la partie imaginaire par `1i`, soit tu utilises la fonction [`complex()`][ref-complex] :

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Tu te demandes peut-être pourquoi `i` plutôt que `j` ?

La plupart des ingénieurs préfèrent `j`.
La plupart des scientifiques et des mathématiciens préfèrent la notation mathématique `i` pour _imaginaire_, mais cette notation entre en conflit avec l'usage de `i` pour désigner le _courant_ en électrotechnique.

R a choisi `i`, Python a choisi `j`, et Julia a contourné la controverse en choisissant `im`.
Fais attention quand tu passes d'un langage de programmation [STEM][wiki-STEM] à un autre.

Pour accéder séparément aux différentes parties d'un nombre complexe :

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

L'une ou l'autre des parties peut être nulle, et les mathématiciens parlent alors d'un nombre « entièrement réel » ou « entièrement imaginaire ».
Cependant, cela reste un nombre complexe en R.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

Tu as peut-être entendu dire que « `i` (ou `j`) est la racine carrée de -1 ».

Pour l'instant, tout cela signifie simplement que la partie imaginaire satisfait _par définition_ l'égalité suivante :

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

C'est une idée simple, mais elle mène à des conséquences intéressantes.

## Arithmétique

La plupart des [`operators`][ref-operators] utilisés avec les nombres décimaux et les entiers fonctionnent aussi avec les nombres complexes :

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

Expliquer les règles de multiplication et de division des nombres complexes sort du cadre de ce concept (_et tu n'auras sans doute pas souvent à faire ces opérations « à la main »_).

Toute introduction [mathématique][web-math-complex] ou [en électrotechnique][web-engineering-complex] aux nombres complexes couvrira ce point, si tu veux creuser le sujet.

Sinon, Exercism propose un exercice d'entraînement [`Complex Numbers`][exercise-complex-numbers] où tu peux implémenter une classe de nombres complexes avec ces opérations, en partant des principes de base.

La division entière n'est généralement ___pas___ possible sur les nombres complexes, donc les opérateurs `%/%` et `%%` ne fonctionneront pas avec le type complexe.

## Fonctions

La plupart des fonctions mathématiques fonctionnent avec des entrées complexes.

Cependant, fournir des entrées réelles et attendre une sortie complexe ne fonctionnera généralement pas.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

Il existe plusieurs fonctions, en plus de `Re()` et `Im()`, qui sont particulièrement pertinentes pour les nombres complexes.

- `Conj()` inverse simplement le signe de la partie imaginaire d'un nombre complexe (_de + à - ou inversement_).
  - Vu la façon dont fonctionne la multiplication des nombres complexes, c'est plus utile qu'on ne pourrait le croire.
- `abs(<complex number>)` renvoie toujours un nombre réel sans partie imaginaire (son « module »), et `Mod(<complex number>)` en est un synonyme.
- `Arg(<complex number>)` renvoie l'angle de phase en radians.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
