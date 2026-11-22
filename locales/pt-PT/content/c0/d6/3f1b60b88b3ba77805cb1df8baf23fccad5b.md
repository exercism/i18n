# Introdução

Um programa `jq` que encontra um problema ao processar um valor (indexar um número com uma string, interpretar texto JSON inválido, chamar uma função com um argumento do tipo errado) gera um **erro de execução**.
Um erro de execução não capturado faz com que o `jq` imprima uma mensagem no _erro padrão_ e termine com o código de saída `5`.

## Lançar erros: `error` e `error(message)`

- `error` lança um erro cujo valor é o valor de **entrada**.
- `error(message)` lança um erro cujo valor é o resultado de `message`.

O valor do erro pode ser _qualquer_ valor JSON, não apenas uma string.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Capturar erros: `try` e `catch`

Os erros podem ser capturados com `try EXP catch HANDLER`.
A primeira expressão é executada; se lançar um erro, a expressão `HANDLER` é executada **com o valor do erro como valor de entrada**.
A saída de `try catch` é a saída da expressão que correu por último (ou `EXP` ou `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

A forma mais curta `try EXP` é equivalente a `try EXP catch empty`: o erro é descartado e não é produzida qualquer saída.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Suprimir erros: o operador `?`

O operador `?`, usado como `EXP?`, é uma forma abreviada de `try EXP`.
Transforma uma expressão que falha numa expressão que simplesmente não produz saída.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

Aparece frequentemente associado aos operadores de indexação: `.foo?` e `.[]?`.

## Parar o programa: `halt_error` e `halt`

O `halt_error` para o programa, imprime o valor de entrada no _erro padrão_ como texto simples e termina com o código de saída indicado, que por omissão é `5`.
O filtro `halt`, relacionado, para o programa silenciosamente com o código de saída `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
