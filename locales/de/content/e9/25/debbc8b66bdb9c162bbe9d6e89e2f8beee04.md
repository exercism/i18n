# Bedingte Anweisungen

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

Die Frage zwischen `if` und `then` muss ein `BOOL` sein. Sather akzeptiert dort
keine Zahl, deshalb gibt es auch nicht die C-Angewohnheit, die Null als falsch
zu werten.

## Der Aufbau

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

Die Fragen werden von oben nach unten gestellt, und die erste, die mit wahr
antwortet, gewinnt. Alles darunter wird übersprungen, ohne überhaupt gefragt zu
werden. Deshalb muss eine Kette vom spezifischsten Test zum allgemeinsten
gehen: Wenn `score >= 5` über `score >= 8` steht, wird das zweite nie erreicht.

`else` ist optional. `elsif` kann beliebig oft wiederholt werden.

## Bedingte Anweisungen sind Anweisungen, keine Werte

`if` erzeugt selbst keinen Wert, deshalb ist das hier kein Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

Gib entweder in jedem Zweig etwas zurück oder weise in jedem Zweig einer
Variable einen Wert zu.

## Wann du keine brauchst

Eine Routine, die eine Frage beantwortet, sollte die Frage zurückgeben:

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

Die zweite Variante sagt nichts, was die erste nicht schon sagt, und ist dabei
dreimal so lang.

## Verschachtelung

Ein `if` kann ein weiteres `if` enthalten. Oft muss es das gar nicht: Zwei
Fragen, die beide zutreffen müssen, lassen sich stattdessen mit `and`
verbinden, was besser lesbar ist.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
