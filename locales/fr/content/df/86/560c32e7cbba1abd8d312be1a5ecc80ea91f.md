# Instructions

Dans ton laboratoire de recherche sur l'ADN, tu as exploré différentes façons de compresser tes données de recherche pour économiser de l'espace de stockage. Un collègue de ton équipe propose de convertir les données d'ADN en une représentation binaire :

| Acide nucléique | Code  |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Tu y réfléchis : cela réduirait peut-être les coûts de stockage nécessaires, mais au prix de la lisibilité pour un humain. Tu décides d'écrire un module pour encoder et décoder tes données afin de mesurer les économies réalisées.

## 1. Encoder l'acide nucléique en valeur binaire

Implémente `encode_nucleotide` pour qu'elle prenne un nucléotide et renvoie la valeur entière du code encodé.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Décoder la valeur binaire en acide nucléique

Implémente `decode_nucleotide` pour qu'elle prenne la valeur entière du code encodé et renvoie le nucléotide.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Encoder une liste d'ADN

Implémente `encode` pour qu'elle prenne une liste de nucléotides et renvoie un tableau de bits des données encodées.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Décoder un tableau de bits d'ADN

Implémente `decode` pour qu'elle prenne un tableau de bits représentant de l'acide nucléique et renvoie les données décodées sous forme de liste de nucléotides.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
