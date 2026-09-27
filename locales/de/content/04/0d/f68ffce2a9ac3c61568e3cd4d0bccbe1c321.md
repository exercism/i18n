# Dummy-Überschrift

## Funktionsbibliothek

Dies ist die erste Übung, bei der die Lösung, die wir schreiben, kein „main“-Skript ist. Wir schreiben eine Bibliothek, die in andere Skripte gesourct wird, die unsere Funktionen aufrufen.

### Bash-Namerefs

Diese Übung erfordert die Verwendung von `nameref`-Variablen. Dafür brauchst du eine Bash-Version von mindestens 4.0. Wenn du die Standardversion von Bash unter MacOS verwendest, musst du eine andere Version installieren: siehe [Bash installieren](https://exercism.io/tracks/bash/installation)

Namerefs sind eine Möglichkeit, eine Variable _per Referenz_ an eine Funktion zu übergeben. So kann die Variable in der Funktion geändert werden, und der aktualisierte Wert steht im aufrufenden Gültigkeitsbereich zur Verfügung. Hier ist ein Beispiel:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
