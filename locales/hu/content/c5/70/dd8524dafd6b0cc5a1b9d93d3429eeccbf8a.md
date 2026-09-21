# Bevezetés

A főbb aritmetikai és összehasonlító operátorokat saját osztályaidhoz és struktúráidhoz is hozzáigazíthatod. Ezt nevezik _operátortúlterhelésnek_.

A legtöbb operátor formája a következő:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

A típuskonverziós operátorok formája a következő:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Az operátorok ugyanúgy viselkednek, mint a statikus metódusok. Egy operátorszimbólum a metódus azonosítójának helyére lép, az operátoroknak pedig paramétereik és visszatérési típusuk van. A paraméterekre és a visszatérési típusra vonatkozó típusszabályok megfelelnek az intuíciódnak, és számíthatsz rá, hogy a fordító részletes útmutatást ad.
