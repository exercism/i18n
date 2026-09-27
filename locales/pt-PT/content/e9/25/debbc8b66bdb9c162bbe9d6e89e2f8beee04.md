# Condicionais

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

A questão entre `if` e `then` tem de ser um `BOOL`. O Sather não aceita
um número aí, por isso não existe o hábito do estilo C de tratar o zero
como falso.

## A forma

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

As perguntas são feitas de cima para baixo, e vence a primeira que for
verdadeira. Tudo o que está abaixo dela é ignorado, sem chegar a ser
perguntado. É por isso que uma cadeia tem de ir do teste mais específico
para o menos específico: colocar `score >= 5` acima de `score >= 8`
significa que o segundo nunca é alcançado.

`else` é opcional. `elsif` pode repetir-se tantas vezes quantas forem
necessárias.

## Os condicionais são instruções, não valores

`if` não produz, por si só, um valor, por isso isto não é Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

Ou devolves a partir de dentro de cada ramo, ou atribuis a uma variável
dentro de cada ramo.

## Quando não usar um condicional

Uma rotina que responde a uma pergunta deve devolver a pergunta:

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

A segunda não diz nada que a primeira não diga, com o triplo do
comprimento.

## Aninhamento

Um `if` pode conter outro `if`. Muitas vezes não é preciso: duas questões
que têm ambas de se verificar podem ser unidas com `and`, o que se lê
melhor.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
