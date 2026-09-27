# Anleitung

Die Netballsaison ist vorbei und die Rangliste entscheidet, wer das Finale spielt.

Der Stub gibt dir eine `TEAM`-Klasse. Schreibe darunter `FINALS_LADDER`.

## 1. Wer steht über wem?

`higher` nimmt zwei Teams und beantwortet, ob das erste über dem zweiten stehen sollte. Wer mehr Punkte hat, steht weiter oben. Teams mit gleicher Punktzahl trennt die Tordifferenz, die höhere zuerst.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. Die Rangliste

`ladder` nimmt die Teams in beliebiger Reihenfolge und gibt sie geordnet zurück. Das übergebene Array muss unverändert bleiben.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Die Rangliste ausgeben

`names` nimmt ein Array von Teams und gibt deren Namen zurück, verbunden mit `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Die Erstplatzierten

`premiers` nimmt die Teams in beliebiger Reihenfolge und gibt den Namen des Teams an der Spitze zurück. Ohne Teams ist die Antwort `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Eine ganz andere Reihenfolge

`shortest_first` nimmt ein Array von Strings und gibt sie nach Länge geordnet zurück, die kürzesten zuerst. Strings gleicher Länge kommen in alphabetischer Reihenfolge.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

Der Tie-Break ist keine Verzierung. Die Sortierung ist nicht stabil, deshalb könnten zwei Namen gleicher Länge ohne ihn in beliebiger Reihenfolge herauskommen.

Das ist dieselbe Sortierroutine wie in Aufgabe 2, nur mit einer anderen Regel. Genau darum geht es in dieser Übung.
