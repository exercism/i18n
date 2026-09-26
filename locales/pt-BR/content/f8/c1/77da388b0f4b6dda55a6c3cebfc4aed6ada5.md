# Instruções

Você faz parte de uma força-tarefa que luta contra a espionagem corporativa. Você tem um informante secreto na Shady Company X, que você suspeita estar roubando segredos de seus concorrentes.

Sua informante, a Agente Ex, é desenvolvedora de Elixir. Ela está codificando mensagens secretas no código dela.

Para decodificar as mensagens secretas dela:

- Pegue todas as funções (públicas e privadas) na ordem em que são definidas.
- Para cada função, pegue os primeiros `n` caracteres do nome dela, em que `n` é a aridade da função.

## 1. Transforme o código em dados

Implemente a função `TopSecret.to_ast/1`. Ela deve receber uma string com código Elixir e retornar sua AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Analise um único nó da AST

Implemente a função `TopSecret.decode_secret_message_part/2`. Ela deve receber um nó da AST e um acumulador para a mensagem secreta (uma lista). Ela deve retornar uma tupla com o nó da AST inalterado como primeiro elemento e o acumulador como segundo elemento.

Se a operação do nó da AST for a definição de uma função (`def` ou `defp`), adicione o nome da função (transformado em string) ao início do acumulador. Se a operação for outra coisa, retorne o acumulador inalterado.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Essa função não precisa fazer nenhuma chamada recursiva para verificar a AST inteira, apenas o nó recebido. Vamos percorrer a AST inteira com ferramentas nativas no último passo.

## 3. Decodifique a parte da mensagem secreta a partir da definição da função

Estenda a função `TopSecret.decode_secret_message_part/2`. Se a operação no nó da AST for a definição de uma função, não retorne o nome inteiro da função. Em vez disso, verifique a aridade da função. Depois, retorne apenas os primeiros `n` caracteres do nome, em que `n` é a aridade.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Corrija a decodificação para funções com guards

Estenda a função `TopSecret.decode_secret_message_part/2`. Certifique-se de que o nome e a aridade da função sejam detectados corretamente para definições de função que usam guards.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Decodifique a mensagem secreta completa

Implemente a função `TopSecret.decode_secret_message/1`. Ela deve receber uma string com código Elixir e retornar a mensagem secreta como uma string decodificada a partir de todas as definições de função encontradas no código. Reaproveite as funções definidas nos passos anteriores.

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
