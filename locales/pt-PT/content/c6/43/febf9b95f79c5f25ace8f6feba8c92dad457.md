# Anexo às instruções

## Notas de implementação

O programa de teste cria árvores através da aplicação repetida da função variádica `New`.
Por exemplo, a instrução

```go
tree := New("a",New("b"),New("c",New("d")))
```

constrói a seguinte árvore:

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

Podes assumir que não haverá valores duplicados nas árvores de teste.

Os métodos `Value` e `Children` serão usados pelo programa de teste para desconstruir as árvores.

A construção e desconstrução básica da árvore têm de estar a funcionar antes de começares a parte interessante do exercício, por isso são testadas separadamente nos primeiros três testes.

---

Os métodos `FromPov` e `PathTo` são a parte interessante do exercício.

O método `FromPov` recebe um argumento string `from`, que especifica um nó da árvore através do seu valor.
Deve devolver uma árvore com o valor `from` na raiz.
Podes modificar a árvore original e devolvê-la, ou criar uma nova árvore e devolver essa.
Se devolveres uma nova árvore, és livre de consumir ou destruir a árvore original.
Claro que é agradável deixá-la inalterada.

O método `PathTo` recebe dois argumentos string `from` e `to`, que especificam dois nós da árvore através dos seus valores.
Deve devolver o caminho mais curto na árvore do primeiro para o segundo nó.
