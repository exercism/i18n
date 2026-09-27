# Introdução

Os principais operadores aritméticos e de comparação podem ser adaptados para serem usados pelas tuas próprias classes e estruturas. Isto é conhecido como _sobrecarga de operadores_.

A maioria dos operadores tem a forma:

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Os operadores de conversão têm a forma:

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Os operadores comportam-se da mesma forma que os métodos estáticos. O símbolo de um operador ocupa o lugar do identificador de um método, e os operadores têm parâmetros e um tipo devolvido. As regras de tipos para os parâmetros e para o tipo devolvido seguem a tua intuição. Podes contar com o compilador para te dar orientações detalhadas.
