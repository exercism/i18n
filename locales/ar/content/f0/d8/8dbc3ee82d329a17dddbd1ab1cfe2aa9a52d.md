# عبارة SELECT

في SQL، تتيح لك عبارة `SELECT` استرجاع البيانات من قاعدة البيانات.
ونتيجة عبارة `SELECT` هي مجموعة نتائج.
تحتوي مجموعة النتائج على قيم مرتبة في صفوف وأعمدة.
كل عمود سمة معينة من سمات البيانات.
وكل صف يحتوي على قيمة لكل عمود.

أحد أساليب التفكير في الأمر أن مجموعة الأعمدة تمثل بنية بيانات، حيث يمثل كل عمود حقلًا من حقول بنية البيانات، ويمثل كل صف نسخة من بنية البيانات.

باستخدام عبارة `SELECT` يمكنك تحديد البيانات التي تريد استرجاعها.
ويمكنك أيضًا، على سبيل الاختيار، تحويل البيانات الناتجة أو تصفيتها أو تعديل شكلها.

## الأساسيات

يتكوّن الهيكل الأساسي لعبارة `SELECT` على النحو التالي:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
جملتا `FROM` و`WHERE` اختياريتان.
فعلى سبيل المثال، عبارة مثل `SELECT "Hello, world.";` صحيحة تمامًا.

لاحظ أيضًا أن فواصل الأسطر ليست ضرورية؛ فأي مسافات تكفي للفصل بين جمل عبارة `SELECT` المختلفة (أي أجزائها).
~~~~

يأتي مباشرة بعد الكلمة المفتاحية `SELECT` قائمة بالأعمدة التي تريدها في النتيجة.
وتحدد جملة `FROM` مصدر البيانات، وهو عادةً جدول في قاعدة البيانات.
وتُصفّي جملة `WHERE` البيانات الناتجة وفق معيار واحد أو أكثر.

على سبيل المثال، لنأخذ قاعدة بيانات تحتوي على جدول اسمه `inventory` وفيه البيانات التالية:

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

إذا أردنا استرجاع كل البيانات من الجدول، يمكننا تشغيل الاستعلام التالي:

```sql
SELECT * FROM inventory;
```

النتيجة:

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

وإذا أردنا قيم category وproduct_name فقط، يمكننا تحديد هذين العمودين:

```sql
SELECT category, product_name FROM inventory;
```

النتيجة:

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

## تصفية البيانات بجملة WHERE

تتيح لك جملة `WHERE` تصفية البيانات التي تسترجعها عبارة `SELECT`.
فعلى سبيل المثال، إذا أردنا منتجات فئة Appliances فقط، يمكننا القيام بما يلي:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

النتيجة:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

أو ربما نريد البيانات التي يقع وزنها بين 2.0 و6.0 فقط:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

النتيجة:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

بالإضافة إلى `=` و`BETWEEN...AND`، تدعم جملة `WHERE` طائفة واسعة من التعبيرات، منها المقارنة (`<`، `<=`، `>`، `>=`)، ومطابقة الأنماط (`LIKE`، `GLOB`، `REGEXP`، `MATCH`)، والتحقق من الانتماء إلى قائمة (`IN`، `NOT IN`).
راجع [تعبيرات لغة SQL](sql-expr) للحصول على التوثيق الكامل.

[sql-expr]: https://sqlite.org/lang_expr.html
