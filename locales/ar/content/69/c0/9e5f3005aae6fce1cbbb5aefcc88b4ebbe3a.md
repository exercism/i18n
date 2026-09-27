# مقدمة

نُنشئ نسخة من _الصنف_ باستدعاء _مُنشئه_ عبر العامل `new`.
المُنشئ نوع خاص من الطُرق، هدفه تهيئة نسخة أُنشئت حديثًا.
تشبه المُنشئات الطُرق العادية، لكنها تأتي دون نوع إرجاع وباسم يطابق اسم الصنف.

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

ومثل الطُرق العادية، يمكن للمُنشئات أن تحتوي على معاملات.
عادةً ما تُخزَّن معاملات المُنشئ في حقول (خاصة) للرجوع إليها لاحقًا، أو تُستخدم في عملية حسابية لمرة واحدة.
ويمكن تمرير الوسائط إلى المُنشئات كما نمرّر الوسائط إلى الطُرق العادية.

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
