# Nombres à virgule flottante

Les nombres à virgule flottante sont des nombres réels : ils peuvent avoir une partie fractionnaire. Ils sont représentés dans la machine par une suite de bits binaires, selon la [spécification IEEE-754](https://en.wikipedia.org/wiki/IEEE_754).
Dans le langage courant, on parle de _floats_ pour désigner les nombres à virgule flottante.

Les nombres à virgule flottante sont toujours signés. Le fait d'être signé signifie que l'on réserve l'un des bits du nombre pour indiquer si ce nombre est négatif ou non.

Les nombres à virgule flottante ont une **largeur en bits**, c'est-à-dire le nombre de bits qui composent le nombre. Cela influence l'intervalle et la précision des valeurs que ce type peut représenter.

Rust dispose de 2 types primitifs de nombres à virgule flottante : `f32` et `f64`. Le nombre qui suit le `f` indique la largeur en bits. Dans d'autres langages, `f32` est parfois appelé « simple précision » et `f64` « double précision ».

## Lequel utiliser ?

En règle générale, utilise `f64` : il est aussi rapide que `f32` sur la plupart des machines grand public modernes, et il réduit considérablement la fréquence des [imprécisions des nombres à virgule flottante](https://0.30000000000000004.com/).

Si tu as besoin de nombres rationnels de précision infinie, tu peux utiliser la _crate_ [`num-rational`](https://crates.io/crates/num-rational), qui fournit un type `BigRational`. Si tu as besoin de nombres décimaux de précision fixe, tu peux utiliser la _crate_ [`rust_decimal`](https://crates.io/crates/rust_decimal), qui fournit un type `Decimal`.

## Convertir entre nombres à virgule flottante

Rust ne fait aucune conversion numérique implicite. Si tu as besoin de convertir entre types flottants, il existe deux approches de base : le mot-clé `as`, et les traits `From` et `TryFrom`.

Utiliser le mot-clé `as` est simple : `expr as Type`. Cependant, il y a un certain nombre de [pièges et de subtilités](https://doc.rust-lang.org/nomicon/casts.html) qu'il faut garder à l'esprit lorsqu'on utilise des conversions avec `as`.

Les conversions basées sur les traits sont un peu plus lourdes à mettre en œuvre, mais plus sûres : les traits de conversion ne sont implémentés que là où la conversion est sûre. Par exemple, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implémente `From<u8>`, `From<u16>`, `From<i8>` et `From<i16>` : toute valeur représentable par l'un de ces types est garantie d'être représentable dans un `f32`. On peut l'utiliser comme `f32::from(expr)`, ou `expr.into()`, où `expr` correspond à l'un de ces types.

Pour convertir des valeurs à virgule flottante, on préfère souvent la conversion avec `as`, tout simplement parce que les implémentations de conversion basées sur les traits sont relativement rares. En octobre 2020, `TryFrom` n'était pas implémenté pour les nombres à virgule flottante. La conversion avec `as` de `f32` vers `f64` est sans perte. L'inverse est avec perte, mais suit un protocole de conversion défini qui vise à minimiser cette perte.
