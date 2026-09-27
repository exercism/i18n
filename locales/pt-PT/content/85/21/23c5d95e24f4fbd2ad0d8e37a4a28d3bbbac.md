# Anexo às instruções

## Implementação

O argumento `diagram` começa cada linha com um `\n`.
Isto permite que os literais de string não processados do Go apresentem diagramas no código-fonte de forma agradável, como duas linhas alinhadas à esquerda.
Por exemplo, o teste pode conter o seguinte.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Se o argumento `children` for `nil`, usa a lista de crianças definida nas instruções acima.
Se não for `nil`, usa o valor indicado.
