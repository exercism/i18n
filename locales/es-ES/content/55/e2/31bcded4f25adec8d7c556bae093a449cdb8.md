# Introducción

Como otros lenguajes, Go también proporciona una instrucción `switch`.
Las instrucciones `switch` son una forma más corta de escribir largas instrucciones `if ... else if`.
Para crear un `switch`, empezamos usando la palabra clave `switch` seguida de un valor o una expresión.
Después declaramos cada una de las condiciones con la palabra clave `case`.
También podemos declarar un caso `default`, que se ejecutará cuando ninguna de las condiciones `case` anteriores coincida:

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

Algo interesante de las instrucciones `switch` es que el valor que va después de la palabra clave `switch` se puede omitir, y podemos tener condiciones de tipo Boolean para cada `case`:

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
