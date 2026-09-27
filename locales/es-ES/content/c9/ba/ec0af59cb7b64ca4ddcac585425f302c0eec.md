# Instrucciones

Nuestro club de fútbol [exercise:csharp/football-match-reports]() está arrasando en las ligas, y te han invitado a hacer más trabajo, esta vez en el sistema de impresión de pases de seguridad.

La jerarquía de clases del personal de apoyo es la siguiente

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

Se proporciona una implementación completa de la jerarquía como parte del código fuente del ejercicio.

Todos los datos que se pasan al generador de pases de seguridad se han validado y se garantiza que no son nulos.

## 1. Obtén el nombre para mostrar de un miembro del equipo de apoyo siempre que sea miembro del personal

Implementa el método `SecurityPassMaker.GetDisplayName()`. Debe devolver el valor del campo `Title` de las instancias de todas las clases derivadas de `Staff` y, en caso contrario, "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Personaliza el nombre para mostrar del equipo de seguridad

Modifica el método `SecurityPassMaker.GetDisplayName()`. Debe comportarse como en la tarea 1 salvo que, si el miembro del personal pertenece al equipo de seguridad (ya sea de tipo `Security` o una de sus derivadas), entonces debe mostrarse el texto " Priority Personnel" después del título.

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

## 3. Designa como personal prioritario solo a los miembros principales del equipo de seguridad

Modifica el método `SecurityPassMaker.GetDisplayName()`. Debe comportarse como en la tarea 2 salvo que el texto " Priority Personnel" no debe mostrarse para las instancias de tipo `SecurityJunior`, `SecurityIntern` y `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
