# Anleitung

In dieser Übung schreibst du etwas Code, der dir hilft, eine großartige Lasagne aus deinem Lieblingskochbuch zu kochen.

Du hast drei Aufgaben, die alle mit der Zeit zu tun haben, die du für die Zubereitung der Lasagne brauchst.

## 1. Definiere die erwartete Backzeit in Minuten

Definiere `expectedMinutesInOven`, um zu berechnen, wie viele Minuten die Lasagne im Ofen bleiben sollte. Laut Kochbuch beträgt die erwartete Backzeit 40 Minuten:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Berechne die Vorbereitungszeit in Minuten

Definiere `preparationTimeInMinutes`. Die Funktion nimmt die Anzahl der Schichten der Lasagne als Parameter und gibt zurück, wie viele Minuten die Vorbereitung der Lasagne dauert. Dabei gehst du davon aus, dass jede Schicht 2 Minuten zum Vorbereiten braucht.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Berechne die verstrichene Zeit in Minuten

Definiere die Funktion `elapsedTimeInMinutes`, die zwei Parameter nimmt: Der erste Parameter ist die Anzahl der Schichten der Lasagne und der zweite Parameter die Anzahl der Minuten, die die Lasagne schon im Ofen war. Die Funktion soll zurückgeben, wie viele Minuten du mit der Zubereitung der Lasagne verbracht hast. Das ist die Summe aus der Vorbereitungszeit in Minuten und der Zeit in Minuten, die die Lasagne bis jetzt im Ofen verbracht hat.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
