# Hinweise

## Allgemein

- Verwende `match`, um `Closed` von `Open(balance)` zu unterscheiden.

- Eine Operation gibt ein aktualisiertes Konto zurück, statt das übergebene Konto zu verändern.
  Verwende `Ok(updated_account)` für eine erfolgreiche Aktualisierung und `Err(...)` für eine abgelehnte Operation.
