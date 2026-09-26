# 说明

我们的足球俱乐部[exercise:csharp/football-match-reports]()在联赛中势如破竹，因此你受邀来做更多工作，这次是安全通行证打印系统。

后勤人员的类层次结构如下

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

该层次结构的完整实现已作为本练习源代码的一部分提供。

传给安全通行证生成器的所有数据都已通过验证，并保证非空。

## 1. 为支持团队的成员获取显示名称，前提是他属于 Staff

请实现`SecurityPassMaker.GetDisplayName()`方法。对于所有派生自`Staff`的类的实例，它应返回`Title`字段的值；否则应返回“Too Important for a Security Pass”。

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. 为安全团队自定义显示名称

请修改`SecurityPassMaker.GetDisplayName()`方法。除了以下一点外，它的行为应与任务 1 相同：如果该员工是安全团队的成员（类型为`Security`或其派生类之一），则应在名称后显示文本“ Priority Personnel”。

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

## 3. 仅将安全团队的主要成员标记为优先人员

请修改`SecurityPassMaker.GetDisplayName()`方法。除了以下一点外，它的行为应与任务 2 相同：对于类型为`SecurityJunior`、`SecurityIntern`和`PoliceLiaison`的实例，不应显示文本“ Priority Personnel”。

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
