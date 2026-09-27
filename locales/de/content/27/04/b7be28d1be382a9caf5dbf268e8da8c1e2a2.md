# Einführung

Es gibt im Wesentlichen zwei Arten von Schleifen:

1. Wiederholen, bis eine Bedingung erfüllt ist.
2. Über die Elemente einer Sammlung wiederholen.

Beides ist in Julia möglich, wobei die zweite Form häufiger vorkommen dürfte.

## Die `while`-Schleife

Für offene Probleme, bei denen im Voraus nicht bekannt ist, wie oft die Schleife durchlaufen wird, hat Julia die `while`-Schleife.

Die Grundform ist recht einfach:

```julia
while condition
    do_something()
end
```

In diesem Fall durchläuft das Programm die Schleife so lange, bis `condition` nicht mehr `true` ist.

Es gibt zwei Möglichkeiten, die Schleife vorzeitig zu verlassen:

- Ein `break` beendet die Schleife, und die Ausführung wird in der nächsten Zeile nach dem `end` der Schleife fortgesetzt.
- Ein `return x` beendet die Ausführung der aktuellen Funktion und gibt den Rückgabewert `x` an den Aufrufer zurück.

Mit diesen Möglichkeiten kann es manchmal praktisch sein, eine „unendliche“ Schleife mit `while true ... end` zu erzeugen und sich dann darauf zu verlassen, im Schleifenblock eine Abbruchbedingung zu finden, die ein `break` oder `return` auslöst.

## Eine Sammlung durchlaufen

Das einfachste Beispiel ist eine Schleife über einen Bereich.

Wenn wir etwas 10 Mal machen wollen:

```julia
for n in 1:10
    do_something(n)
end
```

Wenn die aktuelle Iteration eine Bedingung nicht erfüllt, kannst du mit einem `continue` sofort zur nächsten Iteration springen:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

In einer kürzeren Form lässt sich der `if`-Block durch `is_useless(n) && continue` ersetzen.

Viele andere Sammlungstypen lassen sich durchlaufen: Elemente in einem Array, Zeichen in einem String, Schlüssel in einem Wörterbuch...

Die bisherigen Beispiele durchlaufen den Bereich `1:10`, wobei der Wert auch der Schleifenindex ist.

Allgemeiner kann der Index benötigt werden und nicht nur der Wert.
Dafür wird die Funktion `eachindex()` verwendet, zum Beispiel `for i in eachindex(my_array) ... end`.

## Comprehensions

Explizite Schleifen zu schreiben ist in Julia tendenziell seltener als in vielen traditionellen Sprachen, weil es verschiedene kürzere Möglichkeiten gibt.

Eine besonders häufige Situation ist, wenn wir einen neuen Vektor aus den Elementen einer anderen Sammlung aufbauen müssen (Vektor, String, Menge ... es gibt viele Möglichkeiten).

Wer List Comprehensions in Python mag, wird sich freuen, dass Julia eine ähnliche Syntax verwenden kann.

Der Kern davon ist, eine sehr kompakte Schleife innerhalb eines Vektors aufzubauen.

Die einfachste Syntax hat die Form `result = [f(x) for x in some_collection]`.

Mit einer traditionellen Schleife könnte das so geschrieben werden:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Optional kann am Ende eine Bedingung hinzugefügt werden, um nur die passenden Elemente in der Sammlung auszuwählen:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
