# L'istruzione SELECT

In SQL, un'istruzione `SELECT` ti permette di recuperare dati da un database.
Il risultato di un'istruzione `SELECT` è un set di risultati.
Un set di risultati contiene valori disposti in righe e colonne.
Ogni colonna è un particolare attributo dei dati.
Ogni riga contiene un valore per ogni colonna.

Un modo per vederla è che un insieme di colonne rappresenta una struttura dati, dove ogni colonna rappresenta un campo della struttura dati e ogni riga rappresenta un'istanza della struttura dati.

Con un'istruzione `SELECT` puoi specificare i dati che vuoi recuperare.
Facoltativamente, puoi anche trasformare, filtrare e/o modificare la forma dei dati di output.

## Le basi

L'anatomia di un'istruzione `SELECT` di base è la seguente:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
Le clausole `FROM` e `WHERE` sono facoltative.
Ad esempio, un'istruzione come `SELECT "Hello, world.";` è perfettamente valida.

Nota anche che le interruzioni di riga non sono obbligatorie; qualsiasi spaziatura è sufficiente per separare le diverse clausole (cioè le parti) dell'istruzione `SELECT`.
~~~~

Subito dopo la parola chiave `SELECT` c'è un elenco delle colonne che vuoi nel risultato.
La clausola `FROM` identifica l'origine dei dati, che in genere è una tabella del database.
La clausola `WHERE` filtra i dati di output in base a uno o più criteri.

Ad esempio, considera un database con una tabella chiamata `inventory` che contiene i dati seguenti:

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

Se vogliamo recuperare tutti i dati dalla tabella, potremmo eseguire la query seguente:

```sql
SELECT * FROM inventory;
```

Risultato:

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

Se vogliamo solo i valori di category e product_name, potremmo specificare quelle colonne:

```sql
SELECT category, product_name FROM inventory;
```

Risultato:

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

## Filtrare i dati con la clausola WHERE

La clausola `WHERE` ti permette di filtrare i dati recuperati da un'istruzione `SELECT`.
Ad esempio, se vogliamo solo la categoria Appliances, possiamo fare così:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Risultato:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Oppure potremmo volere solo i dati in cui il peso è compreso tra 2.0 e 6.0:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Risultato:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

Oltre a `=` e `BETWEEN...AND`, la clausola `WHERE` supporta un'ampia gamma di espressioni, tra cui confronto (`<`, `<=`, `>`, `>=`), corrispondenza di pattern (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) e verifica dell'appartenenza a un elenco (`IN`, `NOT IN`).
Vedi [Espressioni del linguaggio SQL](sql-expr) per la documentazione completa.

[sql-expr]: https://sqlite.org/lang_expr.html
