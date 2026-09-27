# Suggerimenti

## Generale

- [Tutorial su date e orari di csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Analizza la data dell'appuntamento

- La classe `DateTime` ha diversi metodi per [analizzare][docs.microsoft.com_parsing-date] una `string` e convertirla in un `DateTime`.

## 2. Verifica se un appuntamento è già passato

- Gli oggetti `DateTime` si possono confrontare usando i [operatori di confronto][docs.microsoft.com_datetime-operators] predefiniti.
- C'è una [proprietà][docs.microsoft.com_datetime-properties] per recuperare la data e l'ora correnti.

## 3. Verifica se l'appuntamento è nel pomeriggio

- Si può accedere alla parte relativa all'ora di un oggetto `DateTime` tramite una delle sue [proprietà][docs.microsoft.com_datetime-properties].

## 4. Descrivi l'ora e la data dell'appuntamento

- I test vengono eseguiti come se girassero su una macchina negli Stati Uniti, il che significa che convertendo un `DateTime` in una `string` si otterranno date e orari in formato statunitense.
- Quando converti un'istanza di `DateTime` in una `string`, puoi usare una [stringa di formato standard][docs.microsoft.com_standard-date-and-time-format-strings] oppure una [stringa di formato personalizzata][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Restituisci la data dell'anniversario

- Usa uno dei vari [costruttori][constructors] di `DateTime` per creare una nuova istanza di `DateTime`.
- Puoi usare una delle [proprietà][docs.microsoft.com_datetime-properties] della data e ora corrente per ottenere l'anno corrente.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
