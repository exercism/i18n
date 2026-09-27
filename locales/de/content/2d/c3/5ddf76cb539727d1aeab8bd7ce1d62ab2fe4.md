# Einführung

Der gesamte Julia-Track erfordert, dass du deine Lösung wie kleine Bibliotheken behandelst, d. h. du musst Funktionen, Typen usw. definieren, die dann gegen eine Testsuite laufen.
Aus diesem Grund führen wir benannte Funktionen als allererstes Konzept ein.

Julia ist eine dynamische, stark typisierte Programmiersprache.
Der Programmierstil ist hauptsächlich funktional, allerdings mit mehr Flexibilität als in Sprachen wie Haskell.

## Variablen und Zuweisung

Du musst eine Variable nicht vorher deklarieren.
Weise einfach einem passenden Namen einen Wert zu:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Konstanten

Wenn ein Wert im gesamten Programm verfügbar sein soll, sich aber voraussichtlich nicht ändert, solltest du ihn am besten als Konstante kennzeichnen.

Wenn du einer Zuweisung das Schlüsselwort `const` voranstellst, kann der Compiler effizienteren Code erzeugen als bei einer Variablen.

Konstanten schützen dich außerdem vor Programmierfehlern.
Wenn du versehentlich versuchst, den `const`-Wert zu ändern, bekommst du eine Warnung:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Beachte, dass du eine Konstante mit `const` nur *außerhalb* einer Funktion deklarieren kannst.
Das steht normalerweise am Anfang der `*.jl`-Datei, vor den Funktionsdefinitionen.

## Arithmetische Operatoren

Sie sind dieselben wie in vielen anderen Sprachen:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Funktionen

Es gibt zwei gängige Arten, eine benannte Funktion in Julia zu definieren:

1. Mit dem Schlüsselwort `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    Eine Einrückung um 4 Leerzeichen ist aus Gründen der Lesbarkeit üblich, aber der Compiler ignoriert sie.
    Das Schlüsselwort `end` ist unerlässlich.

    Beachte, dass wir auch `return x * y + z` hätten schreiben können.
    Julia-Funktionen geben jedoch immer den zuletzt ausgewerteten Ausdruck zurück, das Schlüsselwort `return` ist also optional.
    Viele Programmierer geben es lieber an, um ihre Absicht deutlicher zu machen.

2. Mit der „Zuweisungsform“

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Diese Form wird am häufigsten verwendet, um knappe Funktionen mit einem einzigen Ausdruck zu erstellen.

    In der Zuweisungsform wird *niemals* das Schlüsselwort `return` verwendet.

Die beiden Formen sind gleichwertig und werden genau gleich verwendet, wähle also die, die besser lesbar ist.

Du rufst eine Funktion auf, indem du ihren Namen angibst und für jeden Parameter der Funktion ein Argument übergibst:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Namenskonventionen

Wie viele Sprachen verlangt Julia, dass Namen (von Variablen, Funktionen und vielem anderen) mit einem Buchstaben beginnen, gefolgt von einer beliebigen Kombination aus Buchstaben, Ziffern und Unterstrichen.

Konventionell werden Namen von Variablen, Konstanten und Funktionen *kleingeschrieben*, wobei Unterstriche auf ein vernünftiges Minimum beschränkt bleiben.