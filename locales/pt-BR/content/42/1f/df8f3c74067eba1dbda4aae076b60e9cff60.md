# Iteradores

Percorrer um array com um contador exige quatro linhas de controle antes de qualquer trabalho de verdade acontecer:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

O contador, o teste de parada e o passo não têm nada a ver com somar números. Um **iterador** faz as três coisas.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` entrega um elemento a cada volta e encerra o laço quando não há mais nenhum. Sem contador, nada para dar errado e nenhuma chance de passar do fim do array.

## O ponto de exclamação

O `!` marca um iterador. Você já viu três deles, `until!`, `while!` e `break!`, e todos seguem a mesma regra: **um iterador só pode ser chamado dentro de um laço.** Escrever `counts.elt!` fora de um laço é um erro.

Um iterador chamado dentro de um laço é solicitado a fornecer um valor a cada volta. Quando ele não tem mais nenhum, o laço termina imediatamente, onde quer que a chamada esteja no corpo.

## Dois para começar

`elt!` fornece os elementos de um array ou de uma string, em ordem.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` conta. `1.upto!(5)` fornece 1, 2, 3, 4, 5 e depois encerra o laço.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

As duas são rotinas comuns que por acaso terminam em `!`, então ambas são chamadas com um ponto, em um array ou em um número.

## Guardando a resposta

O laço termina sozinho, então tudo o que for calculado dentro dele precisa ser guardado em uma variável declarada **fora**; caso contrário, desaparece quando o laço termina.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
