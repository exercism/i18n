# دستورالعمل‌ها

شما عضوی از یک گروه ویژه هستید که با جاسوسی شرکتی مبارزه می‌کند. شما یک خبرچین مخفی در Shady Company X دارید؛ شرکتی که گمان می‌کنید اسرار را از رقبایش می‌دزدد.

خبرچین شما، Agent Ex، یک توسعه‌دهنده‌ی Elixir است. او پیام‌های مخفی را در کدش رمزگذاری می‌کند.

برای رمزگشایی پیام‌های مخفی او:

- همه‌ی توابع (عمومی و خصوصی) را به همان ترتیبی که تعریف شده‌اند بردارید.
- برای هر تابع، `n` کاراکتر اول را از اسمش بردارید که `n` همان تعداد آرگومان‌های تابع است.

## 1. تبدیل کد به داده

تابع `TopSecret.to_ast/1` را پیاده‌سازی کنید. این تابع باید رشته‌ای شامل کد Elixir بگیرد و درخت نحو انتزاعی آن را برگرداند.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. تجزیه‌ی یک گره درخت نحو انتزاعی

تابع `TopSecret.decode_secret_message_part/2` را پیاده‌سازی کنید. این تابع باید یک گره درخت نحو انتزاعی و یک انباشتگر برای پیام مخفی (یک لیست) بگیرد. باید یک تاپل برگرداند که عنصر اولش همان گره درخت نحو انتزاعی بدون تغییر است و عنصر دومش انباشتگر.

اگر عملِ گره درخت نحو انتزاعی تعریف یک تابع باشد (`def` یا `defp`)، اسم تابع را (تبدیل‌شده به رشته) به ابتدای انباشتگر اضافه کنید. اگر عمل چیز دیگری باشد، انباشتگر را بدون تغییر برگردانید.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

این تابع نیازی ندارد که برای بررسی کل درخت نحو انتزاعی فراخوانی بازگشتی انجام دهد؛ فقط همان گره داده‌شده کافی است. در مرحله‌ی آخر، کل درخت نحو انتزاعی را با ابزارهای داخلی پیمایش می‌کنیم.

## 3. رمزگشایی بخشی از پیام مخفی از تعریف تابع

تابع `TopSecret.decode_secret_message_part/2` را گسترش دهید. اگر عمل در گره درخت نحو انتزاعی تعریف یک تابع باشد، کل اسم تابع را برنگردانید. در عوض، تعداد آرگومان‌های تابع را بررسی کنید. سپس فقط `n` کاراکتر اول را از اسم برگردانید که `n` همان تعداد آرگومان‌هاست.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. اصلاح رمزگشایی برای توابع دارای گارد

تابع `TopSecret.decode_secret_message_part/2` را گسترش دهید. مطمئن شوید که اسم و تعداد آرگومان‌های تابع برای تعاریف تابعی که از گارد استفاده می‌کنند، درست تشخیص داده شود.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. رمزگشایی کل پیام مخفی

تابع `TopSecret.decode_secret_message/1` را پیاده‌سازی کنید. این تابع باید رشته‌ای شامل کد Elixir بگیرد و پیام مخفی را به‌صورت رشته‌ای برگرداند که از همه‌ی تعریف‌های تابع موجود در کد رمزگشایی شده است. حتماً از توابعی که در مراحل قبلی تعریف شده‌اند استفاده کنید.

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
