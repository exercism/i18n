# Bevezetés

Egy _osztály_ példányát úgy hozod létre, hogy meghívod a _konstruktorát_ a `new` operátoron keresztül.
A konstruktor egy különleges metódus, amelynek a célja, hogy inicializálja az újonnan létrehozott példányt.
A konstruktorok úgy néznek ki, mint a hagyományos metódusok, de nincs visszatérési típusuk, és a nevük megegyezik az osztály nevével.

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

A hagyományos metódusokhoz hasonlóan a konstruktoroknak is lehetnek paramétereik.
A konstruktor paramétereit általában (privát) mezőként tároljuk, hogy később elérhessük őket, vagy egy egyszeri számításban használjuk fel.
A konstruktoroknak ugyanúgy adhatsz át argumentumokat, ahogy a hagyományos metódusoknak is.

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
