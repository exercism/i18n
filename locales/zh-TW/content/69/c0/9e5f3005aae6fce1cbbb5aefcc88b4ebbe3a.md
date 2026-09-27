# 簡介

建立類別的實例，是透過`new`運算子呼叫它的建構子來完成。
建構子是一種特殊的方法，目的是初始化剛建立好的實例。
建構子看起來和一般方法沒什麼不同，但它沒有回傳型別，而且名稱必須和類別名稱相同。

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

和一般方法一樣，建構子也可以有參數。
建構子的參數通常會存成（私有的）欄位，方便之後取用，或是只用來做一次性的計算。
就像把引數傳給一般方法那樣，引數也可以傳給建構子。

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
