# Anleitung

Unser Fußballverein [exercise:csharp/football-match-reports]() ist in den Ligen auf dem Vormarsch, und du bist eingeladen, noch etwas mehr Arbeit zu übernehmen, diesmal am System zum Drucken der Sicherheitsausweise.

Die Klassenhierarchie des Personals hinter den Kulissen sieht wie folgt aus

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

Eine vollständige Implementierung der Hierarchie ist als Teil des Quellcodes der Übung enthalten.

Alle Daten, die an den Generator für Sicherheitsausweise übergeben werden, wurden validiert und sind garantiert nicht null.

## 1. Anzeigenamen für ein Mitglied des Supportteams ermitteln, sofern es sich um Mitarbeiter handelt

Implementiere bitte die Methode `SecurityPassMaker.GetDisplayName()`. Sie soll den Wert des Feldes `Title` für Instanzen aller von `Staff` abgeleiteten Klassen zurückgeben, andernfalls „Too Important for a Security Pass“.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Anzeigenamen für das Sicherheitsteam anpassen

Ändere bitte die Methode `SecurityPassMaker.GetDisplayName()`. Sie soll sich wie in Aufgabe 1 verhalten, außer dass der Text „ Priority Personnel“ hinter dem Titel angezeigt werden soll, wenn der Mitarbeiter zum Sicherheitsteam gehört (entweder vom Typ `Security` oder von einer seiner Ableitungen).

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

## 3. Nur die eigentlichen Mitglieder des Sicherheitsteams als Priority-Personal kennzeichnen

Ändere bitte die Methode `SecurityPassMaker.GetDisplayName()`. Sie soll sich wie in Aufgabe 2 verhalten, außer dass der Text „ Priority Personnel“ für Instanzen der Typen `SecurityJunior`, `SecurityIntern` und `PoliceLiaison` nicht angezeigt werden soll.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
