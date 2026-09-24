# Вступ

Щоб створити екземпляр _класу_, ми викликаємо його _конструктор_ за допомогою оператора `new`.
Конструктор - це особливий різновид методу, мета якого - ініціалізувати щойно створений екземпляр.
Конструктори мають вигляд звичайних методів, але без типу повернення і з назвою, що збігається з назвою класу.

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

Як і звичайні методи, конструктори можуть мати параметри.
Параметри конструктора зазвичай зберігають у (приватних) полях, щоб звертатися до них пізніше, або використовують у якомусь одноразовому обчисленні.
Аргументи можна передавати конструкторам так само, як ми передаємо аргументи звичайним методам.

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
