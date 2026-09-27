# مقدمة

## الاستخدام

يتيح لنا الماكرو `use` أن نوسّع وحدتنا بسرعة بوظائف توفّرها وحدة أخرى. فعندما نستخدم `use` مع وحدة ما، يمكن لتلك الوحدة أن تحقن كودًا في وحدتنا؛ فيمكنها مثلًا أن تُعرّف دوال، أو أن تستخدم `import` أو `alias` مع وحدات أخرى، أو أن تضبط سمات الوحدة.

إذا سبق أن نظرت في ملفات الاختبار الخاصة ببعض تمارين Elixir هنا على Exercism، فمن المرجّح أنك لاحظت أنها جميعًا تبدأ بـ `use ExUnit.Case`. هذا السطر الواحد من الكود هو ما يجعل الماكروين `test` و`assert` متاحين في وحدة الاختبار.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### الماكرو `__using__/1`

ما يحدث بالضبط عند استخدام `use` مع وحدة ما يحدّده الماكرو `__using__/1` في تلك الوحدة. فهو يأخذ وسيطًا واحدًا هو قائمة كلمات مفتاحية تحتوي على الخيارات، ويُرجع [تعبيرًا مُقتبسًا][concept-ast]. ويُدرَج الكود الموجود في هذا التعبير المُقتبس في وحدتنا عند استدعاء `use`.

```elixir
defmodule ExUnit.Case do
  defmacro __using__(opts) do
    # some real-life ExUnit code omitted here
    quote do
      import ExUnit.Assertions
      import ExUnit.Case, only: [describe: 2, test: 1, test: 2, test: 3]
    end
  end
end
```

ويمكن تمرير الخيارات كوسيط ثانٍ عند استدعاء `use`، مثل `use ExUnit.Case, async: true`. وإذا لم تُمرَّر صراحةً، فإنها تكون افتراضيًا قائمة فارغة.

## السلوكيات

تتيح لنا السلوكيات تعريف واجهات (مجموعات من الدوال والماكروات) في _وحدة سلوك_ يمكن أن تنفّذها لاحقًا _وحدات رد اتصال_ مختلفة. وبفضل الواجهة المشتركة، يمكن استخدام وحدات رد الاتصال هذه بالتبادل.

~~~~exercism/note
لاحظ التهجئة البريطانية للكلمة "behaviours".
~~~~

### تعريف السلوكيات

لتعريف سلوك، نحتاج إلى إنشاء وحدة جديدة وتحديد قائمة بالدوال التي تشكّل جزءًا من الواجهة المطلوبة. ويجب تعريف كل دالة باستخدام سمة الوحدة `@callback`. والصياغة مطابقة تمامًا لصياغة [مواصفة أنواع الدالة][concept-typespecs] (`@spec`). إذ نحتاج إلى تحديد اسم الدالة، وقائمة بأنواع الوسائط، وكل أنواع القيم المُرجَعة الممكنة.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### تنفيذ السلوكيات

لإضافة سلوك موجود إلى وحدتنا (أي إنشاء وحدة رد اتصال) نستخدم سمة الوحدة `@behaviour`. ويجب أن تكون قيمتها اسم وحدة السلوك التي نضيفها.

ثم نحتاج إلى تعريف كل الدوال (دوال رد الاتصال) التي تتطلبها وحدة السلوك تلك. وإذا كنا ننفّذ سلوكًا مكتوبًا من شخص آخر، مثل سلوكي `Access` و`GenServer` المضمّنين في Elixir، فسنجد قائمة بكل دوال رد الاتصال الخاصة بهذا السلوك في التوثيق على [hexdocs.pm][hexdocs].

ولا تقتصر وحدة رد الاتصال على تنفيذ الدوال التي تشكّل جزءًا من سلوكها فقط. فمن الممكن أيضًا أن تنفّذ وحدة واحدة عدة سلوكيات.

ولتحديد الدالة التي تنتمي إلى أي سلوك، ينبغي أن نستخدم سمة الوحدة `@impl` قبل كل دالة. ويجب أن تكون قيمتها اسم وحدة السلوك التي تُعرّف دالة رد الاتصال هذه.

```elixir
defmodule BookCollection do
  @behaviour Countable

  defstruct [:list, :owner]

  @impl Countable
  def count(collection) do
    Enum.count(collection.list)
  end

  def mark_as_read(collection, book) do
    # other function unrelated to the Countable behaviour
  end
end
```

### تنفيذات دوال رد الاتصال الافتراضية

عند تعريف سلوك، يمكن توفير تنفيذ افتراضي لدالة رد الاتصال. ويجب تعريف هذا التنفيذ في التعبير المُقتبس الخاص بالماكرو `__using__/1`. ولكي يتسنّى لمستخدمي وحدة السلوك تجاوز التنفيذ الافتراضي، استدعِ الماكرو `defoverridable/1` بعد تنفيذ الدالة. وهو يقبل قائمة كلمات مفتاحية تكون أسماء الدوال فيها مفاتيح، وأعداد وسائط الدوال قيمًا.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer

  defmacro __using__(_) do
    quote do
      @behaviour Countable
      def count(collection), do: Enum.count(collection)
      defoverridable count: 1
    end
  end
end
```

لاحظ أن تعريف الدوال داخل `__using__/1` غير مستحسن لأي غرض آخر غير تعريف تنفيذات دوال رد الاتصال الافتراضية، لكن يمكنك دائمًا تعريف الدوال في وحدة أخرى ثم استيرادها في الماكرو `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
