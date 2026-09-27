# Instruções

Fazes parte de uma força-tarefa que combate a espionagem empresarial. Tens um informador secreto na Shady Company X, que suspeitas estar a roubar segredos aos concorrentes.

A tua informadora, a Agente Ex, é programadora de Elixir. Está a codificar mensagens secretas no código dela.

Para descodificares as mensagens secretas dela:

- Pega em todas as funções (públicas e privadas) pela ordem em que são definidas.
- Para cada função, pega nos primeiros `n` carateres do nome, em que `n` é a aridade da função.

## 1. Transformar código em dados

Implementa a função `TopSecret.to_ast/1`. Deve receber uma string com código Elixir e devolver a respetiva AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Analisar um único nó da AST

Implementa a função `TopSecret.decode_secret_message_part/2`. Deve receber um nó da AST e um acumulador para a mensagem secreta (uma lista). Deve devolver um tuplo com o nó da AST inalterado como primeiro elemento e o acumulador como segundo elemento.

Se a operação do nó da AST for a definição de uma função (`def` ou `defp`), acrescenta ao início do acumulador o nome da função (convertido numa string). Se a operação for outra coisa, devolve o acumulador inalterado.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Esta função não precisa de fazer chamadas recursivas para verificar toda a AST, apenas o nó dado. Vamos percorrer toda a AST com ferramentas incorporadas no último passo.

## 3. Descodificar a parte da mensagem secreta a partir da definição da função

Amplia a função `TopSecret.decode_secret_message_part/2`. Se a operação no nó da AST for a definição de uma função, não devolvas o nome completo da função. Em vez disso, verifica a aridade da função. Depois, devolve apenas os primeiros `n` carateres do nome, em que `n` é a aridade.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Corrigir a descodificação para funções com guardas

Amplia a função `TopSecret.decode_secret_message_part/2`. Certifica-te de que o nome e a aridade da função são detetados corretamente nas definições de funções que usam guardas.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Descodificar a mensagem secreta completa

Implementa a função `TopSecret.decode_secret_message/1`. Deve receber uma string com código Elixir e devolver a mensagem secreta, como string, descodificada a partir de todas as definições de funções encontradas no código. Certifica-te de que reutilizas as funções definidas nos passos anteriores.

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
