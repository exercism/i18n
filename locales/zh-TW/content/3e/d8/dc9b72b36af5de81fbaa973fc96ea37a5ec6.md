# welcome 以 IO puts 結尾

函式 `welcome/0` 不應該明確地回傳 `:ok`，而是隱式地回傳 `IO.puts` 所回傳的值（也就是 `:ok`）。
