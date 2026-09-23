# Інструкції

Ми входимо до складу оперативної групи, яка бореться проти корпоративного шпигунства. У нас є таємний інформатор у Shady Company X, яку ми підозрюємо в крадіжці секретів у конкурентів.

Наш інформатор, агент Екс, працює розробницею Elixir. Вона кодує секретні повідомлення у своєму коді.

Щоб декодувати її секретні повідомлення:

- Візьміть усі функції (публічні та приватні) в тому порядку, у якому вони визначені.
- Для кожної функції візьміть перші `n` символів з її назви, де `n` - арність функції.

## 1. Перетворення коду на дані

Реалізуйте функцію `TopSecret.to_ast/1`. Вона має приймати рядок тексту (англ. string) з кодом Elixir і повертати його AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Розбір одного вузла AST

Реалізуйте функцію `TopSecret.decode_secret_message_part/2`. Вона має приймати вузол AST і акумулятор секретного повідомлення (список). Вона має повертати кортеж, першим елементом якого є незмінений вузол AST, а другим - акумулятор.

Якщо операція вузла AST визначає функцію (`def` або `defp`), додайте назву функції (перетворену на рядок тексту) на початок акумулятора. Якщо ж операція інша, поверніть акумулятор без змін.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Ця функція не потребує рекурсивних викликів, щоб перевірити все AST, лише заданий вузол. В останньому кроці ми обійдемо все AST вбудованими інструментами.

## 3. Декодування частини секретного повідомлення з визначення функції

Розширте функцію `TopSecret.decode_secret_message_part/2`. Якщо операція вузла AST визначає функцію, не повертайте всю назву функції. Натомість перевірте арність функції. Тоді поверніть лише перші `n` символів з назви, де `n` - арність.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Виправлення декодування для функцій із захисними виразами

Розширте функцію `TopSecret.decode_secret_message_part/2`. Переконайтеся, що назву й арність функції правильно визначено для визначень функцій, які використовують захисні вирази.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Декодування повного секретного повідомлення

Реалізуйте функцію `TopSecret.decode_secret_message/1`. Вона має приймати рядок тексту з кодом Elixir і повертати секретне повідомлення як рядок тексту, декодований з усіх визначень функцій, знайдених у коді. Не забудьте повторно використати функції, визначені в попередніх кроках.

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
