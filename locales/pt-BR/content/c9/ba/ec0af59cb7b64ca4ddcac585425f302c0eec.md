# Instruções

Nosso clube de futebol [exercise:csharp/football-match-reports]() está voando alto nas ligas, e você foi convidado a fazer mais um trabalho, desta vez no sistema de impressão de crachás de segurança.

A hierarquia de classes da equipe de bastidores é a seguinte

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

Todos os dados passados ao gerador de crachás de segurança foram validados e é garantido que não são nulos.

## 1. Obter o nome de exibição de um membro da equipe de apoio, desde que seja um funcionário

Implemente o método `SecurityPassMaker.GetDisplayName()`. Ele deve retornar o valor do campo `Title` das instâncias de todas as classes derivadas de `Staff` e, caso contrário, "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Personalizar o nome de exibição para a equipe de segurança

Modifique o método `SecurityPassMaker.GetDisplayName()`. Ele deve se comportar como na Tarefa 1, exceto que, se o funcionário for membro da equipe de segurança (seja do tipo `Security` ou de uma de suas derivadas), o texto " Priority Personnel" deve ser exibido depois do título.

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

## 3. Designar apenas membros principais da equipe de segurança como pessoal prioritário

Modifique o método `SecurityPassMaker.GetDisplayName()`. Ele deve se comportar como na Tarefa 2, exceto que o texto " Priority Personnel" não deve ser exibido para instâncias do tipo `SecurityJunior`, `SecurityIntern` e `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
