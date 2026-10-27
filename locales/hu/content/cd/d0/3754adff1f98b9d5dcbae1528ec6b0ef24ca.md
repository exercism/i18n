# Tippek

## Általános

- A `match` kulcsszóval különböztetheted meg a `Closed` állapotot az `Open(balance)` állapottól.

- Egy művelet egy frissített számlát ad vissza ahelyett, hogy módosítaná a neki átadott számlát.
  Sikeres frissítésnél az `Ok(updated_account)`, elutasított műveletnél az `Err(...)` értéket használd.
