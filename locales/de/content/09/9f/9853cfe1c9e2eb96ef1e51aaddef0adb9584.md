# Hinweise

## Allgemein

- Ein `include` steht innerhalb der Klasse, meist als erste Zeile.
- Nur das, was du umbenennst oder weglässt, ändert sich. Alles andere wird so
  übernommen, wie es ist.

## 1. Die Jazz-Routine

- Eine Zeile innerhalb der Klasse: `include WARM_UP;`
- Sonst nichts. Der Inhalt der Klasse besteht aus dieser Zeile, mehr nicht.

## 2. Die Stepptanz-Routine

- `include WARM_UP describe -> ;`
- Das `-> ;` ohne etwas nach dem Pfeil lässt `describe` weg, und genau das
  schafft Platz für die Version, die du schreibst.
- Ohne das beschwert sich der Compiler, dass `describe` zweimal definiert ist.
  Dieser Fehler ist gewollt: Sather wählt nicht stillschweigend eine der beiden
  aus.

## 3. Das Finale

- Zwei Einträge in einem include, durch ein Komma getrennt:
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Dann schreibst du `counts`, das `warm_up_counts * 2` zurückgibt, und
  `describe`.
- `describe` sollte `counts` aufrufen und die Zahl nicht erneut berechnen.
- Denk daran, dass man zu einer Zahl keinen String addieren kann. Eine
  Beschreibung, die mit Wörtern beginnt, ist also in Ordnung:
  `"Finale: " + counts + " counts"`.
