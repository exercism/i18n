# Інструкції

Наш футбольний клуб [exercise:csharp/football-match-reports]() стрімко піднімається в лігах, і нам запропонували ще трохи роботи: цього разу над системою друку перепусток для служби безпеки.

Ієрархія класів допоміжного персоналу така:

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

Повну реалізацію цієї ієрархії наведено у вихідному коді вправи.

Усі дані, передані до генератора перепусток, перевірено, і гарантовано, що вони не є null.

## 1. Отримати відображуване імʼя для члена команди підтримки, якщо він належить до персоналу

Реалізуйте метод `SecurityPassMaker.GetDisplayName()`. Для примірників усіх класів, похідних від `Staff`, він має повертати значення поля `Title`, а для решти - «Too Important for a Security Pass».

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Налаштувати відображуване імʼя для команди безпеки

Змініть метод `SecurityPassMaker.GetDisplayName()`. Він має поводитися так само, як у завданні 1, але якщо працівник належить до команди безпеки (тобто має тип `Security` або один з похідних від нього), то після назви має бути додано текст « Priority Personnel».

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

## 3. Позначати як пріоритетний персонал лише основний склад команди безпеки

Змініть метод `SecurityPassMaker.GetDisplayName()`. Він має поводитися так само, як у завданні 2, але текст « Priority Personnel» не має додаватися для примірників типів `SecurityJunior`, `SecurityIntern` і `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
