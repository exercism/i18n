# SELECT स्टेटमेंट

SQL में, `SELECT` स्टेटमेंट की मदद से आप डेटाबेस से डेटा निकाल सकते हैं।
किसी `SELECT` स्टेटमेंट का परिणाम एक रिज़ल्ट सेट होता है।
रिज़ल्ट सेट में वैल्यू पंक्तियों और स्तंभों में व्यवस्थित रहती हैं।
हर स्तंभ डेटा की एक खास विशेषता है।
हर पंक्ति में हर स्तंभ के लिए एक वैल्यू होती है।

इसे यूँ समझा जा सकता है: स्तंभों का समूह एक डेटा स्ट्रक्चर जैसा है, जिसमें हर स्तंभ उस स्ट्रक्चर का एक फील्ड है और हर पंक्ति उस स्ट्रक्चर का एक इंस्टेंस है।

`SELECT` स्टेटमेंट में आप बता सकते हैं कि आप कौन-सा डेटा निकालना चाहते हैं।
साथ ही, चाहें तो आप आउटपुट डेटा को बदल भी सकते हैं, उसे छान सकते हैं, या उसकी बनावट बदल सकते हैं।

## मूल बातें

एक साधारण `SELECT` स्टेटमेंट का ढाँचा इस तरह होता है:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
`FROM` और `WHERE` क्लॉज़ ज़रूरी नहीं हैं।
जैसे, `SELECT "Hello, world.";` जैसा स्टेटमेंट पूरी तरह सही है।

यह भी ध्यान दीजिए कि लाइन ब्रेक ज़रूरी नहीं हैं; `SELECT` स्टेटमेंट के अलग-अलग क्लॉज़ (यानी हिस्सों) को अलग करने के लिए कोई भी स्पेसिंग काफी है।
~~~~

`SELECT` कीवर्ड के ठीक बाद उन स्तंभों की सूची आती है जो आपको परिणाम में चाहिए।
`FROM` क्लॉज़ डेटा का स्रोत बताता है, जो आम तौर पर डेटाबेस की कोई टेबल होती है।
`WHERE` क्लॉज़ एक या अधिक शर्तों के आधार पर आउटपुट डेटा को छानता है।

उदाहरण के लिए, एक डेटाबेस की `inventory` नाम की टेबल देखिए, जिसमें यह डेटा है:

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

अगर हमें टेबल से सारा डेटा निकालना हो, तो हम यह क्वेरी चला सकते हैं:

```sql
SELECT * FROM inventory;
```

परिणाम:

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

अगर हमें सिर्फ category और product_name की वैल्यू चाहिए, तो हम वही स्तंभ बता सकते हैं:

```sql
SELECT category, product_name FROM inventory;
```

परिणाम:

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

## WHERE क्लॉज़ से डेटा छानना

`WHERE` क्लॉज़ की मदद से आप `SELECT` स्टेटमेंट से निकाले गए डेटा को छान सकते हैं।
जैसे, अगर हमें सिर्फ Appliances चाहिए, तो हम यह कर सकते हैं:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

परिणाम:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

या हो सकता है हमें सिर्फ वह डेटा चाहिए जिसमें weight 2.0 और 6.0 के बीच हो:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

परिणाम:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

`=` और `BETWEEN...AND` के अलावा, `WHERE` क्लॉज़ कई तरह के एक्सप्रेशन का समर्थन करता है, जैसे तुलना (`<`, `<=`, `>`, `>=`), पैटर्न मिलान (`LIKE`, `GLOB`, `REGEXP`, `MATCH`), और किसी सूची में शामिल होने की जाँच (`IN`, `NOT IN`)।
पूरा विवरण [SQL Language Expressions](sql-expr) में देखिए।

[sql-expr]: https://sqlite.org/lang_expr.html
