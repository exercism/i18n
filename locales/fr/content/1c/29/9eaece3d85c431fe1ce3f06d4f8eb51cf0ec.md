# Appendice aux instructions

## Implémentation

À Cairo, où les nombres à virgule flottante ne sont pas pris en charge nativement, on représente les valeurs fractionnaires à l'aide d'entiers.

Cette approche est essentielle dans le développement blockchain pour préserver la précision des calculs.

Dans cet exercice, on utilise l'**arithmétique à virgule fixe** en convertissant les périodes orbitales en microsecondes.

Par exemple, la période orbitale de Mercure, soit `0.2408467` année terrestre, devient `240,846,700` microsecondes lorsqu'on la multiplie par `1,000,000`.

Pour tenir compte de la précision décimale, les cas de test supposent que l'âge obtenu comporte **deux décimales**, représentées sous forme d'entiers.

Cela signifie qu'un âge de `31.69` ans est stocké sous la forme `3169` dans le code.

Pour y parvenir, on multiplie par 100 avant d'effectuer la division.

Voici un exemple :

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Avec cette méthode, tu t'assures que les valeurs fractionnaires sont représentées avec précision sous forme d'entiers, tout en conservant les deux décimales requises, ce qui est indispensable pour que les tests passent.
