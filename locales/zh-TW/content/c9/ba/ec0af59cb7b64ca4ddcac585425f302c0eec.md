# 說明

我們的足球俱樂部 [exercise:csharp/football-match-reports]() 在各大聯賽中氣勢如虹，這次你又受邀來幫忙，負責安全通行證的印製系統。

後勤人員的類別階層如下

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

這個階層的完整實作已包含在練習的原始程式碼中。

所有傳入安全通行證產生器的資料都已經過驗證，並保證不為 null。

## 1. 取得支援團隊成員的顯示名稱，前提是他們是員工

請實作 `SecurityPassMaker.GetDisplayName()` 方法。對於所有衍生自 `Staff` 的類別執行個體，它應該回傳 `Title` 欄位的值；否則應回傳 "Too Important for a Security Pass"。

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. 為安全團隊自訂顯示名稱

請修改 `SecurityPassMaker.GetDisplayName()` 方法。它的行為應該與任務 1 相同，差別在於：如果該員工是安全團隊的成員（型別為 `Security` 或其衍生類別），則應在職稱之後顯示 " Priority Personnel"。

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

## 3. 只將主要的安全團隊成員指定為優先人員

請修改 `SecurityPassMaker.GetDisplayName()` 方法。它的行為應該與任務 2 相同，差別在於：對於型別為 `SecurityJunior`、`SecurityIntern` 和 `PoliceLiaison` 的執行個體，不應顯示 " Priority Personnel"。

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
