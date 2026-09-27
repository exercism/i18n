# درباره

در Go، هر متغیر یک مقدار دارد.
اگر متغیری را اعلام کنید و به آن مقداری ندهید، آن متغیر به «مقدار صفر» نوع خودش تنظیم می‌شود.

انواع پایه، از جمله `bool`، انواع عددی و `string`، هرکدام یک مقدار صفر ثابت دارند:

| Type                   | Zero Value |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int، int8، int64 و غیره | `0`        |
| float32، float64       | `0`        |
| complex64، complex128  | `0+0i`     |
| string                 | `""`       |

انواعی که به داده‌های زیربنایی ارجاع می‌دهند، از جمله اشاره‌گرها، توابع، واسط‌ها، برش‌ها، کانال‌ها و نگاشت‌ها، مقدار صفرشان `nil` است.
با این حال، آرایه‌ها و ساختارها هرگز `nil` نیستند، چون داده را مستقیم در خود نگه می‌دارند، نه ارجاعی به آن.
هر عنصر یک آرایه و هر فیلد یک ساختار به مقدار صفر نوع خودش مقداردهی می‌شود.
برای مثال، `var a [3]int` آرایه‌ی `[0, 0, 0]` را می‌سازد.

## اعلام مقادیر صفر

`var` بدون مقدار اولیه، برای هر نوعی مقدار صفر را می‌دهد:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

برای ساختارها، لیترال ترکیبی `T{}` جایگزین دیگری است:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` اشاره‌گری به مقدار صفر هر نوعی برمی‌گرداند.
بیشتر با ساختارها استفاده می‌شود، هرچند برای انواع پایه هم کار می‌کند:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## چرا مقادیر صفر مهم‌اند

در Go، مقدار صفر نماینده‌ی یک وضعیت شروع طبیعی و مفید است.

یک `bool` به‌صورت پیش‌فرض `false` است که می‌تواند مانند یک پرچم عمل کند:

```go
var done bool // action not done yet
done = true   // action now done
```

یک عدد صحیح به‌صورت پیش‌فرض `0` است که می‌تواند مانند یک شمارنده عمل کند:

```go
var count int
count++ // 1
count++ // 2
```

در ساختارها، هر فیلد با مقدار صفر نوع خودش شروع می‌شود.
یک `Stack` که فقط یک فیلد `[]string` دارد، هنگام اعلام از قبل یک پشته‌ی خالی و آماده‌ی استفاده است.
چون `append` هنگام فراخوانی روی یک برش `nil` یک آرایه‌ی پشتیبان جدید تخصیص می‌دهد، نیازی به سازنده نیست:

```go
type Stack struct {
    items []string
}

func (s *Stack) Push(v string) {
    s.items = append(s.items, v)
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}

var s Stack
fmt.Println(s.IsEmpty()) // true
s.Push("a") // append allocates a new backing array
fmt.Println(s.IsEmpty()) // false
```

## کار با nil

بیشتر انواعی که مقدار صفرشان `nil` است، پیش از استفاده به مقداردهی نیاز دارند، وگرنه `panic` رخ می‌دهد.
برش `nil` یک استثناست: می‌توانید روی آن پیمایش کنید، به آن `append` کنید و آن را با خیال راحت به `len` و `cap` بدهید.

یک نگاشت را باید پیش از ذخیره‌ی یک مقدار مقداردهی کرد:

```go
var m map[string]int
m["key"] = 1 // panic
```

یک نگاشت معمولاً به دو روش مختلف مقداردهی می‌شود:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

پیش از استفاده از یک اشاره‌گر، آن را برای `nil` بررسی کنید:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

انواع پایه همیشه یک مقدار مشخص در خود دارند، پس مقایسه‌ی آن‌ها با `nil` یک خطای زمان کامپایل است:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
