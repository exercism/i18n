# مقدمه

## مستندات

مستندات در Elixir یک شهروند درجه یک است.

دو ویژگی ماژول وجود دارد که معمولاً برای مستندسازی کد شما استفاده می‌شوند: `@moduledoc` برای مستندسازی یک ماژول و `@doc` برای مستندسازی تابعی که پس از این ویژگی می‌آید. ویژگی `@moduledoc` معمولاً در خط اول ماژول ظاهر می‌شود و ویژگی `@doc` معمولاً دقیقاً پیش از تعریف یک تابع، یا مشخصات نوع آن تابع اگر داشته باشد، ظاهر می‌شود. مستندات معمولاً در یک رشته‌ی چندخطی با نحوه‌ی نگارش heredoc نوشته می‌شود.

مستندات Elixir با [**Markdown**][markdown] نوشته می‌شود.

```elixir
defmodule String do
  @moduledoc """
  Strings in Elixir are UTF-8 encoded binaries.
  """

  @doc """
  Converts all characters in the given string to uppercase according to `mode`.

  ## Examples

      iex> String.upcase("abcd")
      "ABCD"

      iex> String.upcase("olá")
      "OLÁ"
  """
  def upcase(string, mode \\ :default)
end
```

## مشخصات نوع

Elixir یک زبان با نوع‌بندی پویا است، یعنی بررسی نوع در زمان کامپایل ارائه نمی‌دهد. با این حال، می‌توان از مشخصات نوع به عنوان شکلی از مستندسازی استفاده کرد.

می‌توان یک مشخصات نوع را با استفاده از ویژگی ماژول `@spec` دقیقاً پیش از تعریف تابع به تابع اضافه کرد. پس از `@spec` نام تابع و فهرستی از نوع همه‌ی آرگومان‌های آن، داخل پرانتز و جدا شده با کاما می‌آید. نوع مقدار بازگشتی با دو دونقطه `::` از آرگومان‌های تابع جدا می‌شود.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### نوع

پرکاربردترین نوع‌ها عبارتند از:

- نوع «منطقی»: `boolean()`
- رشته‌ها: `String.t()`
- اعداد: `integer()`، `non_neg_integer()`، `pos_integer()`، `float()`
- فهرست‌ها: `list()`
- مقداری از هر نوع: `any()`

برخی از نوع‌ها را می‌توان پارامتردار کرد، برای مثال `list(integer)` فهرستی از اعداد صحیح است.

از مقادیر ثابت هم می‌توان به عنوان نوع استفاده کرد.

اتحاد نوع‌ها را می‌توان با علامت `|` نوشت. برای مثال، `integer() | :error` یعنی یا یک عدد صحیح یا اتم ثابت `:error`.

فهرست کامل همه‌ی نوع‌ها را می‌توان در [بخش «Typespecs» در مستندات رسمی][types] یافت.

### نام‌گذاری آرگومان‌ها

آرگومان‌ها در مشخصات نوع می‌توانند نام‌گذاری شوند، که برای تشخیص چندین آرگومان از یک نوع مفید است. نام آرگومان، به دنبالش دو دونقطه، پیش از نوع آرگومان می‌آید.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### نوع سفارشی

مشخصات نوع فقط به نوع‌های داخلی محدود نمی‌شود. می‌توان نوع‌های سفارشی را با استفاده از ویژگی ماژول `@type` تعریف کرد. تعریف یک نوع سفارشی با نام نوع شروع می‌شود، سپس دو دونقطه و بعد خود نوع می‌آید.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

از یک نوع سفارشی می‌توان در همان ماژولی که تعریف شده، یا در ماژول دیگری استفاده کرد.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
