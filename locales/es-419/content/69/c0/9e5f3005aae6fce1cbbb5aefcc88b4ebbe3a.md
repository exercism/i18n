# Introducción

Crear una instancia de una _clase_ se hace llamando a su _constructor_ a través del operador `new`.
Un constructor es un tipo especial de método cuyo objetivo es inicializar una instancia recién creada.
Los constructores se parecen a los métodos normales, pero sin un tipo de retorno y con un nombre que coincide con el nombre de la clase.

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

Al igual que los métodos normales, los constructores pueden tener parámetros.
Los parámetros del constructor normalmente se guardan como campos (privados) para acceder a ellos más tarde, o bien se usan en algún cálculo puntual.
Se pueden pasar argumentos a los constructores igual que se pasan argumentos a los métodos normales.

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
