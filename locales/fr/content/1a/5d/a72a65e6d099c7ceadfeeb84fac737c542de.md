# Indices

## Général

- Le nombre d'oiseaux par jour est stocké dans un [champ][fields] nommé `birdsPerDay`.
- Le nombre d'oiseaux par jour est un tableau qui contient exactement 7 entiers.

## 1. Vérifie quels étaient les comptages la semaine dernière

- Comme cette méthode ne dépend _pas_ du comptage de la semaine en cours, elle est définie comme une [méthode `static`][static-members].
- Il existe [plusieurs façons de définir un tableau][single-dimensional-arrays].

## 2. Vérifie combien d'oiseaux sont venus aujourd'hui

- Rappelle-toi que les comptages sont ordonnés par jour, du plus ancien au plus récent, le dernier élément représentant aujourd'hui.
- On peut accéder au dernier élément soit en utilisant son indice (fixe), en pensant à commencer à compter à partir de zéro, soit en calculant son indice à partir de la [taille du tableau][array-length].

## 3. Incrémente le comptage d'aujourd'hui

- Affecte à l'élément qui représente le comptage d'aujourd'hui la valeur du comptage d'aujourd'hui plus 1.

## 4. Vérifie s'il y a eu un jour sans oiseaux visiteurs

- La classe `Array` possède une [méthode intégrée][array-indexof] qui renvoie le premier indice où l'élément est trouvé, ou -1 si aucun élément correspondant n'a été trouvé.

## 5. Calcule le nombre d'oiseaux visiteurs pour les premiers jours

- Une variable peut servir à stocker le nombre d'oiseaux visiteurs.
- On peut parcourir le tableau à l'aide d'une [boucle `for`][for-statement].
- La variable peut être mise à jour à l'intérieur de la boucle.
- Rappelle-toi : les tableaux sont indexés à partir de `0`.

## 6. Calcule le nombre de jours bien remplis

- Une variable peut servir à stocker le nombre de jours bien remplis.
- On peut parcourir le tableau à l'aide d'une [boucle `foreach`][array-foreach].
- La variable peut être mise à jour à l'intérieur de la boucle.
- Une [instruction conditionnelle][if-statement] peut être utilisée à l'intérieur de la boucle.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
