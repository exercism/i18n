# Introdução

Criar uma instância de uma _classe_ faz-se chamando o seu _construtor_ através do operador `new`.
Um construtor é um tipo especial de método cujo objetivo é inicializar uma instância recém-criada.
Os construtores parecem-se com métodos normais, mas sem tipo de retorno e com um nome igual ao da classe.

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

Tal como os métodos normais, os construtores podem ter parâmetros.
Os parâmetros do construtor são normalmente guardados em campos (privados) para serem acedidos mais tarde, ou então usados num cálculo pontual.
Podem passar-se argumentos aos construtores tal como se passam argumentos a métodos normais.

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
