# 简介

要创建_类_的实例，需要通过`new`运算符调用它的_构造函数_。
构造函数是一种特殊的方法，它的作用是初始化新创建的实例。
构造函数看起来和普通方法一样，但没有返回类型，且名称要与类名相同。

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

和普通方法一样，构造函数也可以有形参。
构造函数的形参通常会保存为（私有）字段，以便之后访问，或者只用于某一次性的计算。
实参可以传给构造函数，就像把实参传给普通方法一样。

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
