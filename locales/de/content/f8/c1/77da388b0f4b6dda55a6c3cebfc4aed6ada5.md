# Anweisungen

Du bist Teil einer Task Force, die gegen Wirtschaftsspionage kämpft. Du hast eine geheime Informantin bei Shady Company X, von der du vermutest, dass sie Geheimnisse von ihren Konkurrenten stiehlt.

Deine Informantin, Agent Ex, ist Elixir-Entwicklerin. Sie verschlüsselt geheime Nachrichten in ihrem Code.

Um ihre geheimen Nachrichten zu entschlüsseln:

- Nimm alle Funktionen (öffentliche und private) in der Reihenfolge, in der sie definiert sind.
- Nimm von jeder Funktion die ersten `n` Zeichen ihres Namens, wobei `n` die Arity der Funktion ist.

## 1. Code in Daten umwandeln

Implementiere die Funktion `TopSecret.to_ast/1`. Sie soll einen String mit Elixir-Code entgegennehmen und dessen AST zurückgeben.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Einen einzelnen AST-Knoten parsen

Implementiere die Funktion `TopSecret.decode_secret_message_part/2`. Sie soll einen AST-Knoten und einen Akkumulator für die geheime Nachricht (eine Liste) entgegennehmen. Sie soll ein Tupel zurückgeben, dessen erstes Element der unveränderte AST-Knoten und dessen zweites Element der Akkumulator ist.

Wenn die Operation des AST-Knotens eine Funktion definiert (`def` oder `defp`), stelle den Funktionsnamen (in einen String umgewandelt) dem Akkumulator voran. Wenn die Operation etwas anderes ist, gib den Akkumulator unverändert zurück.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Diese Funktion muss keine rekursiven Aufrufe machen, um den gesamten AST zu prüfen, sondern nur den gegebenen Knoten. Den gesamten AST durchlaufen wir im letzten Schritt mit eingebauten Werkzeugen.

## 3. Den Teil der geheimen Nachricht aus einer Funktionsdefinition dekodieren

Erweitere die Funktion `TopSecret.decode_secret_message_part/2`. Wenn die Operation im AST-Knoten eine Funktion definiert, gib nicht den ganzen Funktionsnamen zurück. Prüfe stattdessen die Arity der Funktion. Gib dann nur die ersten `n` Zeichen des Namens zurück, wobei `n` die Arity ist.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Die Dekodierung für Funktionen mit Guards korrigieren

Erweitere die Funktion `TopSecret.decode_secret_message_part/2`. Stelle sicher, dass der Name und die Arity der Funktion für Funktionsdefinitionen mit Guards korrekt erkannt werden.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Die vollständige geheime Nachricht dekodieren

Implementiere die Funktion `TopSecret.decode_secret_message/1`. Sie soll einen String mit Elixir-Code entgegennehmen und die geheime Nachricht als String zurückgeben, dekodiert aus allen im Code gefundenen Funktionsdefinitionen. Achte darauf, die in den vorherigen Schritten definierten Funktionen wiederzuverwenden.

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
