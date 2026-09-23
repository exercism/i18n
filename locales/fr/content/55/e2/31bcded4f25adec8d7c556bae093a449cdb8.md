# Introduction

Comme les autres langages, Go propose aussi une instruction `switch`.
Les instructions `switch` sont une façon plus courte d'écrire de longues instructions `if ... else if`.
Pour créer un `switch`, on commence par utiliser le mot-clé `switch` suivi d'une valeur ou d'une expression.
On déclare ensuite chacune des conditions avec le mot-clé `case`.
On peut aussi déclarer un cas `default`, qui s'exécute quand aucune des conditions `case` précédentes n'a été remplie :

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

Une particularité intéressante des instructions `switch`, c'est que la valeur qui suit le mot-clé `switch` peut être omise, et que chaque `case` peut alors porter une condition booléenne :

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
