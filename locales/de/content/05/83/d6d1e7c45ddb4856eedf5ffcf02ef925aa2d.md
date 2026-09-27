# Einführung

Der Abstract Syntax Tree (AST), auch _quoted expression_ genannt, ist eine Möglichkeit, Code als Daten darzustellen.

Jeder Knoten im AST ist ein Tupel aus drei Elementen.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

Das erste Element, ein Atom, ist die Operation. Das zweite Element, eine Keyword-Liste, sind die Metadaten. Das dritte Element ist eine Liste von Argumenten, die weitere Knoten enthält. Literale wie Ganzzahlen, Atome und Strings werden im AST als sie selbst dargestellt und nicht als dreielementige Tupel.

## Code in ASTs umwandeln

Elixir-Code in ASTs umzuwandeln und ASTs wieder zurück in Code gehört zur Standardbibliothek. Funktionen für die Arbeit mit ASTs findest du in den Modulen `Code` (zum Beispiel, um einen String mit Code in einen AST umzuwandeln) und `Macro` (zum Beispiel, um den AST zu durchlaufen oder ihn in einen String umzuwandeln).

Beachte, dass alle Funktionen in der Standardbibliothek den Namen „quoted“ verwenden, um den AST zu bezeichnen (kurz für _quoted expression_).

Die spezielle Form, um Code in einen AST umzuwandeln, heißt `quote`. Sie nimmt einen Block entgegen und gibt seinen AST zurück.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Anwendungsfälle

Die Fähigkeit, Code als AST darzustellen, ist das Herzstück der Metaprogrammierung in Elixir. _Makros_, also die Möglichkeit, Elixir-Code zu schreiben, der Elixir-Code erzeugt, funktionieren, indem sie ASTs als Ausgabe zurückgeben.

Ein weiterer Anwendungsfall für ASTs ist die statische Codeanalyse, wie bei Exercisms eigenem Tool, dem Analyzer, das du vielleicht schon als den kleinen Bot kennst, der Kommentare zu deinen Lösungen hinterlässt.
