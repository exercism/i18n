# welcome termina con IO puts

La función `welcome/0` no debería devolver `:ok` de forma explícita, sino devolver de forma implícita lo que devuelve `IO.puts` (que resulta ser `:ok`).
