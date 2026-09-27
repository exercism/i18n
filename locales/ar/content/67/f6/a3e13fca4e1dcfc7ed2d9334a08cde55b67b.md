# مقدمة

## التوثيق

يحتل التوثيق في Elixir مكانة من الدرجة الأولى.

هناك سمتان شائعتان تُستخدمان لتوثيق الكود: `@moduledoc` لتوثيق الوحدة، و`@doc` لتوثيق الدالة التي تأتي بعد السمة. تظهر السمة `@moduledoc` عادةً في السطر الأول من الوحدة، وتظهر السمة `@doc` عادةً قبل تعريف الدالة مباشرة، أو قبل مواصفات نوع الدالة إن وُجدت. ويُكتب التوثيق عادةً في سلسلة نصية متعددة الأسطر باستخدام صيغة `heredoc`.

يُكتب توثيق Elixir بلغة [**Markdown**][markdown].

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

## مواصفات الأنواع

Elixir لغة ذات أنواع ديناميكية، أي أنها لا تُجري فحوصًا للأنواع وقت الترجمة. ومع ذلك، يمكن استخدام مواصفات الأنواع كشكل من أشكال التوثيق.

يمكن إضافة مواصفات نوع إلى دالة باستخدام سمة الوحدة `@spec` قبل تعريف الدالة مباشرة. تأتي بعد `@spec` اسم الدالة وقائمة بأنواع جميع وسائطها، بين الأقواس الهلالَين، مفصولة بفواصل. ويُفصل نوع القيمة التي تُرجعها الدالة عن وسائط الدالة بنقطتين مزدوجتين `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### الأنواع

من أكثر الأنواع استخدامًا:

- القيم المنطقية: `boolean()`
- السلاسل النصية: `String.t()`
- الأعداد: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- المصفوفات: `list()`
- قيمة من أي نوع: `any()`

يمكن أن تكون بعض الأنواع مُعامَلة أيضًا، فمثلًا `list(integer)` مصفوفة من الأعداد الصحيحة.

يمكن أيضًا استخدام القيم الحرفية كأنواع.

يمكن كتابة اتحاد أنواع باستخدام الخط العمودي `|`. فمثلًا، `integer() | :error` تعني إما عددًا صحيحًا وإما الذرّة الحرفية `:error`.

تجد قائمة كاملة بجميع الأنواع في [قسم "مواصفات الأنواع" في التوثيق الرسمي][types].

### تسمية الوسائط

يمكن أيضًا تسمية الوسائط في مواصفات الأنواع، وهذا مفيد للتمييز بين وسائط متعددة من النوع نفسه. ويأتي اسم الوسيط، متبوعًا بنقطتين مزدوجتين، قبل نوع الوسيط.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### أنواع مخصصة

لا تقتصر مواصفات الأنواع على الأنواع المدمجة فقط. يمكن تعريف أنواع مخصصة باستخدام سمة الوحدة `@type`. يبدأ تعريف النوع المخصص باسم النوع، ثم نقطتين مزدوجتين، ثم النوع نفسه.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

ويمكن استخدام النوع المخصص من الوحدة نفسها التي عُرّف فيها، أو من وحدة أخرى.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
