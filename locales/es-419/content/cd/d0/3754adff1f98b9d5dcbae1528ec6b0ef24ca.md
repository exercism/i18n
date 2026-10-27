# Pistas

## General

- Usa `match` para distinguir `Closed` de `Open(balance)`.

- Una operación devuelve una cuenta actualizada en lugar de modificar la cuenta que se le pasa.
  Usa `Ok(updated_account)` para una actualización exitosa y `Err(...)` para una operación rechazada.
