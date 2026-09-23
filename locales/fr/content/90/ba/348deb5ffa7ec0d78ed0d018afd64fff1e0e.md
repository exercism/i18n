# Indices

## 1. Identifie l'application qui a émis un _log_

- Le mot-clé `range` permet de parcourir les runes d'une _string_ donnée.
- On peut comparer des runes à d'autres runes à l'aide d'une instruction `if`.
- Un caractère placé entre apostrophes est une `rune` en Go.

## 2. Répare les _logs_ corrompus

- On peut utiliser la concaténation de _strings_ pour construire la ligne de _log_ modifiée rune par rune.
- Pour que cette concaténation fonctionne, il peut être nécessaire de convertir chaque `rune` en _string_ au préalable.
- On peut convertir la rune `r` en `string` avec `string(r)`.

## 3. Détermine si un _log_ peut être affiché

- Les runes peuvent faire 1, 2, 3 ou 4 octets, donc la fonction `len` intégrée peut ne pas refléter précisément le nombre de caractères d'une _string_.
