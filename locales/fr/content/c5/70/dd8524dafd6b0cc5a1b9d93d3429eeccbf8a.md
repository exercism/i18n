# Introduction

On peut adapter les principaux opérateurs arithmétiques et de comparaison pour qu'ils s'appliquent à tes propres classes et structures. C'est ce qu'on appelle la _surcharge d'opérateurs_.

La plupart des opérateurs prennent la forme suivante :

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

Les opérateurs de conversion ont la forme suivante :

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

Les opérateurs se comportent de la même manière que les méthodes statiques. Un symbole d'opérateur prend la place de l'identifiant d'une méthode, et il prend des paramètres ainsi qu'un type de retour. Les règles de typage des paramètres et du type de retour suivent l'intuition, et tu peux compter sur le compilateur pour te fournir des indications détaillées.
