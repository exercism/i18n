# Anleitung

Du wirst etwas Code schreiben, der dir hilft, eine Lasagne nach einem Rezept aus deinem Lieblingskochbuch zu kochen.

Es erwarten dich fünf Aufgaben, die alle mit dem Kochen deines Rezepts zu tun haben.

## 1. Definiere die erwartete Backofenzeit in Minuten

Setze die Variable `$Lasagna::ExpectedMinutesInOven` auf die Anzahl Minuten, die die Lasagne im Ofen bleiben soll. Laut Kochbuch beträgt die erwartete Backofenzeit 40 Minuten:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Berechne die verbleibende Backofenzeit in Minuten

Ändere die Subroutine `Lasagna::remaining_minutes_in_oven`, die die tatsächlichen Minuten, die die Lasagne schon im Ofen war, als Argument entgegennimmt, so, dass sie zurückgibt, wie viele Minuten die Lasagne noch im Ofen bleiben muss. Grundlage dafür ist die erwartete Backofenzeit in Minuten aus der vorherigen Aufgabe.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Berechne die Vorbereitungszeit in Minuten

Ändere die Subroutine `Lasagna::preparation_time_in_minutes`, die die Anzahl der Schichten, die du zur Lasagne hinzugefügt hast, als Argument entgegennimmt, so, dass sie zurückgibt, wie viele Minuten du für die Vorbereitung der Lasagne gebraucht hast. Gehe davon aus, dass jede Schicht 2 Minuten Vorbereitung braucht.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Berechne die gesamte Arbeitszeit in Minuten

Ändere die Subroutine `Lasagna::total_time_in_minutes`, die zwei Argumente entgegennimmt: Das erste Argument ist die Anzahl der Schichten, die du zur Lasagne hinzugefügt hast, und das zweite Argument ist die Anzahl der Minuten, die die Lasagne schon im Ofen war.
Die Subroutine soll zurückgeben, wie viele Minuten du insgesamt mit dem Kochen der Lasagne verbracht hast, also die Summe aus der Vorbereitungszeit in Minuten und der Zeit in Minuten, die die Lasagne im Moment im Ofen verbracht hat.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Erstelle eine Benachrichtigung, dass die Lasagne fertig ist

Ändere die Subroutine `Lasagna::oven_alarm`, die keine Argumente entgegennimmt, so, dass sie eine Nachricht zurückgibt, die anzeigt, dass die Lasagne fertig zum Essen ist.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
