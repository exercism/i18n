# Dicas

## Geral

- O tipo é `LIST{STR}` em todo o lado: uma lista de strings. Escreve-o por extenso sempre que um caderno entra ou sai.

## 1. Abrir um caso

- `#LIST{STR}` cria um vazio. A rotina não recebe argumentos e devolve `LIST{STR}`.

## 2. Anotar uma pista

- `append` é a rotina e não devolve nada, por isso esta rotina também não tem tipo de retorno: `add_clue(notes : LIST{STR}, clue : STR) is`.
- Não atribuas o resultado de `append` em lado nenhum. Ao contrário de `FMAP::insert`, não há resultado.

## 3. Quantas pistas?

- `.size`.

## 4. Eliminar uma pista

- `remove_index` recebe a posição. De novo, sem tipo de retorno.

## 5. Reler o caso

- Um ciclo sobre `notes.elt!` e um `FSTR`, como em `rehearsal-script`.
- O `"; "` vai antes de cada pista exceto a primeira, e é isso que faz com que um caderno vazio dê a string vazia sem qualquer tratamento especial.
