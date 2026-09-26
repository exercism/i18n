# 手順

サッカークラブの[exercise:csharp/football-match-reports]()はリーグで快進撃を続けていて、今回はセキュリティパスの印刷システムの仕事を任されました。

裏方スタッフのクラス階層は次のとおりです

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

階層の完全な実装は、この演習のソースコードの一部として提供されています。

セキュリティパス作成機に渡されるデータはすべて検証済みで、`null`ではないことが保証されています。

## 1. サポートチームのメンバーがスタッフである場合の表示名を取得する

`SecurityPassMaker.GetDisplayName()`メソッドを実装してください。`Staff`から派生したすべてのクラスのインスタンスでは、`Title`フィールドの値を返し、それ以外の場合は"Too Important for a Security Pass"を返す必要があります。

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. セキュリティチームの表示名をカスタマイズする

`SecurityPassMaker.GetDisplayName()`メソッドを変更してください。タスク1と同じ動作ですが、スタッフがセキュリティチームのメンバー（`Security`型またはその派生型のいずれか）である場合は、タイトルの後に" Priority Personnel"というテキストを表示する必要があります。

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

## 3. 主要なセキュリティチームメンバーだけを優先要員に指定する

`SecurityPassMaker.GetDisplayName()`メソッドを変更してください。タスク2と同じ動作ですが、`SecurityJunior`、`SecurityIntern`、`PoliceLiaison`型のインスタンスには" Priority Personnel"というテキストを表示しないでください。

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
