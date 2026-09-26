# Instruções

A trupe de dança está preparando o show de fim de ano: de quantas maneiras os dançarinos podem ser organizados e como o tempo de duração se divide entre os atos.

As cinco tarefas ficam na classe `FORMATION_COUNT`.

## 1. Quantas formações?

Com `n` dançarinos, há `n` fatorial maneiras de enfileirá-los: `n` escolhas para a frente, depois `n-1` para o próximo, e assim por diante. Retorne isso como um `INTI`.
Zero dançarinos têm exatamente uma formação: a vazia.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Escreva o número

O mesmo número como string, com todos os seus dígitos.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Um `INT` não consegue armazenar esse número, e é justamente essa a intenção da tarefa.

## 3. A parte de um ato

Um show com `acts` atos iguais dá a cada ato `1/acts` do tempo de duração.
Retorne isso como um `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Dois atos juntos

Some duas partes e retorne o total, exatamente.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. Isso preenche o show?

Responda se uma parte é exatamente o show inteiro, ou seja, exatamente um.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
