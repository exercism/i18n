# Einleitung

Die wichtigsten arithmetischen und Vergleichsoperatoren lassen sich so anpassen, dass deine eigenen Klassen und Strukturen sie verwenden können. Das nennt man _Operatorüberladung_.

Die meisten Operatoren haben die Form:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Umwandlungsoperatoren haben die Form:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Operatoren verhalten sich genauso wie statische Methoden. Ein Operatorsymbol tritt an die Stelle eines Methodenbezeichners, und sie haben Parameter und einen Rückgabetyp. Die Typregeln für Parameter und Rückgabetyp folgen deiner Intuition, und du kannst dich darauf verlassen, dass der Compiler dir detaillierte Hinweise gibt.
