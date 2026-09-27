# welcome termina con IO.puts

La funzione `welcome/0` non dovrebbe restituire `:ok` esplicitamente, ma restituire implicitamente ciò che restituisce `IO.puts` (che poi è `:ok`).
