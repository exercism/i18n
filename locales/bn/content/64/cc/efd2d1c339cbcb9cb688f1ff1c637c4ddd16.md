# ভূমিকা

C#-এ একটি টাপল হলো একটি ডেটা স্ট্রাকচার, যা ডেটা গুছিয়ে রাখে এবং যেকোনো টাইপের দুই বা তার বেশি ফিল্ড ধারণ করে।

সাধারণত ২ বা তার বেশি এক্সপ্রেশন কমা দিয়ে আলাদা করে একটি বন্ধনীর ভিতরে রেখে একটি টাপল তৈরি করা হয়।

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

টাপল অ্যাসাইনমেন্ট ও ইনিশিয়ালাইজেশন অপারেশনে, রিটার্ন ভ্যালু হিসেবে বা মেথড আর্গুমেন্ট হিসেবে ব্যবহার করা যায়।

ডট সিনট্যাক্স দিয়ে ফিল্ডগুলো বের করা হয়। ডিফল্টভাবে প্রথম ফিল্ডটি `Item1`, দ্বিতীয়টি `Item2`, এভাবেই চলতে থাকে। ডিফল্ট ছাড়া অন্য নাম নিচে আলোচনা করা হয়েছে।

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

`Item1` ইত্যাদি ফিল্ডের নাম দিয়ে পড়ার উপযোগী কোড লেখা যায় না। নিচের কোডে টাপলের ফিল্ডের নাম দেওয়ার ২টি উপায় দেখানো হয়েছে। আরও লক্ষ্য করুন, নিচের কোডে টাপলের সাথে `var` ব্যবহার করা যায় এবং টাইপ ইনফার করা যায়। নামযুক্ত কিংবা নামহীন ফিল্ডযুক্ত টাপলের ক্ষেত্রেও এটি সমানভাবে কাজ করে।

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
