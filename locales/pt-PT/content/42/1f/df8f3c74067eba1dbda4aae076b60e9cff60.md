# Iteradores

Percorrer um array com um contador exige quatro linhas de preparação antes de acontecer trabalho algum:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

O contador, o teste de fim e o incremento não têm nada a ver com somar números. Um **iterador** trata das três coisas.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` entrega um elemento em cada volta e termina o ciclo quando já não há mais. Sem contador, nada para correr mal e nenhuma forma de passar do fim do array.

## O ponto de exclamação

O `!` assinala um iterador. Já viste três: `until!`, `while!` e `break!`. Seguem todos a mesma regra: **um iterador só pode ser chamado dentro de um ciclo.** Escrever `counts.elt!` fora de um ciclo é um erro.

Quando um iterador é chamado dentro de um ciclo, é-lhe pedido um valor em cada volta. Quando já não tem nenhum, o ciclo termina imediatamente, onde quer que a chamada esteja no corpo.

## Dois para começar

`elt!` dá os elementos de um array ou de uma string, por ordem.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` conta. `1.upto!(5)` dá 1, 2, 3, 4, 5 e depois termina o ciclo.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Ambas são rotinas normais que por acaso terminam em `!`, por isso são chamadas com um ponto, num array ou num número.

## Guardar a resposta

O ciclo termina sozinho, por isso tudo o que for calculado dentro dele tem de ser guardado numa variável declarada **fora**. Caso contrário, desaparece quando o ciclo termina.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
