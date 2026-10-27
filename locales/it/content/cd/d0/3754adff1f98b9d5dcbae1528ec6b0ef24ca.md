# Suggerimenti

## Informazioni generali

- Usa `match` per distinguere `Closed` da `Open(balance)`.

- Un'operazione restituisce un account aggiornato invece di modificare quello che le viene passato.
  Usa `Ok(updated_account)` per un aggiornamento riuscito e `Err(...)` per un'operazione rifiutata.
