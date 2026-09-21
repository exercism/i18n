# Bevezetés

Más nyelvekhez hasonlóan a Go is biztosít `switch` utasítást.
A `switch` utasítások rövidebb módot kínálnak a hosszú `if ... else if` utasítások leírására.
Egy `switch` megírásához kezdd a `switch` kulcsszóval, majd írj utána egy értéket vagy kifejezést.
Ezután a `case` kulcsszóval adod meg az egyes feltételeket.
Ezenkívül megadhatsz egy `default` ágat is, amely akkor fut le, ha az előző `case` feltételek egyike sem teljesült:

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

A `switch` utasításokban az az érdekes, hogy a `switch` kulcsszó utáni érték elhagyható, és mindegyik `case`-hez megadhatsz egy Boolean-feltételt:

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
