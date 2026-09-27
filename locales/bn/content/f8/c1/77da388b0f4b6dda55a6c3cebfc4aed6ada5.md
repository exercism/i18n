# নির্দেশনা

আপনি কর্পোরেট গুপ্তচরবৃত্তির বিরুদ্ধে লড়াই করা একটি টাস্ক ফোর্সের অংশ। Shady Company X-এ আপনার একজন গোপন তথ্যদাতা আছেন, যাকে আপনি সন্দেহ করেন তার প্রতিযোগীদের কাছ থেকে গোপন তথ্য চুরি করছে।

আপনার তথ্যদাতা, এজেন্ট এক্স, একজন Elixir ডেভেলপার। তিনি তাঁর কোডে গোপন বার্তা এনকোড করছেন।

তাঁর গোপন বার্তাগুলো ডিকোড করতে হলে:

- যে ক্রমে ডিফাইন করা হয়েছে, সেই ক্রমে সব ফাংশন (পাবলিক ও প্রাইভেট) নিন।
- প্রতিটি ফাংশনের জন্য তার নাম থেকে প্রথম `n` ক্যারেক্টার নিন, যেখানে `n` হলো ফাংশনটির অ্যারিটি।

## 1. কোডকে ডেটায় রূপান্তর করুন

`TopSecret.to_ast/1` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি Elixir কোডসহ একটি স্ট্রিং নেবে এবং তার AST রিটার্ন করবে।

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. একটি একক AST নোড পার্স করুন

`TopSecret.decode_secret_message_part/2` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি একটি AST নোড এবং গোপন বার্তার জন্য একটি অ্যাকুমুলেটর (একটি অ্যারে) নেবে। এটি একটি টাপল রিটার্ন করবে, যার প্রথম এলিমেন্ট হবে অপরিবর্তিত AST নোডটি এবং দ্বিতীয় এলিমেন্ট হবে অ্যাকুমুলেটরটি।

যদি AST নোডের অপারেশন ফাংশন ডিফাইন করা বোঝায় (`def` বা `defp`), তাহলে ফাংশনের নামটি (স্ট্রিংয়ে পরিবর্তিত) অ্যাকুমুলেটরের সামনে যোগ করুন। যদি অপারেশনটি অন্য কিছু হয়, তাহলে অ্যাকুমুলেটরটি অপরিবর্তিত রিটার্ন করুন।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

এই ফাংশনটিকে পুরো AST যাচাই করার জন্য কোনো রিকার্সিভ কল করতে হবে না, শুধু দেওয়া নোডটিই যথেষ্ট। শেষ ধাপে আমরা বিল্ট-ইন টুল দিয়ে পুরো AST ট্রাভার্স করব।

## 3. ফাংশন ডেফিনিশন থেকে গোপন বার্তার অংশ ডিকোড করুন

`TopSecret.decode_secret_message_part/2` ফাংশনটি সম্প্রসারিত করুন। যদি AST নোডের অপারেশন ফাংশন ডিফাইন করা বোঝায়, তাহলে পুরো ফাংশনের নাম রিটার্ন করবেন না। বরং ফাংশনটির অ্যারিটি পরীক্ষা করুন। তারপর নাম থেকে শুধু প্রথম `n` ক্যারেক্টার রিটার্ন করুন, যেখানে `n` হলো অ্যারিটি।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. গার্ডযুক্ত ফাংশনের জন্য ডিকোডিং ঠিক করুন

`TopSecret.decode_secret_message_part/2` ফাংশনটি সম্প্রসারিত করুন। গার্ড ব্যবহার করা ফাংশন ডেফিনিশনের জন্য ফাংশনের নাম ও অ্যারিটি যেন সঠিকভাবে শনাক্ত হয়, তা নিশ্চিত করুন।

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. সম্পূর্ণ গোপন বার্তা ডিকোড করুন

`TopSecret.decode_secret_message/1` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি Elixir কোডসহ একটি স্ট্রিং নেবে এবং কোডে পাওয়া সব ফাংশন ডেফিনিশন থেকে ডিকোড করা গোপন বার্তাটি একটি স্ট্রিং হিসেবে রিটার্ন করবে। আগের ধাপগুলোতে ডিফাইন করা ফাংশনগুলো যেন পুনরায় ব্যবহার করেন, তা নিশ্চিত করুন।

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
