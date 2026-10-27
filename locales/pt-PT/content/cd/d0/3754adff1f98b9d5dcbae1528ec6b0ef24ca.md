# Dicas

## Geral

- Usa `match` para distinguir `Closed` de `Open(balance)`.

- Uma operação devolve uma conta atualizada em vez de modificar a conta que lhe é passada.
  Usa `Ok(updated_account)` para uma atualização bem-sucedida e `Err(...)` para uma operação rejeitada.
