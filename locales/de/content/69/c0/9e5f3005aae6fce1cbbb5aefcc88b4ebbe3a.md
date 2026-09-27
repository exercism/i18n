# Einführung

Um eine Instanz einer _Klasse_ zu erzeugen, rufst du ihren _Konstruktor_ mit dem `new`-Operator auf.
Ein Konstruktor ist eine spezielle Art von Methode, deren Ziel es ist, eine neu erzeugte Instanz zu initialisieren.
Konstruktoren sehen aus wie normale Methoden, aber ohne Rückgabetyp und mit einem Namen, der dem Namen der Klasse entspricht.

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

Wie normale Methoden können Konstruktoren Parameter haben.
Die Parameter eines Konstruktors werden üblicherweise in (privaten) Feldern gespeichert, um später darauf zugreifen zu können, oder sie werden für eine einmalige Berechnung verwendet.
Argumente kannst du an Konstruktoren genauso übergeben wie an normale Methoden.

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
