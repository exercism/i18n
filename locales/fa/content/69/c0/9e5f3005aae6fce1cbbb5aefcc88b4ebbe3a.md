# مقدمه

برای ساختن یک نمونه از یک «کلاس»، «سازنده»ی آن را با عملگر `new` فراخوانی می‌کنید.
سازنده نوعی ویژه از متد است که هدفش مقداردهی اولیه به نمونه‌ای تازه‌ساخته‌شده است.
سازنده‌ها شبیه متدهای معمولی‌اند، اما نوع بازگشتی ندارند و اسمشان با اسم کلاس یکی است.

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

مثل متدهای معمولی، سازنده‌ها می‌توانند پارامتر داشته باشند.
پارامترهای سازنده معمولاً به شکل فیلدهای (`private`) ذخیره می‌شوند تا بعداً به آن‌ها دسترسی پیدا شود، یا در یک محاسبه‌ی یک‌باره به کار می‌روند.
می‌توان آرگومان‌ها را هم، دقیقاً مثل متدهای معمولی، به سازنده‌ها فرستاد.

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
