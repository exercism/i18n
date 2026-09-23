# Instructions

Tu travailles au bureau municipal depuis un moment, et tu as développé une série d'outils qui accélèrent ton travail quotidien, par exemple pour remplir des formulaires.

Un nouveau collègue vient d'arriver, et tu t'es rendu compte que tes outils n'étaient peut-être pas très explicites.
Il y a beaucoup de conventions étranges dans ton bureau, comme le fait de toujours remplir les formulaires en majuscules et d'éviter de laisser des champs vides.

Pour commencer, tu décides d'ajouter des déclarations de type PHP pour que ton nouveau collègue puisse s'y mettre tout de suite et commencer à utiliser tes outils plus facilement.

## 1. Déclare les types de la classe `Address`

Ajoute une déclaration de type à chacune des propriétés déclarées de la classe `Address`.
Chaque propriété de classe doit être déclarée comme une _string_.

## 2. Déclare les types pour remplir le formulaire avec des valeurs vides

Ajoute une déclaration de type de paramètre et une déclaration de type de retour à la méthode `blanks` de la classe `Form`.
La méthode doit prendre en paramètre un entier correspondant à la longueur, et renvoyer une _string_ qui représente la ligne vide.

## 3. Déclare le type pour découper une valeur en lettres séparées

Ajoute une déclaration de type de paramètre et une déclaration de type de retour à la méthode `letters` de la classe `Form`.
La méthode doit prendre en paramètre une _string_ représentant des mots, et renvoyer un tableau de lettres.

## 4. Déclare le type pour vérifier si une valeur tient dans un formulaire

Ajoute des déclarations de type de paramètre et une déclaration de type de retour à la méthode `checkLength` de la classe `Form`.
La méthode doit prendre en paramètre une _string_ (un mot) et un entier correspondant à la longueur maximale, et renvoyer une valeur vrai ou faux.

## 5. Déclare le type pour mettre en forme une adresse dans le formulaire

Ajoute une déclaration de type de paramètre, en utilisant la classe `Address` mise à jour précédemment, ainsi qu'une déclaration de type de retour à la méthode `formatAddress` de la classe `Form`.
La méthode doit prendre en paramètre un `Address` et renvoyer une _string_ formatée.
