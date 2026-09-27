# পরিচিতি

[ইনডেক্সার](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) দিয়ে ইনডেক্সিং অপারেটর `[]` ব্যবহার করে একটি অবজেক্টের মান পাওয়া বা সেট করা যায়। একটি ইনডেক্সার একটি মাত্র আর্গুমেন্ট নেয়, আর এতে `get` এবং/অথবা `set` অংশ থাকতে পারে। ইনডেক্সারের `set` অংশে একটি বিশেষ `value` থাকে, যেটি হলো ইনডেক্সারে পাঠানো মানটি।

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap]
    {
        get { return times[lap]; }
        set { times[lap] = value; }
    }
}

var lapTimes = new LapTimes();

// Use the getter
Console.WriteLine(lapTimes[1]); // => 4

// Use the setter
lapTimes[2] = 5;
Console.WriteLine(lapTimes[2]); // => 5
```

ইনডেক্সারের `set` অংশটি বাদ দিলে আপনি একটি রিড-অনলি ইনডেক্সার পাবেন। শুধু পড়া যায় এমন একটি ইনডেক্সার আরও সংক্ষেপে ডিফাইন করতে এক্সপ্রেশন-বডি ব্যবহার করা যায়:

```csharp
class LapTimes
{
    private int[] times = new[] { 2, 4, 3, 8 };

    public int this[int lap] => times[lap];
}
```

ইনডেক্সারের প্যারামিটার অবশ্যই `int` হতে হবে না, এটি যেকোনো টাইপের হতে পারে:

```csharp
class LapTimes
{
    // ...
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```

ইনডেক্সার ওভারলোডও করা যায়:

```csharp
class LapTimes
{
    public int this[int lap] => times[lap];
    public int this[string lap] => times[Convert.ToInt32(lap)];
}
```
