# Suggerimenti

## Generali

- Nel tipo `Node` fornito, `left : Tree ?? Empty` dichiara un campo il cui valore predefinito è `Empty`.
  Puoi omettere quel campo quando costruisci un nodo, e leggerlo restituisce comunque un `Tree`.
  Questo è diverso da un campo opzionale dichiarato con `?:`, di cui bisogna verificare la presenza.
