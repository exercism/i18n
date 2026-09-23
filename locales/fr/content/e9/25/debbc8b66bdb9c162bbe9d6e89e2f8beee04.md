# Les structures conditionnelles

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

La question entre `if` et `then` doit être un `BOOL`. Sather n'accepte pas de nombre à cet endroit, il n'y a donc pas, comme en C, l'habitude de traiter zéro comme faux.

## La forme

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

Les questions sont posées de haut en bas, et la première qui répond vrai l'emporte. Tout ce qui se trouve en dessous est ignoré sans même être posé. C'est pourquoi une chaîne doit aller du test le plus précis au moins précis : placer `score >= 5` avant `score >= 8` fait que le second n'est jamais atteint.

`else` est facultatif. `elsif` peut être répété autant de fois que nécessaire.

## Les conditions sont des instructions, pas des valeurs

`if` ne produit pas de valeur à lui seul, ceci n'est donc pas du Sather :

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

Soit tu renvoies une valeur depuis chaque branche, soit tu affectes une variable dans chacune d'elles.

## Quand s'en passer

Une routine qui répond à une question devrait renvoyer cette question :

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

La seconde ne dit rien de plus que la première, pour une longueur trois fois supérieure.

## L'imbrication

Un `if` peut en contenir un autre. Souvent, ce n'est pas nécessaire : deux questions qui doivent toutes les deux être vraies peuvent être reliées par `and`, ce qui se lit mieux.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
