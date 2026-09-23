# Indices

## Général

- Essaie de décomposer un problème en un cas de base et un cas récursif. Par exemple, imaginons qu'on veuille compter combien de cookies se trouvent dans le bocal à cookies avec une approche récursive. Le cas de base, c'est un bocal vide : il ne contient aucun cookie. Si le bocal n'est pas vide, alors le nombre de cookies dans le bocal est égal à un cookie plus le nombre de cookies dans le bocal après en avoir retiré un.

## 1. Définis les types de pizza et les options

- Le type `Pizza` est un type récursif, dont les cas `ExtraSauce` et `ExtraToppings` contiennent eux-mêmes une `Pizza`.

## 2. Calcule le prix d'une pizza

- Pour gérer le fait que le type `Pizza` soit un type récursif, définis une fonction récursive.

## 3. Calcule le prix d'une commande

- On peut faire du filtrage par motif sur la longueur exacte du tableau pour déterminer si des frais supplémentaires doivent s'appliquer.
- Utilise la récursion terminale pour éviter de consommer trop de mémoire lors du calcul du prix d'une commande.
