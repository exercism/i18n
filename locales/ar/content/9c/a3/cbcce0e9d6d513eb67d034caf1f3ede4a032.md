# نبذة

في Go، لكل متغير قيمة.
عند الإعلان عن متغير دون إسناد قيمة إليه، تُضبط قيمته على القيمة الصفرية الخاصة بنوعه.

الأنواع الأساسية، بما فيها `bool` والأنواع العددية و`string`، لكل منها قيمة صفرية ثابتة:

| النوع                  | القيمة الصفرية |
| ---------------------- | -------------- |
| bool                   | `false`        |
| int, int8, int64, إلخ. | `0`            |
| float32, float64       | `0`            |
| complex64, complex128  | `0+0i`         |
| string                 | `""`           |

الأنواع التي تشير إلى بيانات أساسية، بما فيها المؤشرات والدوال والواجهات والشرائح والقنوات والخرائط، لكل منها قيمة صفرية هي `nil`.
لكن المصفوفات والبنى لا تكون `nil` أبدًا لأنها تحتفظ بالبيانات مباشرة، لا بمرجع إليها.
يُهيّأ كل عنصر من عناصر المصفوفة وكل حقل من حقول البنية على القيمة الصفرية لنوعه الخاص.
على سبيل المثال، يُنشئ `var a [3]int` المصفوفة `[0, 0, 0]`.

## الإعلان عن القيم الصفرية

يمنح `var` دون قيمة ابتدائية القيمة الصفرية لأي نوع:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

بالنسبة إلى البنى، تُعدّ الحرفية المركبة `T{}` بديلًا:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

تُرجع `new(T)` مؤشرًا إلى القيمة الصفرية لأي نوع.
وهي شائعة الاستخدام مع البنى، مع أنها تعمل مع الأنواع الأساسية أيضًا:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## أهمية القيم الصفرية

في Go، تمثّل القيمة الصفرية حالة بداية طبيعية ومفيدة.

القيمة الافتراضية لـ `bool` هي `false`، وهي تصلح كعلامة:

```go
var done bool // action not done yet
done = true   // action now done
```

القيمة الافتراضية للعدد الصحيح هي `0`، وهو يصلح كعدّاد:

```go
var count int
count++ // 1
count++ // 2
```

بالنسبة إلى البنى، يبدأ كل حقل عند القيمة الصفرية لنوعه الخاص.
الصنف `Stack` الذي يضم حقلًا واحدًا من النوع `[]string` يكون مكدسًا فارغًا صالحًا للعمل فور الإعلان عنه.
ولأن `append` تخصّص مصفوفة داعمة جديدة عند استدعائها على شريحة تساوي `nil`، لا حاجة إلى دالة بناء:

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

## التعامل مع `nil`

معظم الأنواع التي تكون قيمتها الصفرية `nil` تحتاج إلى تهيئة قبل الاستخدام، وإلا فإنها تُسبّب `panic`.
الشريحة التي تساوي `nil` هي الاستثناء: يمكنك المرور عليها بـ `range`، والإضافة إليها بـ `append`، وتمريرها إلى `len` و`cap` بأمان.

ينبغي تهيئة الخريطة قبل تخزين قيمة فيها:

```go
var m map[string]int
m["key"] = 1 // panic
```

غالبًا ما تُهيّأ الخريطة بطريقتين مختلفتين:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

تحقّق من كون المؤشر `nil` قبل استخدامه:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

تحتفظ الأنواع الأساسية دائمًا بقيمة محددة، لذا فإن مقارنتها بـ `nil` خطأ في التصريف:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
