# Dicas

## Geral

- Um `include` fica dentro da classe, normalmente como a sua primeira linha.
- Só muda aquilo que renomeias ou deixas de fora. Tudo o resto entra tal como estava.

## 1. A rotina de jazz

- Uma linha dentro da classe: `include WARM_UP;`
- Nada mais. O corpo da classe é essa linha e mais nada.

## 2. A rotina de sapateado

- `include WARM_UP describe -> ;`
- O `-> ;` sem nada depois da seta deixa o `describe` de fora, e é isso que abre espaço para o que tu escreves.
- Sem isso, o compilador queixa-se de que `describe` está definido duas vezes. Esse erro é a funcionalidade: o Sather não vai escolher um deles em silêncio.

## 3. O final

- Duas entradas num só include, separadas por uma vírgula:
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Depois escreve `counts` a devolver `warm_up_counts * 2`, e `describe`.
- O `describe` deve chamar `counts`, e não voltar a calcular o número outra vez.
- Lembra-te de que não se pode somar uma string a um número, por isso uma descrição que começa com palavras é perfeitamente válida: `"Finale: " + counts + " counts"`.
