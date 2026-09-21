# Utasítások

A futballklubunk [exercise:csharp/football-match-reports]() szárnyal a bajnokságokban, és ismét felkértek egy kis munkára, ezúttal a biztonsági belépőkártyák nyomtatási rendszerén.

A háttérszemélyzet osztályhierarchiája a következő:

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

A hierarchia teljes implementációja a feladat forráskódjának részeként rendelkezésre áll.

A belépőkártya-készítőnek átadott összes adat ellenőrzött, és garantáltan nem null.

## 1. Kérd le a támogató csapat egy tagjának megjelenítendő nevét, amennyiben a személyzet tagja

Kérlek, implementáld a `SecurityPassMaker.GetDisplayName()` metódust. A `Staff`-ból leszármazó összes osztály példányánál a `Title` mező értékét adja vissza, egyébként pedig a „Too Important for a Security Pass” szöveget.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Szabd testre a biztonsági csapat megjelenítendő nevét

Kérlek, módosítsd a `SecurityPassMaker.GetDisplayName()` metódust. Úgy kell viselkednie, mint az 1. részfeladatban, azzal a kivétellel, hogy ha a személyzeti tag a biztonsági csapat tagja (akár `Security` típusú, akár annak valamelyik leszármazottja), akkor a cím után a „ Priority Personnel” szöveget kell megjeleníteni.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. Csak a biztonsági csapat fő tagjait jelöld ki kiemelt személyzetként

Kérlek, módosítsd a `SecurityPassMaker.GetDisplayName()` metódust. Úgy kell viselkednie, mint a 2. részfeladatban, azzal a kivétellel, hogy a „ Priority Personnel” szöveget nem kell megjeleníteni a `SecurityJunior`, `SecurityIntern` és `PoliceLiaison` típusú példányok esetében.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
