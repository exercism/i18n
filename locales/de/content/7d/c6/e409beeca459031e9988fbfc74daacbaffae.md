# Anleitung

In dieser Übung übersetzt du einige Regeln aus dem klassischen Spiel Pac-Man in Elixir-Funktionen.

Du hast vier Regeln zu übersetzen, die alle mit den Spielzuständen zusammenhängen.

> Mach dir keine Gedanken darüber, wie die Argumente zustande kommen. Konzentriere dich darauf, die Argumente so zu kombinieren, dass das gewünschte Ergebnis zurückgegeben wird.

## 1. Definiere, ob Pac-Man einen Geist frisst

Definiere die Funktion `Rules.eat_ghost?/2`, die zwei Argumente entgegennimmt (_ob bei Pac-Man eine Kraftpille aktiv ist_ und _ob Pac-Man einen Geist berührt_) und einen booleschen Wert zurückgibt, der angibt, ob Pac-Man den Geist fressen kann. Die Funktion sollte nur dann wahr zurückgeben, wenn bei Pac-Man eine Kraftpille aktiv ist und er einen Geist berührt.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Definiere, ob Pac-Man punktet

Definiere die Funktion `Rules.score?/2`, die zwei Argumente entgegennimmt (_ob Pac-Man eine Kraftpille berührt_ und _ob Pac-Man einen Punkt berührt_) und einen booleschen Wert zurückgibt, der angibt, ob Pac-Man gepunktet hat. Die Funktion sollte wahr zurückgeben, wenn Pac-Man eine Kraftpille oder einen Punkt berührt.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Definiere, ob Pac-Man verliert

Definiere die Funktion `Rules.lose?/2`, die zwei Argumente entgegennimmt (_ob bei Pac-Man eine Kraftpille aktiv ist_ und _ob Pac-Man einen Geist berührt_) und einen booleschen Wert zurückgibt, der angibt, ob Pac-Man verliert. Die Funktion sollte wahr zurückgeben, wenn Pac-Man einen Geist berührt und keine Kraftpille aktiv ist.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Definiere, ob Pac-Man gewinnt

Definiere die Funktion `Rules.win?/3`, die drei Argumente entgegennimmt (_ob Pac-Man alle Punkte gefressen hat_, _ob bei Pac-Man eine Kraftpille aktiv ist_ und _ob Pac-Man einen Geist berührt_) und einen booleschen Wert zurückgibt, der angibt, ob Pac-Man gewinnt. Die Funktion sollte wahr zurückgeben, wenn Pac-Man alle Punkte gefressen hat und gemäß den in Teil 3 definierten Argumenten nicht verloren hat.

```elixir
Rules.win?(false, true, false)
# => false
```
