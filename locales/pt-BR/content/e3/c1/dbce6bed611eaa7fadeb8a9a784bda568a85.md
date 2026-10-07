# Anexo às instruções

Conte as letras, ignorando maiúsculas e minúsculas e caracteres que não sejam letras, e retorne um dicionário que mapeia cada letra minúscula para a sua contagem.

Use `pf.Parallel.map!(items, { workers, task })` da [plataforma roc-parallel](https://github.com/ageron/roc-parallel) para processar os `items` fornecidos usando uma função `task` pura, em paralelo, em várias threads (indicadas por `workers`). Os resultados são retornados na ordem de entrada depois que todos os itens forem processados. Você só precisa editar `ParallelLetterFrequency.roc`.

Dica: recomendamos que você use a [biblioteca Unicode](https://github.com/roc-lang/unicode) para conversão de maiúsculas e minúsculas e detecção de letras. Em particular, dê uma olhada em `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` e `unicode.Scalar.to_str`. Trate as letras como valores escalares Unicode; não é preciso fazer normalização Unicode.

Observação: diferente da maioria dos outros exercícios, este exercício usa funções com efeitos. Por enquanto, a instrução `expect` do Roc não consegue chamar funções com efeitos, então, neste exercício, os testes não usam `expect` nem `roc test`. Em vez disso, os testes são executados com `roc --opt=speed` e qualquer erro retornado pelo código Roc é reportado pela plataforma, num formato diferente do habitual.

Você também pode querer dar uma olhada no exercício `bank-account`, que explora um outro lado da concorrência: aplicar atualizações com segurança a um estado compartilhado.
