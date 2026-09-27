# Introdução

Tal como outras linguagens, o Go também tem uma instrução `switch`.
As instruções `switch` são uma forma mais curta de escrever cadeias longas de instruções `if ... else if`.
Para criar um `switch`, começamos por usar a palavra-chave `switch` seguida de um valor ou de uma expressão.
Depois, declaramos cada uma das condições com a palavra-chave `case`.
Também podemos declarar um caso `default`, que é executado quando nenhuma das condições `case` anteriores corresponde:

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

Uma coisa interessante nas instruções `switch` é que o valor a seguir à palavra-chave `switch` pode ser omitido, e podemos ter condições booleanas para cada `case`:

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
