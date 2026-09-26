# Complemento das instruções

## Notas de implementação

O programa de testes cria árvores aplicando repetidamente a função variádica `New`.
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

Você pode assumir que não haverá valores duplicados nas árvores de teste.

Os métodos `Value` e `Children` serão usados pelo programa de testes para desconstruir as árvores.

A construção e a desconstrução básicas da árvore precisam estar funcionando antes de você começar a parte interessante do exercício, por isso elas são testadas separadamente nos três primeiros testes.

---

Os métodos `FromPov` e `PathTo` são a parte interessante do exercício.

O método `FromPov` recebe um argumento string `from` que especifica um nó da árvore por meio do seu valor.
Ele deve retornar uma árvore com o valor `from` na raiz.
Você pode modificar a árvore original e retorná-la, ou criar uma nova árvore e retorná-la.
Se você retornar uma nova árvore, fica livre para consumir ou destruir a árvore original.
É claro que é legal deixá-la sem modificações.

O método `PathTo` recebe dois argumentos string, `from` e `to`, que especificam dois nós da árvore pelos seus valores.
Ele deve retornar o caminho mais curto na árvore do primeiro até o segundo nó.
