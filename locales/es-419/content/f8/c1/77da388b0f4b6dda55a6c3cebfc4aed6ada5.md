# Instrucciones

Eres parte de un grupo de trabajo que lucha contra el espionaje corporativo. Tienes un informante secreto en Shady Company X, de la que sospechas que roba secretos a sus competidores.

Tu informante, la Agente Ex, es una desarrolladora de Elixir. Está codificando mensajes secretos en su código.

Para decodificar sus mensajes secretos:

- Tomar todas las funciones (públicas y privadas) en el orden en que están definidas.
- Para cada función, tomar los primeros `n` caracteres de su nombre, donde `n` es la aridad de la función.

## 1. Convierte el código en datos

Implementa la función `TopSecret.to_ast/1`. Debe recibir un string con código de Elixir y devolver su AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Analiza un solo nodo del AST

Implementa la función `TopSecret.decode_secret_message_part/2`. Debe recibir un nodo del AST y un acumulador para el mensaje secreto (un array). Debe devolver una tupla con el nodo del AST sin cambios como primer elemento y el acumulador como segundo elemento.

Si la operación del nodo del AST define una función (`def` o `defp`), antepón el nombre de la función (convertido a string) al acumulador. Si la operación es otra cosa, devuelve el acumulador sin cambios.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Esta función no necesita hacer llamadas recursivas para revisar todo el AST, solo el nodo dado. Recorreremos todo el AST con herramientas integradas en el último paso.

## 3. Decodifica la parte del mensaje secreto a partir de la definición de la función

Extiende la función `TopSecret.decode_secret_message_part/2`. Si la operación del nodo del AST define una función, no devuelvas el nombre completo de la función. En su lugar, revisa la aridad de la función. Luego, devuelve solo los primeros `n` caracteres del nombre, donde `n` es la aridad.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Corrige la decodificación para funciones con guardas

Extiende la función `TopSecret.decode_secret_message_part/2`. Asegúrate de que el nombre y la aridad de la función se detecten correctamente en las definiciones de funciones que usan guardas.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Decodifica el mensaje secreto completo

Implementa la función `TopSecret.decode_secret_message/1`. Debe recibir un string con código de Elixir y devolver el mensaje secreto como un string decodificado a partir de todas las definiciones de funciones que se encuentren en el código. Asegúrate de reutilizar las funciones definidas en los pasos anteriores.

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
