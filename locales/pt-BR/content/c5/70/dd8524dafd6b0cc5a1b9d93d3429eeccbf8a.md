# Introdução

Os principais operadores aritméticos e de comparação podem ser adaptados para uso pelas suas próprias classes e structs. Isso é conhecido como _sobrecarga de operadores_.

A maioria dos operadores tem o formato:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Os operadores de conversão têm o formato:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Os operadores se comportam da mesma forma que métodos estáticos. Um símbolo de operador ocupa o lugar de um identificador de método, e eles têm parâmetros e um tipo de retorno. As regras de tipo para parâmetros e tipo de retorno seguem sua intuição e você pode contar com o compilador para fornecer orientação detalhada.
