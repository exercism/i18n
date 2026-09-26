# Dicas

## Geral

- O tipo é `LIST{STR}` do começo ao fim: uma lista de strings. Escreva-o
  por extenso sempre que um caderno entrar ou sair.

## 1. Abrir um caso

- `#LIST{STR}` cria uma lista vazia. A rotina não recebe argumentos e
  retorna `LIST{STR}`.

## 2. Anotar uma pista

- `append` é a rotina, e ela não responde nada, então essa rotina também não
  tem tipo de retorno: `add_clue(notes : LIST{STR}, clue : STR) is`.
- Não atribua o resultado de `append` a lugar nenhum. Diferente de `FMAP::insert`,
  não há resultado.

## 3. Quantas pistas?

- `.size`.

## 4. Descartar uma

- `remove_index` recebe a posição. Sem tipo de retorno de novo.

## 5. Reler o caso

- Um laço sobre `notes.elt!` e um `FSTR`, como em `rehearsal-script`.
- O `"; "` vai antes de cada pista, exceto a primeira, e é isso que faz um
  caderno vazio sair como a string vazia, sem nenhum tratamento especial.
