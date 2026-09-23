# Вступ

Як й інші мови, Go також надає конструкцію `switch`.
Конструкції `switch` дають змогу коротше записати довгі конструкції `if ... else if`.
Щоб створити конструкцію `switch`, ми починаємо з ключового слова `switch`, після якого йде значення або вираз.
Потім ми оголошуємо кожну з умов за допомогою ключового слова `case`.
Ми також можемо оголосити випадок `default`, який виконається, коли жодна з попередніх умов `case` не збіглася:

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

Одна цікава особливість конструкцій `switch` полягає в тому, що значення після ключового слова `switch` можна пропустити, і для кожного `case` можна використовувати булеві умови (англ. Boolean):

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
