# Suggerimenti

## Generale

- Usa `match` con `[]` e `[card, .. as rest]` per distinguere un mazzo vuoto dalla sua prossima carta e dalle carte rimanenti.

- Gli aggiornamenti di record come `{ ..state, pile: new_pile }` mantengono esplicite le transizioni di gioco senza stato mutabile.

- Un `Set` può memorizzare tuple o liste come chiavi quando tieni traccia degli stati di gioco già visti.
