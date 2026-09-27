# ভূমিকা

ল্যাম্বডা হলো নামহীন ফাংশন। এগুলো মূলত ফাংশন লেখার একটি সংক্ষিপ্ত রূপ।

ল্যাম্বডা হতে পারে এক্সপ্রেশন ল্যাম্বডা বা স্টেটমেন্ট ল্যাম্বডা:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## ল্যাম্বডা ডিক্লেয়ার করা

যে ল্যাম্বডাগুলো কোনো মান রিটার্ন করে না (`void`), সেগুলোকে `Action<T>` ডেলিগেট টাইপে রূপান্তর করা যায়।

```csharp
// Statement lambda
Action = () =>
{
    Console.WriteLine("No parameters");
    Console.WriteLine("Still nice, right?");
}

// Expression lambda
Action<int> = (x) => Console.WriteLine(x);
```

যে ল্যাম্বডাগুলো `void` ছাড়া অন্য কোনো মান রিটার্ন করে, সেগুলোকে `Func<T>` ডেলিগেট টাইপে রূপান্তর করা যায়।

```csharp
// Expression lambda
Func<int, int> = (x) => x * x;

// Statement lambda
Func<string, string, bool> = (left, right) =>
{
    var equal = left == right;
    return equal;
}
```

কোনো ল্যাম্বডার যদি কেবল একটি প্যারামিটার থাকে, তাহলে প্যারামিটারের চারপাশের বন্ধনী বাদ দেওয়া যায়:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## ল্যাম্বডার আর্গুমেন্ট

ল্যাম্বডার মূল ব্যবহার হলো সেগুলোকে অন্য মেথডের আর্গুমেন্ট হিসেবে পাঠানো, যেমন বেশিরভাগ LINQ মেথড:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
