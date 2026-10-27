# Dicas

## Geral

- Use `match` para distinguir `Closed` de `Open(balance)`.

- Uma operação retorna uma conta atualizada em vez de modificar a conta recebida.
  Use `Ok(updated_account)` para uma atualização bem-sucedida e `Err(...)` para uma operação rejeitada.
