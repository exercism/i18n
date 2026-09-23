# Introduction

Créer une instance d'une _classe_ se fait en appelant son _constructeur_ à l'aide de l'opérateur `new`.
Un constructeur est un type particulier de méthode dont le but est d'initialiser une instance qui vient d'être créée.
Les constructeurs ressemblent à des méthodes ordinaires, mais sans type de retour et avec un nom qui correspond à celui de la classe.

```java
class Library {
    private int books;

    public Library() {
        // Initialize the books field
        this.books = 10;
    }
}

// This will call the constructor
var library = new Library();
```

Comme les méthodes ordinaires, les constructeurs peuvent prendre des paramètres.
Les paramètres d'un constructeur sont généralement stockés dans des champs (privés) pour être utilisés plus tard, ou bien servent à un calcul ponctuel.
On peut passer des arguments à un constructeur exactement comme on passe des arguments à une méthode ordinaire.

```java
class Building {
    private int numberOfStories;
    private int totalHeight;

    public Building(int numberOfStories, double storyHeight) {
        this.numberOfStories = numberOfStories;
        this.totalHeight = numberOfStories * storyHeight;
    }
}

// Call a constructor with two arguments
var largeBuilding = new Building(55, 6.2);
```
