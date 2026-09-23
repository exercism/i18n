# Ajout aux instructions

## Implémentation

L'argument `diagram` commence chaque ligne par un `\n`.
Cela permet aux littéraux de chaînes brutes de Go de présenter les diagrammes du code source de façon agréable, sous la forme de deux lignes alignées à gauche.
Par exemple, le test peut contenir ce qui suit : 

```go
        diagram := `
VVCCGG
VVCCGG`
```

Si l'argument `children` vaut `nil`, utilise la liste d'enfants définie dans les instructions ci-dessus.
S'il ne vaut pas `nil`, utilise la valeur fournie.
