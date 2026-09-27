# نبذة

- Elixir لغة ديناميكية الأنواع.
  - لا يُتحقق من نوع المتغير إلا وقت التشغيل.
- باستخدام عامل المطابقة [`=`][match]، يمكننا ربط قيمة من أي نوع باسم متغير:
  - من الممكن إعادة ربط المتغيرات.
  - يمكن ربط قيمة من أي نوع بالمتغير.

## الوحدات

- [الوحدات][modules] هي أساس تنظيم الكود في Elixir.
  - الوحدة مرئية لجميع الوحدات الأخرى.
  - تُعرَّف الوحدة بـ [`defmodule`][defmodule].

## الدوال المسماة

- يجب أن تُعرَّف جميع [الدوال المسماة][functions] داخل وحدة.

  - تُعرَّف الدوال المسماة بـ [`def`][def].
  - يمكن جعل الدالة المسماة خاصة باستخدام [`defp`][defp] بدلًا من ذلك.
  - قيمة آخر تعبير في الدالة _تُرجَع ضمنيًا_.
  - يمكن أيضًا كتابة الدوال القصيرة باستخدام صيغة من سطر واحد.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- تُستدعى الدوال باسمها الكامل مع اسم الوحدة.
  - إذا استُدعيت من داخل وحدتها نفسها، يمكن حذف اسم الوحدة.
- غالبًا ما يُستخدم عدد الوسائط عند الإشارة إلى دالة مسماة.

  - ويشير إلى عدد الوسائط التي تقبلها الدالة.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## اصطلاحات التسمية

ينبغي أن تستخدم أسماء الوحدات `PascalCase`. يجب أن يبدأ اسم الوحدة بحرف كبير `A-Z` ويمكن أن يحتوي على حروف `a-zA-Z` وأرقام `0-9` وشرطات سفلية `_`.

ينبغي أن تستخدم أسماء المتغيرات والدوال `snake_case`. يجب أن يبدأ اسم المتغير أو الدالة بحرف صغير `a-z` أو شرطة سفلية `_`، ويمكن أن يحتوي على حروف `a-zA-Z` وأرقام `0-9` وشرطات سفلية `_`، وقد ينتهي بعلامة استفهام `?` أو علامة تعجب `!`.

## الأعداد الصحيحة

قيم الأعداد الصحيحة هي أعداد كلية تُكتب برقم واحد أو أكثر. يمكنك إجراء [عمليات حسابية أساسية][operators] عليها.

## السلاسل النصية

[السلاسل النصية][string] الحرفية هي تسلسلات من المحارف محاطة بعلامات تنصيص مزدوجة.

```elixir
string = "this is a string! 1, 2, 3!"
```

## المكتبة القياسية

- التوثيق متاح على الإنترنت على [hexdocs.pm/elixir][docs].
- لمعظم أنواع البيانات المدمجة وحدة مقابلة، مثل `Integer`، `Float`، `String`، `Tuple`، `List`.
- وحدة `Kernel` وحدة خاصة.
  - توفّر القدرات الأساسية التي بُنيت عليها بقية المكتبة القياسية.
  - تُستورد تلقائيًا.
  - يمكن استخدام دوالها دون البادئة `Kernel.`.

## تعليقات الكود

يمكن استخدام التعليقات لترك ملاحظات للمطورين الآخرين الذين يقرؤون الكود المصدري. تُسبق التعليقات أحادية السطر في Elixir بعلامة `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
