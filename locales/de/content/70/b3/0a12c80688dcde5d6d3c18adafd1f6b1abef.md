# Anweisungen

In dieser Übung verarbeitest du Logzeilen.

Jede Logzeile ist ein String mit folgendem Format: `"[<LEVEL>]: <MESSAGE>"`.

Es gibt drei verschiedene Log-Level:

- `INFO`
- `WARNING`
- `ERROR`

Du hast drei Aufgaben. Bei jeder bekommst du eine Logzeile und sollst etwas damit anfangen.

## 1. Nachricht aus einer Logzeile holen

Implementiere die Funktion `message`, die die Nachricht einer Logzeile zurückgibt:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Leerzeichen am Anfang und am Ende sollen entfernt werden:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Log-Level aus einer Logzeile holen

Implementiere die Funktion `log_level`, die das Log-Level einer Logzeile zurückgibt, und zwar in Kleinbuchstaben:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Eine Logzeile umformatieren

Implementiere die Funktion `reformat`, die die Logzeile umformatiert: Zuerst kommt die Nachricht, danach das Log-Level in runden Klammern:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Hinweis:*** Alle Strings in dieser Übung sind auf Englisch und beschränken sich auf den ASCII-Zeichensatz. Später bekommst du in anderen Konzepten die Gelegenheit, mit Unicode-Zeichen zu arbeiten.
