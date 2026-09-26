# Complemento das instruções

## Implementação

O argumento `diagram` começa cada linha com um `\n`.
Isso permite que os literais de string brutos do Go apresentem diagramas no código-fonte de um jeito agradável, como duas linhas alinhadas à esquerda.
Por exemplo, o teste pode conter o seguinte.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Se o argumento `children` for `nil`, use a lista de crianças definida nas instruções acima.
Se não for `nil`, use o valor informado.
