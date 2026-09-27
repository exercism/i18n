# Anleitung

Deine Nostalgie für Blorkemon™️-Karten lässt nicht nach, du hast sogar wieder angefangen, sie zu sammeln, und steckst jetzt deine Freunde damit an.

In dieser Übung verwendest du das `Set`-Interface, um deine Sammlung zu verwalten. Doppelte Karten spielen nämlich keine Rolle, wenn dein Ziel ist, alle existierenden Karten zu bekommen.

## 1. Starte eine Sammlung

Du hast gerade deinen alten Vorrat an Blorkemon™️-Karten gefunden!
Der Vorrat enthält jede Menge doppelte Karten, also ist es Zeit, eine neue Sammlung anzulegen und die Duplikate zu entfernen.

Du möchtest unbedingt, dass deine Freunde bei deinem Blorkemon™️-Wahnsinn mitmachen, und am besten startest du ihre Sammlung, indem du ihnen eine Karte schenkst.

Implementiere die Methode `newCollection`, die eine Liste von Karten in ein `Set` umwandelt, das deine neue Sammlung darstellt.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Lass die Sammlung wachsen

Sobald du eine Sammlung hast, verselbstständigt sie sich und muss wachsen.

Implementiere die Methode `addCard`, die eine neue Karte und dein aktuelles Set der gesammelten Karten entgegennimmt.
Die Methode soll die neue Karte zur Sammlung hinzufügen, wenn sie noch nicht vorhanden ist, und ein `boolean` zurückgeben, das angibt, ob die Sammlung aktualisiert wurde.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Beginne zu tauschen

Du möchtest unbedingt, dass deine Freunde bei deinem Blorkemon™️-Wahnsinn mitmachen, also wird es Zeit, mit dem Tauschen anzufangen!

Beim Tauschen mit Freunden ist nicht jeder Tausch sinnvoll oder überhaupt möglich.
Du solltest nur tauschen, wenn sowohl du als auch dein Freund eine Karte haben, die der andere nicht hat.

Implementiere die Methode `canTrade`, die deine aktuelle Sammlung und die Sammlung eines deiner Freunde entgegennimmt.
Sie soll ein `boolean` zurückgeben, das angibt, ob nach den obigen Regeln ein Tausch möglich ist.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Finde die gemeinsamen Karten

Du und deine Blorkemon™️-begeisterten Freunde trefft euch und fragt euch, welche Karten am häufigsten vorkommen.

Implementiere die Methode `commonCards`, die eine Liste von Sammlungen entgegennimmt und eine Sammlung der Karten zurückgibt, die alle Sammlungen enthalten.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Alle Karten

Besitzt du zusammen mit deinen Freunden alle Blorkemon™️-Karten?

Implementiere die Methode `allCards`, die eine Liste von Sammlungen entgegennimmt und eine Sammlung aller verschiedenen Karten zurückgibt, die in allen Sammlungen zusammen vorkommen.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
