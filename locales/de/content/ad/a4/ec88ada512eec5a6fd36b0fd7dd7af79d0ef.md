# Hinweise

## Allgemein

- Nutze `match` mit `[]` und `[card, .. as rest]`, um ein leeres Deck von seiner nächsten Karte und den übrigen Karten zu unterscheiden.

- Record-Updates wie `{ ..state, pile: new_pile }` halten die Übergänge im Spiel explizit, ganz ohne veränderlichen Zustand.

- Ein `Set` kann Tupel oder Listen als Schlüssel speichern, wenn du dir damit bereits gesehene Spielzustände merkst.
