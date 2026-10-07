# Appendice alle istruzioni

Conta le lettere, ignorando maiuscole/minuscole e i caratteri che non sono lettere, e restituisci un dizionario dalle lettere minuscole ai loro conteggi.

Usa `pf.Parallel.map!(items, { workers, task })` dalla [piattaforma roc-parallel](https://github.com/ageron/roc-parallel) per elaborare gli `items` forniti con una funzione `task` pura, in parallelo su più thread (indicati da `workers`). I risultati vengono restituiti nell'ordine di input una volta che tutti gli elementi sono stati elaborati. Devi solo modificare `ParallelLetterFrequency.roc`.

Suggerimento: ti consigliamo di usare la [libreria Unicode](https://github.com/roc-lang/unicode) per la conversione di maiuscole/minuscole e il riconoscimento delle lettere. In particolare, dai un'occhiata a `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` e `unicode.Scalar.to_str`. Considera le lettere come valori scalari Unicode; la normalizzazione Unicode non è necessaria.

Nota: a differenza della maggior parte degli altri esercizi, questo esercizio usa funzioni con effetti. Per ora, l'istruzione `expect` di Roc non può chiamare funzioni con effetti, quindi in questo esercizio i test non usano affatto `expect` né `roc test`. I test vengono invece eseguiti con `roc --opt=speed` e qualsiasi errore restituito dal codice Roc viene segnalato dalla piattaforma, con un formato diverso dal solito.

Potresti anche voler dare un'occhiata all'esercizio `bank-account`, che esplora un altro lato della concorrenza: applicare gli aggiornamenti in modo sicuro a uno stato condiviso.
