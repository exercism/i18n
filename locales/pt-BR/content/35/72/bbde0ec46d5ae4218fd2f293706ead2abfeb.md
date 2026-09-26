# Laços

Um **laço** faz a mesma coisa repetidas vezes.

```sather
   loop
      ...
   end;
```

Por si só, ele nunca para, então algo dentro dele precisa terminá-lo.

## Onde guardar a contagem

Um laço quase sempre precisa de um valor que muda conforme avança. Isso é uma
**variável**, e o `::=` cria uma:

```sather
   total ::= 0;
```

A variável se chama `total`, começa em `0`, e o Sather deduz do `0` que ela
guarda um `INT`. A partir daí, o `:=` coloca um novo valor nela:

```sather
   total := total + 5;
```

Leia isso da direita para a esquerda: pegue o valor que `total` tem agora,
some 5 e coloque a resposta de volta em `total`.

Uma variável criada assim vive até o fim da rotina.

## until!

O `until!` recebe uma pergunta. A cada volta ela é feita, e quando a resposta
é verdadeira o laço para ali mesmo.

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

`n` conta 1, 2, 3 ... e o laço termina na primeira vez que `n` passa de
`last`. Sem o `n := n + 1`, a pergunta nunca mudaria de resposta e o laço
rodaria para sempre.

O `until!` não precisa ser a primeira linha. Coloque-o onde a pergunta fizer
sentido: no topo, o laço pode não rodar nenhuma vez; embaixo, ele sempre roda
pelo menos uma vez.

O `!` faz parte do nome. O Sather marca certas coisas assim; o que a marca
significa vem depois.

## break!

O `break!` encerra o laço imediatamente, sem nenhuma pergunta. Ele é útil
quando o motivo de parar aparece no meio do trabalho.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

O `until!` e o `break!` só significam alguma coisa dentro de um `loop`.
Nenhum dos dois pode ser usado sozinho.
