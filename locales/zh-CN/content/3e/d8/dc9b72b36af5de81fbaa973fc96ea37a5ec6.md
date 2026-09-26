# welcome 以 IO puts 结尾

函数`welcome/0`不应该显式返回`:ok`，而应该隐式返回`IO.puts`返回的内容（它恰好就是`:ok`）。
