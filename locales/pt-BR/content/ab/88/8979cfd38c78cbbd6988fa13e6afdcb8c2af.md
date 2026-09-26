# Dicas

## Geral

- Cada um deles escolhe uma entre três respostas, então cada um é um `if` com um `elsif` e um `else`.
- Faça a pergunta mais exigente primeiro. Se a pergunta `score >= 5` vier antes de `score >= 8`, a segunda nunca será alcançada.

## 1. O veredito

- Três faixas, então duas perguntas: oito ou mais, depois cinco ou mais, depois tudo o que sobrar.

## 2. Qual grupo?

- É mais fácil ir de baixo para cima: primeiro abaixo de 13, depois abaixo de 16, e o resto depois.
- "De 13 a 15" e "abaixo de 16" descrevem os mesmos artistas, e a segunda é uma comparação em vez de duas.

## 3. Quando voltar

- `=` compara duas strings: `if group = "Juniors" then`.
- Escreva os nomes dos grupos exatamente como a tarefa 2 os retorna, com letra maiúscula e tudo.

## 4. O que escrever na ficha

- O primeiro caso precisa de duas coisas ao mesmo tempo, então junte as duas com `and`: `if score >= 8 and sings then`.
- O segundo caso só é alcançado quando o primeiro já falhou, então não precisa perguntar sobre o canto de novo.
