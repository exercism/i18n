# Appendice alle istruzioni

## Suggerimenti

Devi implementare la funzione `diamond`, che stampa un rombo che parte da `A` e ha il carattere dato nei suoi punti più larghi. Puoi usare la firma fornita se hai dubbi sui tipi, ma non lasciare che limiti la tua creatività:

```haskell
diamond :: Char -> Maybe [String]
```

Questo esercizio lavora con dati testuali. Per ragioni storiche, il tipo `String` di Haskell è sinonimo di `[Char]`, una lista di caratteri. Per gestire i dati testuali in modo più efficiente, si può usare il tipo `Text`.

Come estensione facoltativa di questo esercizio, puoi

- Leggere qualcosa sui [tipi stringa](https://haskell-lang.org/tutorial/string-types) in Haskell.
- Aggiungere `- text` all'elenco delle dipendenze in package.yaml.
- Importare `Data.Text` [in questo modo](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Ora puoi scrivere ad esempio `diamond :: Char -> Maybe [Text]` e riferirti ai combinatori di `Data.Text` come ad esempio `T.pack`,
- Consultare la documentazione di
  [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Puoi quindi sostituire tutte le occorrenze di `String` con `Text` in Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Questa parte è del tutto facoltativa.
