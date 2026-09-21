# Bevezetés

A C#-ban a tuple olyan adatszerkezet, amely adatokat szervez, és kettő vagy több, bármilyen típusú mezőt tárol.

A tuple-t általában úgy hozod létre, hogy 2 vagy több, vesszővel elválasztott kifejezést egy nyitó és egy csukó zárójel közé írsz.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

A tuple használható értékadáshoz és inicializáláshoz, visszatérési értékként vagy metódusargumentumként.

A mezőket pont szintaxissal éred el. Alapértelmezés szerint az első mező az `Item1`, a második az `Item2`, és így tovább. A nem alapértelmezett nevekről alább lesz szó.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

Az `Item1` és a hasonló mezőnevek nem teszik olvashatóvá a kódot. Az alábbi kód 2 módot mutat a tuple mezőinek elnevezésére. Figyeld meg azt is a lenti kódban, hogy a `var` használható tuple használatakor, a típus pedig kikövetkeztethető. Ez ugyanígy működik elnevezett és névtelen mezőket tartalmazó tuple esetében is.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
