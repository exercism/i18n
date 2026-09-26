# Iteradores

Um iterador é uma rotina cujo nome termina em `!` e que só pode ser chamada
dentro de um `loop`. A cada volta do laço, ele produz o próximo valor; quando
ele se esgota, o laço termina na hora.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather não tem instrução `for`. É isto que a substitui, e é a característica
pela qual a linguagem é conhecida.

## Os que vale a pena conhecer desde cedo

| Iterador | O que produz |
| --- | --- |
| `a.elt!` | cada elemento de `a`, em ordem |
| `a.ind!` | cada posição de `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | roda `n` vezes, sem produzir nada |
| `n.up!` | `n`, `n+1`, … e nunca termina |
| `s.elt!` | cada caractere de uma string |

`until!`, `while!` e `break!` também são iteradores. É por isso que terminam
em `!` e que só funcionam dentro de um laço.

## Onde fica a chamada

Uma chamada a iterador pode aparecer em qualquer lugar onde caiba uma
expressão, inclusive no meio de uma condição:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Cada *lugar* do programa onde um iterador é escrito mantém a própria
posição. Escrever `counts.elt!` duas vezes no mesmo corpo do laço faz duas
varreduras independentes do array, o que quase nunca é o que se quer:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Pergunte uma vez só e guarde o valor numa variável.

## Encerrar o laço

O laço termina assim que *qualquer* iterador dentro dele se esgota, e não
quando todos se esgotam. Com um único iterador, isso é óbvio. Com vários, é
a regra que pega todo mundo, e é sobre isso que trata o próximo exercício.

## Qual usar

Prefira `elt!` quando você quer os valores e `ind!` quando quer as posições.
Recorra a `upto!` sobre `0 .. a.size - 1` só quando precisar dos dois ao
mesmo tempo, ou quando a resposta for uma posição em vez de um valor.
