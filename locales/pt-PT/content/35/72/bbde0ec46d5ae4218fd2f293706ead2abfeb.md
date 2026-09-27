# Ciclos

Um **ciclo** faz a mesma coisa vezes sem conta.

```sather
   loop
      ...
   end;
```

Sozinho, nunca para, por isso alguma coisa lá dentro tem de o terminar.

## Onde guardar a contagem

Um ciclo precisa quase sempre de um valor que vá mudando ao longo do percurso. Isso é uma **variável**, e o `::=` cria uma:

```sather
   total ::= 0;
```

A variável chama-se `total`, começa em `0` e o Sather percebe, a partir do `0`, que ela guarda um `INT`. A seguir, o `:=` coloca lá um novo valor:

```sather
   total := total + 5;
```

Lê isto da direita para a esquerda: pega no que o `total` vale agora, soma 5 e volta a guardar o resultado em `total`.

Uma variável criada desta forma vive até ao fim da rotina.

## until!

O `until!` leva uma pergunta. A pergunta é feita a cada passagem pelo ciclo e, quando a resposta é verdadeira, o ciclo para logo ali.

```sather
   sum_to(last : INT) : INT is
      total ::= 0;
      n ::= 1;
      loop
         until!(n > last);
         total := total + n;
         n := n + 1;
      end;
      return total;
   end;
```

O `n` conta 1, 2, 3 ... e o ciclo termina na primeira vez em que o `n` ultrapassa o `last`. Sem o `n := n + 1`, a pergunta nunca mudaria de resposta e o ciclo correria para sempre.

O `until!` não tem de ser a primeira linha. Coloca-o onde a pergunta fizer sentido: em cima, o ciclo pode não correr nenhuma vez; em baixo, corre sempre pelo menos uma vez.

O `!` faz parte do nome. O Sather marca certas coisas assim; o que a marca significa vem mais tarde.

## break!

O `break!` termina o ciclo imediatamente, sem qualquer pergunta associada. É útil quando o motivo para parar aparece a meio do trabalho.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

O `until!` e o `break!` só significam alguma coisa dentro de um `loop`. Nenhum deles pode ser usado sozinho.
