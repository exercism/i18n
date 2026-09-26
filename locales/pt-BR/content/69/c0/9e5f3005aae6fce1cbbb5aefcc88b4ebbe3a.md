# Introdução

Você cria uma instância de uma _classe_ chamando o seu _construtor_ por meio do operador `new`.
Um construtor é um tipo especial de método cujo objetivo é inicializar uma instância recém-criada.
Os construtores se parecem com métodos comuns, mas não têm tipo de retorno e têm um nome igual ao nome da classe.

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

Assim como os métodos comuns, os construtores podem ter parâmetros.
Os parâmetros do construtor geralmente são guardados em campos (privados) para serem acessados depois, ou então usados em algum cálculo pontual.
Você pode passar argumentos para construtores assim como passa argumentos para métodos comuns.

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
