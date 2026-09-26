# Condicionais

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

A pergunta entre `if` e `then` precisa ser um `BOOL`. Sather não aceita um número ali, então não existe o hábito, comum em C, de tratar o zero como falso.

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

As perguntas são feitas de cima para baixo, e a primeira que responder verdadeiro vence. Tudo que está abaixo dela é ignorado, sem nem ser perguntado. É por isso que uma cadeia precisa ir do teste mais específico para o menos específico: colocar `score >= 5` acima de `score >= 8` significa que o segundo nunca é alcançado.

`else` é opcional. `elsif` pode se repetir quantas vezes for necessário.

## Condicionais são instruções, não valores

O `if` não produz um valor por si só, então isto não é Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

Ou retorne de dentro de cada bloco, ou atribua a uma variável dentro de cada bloco.

## Quando não usar uma

Uma rotina que responde a uma pergunta deve retornar a pergunta:

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

A segunda não diz nada que a primeira não diga, com o triplo do tamanho.

## Aninhamento

Um `if` pode conter outro `if`. Muitas vezes ele não precisa: duas perguntas que precisam ser ambas verdadeiras podem ser unidas com `and`, o que fica mais fácil de ler.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
