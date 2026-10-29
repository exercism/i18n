# Die SELECT-Anweisung

In SQL kannst du mit einer `SELECT`-Anweisung Daten aus einer Datenbank abrufen.
Das Ergebnis einer `SELECT`-Anweisung ist eine Ergebnismenge.
Eine Ergebnismenge enthält Werte, die in Zeilen und Spalten angeordnet sind.
Jede Spalte steht für ein bestimmtes Attribut der Daten.
Jede Zeile enthält einen Wert für jede Spalte.

Eine Möglichkeit, sich das vorzustellen: Eine Gruppe von Spalten bildet eine Datenstruktur, wobei jede Spalte ein Feld der Datenstruktur und jede Zeile eine Instanz der Datenstruktur darstellt.

Mit einer `SELECT`-Anweisung legst du fest, welche Daten du abrufen möchtest.
Außerdem kannst du die Ausgabedaten optional umformen, filtern und/oder ihre Struktur ändern.

## Die Grundlagen

Der Aufbau einer einfachen `SELECT`-Anweisung sieht so aus:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
Die Klauseln `FROM` und `WHERE` sind optional.
Zum Beispiel ist eine Anweisung wie `SELECT "Hello, world.";` völlig gültig.

Beachte außerdem, dass Zeilenumbrüche nicht nötig sind; beliebige Abstände reichen aus, um die verschiedenen Klauseln (also Teile) der `SELECT`-Anweisung voneinander zu trennen.
~~~~

Direkt auf das Schlüsselwort `SELECT` folgt eine Liste der Spalten, die du im Ergebnis haben möchtest.
Die `FROM`-Klausel gibt die Datenquelle an, die normalerweise eine Tabelle in der Datenbank ist.
Die `WHERE`-Klausel filtert die Ausgabedaten anhand eines oder mehrerer Kriterien.

Betrachte zum Beispiel eine Datenbank mit einer Tabelle namens `inventory`, die die folgenden Daten enthält:

|     upc      |  category  |    supplier    |    brand    |           product_name           | weight | stock |
|--------------|------------|----------------|-------------|----------------------------------|--------|-------|
| 812345670019 | Cookware   | KitchenCo      | HearthStone | 10" Non-Stick Skillet            | 1.8    | 42    |
| 845678120334 | Utensils   | HomePro Supply | PrepMaster  | Stainless Steel Ladle            | 0.4    | 120   |
| 899001234556 | Appliances | Culinary Depot | QuickBrew   | Single-Serve Coffee Maker        | 4.2    | 18    |
| 823450987112 | Cookware   | KitchenCo      | FreshKeep   | 12-Piece Glass Container Set     | 6      | 33    |
| 867530900221 | Utensils   | HomePro Supply | EdgeCraft   | 8' Chef's Knife                  | 0.6    | 27    |
| 880012349876 | Appliances | Culinary Depot | HeatWave    | Compact Toaster Oven             | 7.5    | 14    |
| 833221109443 | Utensils   | HomePro Supply | PureScrub   | Heavy-Duty Kitchen Sponge (3-pk) | 0.2    | 200   |
| 899998877665 | Cookware   | KitchenCo      | IronCraft   | Cast-Iron Grill Pan              | 5.3    | 21    |
| 844110220987 | Appliances | Culinary Depot | BlendPro    | High-Speed Personal Blender      | 3.1    | 16    |

Wenn wir alle Daten aus der Tabelle abrufen möchten, können wir die folgende Abfrage ausführen:

```sql
SELECT * FROM inventory;
```

Ergebnis:

```
upc           category    supplier        brand        product_name                      weight  stock
------------  ----------  --------------  -----------  --------------------------------  ------  -----
812345670019  Cookware    KitchenCo       HearthStone  10" Non-Stick Skillet             1.8     42   
845678120334  Utensils    HomePro Supply  PrepMaster   Stainless Steel Ladle             0.4     120  
899001234556  Appliances  Culinary Depot  QuickBrew    Single-Serve Coffee Maker         4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep    12-Piece Glass Container Set      6       33   
867530900221  Utensils    HomePro Supply  EdgeCraft    8' Chef's Knife                   0.6     27   
880012349876  Appliances  Culinary Depot  HeatWave     Compact Toaster Oven              7.5     14   
833221109443  Utensils    HomePro Supply  PureScrub    Heavy-Duty Kitchen Sponge (3-pk)  0.2     200  
899998877665  Cookware    KitchenCo       IronCraft    Cast-Iron Grill Pan               5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro     High-Speed Personal Blender       3.1     16   
```

Wenn wir nur die Werte aus den Spalten category und product_name möchten, könnten wir diese Spalten angeben:

```sql
SELECT category, product_name FROM inventory;
```

Ergebnis:

```
category    product_name                    
----------  --------------------------------
Cookware    10" Non-Stick Skillet           
Utensils    Stainless Steel Ladle           
Appliances  Single-Serve Coffee Maker       
Cookware    12-Piece Glass Container Set    
Utensils    8' Chef's Knife                 
Appliances  Compact Toaster Oven            
Utensils    Heavy-Duty Kitchen Sponge (3-pk)
Cookware    Cast-Iron Grill Pan             
Appliances  High-Speed Personal Blender     
```

## Daten mit der WHERE-Klausel filtern

Mit der `WHERE`-Klausel kannst du die Daten filtern, die eine `SELECT`-Anweisung abruft.
Wenn wir zum Beispiel nur Appliances möchten, gehen wir so vor:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Ergebnis:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Oder vielleicht möchten wir nur Daten, bei denen das Gewicht zwischen 2.0 und 6.0 liegt:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Ergebnis:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

Neben `=` und `BETWEEN...AND` unterstützt die `WHERE`-Klausel eine Vielzahl von Ausdrücken, darunter Vergleiche (`<`, `<=`, `>`, `>=`), Musterabgleich (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) und die Prüfung, ob ein Wert in einer Liste enthalten ist (`IN`, `NOT IN`).
Die vollständige Dokumentation findest du unter [SQL-Sprachausdrücke](sql-expr).

[sql-expr]: https://sqlite.org/lang_expr.html
