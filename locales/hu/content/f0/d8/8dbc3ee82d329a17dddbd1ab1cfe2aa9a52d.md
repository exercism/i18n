# A SELECT utasítás

Az SQL-ben egy `SELECT` utasítással adatokat kérdezhetsz le egy adatbázisból.
A `SELECT` utasítás eredménye egy eredményhalmaz.
Az eredményhalmaz sorokba és oszlopokba rendezett értékeket tartalmaz.
Minden oszlop az adatok egy bizonyos attribútuma.
Minden sor minden oszlophoz tartalmaz egy értéket.

Gondolhatunk rá úgy is, hogy az oszlopok halmaza egy adatszerkezetet ír le, ahol minden oszlop az adatszerkezet egy mezője, minden sor pedig az adatszerkezet egy példánya.

A `SELECT` utasítással megadhatod, milyen adatokat szeretnél lekérdezni.
Emellett igény szerint átalakíthatod, szűrheted és/vagy módosíthatod a kimenő adatok alakját.

## Az alapok

Egy egyszerű `SELECT` utasítás felépítése a következő:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
A `FROM` és a `WHERE` záradék elhagyható.
Egy `SELECT "Hello, world.";` utasítás például teljesen érvényes.

Az sem kötelező, hogy sortöréseket használj: a `SELECT` utasítás egyes záradékait (részeit) bármilyen térköz elválasztja egymástól.
~~~~

A `SELECT` kulcsszót közvetlenül követi azon oszlopok listája, amelyeket az eredményben szeretnél látni.
A `FROM` záradék jelöli meg az adatok forrását, ami általában egy tábla az adatbázisban.
A `WHERE` záradék egy vagy több feltétel alapján szűri a kimenő adatokat.

Vegyünk például egy adatbázist, amelyben van egy `inventory` nevű tábla, benne a következő adatokkal:

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

Ha a tábla összes adatát le akarjuk kérdezni, futtathatjuk a következő lekérdezést:

```sql
SELECT * FROM inventory;
```

Eredmény:

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

Ha csak a category és a product_name értékére vagyunk kíváncsiak, megadhatjuk ezeket az oszlopokat:

```sql
SELECT category, product_name FROM inventory;
```

Eredmény:

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

## Adatok szűrése a WHERE záradékkal

A `WHERE` záradék segítségével szűrheted a `SELECT` utasítás által visszaadott adatokat.
Ha például csak az Appliances kategóriájú termékeket szeretnénk, ezt így tehetjük meg:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Eredmény:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Vagy lehet, hogy csak azokat az adatokat szeretnénk, ahol a weight értéke 2.0 és 6.0 között van:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Eredmény:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

A `WHERE` záradék a `=` és a `BETWEEN...AND` mellett sokféle kifejezést támogat: összehasonlítást (`<`, `<=`, `>`, `>=`), mintaillesztést (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) és egy listához való tartozás vizsgálatát (`IN`, `NOT IN`).
A teljes dokumentációt az [SQL Language Expressions](sql-expr) oldalon találod.

[sql-expr]: https://sqlite.org/lang_expr.html
