# Einführung

Wie andere Sprachen bietet auch Go eine `switch`-Anweisung.
Switch-Anweisungen sind ein kürzerer Weg, lange `if ... else if`-Anweisungen zu schreiben.
Um eine Switch-Anweisung zu erstellen, beginnen wir mit dem Schlüsselwort `switch`, gefolgt von einem Wert oder Ausdruck.
Dann deklarieren wir jede der Bedingungen mit dem Schlüsselwort `case`.
Wir können auch einen `default`-Fall deklarieren, der ausgeführt wird, wenn keine der vorherigen `case`-Bedingungen zutrifft:

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

Interessant an Switch-Anweisungen ist, dass der Wert nach dem Schlüsselwort `switch` weggelassen werden kann und wir für jedes `case` boolesche Bedingungen angeben können:

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
