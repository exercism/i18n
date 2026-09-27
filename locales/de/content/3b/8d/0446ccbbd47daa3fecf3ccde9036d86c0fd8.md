# Anhang zu den Anweisungen

## Implementierung

Implementiere die Methoden `get` und `post` der Klasse `RestAPI`.

Du solltest nur die Handler-Funktionen schreiben, ohne einen echten HTTP-Server zu implementieren.
Du kannst die Datenbank mit einem Objekt im Arbeitsspeicher mocken, das alle gespeicherten Benutzer enthält.
Der Konstruktor der Klasse `RestAPI` sollte eine Instanz dieser Datenbank als Argument annehmen (und einen Standardwert dafür setzen, wenn kein Argument übergeben wurde).

Bei dieser Implementierung sollte die Payload im Fall einer `GET`-Anfrage Teil der URL sein und wie Query-Parameter behandelt werden, zum Beispiel `/users?users=Adam,Bob`.
