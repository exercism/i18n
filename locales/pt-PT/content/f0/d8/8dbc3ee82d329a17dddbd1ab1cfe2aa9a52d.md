# A instrução SELECT

Em SQL, uma instrução `SELECT` permite-te obter dados de uma base de dados.
O resultado de uma instrução `SELECT` é um conjunto de resultados.
Um conjunto de resultados contém valores dispostos em linhas e colunas.
Cada coluna é um atributo específico dos dados.
Cada linha contém um valor para cada coluna.

Uma forma de pensar nisto é ver um conjunto de colunas como uma estrutura de dados, em que cada coluna representa um campo dessa estrutura e cada linha representa uma instância da estrutura de dados.

Com uma instrução `SELECT`, podes especificar os dados que queres obter.
Também podes, se quiseres, transformar, filtrar e/ou alterar a forma dos dados de saída.

## O essencial

A anatomia de uma instrução `SELECT` básica é a seguinte:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
As cláusulas `FROM` e `WHERE` são opcionais.
Por exemplo, uma instrução como `SELECT "Hello, world.";` é perfeitamente válida.

Repara também que as quebras de linha não são obrigatórias; qualquer espaçamento serve para separar as diferentes cláusulas (ou seja, as partes) da instrução `SELECT`.
~~~~

Logo a seguir à palavra-chave `SELECT` vem uma lista das colunas que queres no resultado.
A cláusula `FROM` identifica a origem dos dados, que normalmente é uma tabela da base de dados.
A cláusula `WHERE` filtra os dados de saída segundo um ou mais critérios.

Por exemplo, considera uma base de dados com uma tabela chamada `inventory` que contém os seguintes dados:

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

Se quisermos obter todos os dados da tabela, podemos executar a seguinte consulta:

```sql
SELECT * FROM inventory;
```

Resultado:

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

Se quisermos apenas os valores de category e product_name, podemos especificar essas colunas:

```sql
SELECT category, product_name FROM inventory;
```

Resultado:

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

## Filtrar dados com a cláusula WHERE

A cláusula `WHERE` permite-te filtrar os dados obtidos por uma instrução `SELECT`.
Por exemplo, se quisermos apenas os artigos da categoria Appliances, podemos fazer o seguinte:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Resultado:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Ou talvez queiramos apenas os dados em que o peso está entre 2.0 e 6.0:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Resultado:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

Além de `=` e `BETWEEN...AND`, a cláusula `WHERE` suporta uma grande variedade de expressões, incluindo comparações (`<`, `<=`, `>`, `>=`), correspondência de padrões (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) e a verificação de pertença a uma lista (`IN`, `NOT IN`).
Consulta [Expressões da linguagem SQL](sql-expr) para veres a documentação completa.

[sql-expr]: https://sqlite.org/lang_expr.html
