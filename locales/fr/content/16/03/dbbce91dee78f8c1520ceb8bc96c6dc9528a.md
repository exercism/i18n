# Instructions

Crée une implémentation du chiffrement affine, un ancien système de chiffrement créé au Moyen-Orient.

Le chiffrement affine est un type de chiffrement par substitution monoalphabétique.
Chaque caractère est associé à son équivalent numérique, chiffré à l'aide d'une fonction mathématique, puis converti en la lettre correspondant à sa nouvelle valeur numérique.
Bien que tous les chiffrements monoalphabétiques soient faibles, le chiffrement affine est bien plus solide que le chiffrement Atbash, car il possède beaucoup plus de clés.

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## Chiffrement

La fonction de chiffrement est :

```text
E(x) = (ai + b) mod m
```

Où :

- `i` est l'indice de la lettre, de `0` à la longueur de l'alphabet moins 1.
- `m` est la longueur de l'alphabet.
  Pour l'alphabet latin, `m` vaut `26`.
- `a` et `b` sont des entiers qui constituent la clé de chiffrement.

Pour que le déchiffrement automatique réussisse, `a` et `m` doivent être _premiers entre eux_ (ou, _copremiers_), c'est-à-dire que leur seul facteur commun est le nombre `1` (tu trouveras plus d'informations dans [l'article Wikipédia sur les nombres premiers entre eux][coprime-integers]).
Si `a` et `m` ne sont pas premiers entre eux, ton programme doit signaler qu'il s'agit d'une erreur.
Sinon, il doit chiffrer ou déchiffrer avec la clé fournie.

Dans le cadre de cet exercice, les chiffres sont des entrées valides, mais ils ne sont pas chiffrés.
Les espaces et les caractères de ponctuation sont exclus.
Le texte chiffré est écrit par groupes de longueur fixe séparés par un espace, la taille traditionnelle d'un groupe étant de `5` lettres.
L'objectif est de rendre plus difficile la devinette d'un texte chiffré en se fondant sur les limites entre les mots.

## Déchiffrement

La fonction de déchiffrement est :

```text
D(y) = (a^-1)(y - b) mod m
```

Où :

- `y` est la valeur numérique d'une lettre chiffrée, c'est-à-dire `y = E(x)`
- il est important de noter que `a^-1` est l'inverse multiplicatif modulaire (MMI) de `a mod m`
- l'inverse multiplicatif modulaire n'existe que si `a` et `m` sont premiers entre eux.

L'inverse multiplicatif modulaire de `a` est `x` tel que le reste de la division de `ax` par `m` vaut `1` :

```text
ax mod m = 1
```

Tu trouveras plus d'informations sur la façon de trouver un inverse multiplicatif modulaire et sur ce qu'il signifie dans [l'article Wikipédia correspondant][mmi].

## Exemples généraux

- Chiffrer `"test"` avec la clé `a = 5`, `b = 7` donne `"ybty"`
- Déchiffrer `"ybty"` avec la clé `a = 5`, `b = 7` donne `"test"`
- Déchiffrer `"ybty"` avec la mauvaise clé `a = 11`, `b = 7` donne `"lqul"`
- Déchiffrer `"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"` avec la clé `a = 19`, `b = 13` donne `"thequickbrownfoxjumpsoverthelazydog"`
- Chiffrer `"test"` avec la clé `a = 18`, `b = 13` est une erreur, car `18` et `26` ne sont pas premiers entre eux

## Exemple de recherche d'un inverse multiplicatif modulaire (MMI)

Recherche de l'inverse multiplicatif modulaire de `a = 15` :

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`, c'est-à-dire `105 mod 26 = 1`
- `7` est l'inverse multiplicatif modulaire de `15 mod 26`

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers
