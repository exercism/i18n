# welcome termina con IO puts

La función `welcome/0` no debería devolver `:ok` de forma explícita, sino devolver implícitamente lo que devuelve `IO.puts` (que resulta ser `:ok`).
