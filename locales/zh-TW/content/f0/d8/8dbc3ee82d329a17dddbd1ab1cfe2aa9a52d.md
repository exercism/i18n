# SELECT 敘述

在 SQL 中，`SELECT` 敘述可讓你從資料庫擷取資料。
`SELECT` 敘述的結果是一個結果集。
結果集包含以資料列和欄位排列的值。
每個欄位代表資料的某個特定屬性。
每個資料列都包含每個欄位的值。

可以這樣想：一組欄位代表一種資料結構，其中每個欄位代表該資料結構的一個欄位，每個資料列則代表該資料結構的一個實例。

使用 `SELECT` 敘述時，你可以指定想擷取的資料。
也可以選擇轉換、篩選及／或修改輸出資料的形狀。

## 基本用法

基本 `SELECT` 敘述的結構如下：

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
`FROM` 和 `WHERE` 子句是選用的。
例如，像 `SELECT "Hello, world.";` 這樣的敘述完全有效。

另外請注意，換行並非必要；任何空白都足以分隔 `SELECT` 敘述中的各個子句（也就是各部分）。
~~~~

`SELECT` 關鍵字後面緊接著的就是你希望在結果中出現的欄位清單。
`FROM` 子句指出資料來源，通常是資料庫中的一張資料表。
`WHERE` 子句會依據一個或多個條件篩選輸出資料。

例如，假設有個資料庫，其中名為 `inventory` 的資料表包含下列資料：

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

如果我們想擷取資料表中的所有資料，可以執行下列查詢：

```sql
SELECT * FROM inventory;
```

結果：

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

如果只想取得 category 和 product_name 的值，可以指定這些欄位：

```sql
SELECT category, product_name FROM inventory;
```

結果：

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

## 使用 WHERE 子句篩選資料

`WHERE` 子句可讓你篩選 `SELECT` 敘述所擷取的資料。
例如，如果只想取得 Appliances 的資料，可以這樣寫：

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

結果：
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

或者，我們只想取得 weight 介於 2.0 和 6.0 之間的資料：

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

結果：
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

除了 `=` 和 `BETWEEN...AND` 之外，`WHERE` 子句還支援各式各樣的運算式，包括比較（`<`、`<=`、`>`、`>=`）、樣式比對（`LIKE`、`GLOB`、`REGEXP`、`MATCH`），以及檢查某值是否屬於清單（`IN`、`NOT IN`）。
完整的說明請參閱 [SQL 語言運算式](sql-expr)。

[sql-expr]: https://sqlite.org/lang_expr.html
