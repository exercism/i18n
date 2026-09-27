# Istruzioni

Il nostro club di calcio [exercise:csharp/football-match-reports]() sta andando alla grande nei campionati, e ti hanno invitato a fare ancora un po' di lavoro, questa volta sul sistema di stampa dei pass di sicurezza.

La gerarchia delle classi del personale di supporto è la seguente

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

Un'implementazione completa della gerarchia è fornita come parte del codice sorgente dell'esercizio.

Tutti i dati passati al generatore di pass di sicurezza sono stati validati e sono garantiti non nulli.

## 1. Ottenere il nome visualizzato di un membro del team di supporto, purché faccia parte dello staff

Implementa il metodo `SecurityPassMaker.GetDisplayName()`. Deve restituire il valore del campo `Title` per le istanze di tutte le classi derivate da `Staff` e, in caso contrario, «Too Important for a Security Pass».

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Personalizzare il nome visualizzato per il team di sicurezza

Modifica il metodo `SecurityPassMaker.GetDisplayName()`. Deve comportarsi come nel punto 1, con la differenza che, se il membro dello staff fa parte del team di sicurezza (di tipo `Security` o di una delle sue classi derivate), dopo il titolo deve comparire il testo « Priority Personnel».

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

## 3. Designare priority personnel solo i membri principali del team di sicurezza

Modifica il metodo `SecurityPassMaker.GetDisplayName()`. Deve comportarsi come nel punto 2, con la differenza che il testo « Priority Personnel» non deve comparire per le istanze di tipo `SecurityJunior`, `SecurityIntern` e `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
