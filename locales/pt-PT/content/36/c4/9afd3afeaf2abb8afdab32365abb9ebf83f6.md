# Iteradores

Um iterador é uma rotina cujo nome termina em `!` e que só pode ser chamada
dentro de um `loop`. A cada volta do ciclo produz o valor seguinte; quando se
esgota, o ciclo termina de imediato.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather não tem uma instrução `for`. É isto que a substitui, e é a
funcionalidade pela qual a linguagem é conhecida.

## Os que vale a pena conhecer desde cedo

| Iterador | Dá |
| --- | --- |
| `a.elt!` | cada elemento de `a`, por ordem |
| `a.ind!` | cada posição de `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | corre `n` vezes, sem devolver nada |
| `n.up!` | `n`, `n+1`, … e nunca termina |
| `s.elt!` | cada caráter de uma string |

`until!`, `while!` e `break!` também são iteradores. É por isso que terminam
em `!` e que só funcionam dentro de um ciclo.

## Onde fica a chamada

Uma chamada a um iterador pode aparecer em qualquer sítio onde possa aparecer
uma expressão, incluindo a meio de uma condição:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Cada *local* do programa onde um iterador é escrito mantém a sua própria
posição. Escrever `counts.elt!` duas vezes no corpo de um ciclo cria duas
passagens independentes pelo array, o que quase nunca é o que se quer:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Pede apenas uma vez e guarda o valor numa variável.

## Terminar o ciclo

O ciclo termina assim que *qualquer* iterador se esgota, e não quando todos se
esgotam. Com um só iterador, isso é óbvio. Com vários, é a regra que apanha
toda a gente, e é sobre isso que trata o próximo exercício.

## Qual escolher

Prefere `elt!` quando se querem os valores e `ind!` quando se querem as
posições. Recorre a `upto!` sobre `0 .. a.size - 1` só quando precisas de
ambos ao mesmo tempo, ou quando a resposta é uma posição e não um valor.
