# Cosa non rientra nell'ambito del track Rust di Exercism?

Questo file vuole spiegare cosa il track Rust di Exercism può e non può
insegnare entro i confini del linguaggio Rust, della sua comunità e del suo
ecosistema.

Se per un determinato esercizio un argomento è già trattato nella sezione
«Fuori ambito» di _design.md_, non va ripetuto qui, a meno che non si ritenga
che l'argomento abbia comunque una visibilità insufficiente.

## I limiti dell'interfaccia web

Chi studia usando l'interfaccia web è limitato a ciò che l'interfaccia web e
il test runner permettono, quindi le capacità dell'interfaccia web
costituiscono di fatto il limite esterno del track Rust.

Chi studia può:

- Modificare un singolo file `.rs`
- Ricevere l'output da `stdout` (ad esempio da `dbg!`)

In particolare, questo significa che non può modificare Cargo.toml, quindi
ogni esercizio che dipende da un crate esterno deve già includere tutte le
dipendenze in Cargo.toml.

## Di cosa non si occupa Exercism

Exercism serve ad acquisire padronanza di un linguaggio di programmazione, non
a insegnare competenze più astratte come la progettazione del software o
l'informatica. Quindi ogni argomento che non è particolarmente rilevante per
il linguaggio Rust non rientra nell'ambito del track Rust.

## Esempi di argomenti esclusi

Alcuni esempi di argomenti esclusi sono:

### Cargo

- modificare Cargo.toml
- i comandi della CLI, ad esempio `new`, `update` e `bench`

### Framework

- Amethyst
- Yew, Iced, Sauron, ecc.

### Interoperabilità

- CFFI
- `asm!`

### In generale:

- Gestione dei file
- Networking
