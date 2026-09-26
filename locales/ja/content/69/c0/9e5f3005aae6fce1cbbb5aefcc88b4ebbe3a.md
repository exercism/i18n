# はじめに

_クラス_のインスタンスを作るには、`new`演算子でその_コンストラクター_を呼び出します。コンストラクターは、新しく作られたインスタンスを初期化することを目的とした、特別な種類のメソッドです。コンストラクターは普通のメソッドと似ていますが、戻り値の型がなく、名前がクラス名と一致します。

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

普通のメソッドと同じように、コンストラクターも仮引数を持てます。コンストラクターの仮引数は、後で使うために（privateな）フィールドとして保存するのが普通です。そうでなければ、一度きりの計算に使われます。普通のメソッドに引数を渡すのと同じように、コンストラクターにも引数を渡せます。

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
