# Indices

## Général

- Toutes les parties de cet exercice reposent sur des opérations bit à bit.
  - Le [programme d'apprentissage][concept-bitwise-operations] d'Exercism propose une introduction en douceur.
  - Les [opérateurs bit à bit][ref-bitwise-operators] sont listés dans le manuel Julia.
  - `Base` contient diverses fonctions utiles liées aux bits, notamment [count_ones()][count_ones] et [trailing_zeros()][trailing_zeros].
- Les tests essaient de ne pas être prescriptifs quant aux types, mais l'exercice porte sur des octets non signés et les valeurs [`UInt8`][uint8] sont relativement faciles à appréhender.
  - Les arguments et les valeurs de retour sont `Vector{UInt8}`,
  - les valeurs `UInt8` sont pratiques pour les masques de bits et les valeurs intermédiaires.
- Les nombres en base dix seraient une distraction, alors préfère l'hexadécimal (`0xFF`) ou le binaire (`0b11111111`) pour les littéraux `UInt8`.
  - La fonction [`bitstring()`][bitstring] peut être utile pour le débogage, car elle produit un format binaire lisible par un humain.
- Un message brut arrive sous la forme d'un vecteur de blocs de 8 bits, et doit être converti en blocs de 7 bits dans les bits de poids fort, plus un bit de parité comme bit de poids faible.
  - Utilise des masques de bits avec `&` ou `|` pour isoler les bits souhaités.
  - Les opérateurs de décalage à gauche (`<<`) et de décalage logique à droite (`>>>`) sont importants.
  - Prévois un moyen de reporter les bits excédentaires vers le tour de traitement suivant.
  - La retenue rend difficile le traitement des octets d'entrée indépendamment les uns des autres, donc une boucle (ou peut-être une récursion) est probablement plus simple que d'essayer d'utiliser des fonctions d'ordre supérieur.
  - Les messages encodés sont généralement plus longs (plus d'octets) que le message brut, pour accueillir un bit de parité par octet.

  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
