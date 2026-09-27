# مقدمة

مثل لغات البرمجة الأخرى، توفّر Go أيضًا جملة `switch`.
جمل `switch` أسلوب أقصر لكتابة سلاسل `if ... else if` الطويلة.
لإنشاء جملة `switch`، نبدأ باستخدام الكلمة المفتاحية `switch` متبوعة بقيمة أو تعبير.
ثم نُعلن كل شرط من الشروط باستخدام الكلمة المفتاحية `case`.
يمكننا أيضًا إعلان حالة `default`، تُنفَّذ عندما لا يتحقق أيٌّ من شروط `case` السابقة:

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

من الأمور المثيرة للاهتمام في جمل `switch` أن القيمة بعد الكلمة المفتاحية `switch` يمكن حذفها، ويمكننا حينها وضع شروط منطقية لكل `case`:

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
