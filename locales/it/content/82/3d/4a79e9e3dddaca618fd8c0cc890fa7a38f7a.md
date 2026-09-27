# Introduzione

## Sovraccarico dei metodi

_Il sovraccarico dei metodi_ permette a più metodi della stessa classe di avere lo stesso nome. I metodi sovraccaricati devono differire tra loro per:

- il numero dei parametri
- il tipo dei parametri

Non esiste il sovraccarico dei metodi in base al tipo restituito.

Il compilatore dedurrà automaticamente quale metodo sovraccaricato chiamare in base al numero dei parametri e al loro tipo.

## Argomenti denominati

Finora abbiamo visto che gli argomenti passati a un metodo vengono associati ai parametri dichiarati dal metodo in base alla loro posizione. Un approccio alternativo, in particolare quando una routine accetta un numero elevato di argomenti, permette a chi chiama di associare gli argomenti specificando l'identificatore del parametro dichiarato.

L'esempio seguente illustra la sintassi:

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## Parametri facoltativi

Un parametro di un metodo può essere reso facoltativo assegnandogli un valore predefinito. Quando si chiama un metodo con parametri facoltativi, chi chiama non è tenuto a passare un valore per tali parametri. Se non viene passato alcun valore per un parametro facoltativo, verrà usato il suo valore predefinito.

I parametri facoltativi _devono_ trovarsi alla fine dell'elenco dei parametri: non possono essere seguiti da parametri non facoltativi.

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
