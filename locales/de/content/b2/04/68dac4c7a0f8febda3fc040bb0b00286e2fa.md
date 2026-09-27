# Anleitung

In dieser Übung schreibst du Code, um die Produktion am Fließband einer Autofabrik zu analysieren.
Die Geschwindigkeit des Fließbands reicht von `0` (aus) bis `10` (Maximum).

Bei der langsamsten Geschwindigkeit (`1`) werden `221` Autos pro Stunde produziert.
Die Produktion steigt linear mit der Geschwindigkeit.
Bei Geschwindigkeit `4` sollten also `4 * 221 = 884` Autos pro Stunde produziert werden.
Höhere Geschwindigkeiten erhöhen jedoch die Wahrscheinlichkeit, dass fehlerhafte Autos produziert werden, die dann aussortiert werden müssen.
Die folgende Tabelle zeigt, wie die Geschwindigkeit die Erfolgsquote beeinflusst:

- `1` bis `4`: 100 % Erfolgsquote.
- `5` bis `8`: 90 % Erfolgsquote.
- `9`: 80 % Erfolgsquote.
- `10`: 77 % Erfolgsquote.

Du hast zwei Aufgaben.

## 1. Berechne die Produktionsrate pro Stunde

Berechne die Produktionsrate des Fließbands pro Stunde und berücksichtige dabei die Erfolgsquote.

## 2. Berechne, wie viele funktionierende Autos pro Minute produziert werden

Berechne, wie viele **fertige, funktionierende Autos** pro Minute produziert werden.
