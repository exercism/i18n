# Anexo de instrucciones

## Implementación

El argumento `diagram` comienza cada fila con un `\n`.
Esto permite que los literales de string sin procesar de Go presenten los diagramas en el código fuente de forma cómoda, como dos filas alineadas a la izquierda.
Por ejemplo, el test puede contener lo siguiente.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Si el argumento `children` es `nil`, usa la lista de niños definida en las instrucciones anteriores.
Si no es `nil`, usa el valor dado.
