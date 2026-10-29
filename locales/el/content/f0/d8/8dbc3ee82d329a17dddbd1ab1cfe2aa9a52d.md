# Η εντολή SELECT

Στην SQL, μια εντολή `SELECT` σου επιτρέπει να ανακτήσεις δεδομένα από μια βάση δεδομένων.
Το αποτέλεσμα μιας εντολής `SELECT` είναι ένα σύνολο αποτελεσμάτων.
Ένα σύνολο αποτελεσμάτων περιέχει τιμές οργανωμένες σε γραμμές και στήλες.
Κάθε στήλη είναι ένα συγκεκριμένο χαρακτηριστικό των δεδομένων.
Κάθε γραμμή περιέχει μια τιμή για κάθε στήλη.

Ένας τρόπος να το σκεφτείς είναι ότι ένα σύνολο στηλών αντιπροσωπεύει μια δομή δεδομένων, όπου κάθε στήλη αντιπροσωπεύει ένα πεδίο της δομής δεδομένων και κάθε γραμμή αντιπροσωπεύει ένα στιγμιότυπο της δομής δεδομένων.

Με μια εντολή `SELECT`, μπορείς να προσδιορίσεις τα δεδομένα που θέλεις να ανακτήσεις.
Μπορείς επίσης, προαιρετικά, να μετασχηματίσεις, να φιλτράρεις ή/και να τροποποιήσεις τη μορφή των δεδομένων εξόδου.

## Τα βασικά

Η βασική δομή μιας εντολής `SELECT` είναι η εξής:

```sql
SELECT <columns>
FROM <source>
WHERE <criteria>;
```

~~~~exercism/note
Οι ρήτρες `FROM` και `WHERE` είναι προαιρετικές.
Για παράδειγμα, μια εντολή όπως η `SELECT "Hello, world.";` είναι απολύτως έγκυρη.

Σημείωσε επίσης ότι οι αλλαγές γραμμής δεν είναι απαραίτητες. Αρκεί οποιοδήποτε κενό για να διαχωρίσει τις διαφορετικές ρήτρες (δηλαδή τα μέρη) της εντολής `SELECT`.
~~~~

Αμέσως μετά τη λέξη-κλειδί `SELECT` ακολουθεί μια λίστα με τις στήλες που θέλεις στο αποτέλεσμα.
Η ρήτρα `FROM` προσδιορίζει την πηγή των δεδομένων, η οποία είναι συνήθως ένας πίνακας στη βάση δεδομένων.
Η ρήτρα `WHERE` φιλτράρει τα δεδομένα εξόδου με ένα ή περισσότερα κριτήρια.

Για παράδειγμα, θεώρησε μια βάση δεδομένων με έναν πίνακα που ονομάζεται `inventory` και περιέχει τα ακόλουθα δεδομένα:

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

Αν θέλεις να ανακτήσεις όλα τα δεδομένα από τον πίνακα, μπορείς να εκτελέσεις το εξής ερώτημα:

```sql
SELECT * FROM inventory;
```

Αποτέλεσμα:

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

Αν θέλεις μόνο τις τιμές των στηλών category και product_name, μπορείς να ορίσεις αυτές τις στήλες:

```sql
SELECT category, product_name FROM inventory;
```

Αποτέλεσμα:

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

## Φιλτράρισμα δεδομένων με τη ρήτρα WHERE

Η ρήτρα `WHERE` σου επιτρέπει να φιλτράρεις τα δεδομένα που ανακτά μια εντολή `SELECT`.
Για παράδειγμα, αν θέλεις μόνο την κατηγορία Appliances, μπορείς να κάνεις το εξής:

```sql
SELECT * FROM inventory
WHERE category = "Appliances";
```

Αποτέλεσμα:
```
upc           category    supplier        brand      product_name                 weight  stock
------------  ----------  --------------  ---------  ---------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker    4.2     18   
880012349876  Appliances  Culinary Depot  HeatWave   Compact Toaster Oven         7.5     14   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender  3.1     16   
```

Ή ίσως θέλεις μόνο δεδομένα όπου το βάρος είναι μεταξύ 2.0 και 6.0:

```sql
SELECT * FROM inventory
WHERE weight BETWEEN 2.0 AND 6.0;
```

Αποτέλεσμα:
```
upc           category    supplier        brand      product_name                  weight  stock
------------  ----------  --------------  ---------  ----------------------------  ------  -----
899001234556  Appliances  Culinary Depot  QuickBrew  Single-Serve Coffee Maker     4.2     18   
823450987112  Cookware    KitchenCo       FreshKeep  12-Piece Glass Container Set  6       33   
899998877665  Cookware    KitchenCo       IronCraft  Cast-Iron Grill Pan           5.3     21   
844110220987  Appliances  Culinary Depot  BlendPro   High-Speed Personal Blender   3.1     16   
```

Εκτός από `=` και `BETWEEN...AND`, η ρήτρα `WHERE` υποστηρίζει ένα ευρύ φάσμα εκφράσεων, όπως σύγκριση (`<`, `<=`, `>`, `>=`), αντιστοίχιση μοτίβων (`LIKE`, `GLOB`, `REGEXP`, `MATCH`) και έλεγχο του αν μια τιμή ανήκει σε λίστα (`IN`, `NOT IN`).
Δες τις [Εκφράσεις της γλώσσας SQL](sql-expr) για την πλήρη τεκμηρίωση.

[sql-expr]: https://sqlite.org/lang_expr.html
