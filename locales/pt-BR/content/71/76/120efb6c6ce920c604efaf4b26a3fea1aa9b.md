# Dicas

## Geral

- Implemente funções puras que retornam strings JSON; você não precisa rodar um servidor web.

- O Roc fornece `Json.parse` e `Json.to_str` como funções nativas.
  Uma anotação de tipo no valor de retorno de uma função auxiliar de parsing diz ao `Json.parse` qual estrutura de registro decodificar.

- O campo `payload ?: Str` é opcional: o `payload` vinculado pelo padrão de registro do stub é `Ok(text)` ou `Err(MissingField)`.
