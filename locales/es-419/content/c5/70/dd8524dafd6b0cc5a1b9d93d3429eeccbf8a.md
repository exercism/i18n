# Introducción

Los operadores principales aritméticos y de comparación se pueden adaptar para que los usen tus propias clases y structs. A esto se le conoce como _sobrecarga de operadores_.

La mayoría de los operadores tienen la forma:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Los operadores de conversión tienen la forma:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Los operadores se comportan de la misma manera que los métodos estáticos. Un símbolo de operador ocupa el lugar del identificador de un método, y tienen parámetros y un tipo devuelto. Las reglas de tipos para los parámetros y el tipo devuelto siguen tu intuición, y puedes confiar en que el compilador te dé una guía detallada.
