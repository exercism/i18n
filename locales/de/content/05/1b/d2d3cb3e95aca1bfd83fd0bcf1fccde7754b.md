# Rekursion in JavaScript verstehen

Rekursion ist ein mächtiges Konzept in der Programmierung: Eine Funktion ruft sich selbst auf.
Am Anfang ist das etwas knifflig zu verstehen, aber sobald du die Grundlagen beherrschst, wird daraus ein wertvolles Werkzeug, um komplexe Probleme zu lösen.
Wir schauen uns die Rekursion in JavaScript anhand leicht verständlicher Beispiele an.

## Was ist Rekursion?

Rekursion liegt vor, wenn eine Funktion sich selbst aufruft, direkt oder indirekt.
Das ähnelt einer Schleife, aber dabei kann ein Problem in kleinere, besser handhabbare Teilprobleme zerlegt werden.

### Beispiel 1: Countdown

Fangen wir mit einem einfachen Beispiel an: einer Countdown-Funktion.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

In diesem Beispiel:

- **Basisfall**: Wenn `num` kleiner oder gleich 0 wird, gibt die Funktion „Blastoff!" aus und ruft sich nicht mehr selbst auf.
- **Rekursiver Fall**: Die Funktion gibt das aktuelle `num` aus und ruft sich selbst mit `num - 1` auf.

### Beispiel 2: Fakultät

Schauen wir uns jetzt ein klassisches Beispiel für Rekursion an: die Berechnung der Fakultät einer Zahl.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

In diesem Beispiel:

- **Basisfall**: Wenn `n` 0 oder 1 ist, gibt die Funktion 1 zurück.
- **Rekursiver Fall**: Die Funktion multipliziert `n` mit der Fakultät von `n - 1`.

## Wichtige Konzepte

### Basisfall

Jede rekursive Funktion sollte mindestens einen Basisfall haben, also eine Bedingung, bei der die Funktion aufhört, sich selbst aufzurufen.
Ohne einen Basisfall würde die Rekursion endlos weiterlaufen und zu einem Stack Overflow führen.

### Rekursiver Fall

Der rekursive Fall legt fest, wie die Funktion sich selbst mit einer kleineren oder einfacheren Version des Problems aufruft.

## Vor- und Nachteile der Rekursion

**Vorteile:**

- Elegante Lösung für bestimmte Probleme.
- Ahmt das Konzept der mathematischen Induktion nach.

**Nachteile:**

- Kann ineffizienter sein als iterative Lösungen.
- Kann bei tiefer Rekursion zu einem Stack Overflow führen.

## Fazit

Rekursion ist eine wertvolle Technik, die komplexe Probleme vereinfacht, indem sie sie in kleinere, besser handhabbare Teilprobleme zerlegt.
Um in JavaScript effektive rekursive Lösungen zu schreiben, ist es entscheidend, Basisfälle und rekursive Fälle zu verstehen.

**Mehr erfahren:**

- [MDN: Recursion in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: Chapter 3 - Functions](https://eloquentjavascript.net/03_functions.html)
