# পরিচিতি

অন্য ভাষাগুলোর মতো Go-তেও একটি `switch` স্টেটমেন্ট আছে।
লম্বা `if ... else if` স্টেটমেন্ট লেখার একটি ছোট উপায় হলো switch স্টেটমেন্ট।
একটি switch বানাতে আমরা প্রথমে `switch` কিওয়ার্ড ব্যবহার করি, যার পরে থাকে একটি মান বা এক্সপ্রেশন।
এরপর `case` কিওয়ার্ড দিয়ে প্রতিটি শর্ত আলাদা করে লিখি।
আমরা একটি `default` কেসও দিতে পারি, যা আগের কোনো `case` শর্তের সাথে না মিললে চলে:

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

switch স্টেটমেন্ট নিয়ে একটি মজার ব্যাপার হলো, `switch` কিওয়ার্ডের পরের মানটি বাদ দেওয়া যায়, আর তখন প্রতিটি `case`-এ আমরা বুলিয়ান শর্ত ব্যবহার করতে পারি:

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
