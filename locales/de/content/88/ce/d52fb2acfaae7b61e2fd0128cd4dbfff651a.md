# Einführung

Manchmal muss ein bestimmter Codeabschnitt mehr als einmal verwendet werden. In diesem Fall ist es praktisch, den Code in eine Funktion zu packen. Eine Funktion führt in der Regel nur eine bestimmte Aktion aus. In Rust definierst du Funktionen mit dem Schlüsselwort ```fn```. Der Code, der zu einer Funktion gehört, steht immer zwischen geschweiften Klammern (also `{}`). Die Funktion `main` ist etwas Besonderes, denn sie ist der Einstiegspunkt für Programme. Von dieser Funktion aus kannst du andere Funktionen aufrufen.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

Funktionen können auch Parameter entgegennehmen, wie ```name: &str``` in ```say_my_name()```. Funktionen können auch Werte zurückgeben, wie `-> &str` oben.
