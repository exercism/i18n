# Dicas

## Geral

- Um `include` fica dentro da classe, geralmente como a primeira linha dela.
- Só muda o que você renomeia ou deixa de fora. Todo o resto entra como estava.

## 1. A rotina de jazz

- Uma linha dentro da classe: `include WARM_UP;`
- Nada mais. O corpo da classe é essa linha e só.

## 2. A rotina de sapateado

- `include WARM_UP describe -> ;`
- O `-> ;` sem nada depois da seta deixa `describe` de fora, e é isso que abre
  espaço para o que você escrever.
- Sem ele, o compilador reclama que `describe` está definido duas vezes. Esse
  erro é a funcionalidade: Sather não vai escolher um em silêncio.

## 3. O final

- Duas entradas em um único include, separadas por vírgula:
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Depois escreva `counts` retornando `warm_up_counts * 2`, e `describe`.
- `describe` deve chamar `counts`, e não calcular o número de novo.
- Lembre-se de que não dá para somar uma string a um número, então uma descrição
  que começa com palavras funciona bem: `"Finale: " + counts + " counts"`.
