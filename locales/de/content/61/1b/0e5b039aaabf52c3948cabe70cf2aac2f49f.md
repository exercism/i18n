# Anleitung

Die Tanzgruppe plant ihre Abschlussvorstellung am Jahresende: wie viele Möglichkeiten es gibt, die Tänzerinnen und Tänzer aufzustellen, und wie sich die Laufzeit auf die Akte verteilt.

Alle fünf Aufgaben kommen in die Klasse `FORMATION_COUNT`.

## 1. Wie viele Aufstellungen?

Mit `n` Tänzerinnen und Tänzern gibt es `n` Fakultät Möglichkeiten, sie aufzustellen: `n` Möglichkeiten für die Spitze, dann `n-1` für die nächste und so weiter. Gib das als `INTI` zurück. Null Tänzerinnen und Tänzer haben genau eine Aufstellung, nämlich die leere.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Schreib sie aus

Dieselbe Zahl als String, jede einzelne Ziffer davon.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

In einen `INT` passt diese Zahl nicht, und genau darum geht es in dieser Aufgabe.

## 3. Der Anteil eines Akts

Eine Show aus `acts` gleich großen Akten gibt jedem Akt `1/acts` der Laufzeit. Gib das als `RAT` zurück.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Zwei Akte zusammen

Addiere zwei Anteile und gib die Gesamtsumme exakt zurück.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. Füllt er die ganze Show?

Beantworte, ob ein Anteil genau die ganze Show ist, also genau eins.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
