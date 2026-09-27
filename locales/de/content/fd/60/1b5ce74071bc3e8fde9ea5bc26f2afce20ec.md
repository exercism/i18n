# Instructions

Du arbeitest seit einer Weile im Stadtbüro und hast dir eine Reihe von Tools gebaut, die deine tägliche Arbeit beschleunigen, zum Beispiel das Ausfüllen von Formularen.

Jetzt bekommst du eine neue Kollegin oder einen neuen Kollegen, und dir ist aufgefallen, dass deine Tools vielleicht nicht selbsterklärend sind.
In deinem Büro gibt es viele merkwürdige Konventionen, zum Beispiel Formulare immer in Großbuchstaben auszufüllen und keine Felder leer zu lassen.

Als ersten Schritt beschließt du, PHP-Typdeklarationen hinzuzufügen. So können sich neue Kolleginnen und Kollegen schnell zurechtfinden und deine Tools direkt nutzen.

## 1. Deklariere die Typen für die Klasse `Address`

Füge für jede deklarierte Eigenschaft der Klasse `Address` eine Typdeklaration hinzu.
Jede Eigenschaft der Klasse wird als String deklariert.

## 2. Deklariere die Typen, um das Formular mit leeren Werten auszufüllen

Füge der Methode `blanks` in der Klasse `Form` eine Parametertypdeklaration und eine Rückgabetypdeklaration hinzu.
Die Methode nimmt eine Ganzzahl als Länge entgegen und gibt eine String-Darstellung der leeren Zeile zurück.

## 3. Deklariere den Typ, wenn du einen Wert in einzelne Buchstaben aufteilst

Füge der Methode `letters` in der Klasse `Form` eine Parametertypdeklaration und eine Rückgabetypdeklaration hinzu.
Die Methode nimmt einen String entgegen, der Wörter darstellt, und gibt ein Array mit Buchstaben zurück.

## 4. Deklariere den Typ, wenn du prüfst, ob ein Wert in ein Formular passt

Füge der Methode `checkLength` in der Klasse `Form` Parametertypdeklarationen und eine Rückgabetypdeklaration hinzu.
Die Methode nimmt ein Wort als String und eine maximale Länge als Ganzzahl entgegen und gibt einen Wert zurück, der wahr oder falsch ist.

## 5. Deklariere den Typ, wenn du eine Adresse im Formular formatierst

Füge der Methode `formatAddress` in der Klasse `Form` eine Parametertypdeklaration unter Verwendung der zuvor aktualisierten Klasse `Address` sowie eine Rückgabetypdeklaration hinzu.
Die Methode nimmt eine `Address` entgegen und gibt einen formatierten String zurück.
