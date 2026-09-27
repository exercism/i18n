# Introdução

## Ficheiro

As funções para trabalhar com ficheiros são fornecidas pelo módulo `File`.

Para leres um ficheiro inteiro, usa `File.read/1`. Para escreveres num ficheiro, usa `File.write/2`.

Sempre que escreves num ficheiro com `File.write/2`, é aberto um descritor de ficheiro e é criado um novo [processo][exercism-processes] de Elixir. Por este motivo, deves evitar escrever num ficheiro dentro de um ciclo com `File.write/2`.

Em vez disso, podes abrir um ficheiro com `File.open/2`. O segundo argumento de `File.open/2` é uma lista de modos, que te permite especificar se queres abrir o ficheiro para leitura ou para escrita.

`File.open/2` devolve um PID de um processo que trata do ficheiro. Para leres e escreveres no ficheiro, usa funções do módulo `IO` e passa este PID como dispositivo de IO.

Quando terminares de trabalhar com o ficheiro, fecha-o com `File.close/1`.

Todas as funções mencionadas do módulo `File` têm também uma variante com `!` que lança um erro em vez de devolver uma tupla de erro (por exemplo, `File.read!/1`). Usa essa variante se não tencionas tratar erros como ficheiros inexistentes ou falta de permissões.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
