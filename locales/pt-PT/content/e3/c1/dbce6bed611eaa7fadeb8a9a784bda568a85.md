# Apêndice às instruções

Conta as letras, ignorando se são maiúsculas ou minúsculas e tudo o que não sejam letras, e devolve um dicionário que associa as letras minúsculas às respetivas contagens.

Usa `pf.Parallel.map!(items, { workers, task })` da [plataforma roc-parallel](https://github.com/ageron/roc-parallel) para processar os `items` dados com uma função `task` pura, em paralelo por várias threads (indicadas por `workers`). Os resultados são devolvidos na ordem de entrada depois de todos os items serem processados. Só precisas de editar o ficheiro `ParallelLetterFrequency.roc`.

Sugestão: recomendamos que uses a [biblioteca Unicode](https://github.com/roc-lang/unicode) para a conversão de maiúsculas e minúsculas e para a deteção de letras. Em particular, espreita `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` e `unicode.Scalar.to_str`. Trata as letras como valores escalares Unicode; não é necessária normalização Unicode.

Nota: ao contrário da maioria dos outros exercícios, este exercício usa funções com efeitos. Por agora, a instrução `expect` do Roc não pode chamar funções com efeitos, por isso, neste exercício, os testes não usam `expect` nem `roc test`. Em vez disso, os testes são executados com `roc --opt=speed` e qualquer erro devolvido pelo código Roc é comunicado pela plataforma, num formato diferente do habitual.

Também podes querer espreitar o exercício `bank-account`, que explora um lado diferente da concorrência: aplicar atualizações a um estado partilhado em segurança.
