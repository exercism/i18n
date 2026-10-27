# Indices

## Généralités

- Utilise `match` pour distinguer `Closed` de `Open(balance)`.

- Une opération renvoie un compte mis à jour au lieu de modifier le compte qui lui est passé.
  Utilise `Ok(updated_account)` pour une mise à jour réussie et `Err(...)` pour une opération rejetée.
