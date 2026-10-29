# SELECT স্টেটমেন্ট

SQL-এ, একটি `SELECT` স্টেটমেন্ট দিয়ে আপনি ডেটাবেস থেকে ডেটা রিট্রিভ করতে পারেন।
একটি `SELECT` স্টেটমেন্টের ফলাফল হলো একটি রেজাল্ট সেট।
একটি রেজাল্ট সেটে সারি ও কলামে সাজানো মান থাকে।
প্রতিটি কলাম ডেটার একটি নির্দিষ্ট অ্যাট্রিবিউট।
প্রতিটি সারিতে প্রতিটি কলামের জন্য একটি করে মান থাকে।

একভাবে ভাবলে বোঝা যায়, কলামের একটি সেট আসলে একটি ডেটা স্ট্রাকচারকে নির্দেশ করে, যেখানে প্রতিটি কলাম ডেটা স্ট্রাকচারটির একটি ফিল্ড আর প্রতিটি সারি সেই ডেটা স্ট্রাকচারের একটি ইনস্ট্যান্স।

একটি `SELECT` স্টেটমেন্ট দিয়ে আপনি ঠিক করে দিতে পারেন কোন ডেটা রিট্রিভ করতে চান।
চাইলে আপনি আউটপুট ডেটা রূপান্তর, ফিল্টার এবং/অথবা তার আকার পরিবর্তনও করতে পারেন।

## মূল বিষয়গুলো

একটি সাধারণ `SELECT` স্টেটমেন্টের গঠন দেখতে এমন:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
`FROM` ও `WHERE` ক্লজ ঐচ্ছিক।
যেমন, `SELECT "Hello, world.";` লেখা একটি স্টেটমেন্টও সম্পূর্ণ বৈধ।

খেয়াল করুন, এখানে লাইন ব্রেক বাধ্যতামূলক নয়; `SELECT` স্টেটমেন্টের আলাদা আলাদা ক্লজ (অর্থাৎ অংশগুলো) আলাদা করতে যেকোনো স্পেসিংই যথেষ্ট।
~~~~

`SELECT` কিওয়ার্ডের ঠিক পরে থাকে সেই কলামগুলোর তালিকা, যেগুলো আপনি ফলাফলে চান।
`FROM` ক্লজ ডেটার উৎস নির্দিষ্ট করে, যা সাধারণত ডেটাবেসের একটি টেবিল।
`WHERE` ক্লজ এক বা একাধিক শর্ত দিয়ে আউটপুট ডেটা ফিল্টার করে।

যেমন, ধরা যাক একটি ডেটাবেসে `inventory` নামের একটি টেবিল আছে, যাতে নিচের ডেটা রয়েছে:

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

টেবিলের সব ডেটা রিট্রিভ করতে চাইলে আমরা নিচের কোয়েরিটি রান করতে পারি:

```sql
SELECT * FROM inventory;
```

ফলাফল:

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

যদি শুধু category আর product_name মানগুলো দরকার হয়, তাহলে ওই কলামগুলো উল্লেখ করলেই হবে:

```sql
SELECT category, product_name FROM inventory;
```

ফলাফল:

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

## WHERE ক্লজ দিয়ে ডেটা ফিল্টার করা

`WHERE` ক্লজ দিয়ে আপনি `SELECT` স্টেটমেন্টে রিট্রিভ করা ডেটা ফিল্টার করতে পারেন।
যেমন, যদি আমরা শুধু Appliances চাই, তাহলে এভাবে করতে পারি:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

ফলাফল:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

অথবা হয়তো আমরা শুধু সেই ডেটা চাই যেখানে weight 2.0 থেকে 6.0-এর মধ্যে:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

ফলাফল:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

`=` আর `BETWEEN...AND` ছাড়াও `WHERE` ক্লজ আরও অনেক ধরনের এক্সপ্রেশন সমর্থন করে, যেমন তুলনা (`<`, `<=`, `>`, `>=`), প্যাটার্ন ম্যাচিং (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) এবং কোনো তালিকায় সদস্যতা যাচাই (`IN`, `NOT IN`)।
সম্পূর্ণ ডকুমেন্টেশনের জন্য [SQL Language Expressions](sql-expr) দেখুন।

[sql-expr]: https://sqlite.org/lang_expr.html
