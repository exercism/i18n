# Dicas

## Geral

- Implementa funções puras que devolvem strings JSON; não precisas de correr um servidor web.

- O Roc disponibiliza `Json.parse` e `Json.to_str` como funções incorporadas.
  Uma anotação de tipo no valor devolvido de uma função auxiliar de análise indica ao `Json.parse` que estrutura de registo descodificar.

- O campo `payload ?: Str` é opcional: o `payload` associado pelo padrão de registo do stub é `Ok(text)` ou `Err(MissingField)`.
