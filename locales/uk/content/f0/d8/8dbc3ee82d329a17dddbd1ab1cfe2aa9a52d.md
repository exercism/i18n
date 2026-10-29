# Інструкція `SELECT`

У SQL інструкція `SELECT` дає змогу отримувати дані з бази даних.
Інструкція `SELECT` повертає набір результатів.
Набір результатів містить значення, упорядковані в рядки та стовпці.
Кожен стовпець - це окремий атрибут даних.
Кожен рядок містить значення для кожного стовпця.

Можна уявити це так: набір стовпців утворює структуру даних, у якій кожен стовпець відповідає полю цієї структури, а кожен рядок - окремому її екземпляру.

За допомогою інструкції `SELECT` ми можемо вказати, які дані хочемо отримати.
Крім того, за бажанням ми можемо перетворювати, фільтрувати та/або змінювати форму вихідних даних.

## Основи

Базова інструкція `SELECT` має таку будову:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
Речення `FROM` і `WHERE` необовʼязкові.
Наприклад, цілком допустимою є інструкція на кшталт `SELECT "Hello, world.";`.

Зауважмо також, що розриви рядків не обовʼязкові; щоб розділити різні речення (тобто частини) інструкції `SELECT`, достатньо будь-якого проміжку.
~~~~

Одразу після ключового слова `SELECT` іде список стовпців, які ми хочемо бачити в результаті.
Речення `FROM` визначає джерело даних, яким зазвичай є таблиця в базі даних.
Речення `WHERE` фільтрує вихідні дані за одним або кількома критеріями.

Наприклад, розгляньмо базу даних із таблицею `inventory`, що містить такі дані:

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

Якщо ми хочемо отримати всі дані з таблиці, можемо виконати такий запит:

```sql
SELECT * FROM inventory;
```

Результат:

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

Якщо нам потрібні лише значення category і product_name, ми можемо вказати ці стовпці:

```sql
SELECT category, product_name FROM inventory;
```

Результат:

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

## Фільтрування даних за допомогою речення WHERE

Речення `WHERE` дає змогу фільтрувати дані, отримані інструкцією `SELECT`.
Наприклад, якщо нам потрібні лише Appliances, можемо зробити так:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Результат:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Або, можливо, нам потрібні лише дані, у яких weight лежить між 2.0 і 6.0:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Результат:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

Окрім `=` і `BETWEEN...AND`, речення `WHERE` підтримує широкий набір виразів, зокрема порівняння (`<`, `<=`, `>`, `>=`), зіставлення з шаблоном (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) і перевірку належності до масиву (`IN`, `NOT IN`).
Повну документацію дивіть у розділі [Вирази мови SQL](sql-expr).

[sql-expr]: https://sqlite.org/lang_expr.html
