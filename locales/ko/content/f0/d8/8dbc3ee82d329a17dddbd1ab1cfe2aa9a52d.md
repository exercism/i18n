# SELECT 문

SQL에서 `SELECT` 문을 사용하면 데이터베이스에서 데이터를 가져올 수 있어요.
`SELECT` 문을 실행한 결과를 결과 집합이라고 해요.
결과 집합에는 행과 열로 정렬된 값들이 담겨 있어요.
각 열은 데이터의 특정 속성을 나타내고, 각 행에는 모든 열에 대한 값이 들어 있어요.

이렇게 생각해 볼 수도 있어요. 열의 집합을 하나의 데이터 구조라고 하면, 각 열은 그 데이터 구조의 필드를 나타내고 각 행은 그 데이터 구조의 인스턴스를 나타내요.

`SELECT` 문을 사용하면 가져오고 싶은 데이터를 지정할 수 있어요.
원한다면 출력 데이터를 변환하거나 걸러 내거나, 출력 형태를 바꿀 수도 있어요.

## 기본 구조

기본적인 `SELECT` 문의 구조는 다음과 같아요:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
`FROM` 절과 `WHERE` 절은 생략할 수 있어요.
예를 들어 `SELECT "Hello, world.";` 같은 문은 완전히 올바른 문이에요.

줄바꿈도 꼭 필요하지는 않아요. `SELECT` 문의 각 절(부분)을 구분하기만 하면 어떤 공백이든 괜찮아요.
~~~~

`SELECT` 키워드 바로 뒤에는 결과에 포함하고 싶은 열의 목록이 와요.
`FROM` 절은 데이터의 원천을 지정하는데, 보통은 데이터베이스 안의 테이블이에요.
`WHERE` 절은 하나 이상의 조건으로 출력 데이터를 걸러 내요.

예를 들어 `inventory`라는 테이블이 있고 그 안에 다음 데이터가 들어 있는 데이터베이스를 생각해 봐요:

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

테이블의 모든 데이터를 가져오고 싶다면 다음 쿼리를 실행하면 돼요:

```sql
SELECT * FROM inventory;
```

결과:

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

category와 product_name 값만 원한다면 그 열들만 지정하면 돼요:

```sql
SELECT category, product_name FROM inventory;
```

결과:

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

## WHERE 절로 데이터 걸러 내기

`WHERE` 절을 사용하면 `SELECT` 문으로 가져온 데이터를 걸러 낼 수 있어요.
예를 들어 Appliances만 원한다면 이렇게 하면 돼요:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

결과:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

아니면 무게가 2.0에서 6.0 사이인 데이터만 원할 수도 있어요:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

결과:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

`WHERE` 절은 `=`와 `BETWEEN...AND` 외에도 다양한 표현을 지원해요. 비교(`<`, `<=`, `>`, `>=`), 패턴 매칭(`LIKE`, `GLOB`, `REGEXP`, `MATCH`), 목록에 포함되는지 확인하기(`IN`, `NOT IN`) 같은 것들이 있어요.
전체 문서는 [SQL 언어 표현식][sql-expr]에서 확인할 수 있어요.

[sql-expr]: https://sqlite.org/lang_expr.html
