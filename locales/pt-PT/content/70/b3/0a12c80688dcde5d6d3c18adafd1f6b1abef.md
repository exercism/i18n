# Instruções

Neste exercício vais processar linhas de registo.

Cada linha de registo é uma string formatada da seguinte forma: `"[<LEVEL>]: <MESSAGE>"`.

Há três níveis de registo diferentes:

- `INFO`
- `WARNING`
- `ERROR`

Tens três tarefas e cada uma recebe uma linha de registo e pede-te que faças algo com ela.

## 1. Obter a mensagem de uma linha de registo

Implementa a função `message` para devolver a mensagem de uma linha de registo:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Qualquer espaço em branco no início ou no fim deve ser removido:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Obter o nível de registo de uma linha

Implementa a função `log_level` para devolver o nível de registo de uma linha, que deve ser devolvido em minúsculas:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Reformatar uma linha de registo

Implementa a função `reformat`, que reformata a linha de registo, colocando a mensagem primeiro e o nível de registo depois, entre parênteses:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Nota:***  Todas as strings deste exercício estão em inglês e limitadas ao conjunto de carateres ASCII.
Os próximos conceitos darão a oportunidade de trabalhar com carateres Unicode.
