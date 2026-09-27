# Introduzione

## File

Il modulo `File` fornisce le funzioni per lavorare con i file.

Per leggere un intero file, usa `File.read/1`. Per scrivere su un file, usa `File.write/2`.

Ogni volta che si scrive su un file con `File.write/2`, viene aperto un descrittore di file. Viene anche avviato un nuovo [processo][exercism-processes] Elixir. Per questo motivo, è meglio evitare di scrivere su un file in un ciclo usando `File.write/2`.

Invece, si può aprire un file usando `File.open/2`. Il secondo argomento di `File.open/2` è una lista di modalità, che permette di specificare se si vuole aprire il file in lettura o in scrittura.

`File.open/2` restituisce un PID di un processo che gestisce il file. Per leggere e scrivere sul file, usa le funzioni del modulo `IO` e passa questo PID come dispositivo IO.

Quando hai finito di lavorare con il file, chiudilo con `File.close/1`.

Tutte le funzioni menzionate del modulo `File` hanno anche una variante `!` che solleva un errore invece di restituire una tupla di errore (ad esempio `File.read!/1`). Usa quella variante se non hai intenzione di gestire errori come file mancanti o mancanza di permessi.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
