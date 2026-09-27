# مقدمه

Go هم مانند زبان‌های دیگر، دستور `switch` را در اختیار شما قرار می‌دهد.
دستور `switch` روشی کوتاه‌تر برای نوشتن دستورهای طولانی `if ... else if` است.
برای ساختن یک `switch`، ابتدا از کلیدواژه‌ی `switch` استفاده می‌کنیم و بعد از آن یک مقدار یا عبارت می‌آوریم.
سپس هر یک از شرط‌ها را با کلیدواژه‌ی `case` اعلام می‌کنیم.
همچنین می‌توانیم یک حالت `default` تعریف کنیم که وقتی هیچ‌یک از شرط‌های `case` پیشین برقرار نباشد، اجرا می‌شود:

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

یک نکته‌ی جالب درباره‌ی دستور `switch` این است که می‌توان مقدار بعد از کلیدواژه‌ی `switch` را حذف کرد و برای هر `case` یک شرط «منطقی» نوشت:

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
