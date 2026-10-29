# SELECT 语句

在 SQL 中，`SELECT` 语句让你可以从数据库中检索数据。
`SELECT` 语句的结果是一个结果集。
结果集包含按行和列排列的值。
每一列都是数据的一个特定属性。
每一行都包含每一列对应的值。

可以这样理解：一组列代表一种数据结构，其中每一列代表该数据结构的一个字段，每一行则代表该数据结构的一个实例。

借助 `SELECT` 语句，你可以指定想要检索的数据。
你还可以选择性地转换、过滤输出数据，或修改输出数据的形态，也可以把这些操作组合起来。

## 基础

一条基本的 `SELECT` 语句结构如下：

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
`FROM` 和 `WHERE` 子句是可选的。
例如，像 `SELECT "Hello, world.";` 这样的语句完全合法。

另请注意，换行并不是必需的；任何空白都足以分隔 `SELECT` 语句的不同子句（也就是它的各个部分）。
~~~~

紧跟 `SELECT` 关键字之后的是你希望在结果中出现的列的列表。
`FROM` 子句指明数据的来源，通常就是数据库中的一张表。
`WHERE` 子句按一个或多个条件过滤输出数据。

例如，假设有一个数据库，其中有一张名为 `inventory` 的表，包含以下数据：

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

如果我们想检索表中的所有数据，可以运行以下查询：

```sql
SELECT * FROM inventory;
```

结果：

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

如果我们只想要 category 和 product_name 的值，可以只指定这两列：

```sql
SELECT category, product_name FROM inventory;
```

结果：

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

## 用 WHERE 子句过滤数据

`WHERE` 子句让你可以过滤 `SELECT` 语句检索到的数据。
例如，如果我们只想要 Appliances，可以这样做：

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

结果：
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

或者，我们只想要 weight 在 2.0 到 6.0 之间的数据：

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

结果：
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

除了 `=` 和 `BETWEEN...AND`，`WHERE` 子句还支持多种表达式，包括比较（`<`、`<=`、`>`、`>=`）、模式匹配（`LIKE`、`GLOB`、`REGEXP`、`MATCH`），以及检查某个值是否在列表中（`IN`、`NOT IN`）。
完整的文档请参阅 [SQL Language Expressions](sql-expr)。

[sql-expr]: https://sqlite.org/lang_expr.html
