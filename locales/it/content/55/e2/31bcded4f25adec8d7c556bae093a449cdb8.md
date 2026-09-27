# Introduzione

Come altri linguaggi, anche Go mette a disposizione un'istruzione `switch`.
Le istruzioni `switch` sono un modo più breve per scrivere lunghe istruzioni `if ... else if`.
Per creare uno `switch`, iniziamo usando la parola chiave `switch` seguita da un valore o da un'espressione.
Poi dichiariamo ciascuna delle condizioni con la parola chiave `case`.
Possiamo anche dichiarare un caso `default`, che verrà eseguito quando nessuna delle condizioni `case` precedenti è stata soddisfatta:

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

Una cosa interessante delle istruzioni `switch` è che il valore dopo la parola chiave `switch` può essere omesso, e per ogni `case` possiamo avere condizioni booleane:

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
