# Instruções

A trupe de dança está a preparar o espetáculo de fim de ano: de quantas formas se podem dispor os bailarinos e como o tempo de duração se reparte pelos atos.

As cinco tarefas ficam na classe `FORMATION_COUNT`.

## 1. Quantas formações?

Com `n` bailarinos há `n` fatorial formas de os alinhar: `n` escolhas para a frente, depois `n-1` para o seguinte, e assim por diante. Devolve esse valor como um `INTI`.
Zero bailarinos têm exatamente uma formação: a vazia.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Escreve-o como texto

O mesmo número como string, com todos os seus algarismos.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Um `INT` não consegue conter esse número, que é precisamente o objetivo da tarefa.

## 3. A parte de um ato

Um espetáculo com `acts` atos iguais dá a cada ato `1/acts` do tempo de duração. Devolve esse valor como um `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Dois atos juntos

Soma duas partes e devolve o total, exatamente.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. Preenche o espetáculo todo?

Responde se uma parte é exatamente o espetáculo inteiro, ou seja, exatamente um.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
