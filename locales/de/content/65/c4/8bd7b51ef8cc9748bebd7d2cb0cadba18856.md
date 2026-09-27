# Einführung

## Access Behaviour

Elixir verwendet _Behaviours_, um allgemeine, generische Schnittstellen bereitzustellen und gleichzeitig spezifische Implementierungen für jedes Modul zu ermöglichen, das sie implementiert. Ein bekanntes Beispiel dafür ist das _Access Behaviour_.

Das _Access Behaviour_ stellt eine gemeinsame Schnittstelle bereit, um Daten aus einer schlüsselbasierten Datenstruktur abzurufen. Das _Access Behaviour_ ist für Maps und Keyword-Listen implementiert, aber schauen wir uns seine Verwendung für Maps an, um ein Gefühl dafür zu bekommen. Das _Access Behaviour_ legt fest, dass du bei einer Map direkt dahinter _eckige Klammern_ setzen und dann mit dem Schlüssel den zugehörigen Wert abrufen kannst.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Wenn der Schlüssel in der Datenstruktur nicht existiert, wird `nil` zurückgegeben. Das kann zu unbeabsichtigtem Verhalten führen, weil dabei kein Fehler ausgelöst wird. Beachte, dass `nil` selbst das Access Behaviour implementiert und für jeden Schlüssel immer `nil` zurückgibt.
