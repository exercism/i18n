# Suggerimenti

## Generale

- Implementa funzioni pure che restituiscono stringhe JSON: non serve eseguire un web server.

- Roc mette a disposizione `Json.parse` e `Json.to_str` come funzioni predefinite.
  Un'annotazione di tipo sul valore restituito di una funzione ausiliaria di parsing indica a `Json.parse` quale struttura di record decodificare.

- Il campo `payload ?: Str` è opzionale: il `payload` associato dal pattern di record dello stub è `Ok(text)` oppure `Err(MissingField)`.
