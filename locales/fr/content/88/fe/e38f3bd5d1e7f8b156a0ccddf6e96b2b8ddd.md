# Hints

## Général

## 1. Achète une voiture radiocommandée toute neuve

- [Cette page montre comment créer une nouvelle instance d'une classe][creating-objects].

## 2. Affiche la distance parcourue

- Garde une trace de la distance parcourue dans un [champ][fields].
- Réfléchis à la visibilité à utiliser pour le champ (faut-il l'utiliser en dehors de la classe ?).
- Pense à utiliser [l'interpolation de _string_][string-interpolation] pour formater la _string_ à renvoyer.

## 3. Affiche le pourcentage de batterie

- Garde une trace de la charge initiale de la batterie dans un [champ][fields].
- Initialise le champ à une valeur spécifique qui correspond à la charge initiale attendue de la batterie.
- Réfléchis à la visibilité à utiliser pour le champ (faut-il l'utiliser en dehors de la classe ?).
- Pense à utiliser [l'interpolation de _string_][string-interpolation] pour formater la _string_ à renvoyer.

## 4. Mets à jour le nombre de mètres parcourus quand tu conduis

- Mets à jour le champ qui représente la distance parcourue.

## 5. Mets à jour le pourcentage de batterie quand tu conduis

- Mets à jour le champ qui représente le pourcentage de batterie.

## 6. Empêche la conduite quand la batterie est déchargée

- Ajoute une instruction conditionnelle pour ne mettre à jour la distance et la batterie que si la batterie n'est pas déjà déchargée.
- Ajoute une instruction conditionnelle pour afficher le message de batterie vide si la batterie est déchargée.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
