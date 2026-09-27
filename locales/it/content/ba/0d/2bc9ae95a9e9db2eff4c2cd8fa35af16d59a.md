# Suggerimenti

## Generale

- Il tipo è `LIST{STR}` in tutto il file: una lista di stringhe. Scrivilo per
  esteso ogni volta che un blocco note entra o esce.

## 1. Apri un caso

- `#LIST{STR}` ne crea uno vuoto. La routine non prende argomenti e
  restituisce `LIST{STR}`.

## 2. Annota un indizio

- `append` è la routine e non risponde nulla, quindi anche questa routine non ha
  un tipo di ritorno: `add_clue(notes : LIST{STR}, clue : STR) is`.
- Non assegnare da nessuna parte il risultato di `append`. A differenza di
  `FMAP::insert`, non c'è alcun risultato.

## 3. Quanti indizi?

- `.size`.

## 4. Escluderne uno

- `remove_index` riceve la posizione. Anche qui nessun tipo di ritorno.

## 5. Rileggi il caso

- Un ciclo su `notes.elt!` e un `FSTR`, come in `rehearsal-script`.
- Il `"; "` va prima di ogni indizio tranne il primo, ed è questo che fa uscire
  un blocco note vuoto come la stringa vuota, senza alcuna gestione speciale.
