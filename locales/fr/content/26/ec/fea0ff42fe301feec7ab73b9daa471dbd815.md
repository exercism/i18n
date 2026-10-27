# Indices

## Général

- Dans le type `Node` fourni, `left : Tree ?? Empty` déclare un champ dont la valeur par défaut est `Empty`.
  Tu peux omettre ce champ lors de la construction d'un nœud, et sa lecture renvoie quand même un `Tree`.
  Cela diffère d'un champ optionnel déclaré avec `?:`, dont il faut vérifier la présence.
