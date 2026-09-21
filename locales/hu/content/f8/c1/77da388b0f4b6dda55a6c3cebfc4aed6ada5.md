# Utasítások

Egy vállalati kémkedés ellen harcoló munkacsoport tagja vagy. Van egy titkos informátorod a Shady Company X-nél, amelyről azt gyanítod, hogy titkokat lop a versenytársaitól.

Az informátorod, Agent Ex, Elixir-fejlesztő. Titkos üzeneteket kódol a kódjában.

A titkos üzenetei dekódolásához:

- Vedd az összes függvényt (nyilvánosat és privátat) abban a sorrendben, ahogy definiálva vannak.
- Minden függvénynél vedd a nevének első `n` karakterét, ahol `n` a függvény aritása.

## 1. Alakítsd a kódot adattá

Valósítsd meg a `TopSecret.to_ast/1` függvényt. Egy Elixir-kódot tartalmazó stringet kell fogadnia, és vissza kell adnia az AST-ját.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Dolgozz fel egyetlen AST-csomópontot

Valósítsd meg a `TopSecret.decode_secret_message_part/2` függvényt. Egy AST-csomópontot és a titkos üzenethez tartozó akkumulátort (egy listát) kell fogadnia. Egy tuple-t kell visszaadnia, amelynek első eleme a változatlan AST-csomópont, második eleme pedig az akkumulátor.

Ha az AST-csomópont művelete függvényt definiál (`def` vagy `defp`), a függvény nevét (stringgé alakítva) fűzd az akkumulátor elé. Ha a művelet valami más, add vissza az akkumulátort változatlanul.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Ennek a függvénynek nem kell rekurzív hívásokat végeznie a teljes AST ellenőrzéséhez, csak az adott csomópontot kell vizsgálnia. A teljes AST-t az utolsó lépésben beépített eszközökkel járjuk be.

## 3. Dekódold a titkos üzenet részét függvénydefinícióból

Terjeszd ki a `TopSecret.decode_secret_message_part/2` függvényt. Ha az AST-csomópontban a művelet függvényt definiál, ne a teljes függvénynevet add vissza. Ehelyett ellenőrizd a függvény aritását. Ezután csak a név első `n` karakterét add vissza, ahol `n` az aritás.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Javítsd a dekódolást őrfeltételeket használó függvényeknél

Terjeszd ki a `TopSecret.decode_secret_message_part/2` függvényt. Ügyelj arra, hogy az őrfeltételeket használó függvénydefinícióknál a függvény neve és aritása helyesen legyen felismerve.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Dekódold a teljes titkos üzenetet

Valósítsd meg a `TopSecret.decode_secret_message/1` függvényt. Egy Elixir-kódot tartalmazó stringet kell fogadnia, és vissza kell adnia a kódban található összes függvénydefinícióból dekódolt titkos üzenetet stringként. Ügyelj arra, hogy újrahasználd a korábbi lépésekben definiált függvényeket.

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
