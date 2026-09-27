# Anexo a las instrucciones

## Implementación

El argumento `diagram` empieza cada fila con un `\n`.
Esto permite que los literales de cadena sin procesar de Go presenten los diagramas en el código fuente de forma clara como dos filas alineadas a la izquierda.
Por ejemplo, la prueba puede contener lo siguiente.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Si el argumento `children` es `nil`, usa el array de niños definido en las instrucciones anteriores.
Si no es `nil`, usa el valor dado.
