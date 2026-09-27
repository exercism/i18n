# التعليمات

أنت عضو في فرقة عمل تكافح التجسس على الشركات. لديك مخبر سري في شركة Shady Company X، التي تشك في أنها تسرق أسرار منافسيها.

مخبرك، العميل Ex، مطوّرة بلغة Elixir. وهي ترمّز رسائل سرية داخل كودها.

لفكّ تشفير رسائلها السرية:

- خُذ جميع الدوال (العامة والخاصة) بالترتيب الذي عُرّفت به.
- لكل دالة، خُذ أول `n` حرفًا من اسمها، حيث `n` هو عدد معاملات الدالة.

## 1. حوّل الكود إلى بيانات

نفّذ دالة `TopSecret.to_ast/1`. يجب أن تأخذ سلسلة نصية تحتوي على كود Elixir وتُرجع شجرة AST الخاصة به.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. حلّل عقدة واحدة من شجرة AST

نفّذ دالة `TopSecret.decode_secret_message_part/2`. يجب أن تأخذ عقدة من شجرة AST ومجمّعًا للرسالة السرية (قائمة). ويجب أن تُرجع مجموعة مرتّبة تبقى فيها عقدة الشجرة كما هي كعنصر أول، ويكون المجمّع هو العنصر الثاني.

إذا كانت عملية عقدة الشجرة هي تعريف دالة (`def` أو `defp`)، فأضف اسم الدالة (بعد تحويله إلى سلسلة نصية) إلى مقدمة المجمّع. وإذا كانت العملية شيئًا آخر، فأرجع المجمّع كما هو.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

لا تحتاج هذه الدالة إلى إجراء أي استدعاءات تكرارية لفحص الشجرة كاملة، بل العقدة المعطاة فقط. سنمرّ على الشجرة كاملة بأدوات مدمجة في الخطوة الأخيرة.

## 3. فكّ جزء الرسالة السرية من تعريف الدالة

وسّع دالة `TopSecret.decode_secret_message_part/2`. إذا كانت العملية في عقدة الشجرة هي تعريف دالة، فلا تُرجع اسم الدالة كاملًا. بل افحص عدد معاملات الدالة، ثم أرجع أول `n` حرف من الاسم فقط، حيث `n` هو عدد المعاملات.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. أصلح فكّ التشفير للدوال التي تستخدم الحُرّاس

وسّع دالة `TopSecret.decode_secret_message_part/2`. تأكد من اكتشاف اسم الدالة وعدد معاملاتها بشكل صحيح في تعريفات الدوال التي تستخدم الحُرّاس.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. فكّ الرسالة السرية كاملة

نفّذ دالة `TopSecret.decode_secret_message/1`. يجب أن تأخذ سلسلة نصية تحتوي على كود Elixir وتُرجع الرسالة السرية سلسلةً نصية مفكوكة من جميع تعريفات الدوال الموجودة في الكود. تأكد من إعادة استخدام الدوال المعرّفة في الخطوات السابقة.

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
