# Instruções

Neste exercício você vai processar linhas de log.

Cada linha de log é uma string formatada assim: `"[<LEVEL>]: <MESSAGE>"`.

Existem três níveis de log diferentes:

- `INFO`
- `WARNING`
- `ERROR`

Você tem três tarefas, e cada uma delas recebe uma linha de log e pede que você faça algo com ela.

## 1. Obter a mensagem de uma linha de log

Implemente a função `message` para retornar a mensagem de uma linha de log:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Qualquer espaço em branco no início ou no fim deve ser removido:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Obter o nível de log de uma linha de log

Implemente a função `log_level` para retornar o nível de log de uma linha de log, que deve ser retornado em minúsculas:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Reformatar uma linha de log

Implemente a função `reformat`, que reformata a linha de log colocando a mensagem primeiro e o nível de log depois dela, entre parênteses:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Observação:***  Todas as strings deste exercício estão em inglês e limitadas ao conjunto de caracteres ASCII. Os próximos Conceitos darão a chance de trabalhar com caracteres Unicode.
