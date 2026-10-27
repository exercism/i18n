# Tippek

## Általános

- A `match` és a `[]`, illetve a `[card, .. as rest]` minták segítségével meg tudod különböztetni az üres paklit a következő kártyájától és a maradék kártyáktól.

- Egy `{ ..state, pile: new_pile }` alakú rekordfrissítéssel a játék állapotváltásai akkor is explicitek maradnak, ha nincs módosítható állapot.

- A `Set` kulcsként tárolhat tuple-öket vagy listákat, ha a korábban látott játékállapotokat követed nyomon.
