# Ajout aux instructions

## Format de la grille

La grille est représentée par une _string_ terminée par un caractère nul, avec un caractère de saut de ligne à la fin de chaque ligne.

## Registres

| Registre | Utilisation  | Type    | Description                                                                       |
| -------- | ------------ | ------- | --------------------------------------------------------------------------------- |
| `$a0`    | entrée       | adresse | _string_ d’entrée terminée par un caractère nul                                    |
| `$a1`    | entrée/sortie | adresse | _string_ de résultat terminée par un caractère nul, vide si les dimensions de la grille sont invalides |
| `$v0`    | sortie       | entier  | statut de la grille (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`  | temporaire   | quelconque | pour le stockage temporaire                                                    |
