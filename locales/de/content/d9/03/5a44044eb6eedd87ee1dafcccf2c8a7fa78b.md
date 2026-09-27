# Anleitung

Der Verein deines Gemeinschaftsgartens bittet dich, die Beetregistrierungen zu verwalten. Der Zustand steckt in zwei dynamischen Variablen:

- `registrations`: ein Vektor aus `plot`-Tupeln, die aktuell einer Person zugewiesen sind.
- `next-id`: die Ganzzahl, die für die nächste Registrierung verwendet werden soll.

Das `plot`-Tupel hat zwei Felder:

| Feld            | Typ      |
| --------------- | -------- |
| `id`            | Ganzzahl |
| `registered-to` | String   |

## 1. Öffne den Garten und liste seine Registrierungen auf

Definiere `open-garden`, um die dynamischen Variablen zu initialisieren: einen leeren Vektor für `registrations` und `1` für `next-id`. Definiere dann `list-registrations`, um den aktuellen Vektor der Beete zurückzugeben.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Registriere ein Beet

Definiere `register`, um einen Namen vom Stack zu nehmen, ein neues `plot`-Tupel mit der nächsten verfügbaren ID zu erzeugen, es an den Vektor `registrations` anzuhängen, `next-id` um eins zu erhöhen und das neue Beet zurückzugeben.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Beet-IDs müssen eindeutig sein und auch nach einer Freigabe weiter ansteigen. `next-id` darf niemals einen Wert erneut verwenden.

## 3. Gib ein Beet frei

Definiere `release`, um eine ID zu nehmen und den passenden Eintrag aus `registrations` zu entfernen. Wenn du eine unbekannte ID freigibst, ist das ein No-Op.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Hole ein registriertes Beet

Definiere `get-registration`, um eine ID zu nehmen und das passende Beet zurückzugeben, oder das Symbol `not-found`, wenn kein Beet diese ID hat.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Finde Beete nach Namen

Definiere `find-by-name`, um einen Namen zu nehmen und einen Vektor aller Beete zurückzugeben, die aktuell auf diese Person registriert sind.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
