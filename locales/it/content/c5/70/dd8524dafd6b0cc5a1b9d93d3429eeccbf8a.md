# Introduzione

I principali operatori aritmetici e di confronto possono essere adattati per l'uso con le tue classi e struct. Questo è noto come _overloading degli operatori_.

La maggior parte degli operatori ha questa forma:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Gli operatori di cast hanno questa forma:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Gli operatori si comportano come i metodi statici. Un simbolo di operatore prende il posto dell'identificatore di un metodo, e un operatore ha parametri e un tipo restituito. Le regole sui tipi per i parametri e per il tipo restituito seguono l'intuizione, e puoi affidarti al compilatore per ricevere indicazioni dettagliate.
