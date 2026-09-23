# Instructions

Ton association de quartier te demande de gérer les inscriptions aux parcelles du jardin. L'état est stocké dans deux variables dynamiques :

- `registrations` : un vecteur de tuples `plot` actuellement attribués à une personne.
- `next-id` : l'entier à utiliser pour la prochaine inscription.

Le tuple `plot` prend deux emplacements :

| emplacement     | type    |
| --------------- | ------- |
| `id`            | entier  |
| `registered-to` | _string_ |

## 1. Ouvre le jardin et liste ses inscriptions

Définis `open-garden` pour initialiser les variables dynamiques : un vecteur vide pour `registrations`, et `1` pour `next-id`. Définis ensuite `list-registrations` pour renvoyer le vecteur actuel de parcelles.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Enregistre une parcelle

Définis `register` pour prendre un nom sur la pile, construire un nouveau `plot` avec l'id disponible suivant, l'ajouter au vecteur `registrations`, incrémenter `next-id` de un, et renvoyer le nouveau _plot_.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Les identifiants de parcelle doivent être uniques et croître même après une libération : `next-id` ne doit jamais réutiliser de valeur.

## 3. Libère une parcelle

Définis `release` pour prendre un identifiant et supprimer l'entrée correspondante de `registrations`. Libérer un identifiant inconnu ne fait rien.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Récupère une parcelle enregistrée

Définis `get-registration` pour prendre un identifiant et renvoyer la parcelle correspondante, ou le symbole `not-found` si aucune parcelle ne porte cet identifiant.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Trouve des parcelles par nom

Définis `find-by-name` pour prendre un nom et renvoyer un vecteur de toutes les parcelles actuellement enregistrées à cette personne.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
