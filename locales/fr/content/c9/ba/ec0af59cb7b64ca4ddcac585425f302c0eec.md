# Instructions

Notre club de football [exercise:csharp/football-match-reports]() est en pleine ascension dans les ligues, et on t'a invité à faire quelques travaux supplémentaires, cette fois sur le système d'impression des badges de sécurité.

La hiérarchie des classes de l'encadrement est la suivante : 

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

Une implémentation complète de la hiérarchie est fournie dans le code source de l'exercice.

Toutes les données transmises au générateur de badges de sécurité ont été validées et sont garanties non nulles.

## 1. Obtiens le nom affiché d'un membre de l'équipe de soutien tant que celui-ci fait partie du personnel

Implémente la méthode `SecurityPassMaker.GetDisplayName()`. Elle doit renvoyer la valeur du champ `Title` des instances de toutes les classes dérivées de `Staff` et, sinon, "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Personnalise le nom affiché pour l'équipe de sécurité

Modifie la méthode `SecurityPassMaker.GetDisplayName()`. Elle doit se comporter comme dans la tâche 1, sauf que si le membre du personnel fait partie de l'équipe de sécurité (qu'il soit de type `Security` ou de l'une de ses classes dérivées), alors le texte " Priority Personnel" doit être affiché après le titre.

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

## 3. Ne désigne comme personnel prioritaire que les principaux membres de l'équipe de sécurité

Modifie la méthode `SecurityPassMaker.GetDisplayName()`. Elle doit se comporter comme dans la tâche 2, sauf que le texte " Priority Personnel" ne doit pas être affiché pour les instances de type `SecurityJunior`, `SecurityIntern` et `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
