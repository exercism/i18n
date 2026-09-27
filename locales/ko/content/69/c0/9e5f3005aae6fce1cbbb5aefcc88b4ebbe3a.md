# 소개

_클래스_의 인스턴스를 만들려면 `new` 연산자를 통해 _생성자_를 호출해요.
생성자는 새로 만들어진 인스턴스를 초기화하는 것을 목표로 하는 특별한 종류의 메서드예요.
생성자는 일반 메서드처럼 생겼지만, 반환 타입이 없고 이름이 클래스 이름과 같아요.

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

일반 메서드와 마찬가지로 생성자도 매개변수를 가질 수 있어요.
생성자의 매개변수는 보통 나중에 접근할 수 있도록 (private) 필드에 저장하거나, 한 번만 쓰이는 계산에 사용해요.
일반 메서드에 인자를 전달하듯이 생성자에도 인자를 전달할 수 있어요.

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
