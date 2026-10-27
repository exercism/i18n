# Pistas

## General

- Usa `match` para distinguir `Closed` de `Open(balance)`.

- Una operación devuelve una cuenta actualizada en lugar de modificar la cuenta que recibe.
  Usa `Ok(updated_account)` para una actualización correcta y `Err(...)` para una operación rechazada.
