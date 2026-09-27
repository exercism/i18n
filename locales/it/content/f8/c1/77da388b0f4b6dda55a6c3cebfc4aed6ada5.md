# Istruzioni

Fai parte di una task force che combatte contro lo spionaggio aziendale. Hai un'informatrice segreta presso Shady Company X, che sospetti rubi segreti ai suoi concorrenti.

La tua informatrice, l'agente Ex, è una sviluppatrice Elixir. Sta codificando messaggi segreti nel suo codice.

Per decodificare i suoi messaggi segreti:

- Prendi tutte le funzioni (pubbliche e private) nell'ordine in cui sono definite.
- Per ogni funzione, prendi i primi `n` caratteri del suo nome, dove `n` è l'arità della funzione.

## 1. Trasforma il codice in dati

Implementa la funzione `TopSecret.to_ast/1`. Deve prendere una stringa con codice Elixir e restituirne l'AST.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. Analizza un singolo nodo AST

Implementa la funzione `TopSecret.decode_secret_message_part/2`. Deve prendere un nodo AST e un accumulatore per il messaggio segreto (un array). Deve restituire una tupla con il nodo AST invariato come primo elemento e l'accumulatore come secondo elemento.

Se l'operazione del nodo AST definisce una funzione (`def` o `defp`), anteponi all'accumulatore il nome della funzione (convertito in stringa). Se l'operazione è qualcos'altro, restituisci l'accumulatore invariato.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

Questa funzione non ha bisogno di fare chiamate ricorsive per controllare l'intero AST, ma solo il nodo dato. Attraverseremo l'intero AST con strumenti integrati nell'ultimo passaggio.

## 3. Decodifica la parte del messaggio segreto dalla definizione di funzione

Estendi la funzione `TopSecret.decode_secret_message_part/2`. Se l'operazione nel nodo AST definisce una funzione, non restituire l'intero nome della funzione. Controlla invece l'arità della funzione. Poi restituisci solo i primi `n` caratteri del nome, dove `n` è l'arità.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. Correggi la decodifica per le funzioni con guardie

Estendi la funzione `TopSecret.decode_secret_message_part/2`. Assicurati che il nome e l'arità della funzione siano rilevati correttamente per le definizioni di funzione che usano guardie.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. Decodifica il messaggio segreto completo

Implementa la funzione `TopSecret.decode_secret_message/1`. Deve prendere una stringa con codice Elixir e restituire il messaggio segreto come stringa decodificata da tutte le definizioni di funzione trovate nel codice. Assicurati di riutilizzare le funzioni definite nei passaggi precedenti.

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
