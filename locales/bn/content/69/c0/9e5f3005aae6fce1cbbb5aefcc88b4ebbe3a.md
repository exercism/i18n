# পরিচিতি

একটি _ক্লাস_-এর ইনস্ট্যান্স তৈরি করতে হলে `new` অপারেটরের সাহায্যে তার _কনস্ট্রাক্টর_ কল করতে হয়।
কনস্ট্রাক্টর হলো এক বিশেষ ধরনের মেথড, যার উদ্দেশ্য হলো নতুন তৈরি হওয়া একটি ইনস্ট্যান্স ইনিশিয়ালাইজ করা।
কনস্ট্রাক্টর দেখতে সাধারণ মেথডের মতোই, তবে এতে কোনো রিটার্ন টাইপ থাকে না এবং এর নাম ক্লাসের নামের সাথে মিলে যায়।

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

সাধারণ মেথডের মতোই কনস্ট্রাক্টরেও প্যারামিটার থাকতে পারে।
কনস্ট্রাক্টরের প্যারামিটার সাধারণত পরে ব্যবহারের জন্য (প্রাইভেট) ফিল্ড হিসেবে সংরক্ষণ করা হয়, নয়তো কোনো একবারের হিসাব-নিকাশে ব্যবহার করা হয়।
সাধারণ মেথডে আর্গুমেন্ট পাঠানোর মতোই কনস্ট্রাক্টরেও আর্গুমেন্ট পাঠানো যায়।

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
