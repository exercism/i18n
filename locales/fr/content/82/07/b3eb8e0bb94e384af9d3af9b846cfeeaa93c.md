# Ajout aux instructions

## Format de sortie

La méthode `solve()` doit renvoyer un objet avec les propriétés suivantes :

- `moves` : le nombre d'actions à effectuer sur les seaux pour atteindre l'objectif (cela comprend le remplissage du seau de départ),
- `goalBucket` : le nom du seau qui a atteint la quantité visée,
- `otherBucket` : la quantité contenue dans l'autre seau.

Exemple :

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
