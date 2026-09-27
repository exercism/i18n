# Appendice alle istruzioni

## Implementazione

Implementa i metodi `get` e `post` della classe `RestAPI`.

Scrivi solo le funzioni di gestione, senza implementare un vero server HTTP.
Puoi simulare il database usando un oggetto in memoria che conterrà tutti gli utenti memorizzati.
Il costruttore della classe `RestAPI` deve accettare come argomento un'istanza di questo database (e impostare un valore predefinito se non è stato passato alcun argomento).

Per questa implementazione, in caso di richiesta `GET`, il payload deve far parte dell'URL ed essere gestito come parametri di query, per esempio `/users?users=Adam,Bob`.
