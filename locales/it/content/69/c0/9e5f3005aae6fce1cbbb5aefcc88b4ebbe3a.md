# Introduzione

Per creare un'istanza di una _classe_ si chiama il suo _costruttore_ tramite l'operatore `new`.
Un costruttore è un tipo speciale di metodo il cui scopo è inizializzare un'istanza appena creata.
I costruttori sono simili ai metodi normali, ma non hanno un tipo di ritorno e il loro nome coincide con quello della classe.

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

Come i metodi normali, i costruttori possono avere parametri.
Di solito i parametri del costruttore vengono memorizzati in campi (privati) a cui accedere in seguito, oppure usati in qualche calcolo una tantum.
Gli argomenti possono essere passati ai costruttori proprio come si passano gli argomenti ai metodi normali.

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
