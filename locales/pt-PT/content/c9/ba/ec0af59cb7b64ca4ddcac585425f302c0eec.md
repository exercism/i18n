# Instruções

O nosso clube de futebol [exercise:csharp/football-match-reports]() está a subir nas ligas e foste convidado a fazer mais algum trabalho, desta vez no sistema de impressão de passes de segurança.

A hierarquia de classes do pessoal de bastidores é a seguinte

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

Uma implementação completa da hierarquia é fornecida como parte do código-fonte do exercício.

Todos os dados passados ao criador de passes de segurança foram validados e é garantido que não são nulos.

## 1. Obter o nome de apresentação de um membro da equipa de apoio, desde que seja um membro do pessoal

Implementa o método `SecurityPassMaker.GetDisplayName()`. Deve devolver o valor do campo `Title` das instâncias de todas as classes derivadas de `Staff` e, caso contrário, "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Personalizar o nome de apresentação da equipa de segurança

Modifica o método `SecurityPassMaker.GetDisplayName()`. Deve comportar-se como na Tarefa 1, exceto que, se o membro do pessoal pertencer à equipa de segurança (seja do tipo `Security` ou de um dos seus derivados), o texto " Priority Personnel" deve ser apresentado depois do título.

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

## 3. Designar apenas os membros principais da equipa de segurança como pessoal prioritário

Modifica o método `SecurityPassMaker.GetDisplayName()`. Deve comportar-se como na Tarefa 2, exceto que o texto " Priority Personnel" não deve ser apresentado para instâncias do tipo `SecurityJunior`, `SecurityIntern` e `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
