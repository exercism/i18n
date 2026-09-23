# Instructions

Dans cet exercice, tu vas simuler un système informatique à base de fenêtres.
Tu vas créer des fenêtres que l'on peut déplacer et redimensionner.
L'image suivante est représentative des valeurs avec lesquelles tu vas travailler ci-dessous.

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 Pour mettre en pratique toute l'étendue de tes compétences en JavaScript, **essaie de résoudre les tâches 1 et 2 avec la syntaxe des prototypes et les tâches restantes avec la syntaxe des classes**.

## 1. Définis Size pour stocker les dimensions de la fenêtre

Définis une classe (fonction constructrice) nommée `Size`.
Elle doit avoir deux champs `width` et `height` qui stockent les dimensions actuelles de la fenêtre.
La fonction constructrice doit accepter des valeurs initiales pour ces champs.
La largeur est fournie comme premier paramètre, la hauteur comme second.
Les valeurs par défaut de la largeur et de la hauteur doivent être `80` et `60`, respectivement.

Définis en plus une méthode `resize(newWidth, newHeight)` qui prend une nouvelle largeur et une nouvelle hauteur comme paramètres et modifie les champs pour refléter la nouvelle taille.

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. Définis Position pour stocker la position d'une fenêtre

Définis une classe (fonction constructrice) nommée `Position` avec deux champs, `x` et `y`, qui stockent respectivement la position horizontale et verticale actuelle du coin supérieur gauche de la fenêtre.
La fonction constructrice doit accepter des valeurs initiales pour ces champs.
La valeur de `x` est fournie comme premier paramètre, celle de `y` comme second.
La valeur par défaut doit être `0` pour les deux champs.

La position (0, 0) correspond au coin supérieur gauche de l'écran, les valeurs de `x` augmentant quand on se déplace vers la droite et celles de `y` quand on se déplace vers le bas.

Définis aussi une méthode `move(newX, newY)` qui prend de nouveaux paramètres x et y et modifie les propriétés pour refléter la nouvelle position.

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. Définis une classe ProgramWindow

Définis une classe `ProgramWindow` avec les champs suivants :

- `screenSize` : contient une valeur fixe de type `Size` avec `width` à 800 et `height` à 600
- `size` : contient une valeur de type `Size`, dont la valeur initiale est celle par défaut de l'instance de `Size`
- `position` : contient une valeur de type `Position`, dont la valeur initiale est celle par défaut de l'instance de `Position`

Quand la fenêtre est ouverte (créée), elle a toujours la taille et la position par défaut au départ.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Remarque : le nom `ProgramWindow` est utilisé à la place de `Window` pour différencier la classe de la classe `Window` native qui existe dans les environnements de navigateur.

## 4. Ajoute une méthode pour redimensionner la fenêtre

La classe `ProgramWindow` doit inclure une méthode `resize`.
Elle doit accepter un paramètre de type `Size` en entrée et tenter de redimensionner la fenêtre à la taille spécifiée.

Cependant, la nouvelle taille ne peut pas dépasser certaines limites.

- La hauteur ou la largeur minimale autorisée est de 1.
  Les hauteurs ou largeurs demandées inférieures à 1 seront ramenées à 1.
- La hauteur et la largeur maximales dépendent de la position actuelle de la fenêtre : les bords de la fenêtre ne peuvent pas dépasser les bords de l'écran.
  Les valeurs supérieures à ces limites seront ramenées à la plus grande taille possible.
  Par exemple, si la position de la fenêtre est `x` = 400, `y` = 300 et qu'un redimensionnement à `height` = 400, `width` = 300 est demandé, alors la fenêtre sera redimensionnée à `height` = 300, `width` = 300, car l'écran n'est pas assez grand dans la direction `y` pour satisfaire entièrement la demande.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Ajoute une méthode pour déplacer la fenêtre

En plus de la fonctionnalité de redimensionnement, la classe `ProgramWindow` doit aussi inclure une méthode `move`.
Elle doit accepter un paramètre de type `Position` en entrée.
La méthode `move` est similaire à `resize`, mais elle ajuste la _position_ de la fenêtre à la valeur demandée, plutôt que la taille.

Comme pour `resize`, la nouvelle position ne peut pas dépasser certaines limites.

- La plus petite position est 0 pour `x` comme pour `y`.
- La position maximale dans l'une ou l'autre direction dépend de la taille actuelle de la fenêtre.
  Les bords ne peuvent pas dépasser les bords de l'écran.
  Les valeurs supérieures à ces limites seront ramenées à la plus grande taille possible.
  Par exemple, si la taille de la fenêtre est à `x` = 250, `y` = 100 et qu'un déplacement à `x` = 600, `y` = 200 est demandé, alors la fenêtre sera déplacée à `x` = 550, `y` = 200, car l'écran n'est pas assez grand dans la direction `x` pour satisfaire entièrement la demande.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Modifie une fenêtre de programme

Implémente une fonction `changeWindow` qui accepte une instance de `ProgramWindow` en entrée et modifie la fenêtre à la taille et à la position spécifiées.
La fonction doit renvoyer l'instance de `ProgramWindow` qui a été passée, une fois les modifications appliquées.

La fenêtre doit avoir une largeur de 400, une hauteur de 300 et être positionnée à x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```
