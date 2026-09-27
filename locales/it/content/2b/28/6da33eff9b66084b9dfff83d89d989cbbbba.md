# Suggerimenti

## 1. Sostituisci gli spazi con gli underscore

- [Questo tutorial][chars-tutorial] è utile.
- La [documentazione di riferimento][chars-docs] per i `char` è qui.
- Puoi estrarre i `char` da una stringa allo stesso modo in cui estrai gli elementi da un array.
- Dovresti usare una [`StringBuilder`][string-builder] per costruire la stringa di output.
- Vedi [questo metodo][iswhitespace] per individuare gli spazi. Ricorda che è un metodo statico.
- I letterali `char` sono racchiusi tra virgolette singole.

## 2. Sostituisci i caratteri di controllo con la stringa maiuscola "CTRL"

- Vedi [questo metodo][iscontrol] per verificare se un carattere è un carattere di controllo.

## 3. Converti il kebab-case in camel-case

- Vedi [questo metodo][toupper] per convertire un carattere in maiuscolo.

## 4. Ometti le lettere greche minuscole

- I `char` supportano gli operatori di uguaglianza e di confronto predefiniti.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
