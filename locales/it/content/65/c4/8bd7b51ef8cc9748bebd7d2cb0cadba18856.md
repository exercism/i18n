# Introduzione

## Access Behaviour

Elixir usa i _Behaviour_ per fornire interfacce generiche comuni, facilitando al contempo implementazioni specifiche per ogni modulo che li implementa. Un esempio comune di questo è l'_Access Behaviour_.

L'_Access Behaviour_ fornisce un'interfaccia comune per recuperare dati da una struttura dati basata su chiavi. L'_Access Behaviour_ è implementato per le mappe e le liste di parole chiave, ma vediamo come si usa con le mappe per capirne meglio il funzionamento. L'_Access Behaviour_ stabilisce che, quando hai una mappa, puoi farla seguire da una coppia di _parentesi quadre_ e poi usare la chiave per recuperare il valore associato a quella chiave.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Se la chiave non esiste nella struttura dati, viene restituito `nil`. Questo può portare a comportamenti indesiderati, perché non viene sollevato alcun errore. Nota che `nil` stesso implementa l'Access Behaviour e restituisce sempre `nil` per qualsiasi chiave.
