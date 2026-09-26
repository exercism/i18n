# はじめに

他の言語と同じく、Goにも`switch`文が用意されています。
`switch`文を使うと、長い`if ... else if`文を短く書けます。
`switch`文を作るには、まずキーワード`switch`を使い、その後に値または式を書きます。
次に、それぞれの条件をキーワード`case`で宣言します。
また、それまでのどの`case`条件にも一致しなかったときに実行される`default`ケースを宣言することもできます：

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

`switch`文の面白いところは、キーワード`switch`の後ろの値を省略できることと、各`case`に真偽値の条件を指定できることです：

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
