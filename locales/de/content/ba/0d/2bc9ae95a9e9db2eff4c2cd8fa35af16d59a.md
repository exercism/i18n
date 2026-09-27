# Hinweise

## Allgemein

- Der Typ ist durchgehend `LIST{STR}`, also eine Liste von Strings. Schreib ihn überall vollständig aus, wo ein Notizbuch hineingeht oder herauskommt.

## 1. Einen Fall eröffnen

- `#LIST{STR}` erzeugt eine leere Liste. Die Routine nimmt keine Argumente und gibt `LIST{STR}` zurück.

## 2. Eine Spur notieren

- `append` ist die Routine, und sie liefert nichts zurück. Also hat diese Routine auch keinen Rückgabetyp: `add_clue(notes : LIST{STR}, clue : STR) is`.
- Weise das Ergebnis von `append` nirgendwo zu. Anders als bei `FMAP::insert` gibt es kein Ergebnis.

## 3. Wie viele Spuren?

- `.size`.

## 4. Eine Spur ausschließen

- `remove_index` nimmt die Position. Auch hier kein Rückgabetyp.

## 5. Den Fall noch einmal durchlesen

- Eine Schleife über `notes.elt!` und einen `FSTR`, wie in `rehearsal-script`.
- Das `"; "` kommt vor jede Spur außer der ersten. Genau dadurch kommt bei einem leeren Notizbuch ohne Sonderbehandlung der leere String heraus.
