# Dicas

## Geral

- No tipo `Node` fornecido, `left : Tree ?? Empty` declara um campo cujo valor predefinido é `Empty`.
  Podes omitir esse campo ao construir um nó e, ao lê-lo, continuas a obter uma `Tree`.
  Isto difere de um campo opcional declarado com `?:`, cuja presença tem de ser verificada.
