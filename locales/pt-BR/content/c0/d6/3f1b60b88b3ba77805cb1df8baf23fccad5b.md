# Introdução

Um programa `jq` que encontra um problema ao processar um valor (indexar um número com uma string, interpretar um texto JSON inválido, chamar uma função com um argumento do tipo errado) lança um **erro de tempo de execução**.
Um erro de tempo de execução não capturado faz o `jq` imprimir uma mensagem no _erro padrão_ e sair com status `5`.

## Lançando erros: `error` e `error(message)`

- `error` lança um erro cujo valor é o valor de **entrada**.
- `error(message)` lança um erro cujo valor é o resultado de `message`.

O valor do erro pode ser _qualquer_ valor JSON, não apenas uma string.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Capturando erros: `try` e `catch`

É possível capturar erros com `try EXP catch HANDLER`.
A primeira expressão é executada; se ela lançar um erro, a expressão `HANDLER` é executada **com o valor do erro como entrada**.
A saída de `try catch` é a saída da expressão que rodou por último (seja `EXP` ou `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

A forma mais curta `try EXP` equivale a `try EXP catch empty`: o erro é descartado e nenhuma saída é produzida.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Suprimindo erros: o operador `?`

O operador `?`, usado como `EXP?`, é uma forma abreviada de `try EXP`.
Ele transforma uma expressão que falha em uma que simplesmente não produz saída.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

É comum vê-lo junto aos operadores de indexação: `.foo?` e `.[]?`.

## Parando o programa: `halt_error` e `halt`

O `halt_error` para o programa, imprime sua entrada no _erro padrão_ como texto bruto e sai com o status informado, que por padrão é `5`.
O filtro `halt`, relacionado a ele, para o programa silenciosamente com status de saída `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
