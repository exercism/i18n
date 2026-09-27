# التعليمات

نادي كرة القدم لدينا [exercise:csharp/football-match-reports]() يتألق في الدوريات، وقد دُعيتَ للقيام بمزيد من العمل، هذه المرة على نظام طباعة التصاريح الأمنية.

التسلسل الهرمي لأصناف الطاقم الخلفي كما يلي

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

يُقدَّم تنفيذ كامل لهذا التسلسل الهرمي كجزء من الكود المصدري للتمرين.

جميع البيانات التي تُمرَّر إلى صانع التصاريح الأمنية تم التحقق من صحتها وتم ضمان أنها ليست `null`.

## 1. الحصول على اسم العرض لعضو من فريق الدعم بشرط أن يكون من أفراد الطاقم

نفّذ طريقة `SecurityPassMaker.GetDisplayName()`. ينبغي أن تُرجع قيمة الحقل `Title` لنسخ جميع الأصناف المشتقة من `Staff`، وإلا فتُرجع "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. تخصيص اسم العرض لفريق الأمن

عدّل طريقة `SecurityPassMaker.GetDisplayName()`. ينبغي أن تتصرف كما في المهمة 1، إلا أنه إذا كان فرد الطاقم عضوًا في فريق الأمن (سواء كان من النوع `Security` أو أحد أنواعه المشتقة) فيجب عرض النص " Priority Personnel" بعد العنوان.

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

## 3. اعتبار أعضاء فريق الأمن الأساسيين فقط أفرادًا ذوي أولوية

عدّل طريقة `SecurityPassMaker.GetDisplayName()`. ينبغي أن تتصرف كما في المهمة 2، إلا أنه لا يجب عرض النص " Priority Personnel" لنسخ من النوع `SecurityJunior` و`SecurityIntern` و`PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
