# Dicas

## Geral

- No tipo `Node` fornecido, `left : Tree ?? Empty` declara um campo cujo valor padrão é `Empty`.
  Você pode omitir esse campo ao criar um nó, e lê-lo ainda assim dá um `Tree`.
  Isso é diferente de um campo opcional declarado com `?:`, cuja presença precisa ser verificada.
