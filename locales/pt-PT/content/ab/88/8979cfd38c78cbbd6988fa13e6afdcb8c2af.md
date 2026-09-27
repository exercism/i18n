# Dicas

## Geral

- Cada um destes escolhe uma de três respostas, por isso cada um é um `if` com um `elsif` e um `else`.
- Faz primeiro a pergunta mais exigente. Se testares `score >= 5` antes de `score >= 8`, a segunda nunca é alcançada.

## 1. O veredicto

- Três faixas, por isso duas perguntas: oito ou mais, depois cinco ou mais, e depois tudo o que sobrar.

## 2. Que grupo?

- É mais fácil trabalhar de baixo para cima: primeiro menos de 13, depois menos de 16, e depois o resto.
- "De 13 a 15" e "menos de 16" descrevem os mesmos artistas, e a segunda é uma comparação em vez de duas.

## 3. Quando voltar

- O `=` compara duas strings: `if group = "Juniors" then`.
- Escreve os nomes dos grupos exatamente como a tarefa 2 os devolve, com maiúscula e tudo.

## 4. O que escrever na folha

- O primeiro caso precisa de duas coisas ao mesmo tempo, por isso junta-as com `and`: `if score >= 8 and sings then`.
- O segundo caso só é alcançado quando o primeiro já falhou, por isso não precisa de voltar a perguntar sobre o canto.
