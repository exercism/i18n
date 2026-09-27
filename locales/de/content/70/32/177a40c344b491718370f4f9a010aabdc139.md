# Anweisungen

Eine Forschungseinrichtung hat bemerkt, dass einige ihrer jungen Forschenden bei ihren Analysen mit wenig optimalen Methoden gearbeitet haben.
Eine dieser Methoden besteht darin, diskrete Wahrscheinlichkeiten sofort in Gleitkommazahlen (also reelle Zahlen) umzuwandeln, bevor weitere Berechnungen durchgeführt werden.

Die erfahrenen Forschenden ziehen es vor, mit rationalen Zahlen zu rechnen, weil das eine höhere Genauigkeit liefern kann. Sie möchten wissen, ob die schlechten Praktiken der jungen Forschenden die Ergebnisse der Studien beeinflusst haben.

Es wurden zwei Arten von Studien durchgeführt:
- Es wurden viele Tests durchgeführt, von denen jeder eine diskrete Wahrscheinlichkeit für einen Erfolg lieferte, und anschließend wurde der Mittelwert dieser Wahrscheinlichkeiten berechnet.
- Es wurden viele unabhängige Ereignisse getestet, und die Gesamtwahrscheinlichkeit, dass alle Ereignisse eintreten, wurde durch Multiplikation berechnet.

Die erfahrenen Forschenden bitten dich, Funktionen zu schreiben, mit denen sie feststellen können, ob die Verwendung von Gleitkommazahlen zu Rundungsfehlern in den Analysen geführt hat. Außerdem sollst du für das Ergebnis eine genaue rationale Zahl angeben, wenn es Fehler gibt.

## 1. Gib das Verhältnis von Erfolgen zu Versuchen an

Die Funktion `rationalize(successes, trials)` nimmt zwei Arrays, `successes` und `trials`.
Für einen Index `i` entspricht `successes[i]` der Anzahl der Erfolge, die bei `trials[i]` Versuchen aufgetreten sind.
Die Funktion gibt ein Array rationaler Zahlen zurück, nämlich die Erfolge geteilt durch die Anzahl der Versuche, in derselben Reihenfolge wie die Eingabe-Arrays.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Finde die reellen Wahrscheinlichkeiten für Erfolge und Versuche

Ebenso nimmt die Funktion `probabilities(successes, trials)` zwei Arrays, `successes` und `trials`.
Sie gibt ein Array von Gleitkommazahlen zurück, nämlich die Erfolge geteilt durch die Anzahl der Versuche, in derselben Reihenfolge wie die Eingabe-Arrays.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Prüfe den Mittelwert der Wahrscheinlichkeiten

Die Funktion `checkmean(successes, trials)` nimmt die beiden Arrays `successes` und `trials`.
Sie vergleicht den Mittelwert der reellen Wahrscheinlichkeiten mit dem Mittelwert der rationalen Wahrscheinlichkeiten.
- Sind die beiden Wahrscheinlichkeiten gleich, gibt `checkmean` `true` zurück.
- Unterscheiden sich die beiden Wahrscheinlichkeiten, gibt `checkmean` die rationale Wahrscheinlichkeit zurück.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Prüfe die unabhängige Wahrscheinlichkeit

Die Funktion `checkprob(successes, trials)` nimmt die beiden Arrays `successes` und `trials`.
Sie vergleicht die Gesamtwahrscheinlichkeit aus den Gleitkommawahrscheinlichkeiten mit der Gesamtwahrscheinlichkeit aus den rationalen Wahrscheinlichkeiten.
- Sind die beiden Wahrscheinlichkeiten gleich, gibt `checkprob` `true` zurück.
- Unterscheiden sich die beiden Wahrscheinlichkeiten, gibt `checkprob` die rationale Wahrscheinlichkeit zurück.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
